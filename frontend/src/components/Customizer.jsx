import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, Loader2, Save, CreditCard } from "lucide-react";
import ShoePreview from "./ShoePreview";
import { api } from "../lib/api";
import { popConfetti } from "../lib/confetti";
import { MODELOS, COLORES, SUELAS, ACENTOS, PERSONAJES, TALLAS, PREVIEW_IMG } from "../data";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-[#1B75D0]">{title}</h3>
    {children}
  </div>
);

export const Customizer = ({ product = null }) => {
  const [modelo] = useState(product ? product.name : MODELOS[0]);
  const [color, setColor] = useState(COLORES[0]);
  const [suela, setSuela] = useState(SUELAS[0]);
  const [acento, setAcento] = useState(ACENTOS[0]);
  const [personaje, setPersonaje] = useState(PERSONAJES[0]);
  const [talla, setTalla] = useState(TALLAS[3]);
  const [nombreNino, setNombreNino] = useState("");
  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);

  const productId = product ? product.id : "custom";
  const price = product ? product.price : 799;

  const buildDesign = () => ({
    product_id: productId,
    modelo,
    color_principal: color.name,
    color_suela: suela.name,
    color_acento: acento.name,
    personaje: personaje.name,
    talla,
    nombre_nino: nombreNino,
    nombre_cliente: cliente,
    telefono,
    email,
    notas,
  });

  const validate = () => {
    if (!cliente.trim() || !telefono.trim()) {
      toast.error("Por favor escribe tu nombre y teléfono para el pedido");
      return false;
    }
    return true;
  };

  const guardar = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post("/designs", buildDesign());
      toast.success("¡Diseño guardado! Te contactaremos muy pronto 🎉");
      popConfetti();
      setNombreNino("");
      setCliente("");
      setTelefono("");
      setEmail("");
      setNotas("");
    } catch (e) {
      toast.error("Ups, no pudimos guardar tu diseño. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const pagar = async () => {
    if (!validate()) return;
    setPaying(true);
    try {
      const { data } = await api.post("/checkout/session", {
        origin_url: window.location.origin,
        design: buildDesign(),
      });
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("no url");
      }
    } catch (e) {
      toast.error("No pudimos iniciar el pago. Intenta de nuevo.");
      setPaying(false);
    }
  };

  const PersonajeIcon = personaje.icon;

  return (
    <section id="disena" className="bg-[#E8DFF5] px-6 py-24" data-testid="customizer-section">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-[#1A1B41] bg-[#FFD166] px-4 py-1 font-bold">
            <Sparkles strokeWidth={3} size={18} /> Diseñador de tenis
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {product ? (
              <>Personaliza tus <span className="text-[#FF3366]">{product.name}</span></>
            ) : (
              <>Personaliza sus pasos, <span className="text-[#FF3366]">cuida su futuro</span></>
            )}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Preview */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="dot-grid rounded-[2rem] border-4 border-[#1A1B41] bg-white p-6 shadow-[10px_10px_0px_#1A1B41]"
              data-testid="customizer-preview"
            >
              <div className="rounded-3xl border-4 border-[#1A1B41] bg-[#F1ECFA] p-3">
                <ShoePreview
                  image={PREVIEW_IMG}
                  colorPrincipal={color.value}
                  colorSuela={suela.value}
                  colorAccent={acento.value}
                  PersonajeIcon={PersonajeIcon}
                  personajeColor={personaje.color}
                  nombre={nombreNino}
                  className="aspect-[16/10] w-full rounded-2xl border-2 border-[#1A1B41]"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-bold">{product ? product.name : "Tenis Orto Ook"}</p>
                  <p className="font-semibold text-[#1A1B41]/70">
                    {color.name} · {personaje.name} · Talla {talla}
                  </p>
                </div>
                {nombreNino && (
                  <span className="rounded-full border-2 border-[#1A1B41] bg-[#06D6A0] px-4 py-1.5 font-display font-bold">
                    {nombreNino}
                  </span>
                )}
              </div>
              {product && (
                <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-[#1A1B41] bg-[#F1ECFA] p-3">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-16 w-16 rounded-xl border-2 border-[#1A1B41] object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#1A1B41]/60">Modelo elegido</p>
                    <p className="font-display font-bold">{product.name} · ${product.price}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Options */}
          <div className={`orto-scroll rounded-[2rem] border-4 border-[#1A1B41] bg-white p-7 shadow-[10px_10px_0px_#1A1B41] ${product ? "" : "lg:max-h-[70vh] lg:overflow-y-auto"}`}>
            <Section title="1. Color principal">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {COLORES.map((c) => {
                  const active = color.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setColor(c)}
                      title={c.name}
                      aria-label={c.name}
                      data-testid={`opt-color-${c.name.replace(/\s/g, "-")}`}
                      className={`flex items-center gap-2 rounded-2xl border-4 p-2 text-left transition-transform hover:-translate-y-0.5 ${
                        active ? "border-[#FF3366] bg-[#FFE5EC]" : "border-[#1A1B41]/15 bg-white"
                      }`}
                    >
                      <span
                        className="h-8 w-8 shrink-0 rounded-full border-2 border-[#1A1B41]"
                        style={{ background: c.value }}
                      />
                      <span className="truncate text-xs font-bold">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section title="2. Color de suela">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {SUELAS.map((c) => {
                  const active = suela.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSuela(c)}
                      title={c.name}
                      aria-label={c.name}
                      data-testid={`opt-suela-${c.name.replace(/\s/g, "-")}`}
                      className={`flex items-center gap-2 rounded-2xl border-4 p-2 text-left transition-transform hover:-translate-y-0.5 ${
                        active ? "border-[#00C2D1] bg-[#E0FBFC]" : "border-[#1A1B41]/15 bg-white"
                      }`}
                    >
                      <span
                        className="h-8 w-8 shrink-0 rounded-full border-2 border-[#1A1B41]"
                        style={{ background: c.value }}
                      />
                      <span className="truncate text-xs font-bold">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section title="3. Color de franjas y detalles">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {ACENTOS.map((c) => {
                  const active = acento.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setAcento(c)}
                      title={c.name}
                      aria-label={c.name}
                      data-testid={`opt-acento-${c.name.replace(/\s/g, "-")}`}
                      className={`flex items-center gap-2 rounded-2xl border-4 p-2 text-left transition-transform hover:-translate-y-0.5 ${
                        active ? "border-[#4AAE3B] bg-[#E7F8EC]" : "border-[#1A1B41]/15 bg-white"
                      }`}
                    >
                      <span
                        className="h-8 w-8 shrink-0 rounded-full border-2 border-[#1A1B41]"
                        style={{ background: c.value }}
                      />
                      <span className="truncate text-xs font-bold">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section title="4. Personaje">
              <div className="grid grid-cols-4 gap-3">
                {PERSONAJES.map((p) => {
                  const Icon = p.icon;
                  const active = personaje.name === p.name;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setPersonaje(p)}
                      data-testid={`opt-personaje-${p.name}`}
                      className={`flex flex-col items-center gap-1 rounded-2xl border-4 border-[#1A1B41] p-3 font-bold transition-transform hover:-translate-y-1 ${
                        active ? "bg-[#FFD166]" : "bg-white"
                      }`}
                    >
                      <Icon color={p.color} strokeWidth={3} size={26} />
                      <span className="text-xs">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section title="5. Talla">
              <div className="flex flex-wrap gap-2">
                {TALLAS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTalla(t)}
                    data-testid={`opt-talla-${t}`}
                    className={`h-11 w-11 rounded-xl border-4 border-[#1A1B41] font-bold transition-transform hover:-translate-y-0.5 ${
                      talla === t ? "bg-[#06D6A0]" : "bg-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="6. Datos del pedido">
              <div className="grid gap-3">
                <input
                  data-testid="cust-nombre-nino"
                  value={nombreNino}
                  onChange={(e) => setNombreNino(e.target.value)}
                  placeholder="Nombre del peque (para bordar)"
                  className="rounded-xl border-4 border-[#1A1B41] p-3 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
                />
                <input
                  data-testid="cust-cliente"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Tu nombre *"
                  className="rounded-xl border-4 border-[#1A1B41] p-3 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
                />
                <input
                  data-testid="cust-telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Teléfono / WhatsApp *"
                  className="rounded-xl border-4 border-[#1A1B41] p-3 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
                />
                <input
                  data-testid="cust-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo (opcional)"
                  className="rounded-xl border-4 border-[#1A1B41] p-3 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
                />
                <textarea
                  data-testid="cust-notas"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Notas adicionales..."
                  rows={2}
                  className="rounded-xl border-4 border-[#1A1B41] p-3 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
                />
              </div>
            </Section>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={guardar}
                disabled={loading || paying}
                data-testid="cust-submit"
                className="flex w-full items-center justify-center gap-2 rounded-full border-4 border-[#1A1B41] bg-white px-6 py-4 font-display text-lg font-bold text-[#1A1B41] shadow-[6px_6px_0px_#1A1B41] transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_#1A1B41] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" strokeWidth={3} /> Guardando...
                  </>
                ) : (
                  <>
                    <Save strokeWidth={3} size={20} /> Guardar pedido
                  </>
                )}
              </button>
              <button
                onClick={pagar}
                disabled={loading || paying}
                data-testid="cust-pay"
                className="flex w-full items-center justify-center gap-2 rounded-full border-4 border-[#1A1B41] bg-[#FF3366] px-6 py-4 font-display text-lg font-bold text-white shadow-[6px_6px_0px_#1A1B41] transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_#1A1B41] disabled:opacity-70"
              >
                {paying ? (
                  <>
                    <Loader2 className="animate-spin" strokeWidth={3} /> Redirigiendo...
                  </>
                ) : (
                  <>
                    <CreditCard strokeWidth={3} size={20} /> Pagar ${price}
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 text-center font-display text-sm font-medium text-[#1A1B41]/60">
              Pago seguro con tarjeta vía Stripe · o guarda y paga en sucursal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customizer;
