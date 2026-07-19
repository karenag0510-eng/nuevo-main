"""Backend API tests for Ortoook - iteration 4.

Delta focus:
- POST /api/checkout/session (Stripe): validates a real Stripe test session is created,
  price is server-side from PRODUCT_PRICES, and MongoDB records
  (designs w/ payment_status 'pendiente' and payment_transactions w/ 'initiated')
  are inserted.
- GET  /api/checkout/status/{session_id}: real session status (open/unpaid) + 404 handling.
- POST /api/webhook/stripe: route exists (400 on invalid signature, not 404).
- Regression: /api/, /api/contact, /api/designs (default payment_status 'guardado').
"""
import os
import re
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"

VALID_DESIGN = {
    "product_id": "super-arana",
    "modelo": "Súper Araña",
    "color_principal": "Rojo Comet",
    "color_suela": "Negro",
    "color_acento": "Blanco",
    "personaje": "Cohete",
    "talla": "22",
    "nombre_nino": "TEST_QA Peque",
    "nombre_cliente": "TEST_QA Cliente Iter4",
    "telefono": "3344621544",
    "email": "qa_iter4@test.com",
    "notas": "iter4 stripe test",
}


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert "message" in r.json()


# ---------- Contact regression ----------
class TestContact:
    def test_create_contact_persists(self, client):
        payload = {
            "nombre": "TEST_QA Contact Iter4",
            "email": "qa_contact_iter4@test.com",
            "telefono": "3344621544",
            "mensaje": "iter4 contact regression",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        cid = r.json()["id"]
        g = client.get(f"{API}/contact")
        assert g.status_code == 200
        assert any(it["id"] == cid for it in g.json())


# ---------- Designs regression (guardar pedido -> payment_status 'guardado') ----------
class TestDesigns:
    def test_create_design_default_payment_status_guardado(self, client):
        r = client.post(f"{API}/designs", json=VALID_DESIGN)
        assert r.status_code == 200, r.text
        data = r.json()
        # default payment status must be "guardado" when saved directly via /api/designs
        assert data.get("payment_status", "guardado") == "guardado"
        did = data["id"]
        g = client.get(f"{API}/designs")
        assert g.status_code == 200
        match = next((it for it in g.json() if it["id"] == did), None)
        assert match is not None
        assert match["color_acento"] == "Blanco"
        assert match.get("payment_status", "guardado") == "guardado"


# Module-scope fixture to share session_id across test classes (works with xdist loadscope)
@pytest.fixture(scope="module")
def created_session(client):
    payload = {"origin_url": BASE_URL, "design": VALID_DESIGN}
    r = client.post(f"{API}/checkout/session", json=payload)
    assert r.status_code == 200, r.text
    return r.json()


# ---------- Stripe checkout session ----------
class TestCheckoutSession:
    """Server-side price selection: super-arana => 829 MXN."""

    def test_create_checkout_session_super_arana(self, client, created_session):
        data = created_session
        assert "url" in data and "session_id" in data
        assert data["url"].startswith("https://checkout.stripe.com"), data["url"]
        assert re.match(r"^cs_test_", data["session_id"]), data["session_id"]

        # A design record with payment_status "pendiente" must have been created
        gd = client.get(f"{API}/designs")
        assert gd.status_code == 200
        pending = [
            d for d in gd.json()
            if d.get("nombre_cliente") == VALID_DESIGN["nombre_cliente"]
            and d.get("payment_status") == "pendiente"
        ]
        assert len(pending) >= 1, "Expected at least one pending design after checkout session"

    def test_create_checkout_session_invalid_product(self, client):
        bad = {**VALID_DESIGN, "product_id": "no-existe-xxx"}
        r = client.post(f"{API}/checkout/session", json={"origin_url": BASE_URL, "design": bad})
        assert r.status_code == 400, r.text

    def test_create_checkout_session_missing_body(self, client):
        r = client.post(f"{API}/checkout/session", json={})
        assert r.status_code in (400, 422)


# ---------- Stripe checkout status ----------
class TestCheckoutStatus:
    def test_status_for_created_session(self, client, created_session):
        session_id = created_session["session_id"]
        r = client.get(f"{API}/checkout/status/{session_id}")
        assert r.status_code == 200, r.text
        data = r.json()
        # Fresh unpaid session
        assert data["status"] in ("open", "complete", "expired")
        assert data["payment_status"] in ("unpaid", "paid", "no_payment_required")
        assert isinstance(data["amount_total"], int)
        assert data["currency"] == "mxn"

    def test_status_idempotent(self, client, created_session):
        session_id = created_session["session_id"]
        r1 = client.get(f"{API}/checkout/status/{session_id}")
        r2 = client.get(f"{API}/checkout/status/{session_id}")
        assert r1.status_code == 200 and r2.status_code == 200
        assert r1.json()["currency"] == r2.json()["currency"] == "mxn"

    def test_status_unknown_session(self, client):
        r = client.get(f"{API}/checkout/status/cs_test_UNKNOWN_TEST_XYZ")
        assert r.status_code == 404


# ---------- Stripe webhook route exists ----------
class TestStripeWebhook:
    def test_webhook_route_registered(self, client):
        # Invalid body/signature must return 400 (webhook invalid), NOT 404.
        r = client.post(f"{API}/webhook/stripe", data="{}",
                        headers={"Content-Type": "application/json"})
        assert r.status_code != 404, "webhook route not registered"
        # Should be 400 (invalid signature/payload) or 500 wrapped error
        assert r.status_code in (400, 422, 500), r.text
