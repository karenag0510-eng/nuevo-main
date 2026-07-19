import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, Mail, MessageCircle, Loader2, Send } from "lucide-react";
import { api } from "../lib/api";
import { popConfetti } from "../lib/confetti";

export const Contact = () => {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim() || !form.mensaje.trim()) {
      toast.error("Completa nombre, correo y mensaje");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("¡Mensaje enviado! Te responderemos pronto 💌");
      popConfetti();
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch {
      toast.error("No pudimos enviar el mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="dot-grid bg-[#FFE5EC] px-6 py-24" data-testid="contact-section">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <span className="mb-3 inline-block rounded-full border-2 border-[#1A1B41] bg-white px-4 py-1 font-bold">
            Contacto
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            ¿Hablamos? <span className="text-[#FF3366]">Estamos aquí</span>
          </h2>
          <p className="mt-4 max-w-md text-lg font-semibold text-[#1A1B41]/70">
            Camina con estilo, comodidad y salud. Escríbenos para dudas, tallas o
            pedidos especiales.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="https://wa.me/523344621544"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp"
              className="flex items-center gap-3 font-bold"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#1A1B41] bg-[#4AAE3B]">
                <MessageCircle strokeWidth={3} size={18} color="#fff" />
              </span>
              WhatsApp 334 462 1544
            </a>
            <div className="flex items-center gap-3 font-bold">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#1A1B41] bg-[#FFD166]">
                <Phone strokeWidth={3} size={18} />
              </span>
              334 462 1544
            </div>
            <div className="flex items-center gap-3 font-bold">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#1A1B41] bg-[#1B75D0]">
                <Mail strokeWidth={3} size={18} color="#fff" />
              </span>
              hola@ortoook.com
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          data-testid="contact-form"
          className="rounded-[2rem] border-4 border-[#1A1B41] bg-white p-8 shadow-[10px_10px_0px_#1A1B41]"
        >
          <div className="grid gap-4">
            <input
              data-testid="contact-nombre"
              value={form.nombre}
              onChange={set("nombre")}
              placeholder="Nombre *"
              className="rounded-xl border-4 border-[#1A1B41] p-4 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
            />
            <input
              data-testid="contact-email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="Correo *"
              className="rounded-xl border-4 border-[#1A1B41] p-4 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
            />
            <input
              data-testid="contact-telefono"
              value={form.telefono}
              onChange={set("telefono")}
              placeholder="Teléfono (opcional)"
              className="rounded-xl border-4 border-[#1A1B41] p-4 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
            />
            <textarea
              data-testid="contact-mensaje"
              value={form.mensaje}
              onChange={set("mensaje")}
              placeholder="Tu mensaje *"
              rows={4}
              className="rounded-xl border-4 border-[#1A1B41] p-4 font-semibold outline-none focus:ring-4 focus:ring-[#FF3366]"
            />
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit"
              className="flex items-center justify-center gap-2 rounded-full border-4 border-[#1A1B41] bg-[#06D6A0] px-6 py-4 font-display text-lg font-bold shadow-[6px_6px_0px_#1A1B41] transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_#1A1B41] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" strokeWidth={3} /> Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje <Send strokeWidth={3} size={20} />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
