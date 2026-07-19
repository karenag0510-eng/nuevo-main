import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import Logo from "./Logo";

export const Footer = () => {
  return (
    <footer className="border-t-4 border-[#1A1B41] bg-[#1A1B41] px-6 py-12 text-white" data-testid="footer">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="rounded-2xl bg-white px-4 py-2">
          <Logo size={30} />
        </div>

        <p className="text-center font-semibold text-white/70">
          Camina con estilo, comodidad y salud. Diseñados para pie plano y mala
          pisada.
        </p>

        <div className="flex gap-3">
          <a
            href="https://wa.me/523344621544"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            data-testid="social-whatsapp"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white transition-colors hover:bg-[#4AAE3B]"
          >
            <MessageCircle strokeWidth={2.5} size={20} />
          </a>
          <a
            href="#inicio"
            aria-label="Instagram"
            data-testid="social-instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white transition-colors hover:bg-[#FF3366]"
          >
            <Instagram strokeWidth={2.5} size={20} />
          </a>
          <a
            href="#inicio"
            aria-label="Facebook"
            data-testid="social-facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white transition-colors hover:bg-[#1B75D0]"
          >
            <Facebook strokeWidth={2.5} size={20} />
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-sm font-semibold text-white/50">
        © {new Date().getFullYear()} Orto Ook. Todos los derechos reservados. · Zapopan · Guadalajara
      </p>
    </footer>
  );
};

export default Footer;
