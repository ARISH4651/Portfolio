import { useEffect, useState } from "react";

/** True when the OS requests reduced motion. Components must simplify/disable motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** True on touch / coarse-pointer devices: no custom cursor, no pin, simplified motion. */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const onChange = () => setCoarse(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return coarse;
}

/**
 * Shared scroll-velocity bus (written by the Lenis loop in App, read by
 * Hero + SelectedWork through rAF lerp). Mutable ref-style singleton so
 * high-frequency updates never trigger React renders.
 */
export const velocityBus = {
  /** signed scroll velocity, roughly px/frame */
  value: 0,
  /** smoothed absolute intensity 0..1 */
  intensity: 0,
};

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
