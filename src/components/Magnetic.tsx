import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  label?: string;
};

/** Level-1 micro interaction: element gravitates toward the cursor, springs back on leave. */
export default function Magnetic({ children, className, strength = 0.35, href, onClick, label }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "expo.out" });
    let rect = el.getBoundingClientRect();
    const refreshRect = () => {
      rect = el.getBoundingClientRect();
    };
    const enter = () => refreshRect();
    const move = (e: Event) => {
      const me = e as MouseEvent;
      xTo((me.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((me.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  const cls = `inline-flex items-center gap-2 ${className ?? ""}`;
  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={cls} aria-label={label}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} className={cls} aria-label={label}>
      {children}
    </button>
  );
}
