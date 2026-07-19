import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Customizer from "../components/Customizer";
import { PRODUCTS } from "../data";

export default function PersonalizarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) navigate("/");
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#E8DFF5] pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/#productos")}
          data-testid="back-to-catalog"
          className="mb-2 mt-2 flex items-center gap-2 rounded-full border-4 border-[#1A1B41] bg-white px-5 py-2.5 font-display font-bold shadow-[4px_4px_0px_#1A1B41] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1B41]"
        >
          <ArrowLeft strokeWidth={3} size={20} /> Volver al catálogo
        </motion.button>
      </div>
      <Customizer product={product} />
    </div>
  );
}
