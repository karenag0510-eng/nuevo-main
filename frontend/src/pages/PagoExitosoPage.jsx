import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle, Home } from "lucide-react";
import { api } from "../lib/api";
import { popConfetti } from "../lib/confetti";

const MAX_ATTEMPTS = 6;

export default function PagoExitosoPage() {
  const navigate = useNavigate();
  const [state, setState] = useState("checking"); // checking | success | pending | error

  const poll = useCallback(async (sessionId, attempt) => {
    if (attempt >= MAX_ATTEMPTS) {
      setState("pending");
      return;
    }
    try {
      const { data } = await api.get(`/checkout/status/${sessionId}`);
      if (data.payment_status === "paid") {
        setState("success");
        popConfetti();
        return;
      }
      if (data.status === "expired") {
        setState("error");
        return;
      }
      setTimeout(() => poll(sessionId, attempt + 1), 2000);
    } catch (e) {
      setState("error");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setState("error");
      return;
    }
    poll(sessionId, 0);
  }, [poll]);

  const content = {
    checking: {
      icon: <Loader2 className="animate-spin" size={54} strokeWidth={3} color="#1B75D0" />,
      title: "Verificando tu pago...",
      text: "Un momento por favor, estamos confirmando tu compra.",
      bg: "#E0FBFC",
    },
    success: {
      icon: <CheckCircle2 size={54} strokeWidth={3} color="#4AAE3B" />,
      title: "¡Pago confirmado! 🎉",
      text: "Gracias por tu compra. Pronto nos pondremos en contacto para coordinar la entrega de tus tenis.",
      bg: "#E7F8EC",
    },
    pending: {
      icon: <Loader2 className="animate-spin" size={54} strokeWidth={3} color="#FFB020" />,
      title: "Pago en proceso",
      text: "Tu pago se está procesando. Revisa tu correo para la confirmación.",
      bg: "#FFF6E0",
    },
    error: {
      icon: <XCircle size={54} strokeWidth={3} color="#FF3366" />,
      title: "No pudimos confirmar el pago",
      text: "Si crees que es un error, contáctanos y con gusto te ayudamos.",
      bg: "#FFE5EC",
    },
  }[state];

  return (
    <div className="dot-grid flex min-h-screen items-center justify-center bg-[#E8DFF5] px-6 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        data-testid="pago-status"
        data-status={state}
        className="w-full max-w-lg rounded-[2rem] border-4 border-[#1A1B41] bg-white p-10 text-center shadow-[10px_10px_0px_#1A1B41]"
      >
        <div
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#1A1B41]"
          style={{ background: content.bg }}
        >
          {content.icon}
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{content.title}</h1>
        <p className="mt-4 text-lg font-semibold text-[#1A1B41]/70">{content.text}</p>
        <button
          onClick={() => navigate("/")}
          data-testid="pago-home-btn"
          className="mt-8 inline-flex items-center gap-2 rounded-full border-4 border-[#1A1B41] bg-[#FFD166] px-6 py-3 font-display font-bold shadow-[4px_4px_0px_#1A1B41] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1B41]"
        >
          <Home strokeWidth={3} size={20} /> Volver al inicio
        </button>
      </motion.div>
    </div>
  );
}
