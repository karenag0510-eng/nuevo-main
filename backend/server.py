from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest,
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Ortoook API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


STRIPE_API_KEY = os.environ['STRIPE_API_KEY']

# Server-side price catalog (prevents price manipulation from frontend).
# Amounts in MXN.
PRODUCT_PRICES = {
    "rosa-nube": 799.0,
    "estrella-plata": 799.0,
    "racing-rojo": 749.0,
    "super-arana": 829.0,
    "clasico-escolar": 859.0,
    "custom": 799.0,
}
PRODUCT_NAMES = {
    "rosa-nube": "Rosa Nube",
    "estrella-plata": "Estrella Plata",
    "racing-rojo": "Racing Rojo",
    "super-arana": "Súper Araña",
    "clasico-escolar": "Clásico Escolar",
    "custom": "Tenis personalizado",
}
CURRENCY = "mxn"


def now_iso():
    return datetime.now(timezone.utc).isoformat()


# ---------- Models ----------
class ContactCreate(BaseModel):
    nombre: str
    email: str
    telefono: Optional[str] = ""
    mensaje: str


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nombre: str
    email: str
    telefono: Optional[str] = ""
    mensaje: str
    created_at: str = Field(default_factory=now_iso)


class DesignCreate(BaseModel):
    product_id: Optional[str] = "custom"
    modelo: str
    color_principal: str
    color_suela: str
    color_acento: Optional[str] = ""
    personaje: str
    talla: str
    nombre_nino: Optional[str] = ""
    nombre_cliente: str
    telefono: str
    email: Optional[str] = ""
    notas: Optional[str] = ""


class Design(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_id: Optional[str] = "custom"
    modelo: str
    color_principal: str
    color_suela: str
    color_acento: Optional[str] = ""
    personaje: str
    talla: str
    nombre_nino: Optional[str] = ""
    nombre_cliente: str
    telefono: str
    email: Optional[str] = ""
    notas: Optional[str] = ""
    payment_status: str = "guardado"
    created_at: str = Field(default_factory=now_iso)


class CheckoutCreate(BaseModel):
    origin_url: str
    design: DesignCreate


class CheckoutStatusOut(BaseModel):
    status: str
    payment_status: str
    amount_total: int
    currency: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Ortoook API viva"}


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    await db.contacts.insert_one(obj.model_dump())
    return obj


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Contact(**d) for d in docs]


@api_router.post("/designs", response_model=Design)
async def create_design(payload: DesignCreate):
    obj = Design(**payload.model_dump())
    await db.designs.insert_one(obj.model_dump())
    return obj


@api_router.get("/designs", response_model=List[Design])
async def list_designs():
    docs = await db.designs.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Design(**d) for d in docs]


# ---------- Stripe payments ----------
@api_router.post("/checkout/session")
async def create_checkout_session(payload: CheckoutCreate, request: Request):
    product_id = payload.design.product_id or "custom"
    if product_id not in PRODUCT_PRICES:
        raise HTTPException(status_code=400, detail="Producto no válido")

    amount = float(PRODUCT_PRICES[product_id])

    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)

    origin = payload.origin_url.rstrip("/")
    success_url = f"{origin}/pago-exitoso?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/personalizar/{product_id}" if product_id != "custom" else f"{origin}/"

    # Persist the design (pending payment) so we can fulfil the order later
    design = Design(**payload.design.model_dump())
    design.payment_status = "pendiente"
    await db.designs.insert_one(design.model_dump())

    metadata = {
        "design_id": design.id,
        "product_id": product_id,
        "cliente": design.nombre_cliente,
        "source": "web_checkout",
    }

    checkout_request = CheckoutSessionRequest(
        amount=amount,
        currency=CURRENCY,
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata,
    )
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)

    txn = {
        "id": str(uuid.uuid4()),
        "session_id": session.session_id,
        "design_id": design.id,
        "product_id": product_id,
        "amount": amount,
        "currency": CURRENCY,
        "metadata": metadata,
        "payment_status": "initiated",
        "status": "open",
        "created_at": now_iso(),
    }
    await db.payment_transactions.insert_one(txn)

    return {"url": session.url, "session_id": session.session_id}


@api_router.get("/checkout/status/{session_id}", response_model=CheckoutStatusOut)
async def checkout_status(session_id: str, request: Request):
    txn = await db.payment_transactions.find_one({"session_id": session_id})
    if not txn:
        raise HTTPException(status_code=404, detail="Transacción no encontrada")

    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)

    status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)

    # Update transaction + design only once (idempotent)
    if txn.get("payment_status") != "paid":
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"payment_status": status.payment_status, "status": status.status,
                      "updated_at": now_iso()}},
        )
        if status.payment_status == "paid":
            await db.designs.update_one(
                {"id": txn["design_id"]},
                {"$set": {"payment_status": "pagado"}},
            )

    return CheckoutStatusOut(
        status=status.status,
        payment_status=status.payment_status,
        amount_total=status.amount_total,
        currency=status.currency,
    )


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    try:
        event = await stripe_checkout.handle_webhook(body, signature)
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=400, detail="Webhook inválido")

    if event.session_id:
        txn = await db.payment_transactions.find_one({"session_id": event.session_id})
        if txn and txn.get("payment_status") != "paid":
            await db.payment_transactions.update_one(
                {"session_id": event.session_id},
                {"$set": {"payment_status": event.payment_status, "updated_at": now_iso()}},
            )
            if event.payment_status == "paid":
                await db.designs.update_one(
                    {"id": txn["design_id"]},
                    {"$set": {"payment_status": "pagado"}},
                )
    return {"received": True}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
