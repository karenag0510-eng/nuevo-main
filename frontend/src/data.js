import { Rocket, Star, Cat, Heart, Crown, Zap, Flower2, Ghost } from "lucide-react";

// Product catalog — fotos reales Orto Ook
export const PRODUCTS = [
  {
    id: "rosa-nube",
    name: "Rosa Nube",
    tagline: "Blanco con franjas holográficas rosa",
    price: 799,
    color: "#FFE5EC",
    img: "https://customer-assets-cm19k8pv.emergentagent.net/job_healthy-steps-kids/artifacts/s30v03i7_Image%20%284%29.jfif",
    tag: "Más vendido",
  },
  {
    id: "estrella-plata",
    name: "Estrella Plata",
    tagline: "Blanco con franjas glitter plata",
    price: 799,
    color: "#E8DFF5",
    img: "https://customer-assets-cm19k8pv.emergentagent.net/job_healthy-steps-kids/artifacts/285qx0nq_Image%20%283%29.jfif",
    tag: "Brillante",
  },
  {
    id: "racing-rojo",
    name: "Racing Rojo",
    tagline: "Negro deportivo con franjas rojas",
    price: 749,
    color: "#E0FBFC",
    img: "https://customer-assets-cm19k8pv.emergentagent.net/job_healthy-steps-kids/artifacts/mbs6gyp2_Image%20%285%29.jfif",
    tag: "Deportivo",
  },
  {
    id: "super-arana",
    name: "Súper Araña",
    tagline: "Estilo héroe negro y rojo",
    price: 829,
    color: "#FFE0E0",
    img: "https://customer-assets-cm19k8pv.emergentagent.net/job_healthy-steps-kids/artifacts/dw6xm70g_Image%20%287%29.jfif",
    tag: "Favorito niños",
  },
  {
    id: "clasico-escolar",
    name: "Clásico Escolar",
    tagline: "Bota de piel con hebilla y soporte firme",
    price: 859,
    color: "#FDE9C8",
    img: "https://customer-assets-cm19k8pv.emergentagent.net/job_healthy-steps-kids/artifacts/ljmuk5z7_Image%20%286%29.jfif",
    tag: "Escolar",
  },
];

export const HERO_IMG = `${process.env.PUBLIC_URL || ""}/tenis-bota.png`;

export const PREVIEW_IMG = `${process.env.PUBLIC_URL || ""}/tenis-bota.png`;

export const MANIFESTO_IMG =
  "https://images.unsplash.com/photo-1637195789209-817e404c468c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwcnVubmluZyUyMG91dGRvb3JzfGVufDB8fHx8MTc4NDI0NDI2M3ww&ixlib=rb-4.1.0&q=85";

// Customizer options
export const MODELOS = ["Rosa Nube", "Estrella Plata", "Racing Rojo", "Súper Araña", "Clásico Escolar"];

export const COLORES = [
  { name: "Rosa Chicle", value: "#FF3366" },
  { name: "Turquesa", value: "#00C2D1" },
  { name: "Amarillo Sol", value: "#FFD166" },
  { name: "Verde Menta", value: "#06D6A0" },
  { name: "Morado Uva", value: "#8B5CF6" },
  { name: "Azul Cielo", value: "#3B82F6" },
  { name: "Naranja", value: "#FB923C" },
  { name: "Blanco Nube", value: "#F5F5F5" },
];

export const SUELAS = [
  { name: "Blanco", value: "#FFFFFF" },
  { name: "Crema", value: "#FDE9C8" },
  { name: "Rosa", value: "#FF9EC0" },
  { name: "Menta", value: "#9BE7D0" },
  { name: "Gris", value: "#C9CBD6" },
];

export const ACENTOS = [
  { name: "Azul Orto Ook", value: "#1B75D0" },
  { name: "Verde Orto Ook", value: "#4AAE3B" },
  { name: "Negro", value: "#1A1B41" },
  { name: "Rosa Chicle", value: "#FF3366" },
  { name: "Amarillo Sol", value: "#FFD166" },
  { name: "Blanco", value: "#F5F5F5" },
];

export const PERSONAJES = [
  { name: "Cohete", icon: Rocket, color: "#FF3366" },
  { name: "Estrella", icon: Star, color: "#FFD166" },
  { name: "Gatito", icon: Cat, color: "#8B5CF6" },
  { name: "Corazón", icon: Heart, color: "#FF3366" },
  { name: "Corona", icon: Crown, color: "#FFD166" },
  { name: "Rayo", icon: Zap, color: "#00C2D1" },
  { name: "Flor", icon: Flower2, color: "#06D6A0" },
  { name: "Fantasma", icon: Ghost, color: "#3B82F6" },
];

export const TALLAS = ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"];
