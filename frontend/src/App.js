import { useEffect } from "react";
import "./App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Catalog from "./components/Catalog";
import Customizer from "./components/Customizer";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WavyDivider from "./components/WavyDivider";
import Ubicaciones from "./components/Ubicaciones";
import PersonalizarPage from "./pages/PersonalizarPage";
import PagoExitosoPage from "./pages/PagoExitosoPage";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <WavyDivider topColor="#E8DFF5" bottomColor="#FAFAFA" />
      <Features />
      <WavyDivider topColor="#FAFAFA" bottomColor="#E0FBFC" />
      <Catalog />
      <WavyDivider topColor="#E0FBFC" bottomColor="#E8DFF5" flip />
      <Customizer />
      <WavyDivider topColor="#E8DFF5" bottomColor="#FAFAFA" />
      <Ubicaciones />
      <WavyDivider topColor="#FAFAFA" bottomColor="#FFE5EC" flip />
      <Contact />
    </main>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              border: "3px solid #1A1B41",
              borderRadius: "9999px",
              fontWeight: 800,
              fontFamily: "Nunito, sans-serif",
              boxShadow: "4px 4px 0px #1A1B41",
            },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personalizar/:id" element={<PersonalizarPage />} />
          <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
