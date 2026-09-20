import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  onReveal: () => void;
  onGone: () => void;
};

const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("ak_loaded_v1");
const MIN_TIME = hasVisited ? 500 : 850;
const MAX_TIME = hasVisited ? 900 : 1350;

/**
 * Minimal editorial preloader: centered 00→100% counter only.
 * All surrounding text (wordmark, role, status, meta) removed.
 * Wipe transition reveals the waiting hero unchanged.
 */
export default function Preloader({ onReveal, onGone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const cbs = useRef({ onReveal, onGone });
  useEffect(() => {
    cbs.current = { onReveal, onGone };
  }, [onReveal, onGone]);

  useEffect(() => {
    const el = root.current;
    if (!el) {
      cbs.current.onReveal();
      cbs.current.onGone();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cbs.current.onReveal();
      cbs.current.onGone();
      return;
    }

    let dead = false;
    const started = performance.now();
    const counter = { v: 0 };

    const assetsReady = Promise.race([
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        new Promise((r) => setTimeout(r, MIN_TIME)),
      ]),
      new Promise((r) => setTimeout(r, MAX_TIME)),
    ]);

    const ctx = gsap.context(() => {
      // Fade in the counter on mount
      gsap.fromTo(
        ".pre-count",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "expo.out", delay: 0.1 },
      );

      // Smooth 00→100 across the asset wait
      const elapsed = () => performance.now() - started;
      const tickProgress = gsap.ticker.add(() => {
        if (dead) return;
        const target = Math.min(100, (elapsed() / 1300) * 100);
        if (target > counter.v) {
          counter.v = target;
          setCount(Math.floor(counter.v));
        }
      });

      assetsReady.then(() => {
        if (dead) return;
        gsap.ticker.remove(tickProgress);
        // Finish the count crisply, then hand off
        gsap.to(counter, {
          v: 100,
          duration: 0.35,
          ease: "expo.out",
          onUpdate: () => {
            setCount(Math.floor(counter.v));
          },
          onComplete: () => {
            try { sessionStorage.setItem("ak_loaded_v1", "1"); } catch (_) {}
            const exit = gsap.timeline({
              onComplete: () => {
                cbs.current.onGone();
              },
            });
            // Counter fades + shifts up, then panel wipes away
            exit
              .to(".pre-count", {
                opacity: 0,
                y: -14,
                duration: 0.4,
                ease: "expo.in",
              })
              .add(() => cbs.current.onReveal(), "-=0.2")
              .to(el, {
                yPercent: -100,
                duration: 1,
                ease: "expo.inOut",
              });
          },
        });
      });
    }, root);

    return () => {
      dead = true;
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[150] bg-[#151515] text-[#F1EEE7]"
      aria-hidden
    >
      {/* Single centered percentage — nothing else */}
      <span
        className="pre-count absolute font-mono font-light tabular-nums text-[clamp(3rem,10vw,7rem)]"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        {String(count).padStart(2, "0")}
        <span className="text-[0.4em] opacity-50">%</span>
      </span>
    </div>
  );
}
