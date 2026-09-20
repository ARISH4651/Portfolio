import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * CURSOR — minimal outlined circle only.
 *   • ~22 px diameter, thin white/light-gray border, transparent interior
 *   • Follows the mouse with a slight GSAP lag for smoothness
 *   • No label, no text, no size changes on hover
 *   • Disabled on touch / coarse-pointer devices (mobile)
 *   • Native cursor hidden only when this component is active (cursor-live class)
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = ring.current!;
    document.body.classList.add("cursor-live");

    // Start off-screen
    gsap.set(r, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // Slight lag for a smooth, restrained follow
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "expo.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "expo.out" });

    const move = (e: MouseEvent) => {
      rx(e.clientX);
      ry(e.clientY);
    };

    // Subtle press feedback
    const down = () =>
      gsap.to(r, { scale: 0.8, duration: 0.15, overwrite: "auto" });
    const up = () =>
      gsap.to(r, { scale: 1, duration: 0.25, overwrite: "auto" });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.body.classList.remove("cursor-live");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <div
      ref={ring}
      id="cursor-ring"
      aria-hidden
      style={{
        width: 22,
        height: 22,
        border: "1.5px solid rgba(255,255,255,0.75)",
        borderRadius: "50%",
        backgroundColor: "transparent",
      }}
    />
  );
}
