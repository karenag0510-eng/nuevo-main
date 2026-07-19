import confetti from "canvas-confetti";

const COLORS = ["#FF3366", "#FFD166", "#06D6A0", "#00C2D1", "#8B5CF6"];

export const popConfetti = () => {
  const burst = (opts) =>
    confetti({ colors: COLORS, disableForReducedMotion: true, ...opts });
  burst({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  setTimeout(() => burst({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 } }), 150);
  setTimeout(() => burst({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 } }), 300);
};
