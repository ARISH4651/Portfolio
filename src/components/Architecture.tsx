import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { systemChain } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * AI ARCHITECTURE — the real systems, becoming operational on scroll.
 * A scrubbed spine draws down the chain USER → API → AGENT → TOOL →
 * RAG → VECTOR → LLM → RESPONSE; each node ignites as the current
 * reaches it, and a status readout flips to SYSTEM OPERATIONAL.
 * Warm editorial mono — no sci-fi HUD.
 */
export default function Architecture() {
  const root = useRef<HTMLElement>(null);
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const spine = root.current!.querySelector(".spine-draw") as SVGPathElement | null;
      if (spine) {
        const len = spine.getTotalLength();
        gsap.set(spine, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(spine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: ".pipe-track", start: "top 72%", end: "bottom 55%", scrub: 1 },
        });
      }
      const n = systemChain.length;
      gsap.utils.toArray<HTMLElement>(".pipe-node").forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0.22 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: ".pipe-track", start: `top ${72 - i * 3}%`, end: `top ${58 - i * 3}%`, scrub: 1 },
          },
        );
        const dot = node.querySelector(".node-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.55 },
            {
              scale: 1.4,
              ease: "none",
              scrollTrigger: { trigger: ".pipe-track", start: `top ${72 - i * 3}%`, end: `top ${58 - i * 3}%`, scrub: 1 },
            },
          );
        }
        void n;
      });
      ScrollTrigger.create({
        trigger: ".pipe-track",
        start: "top 60%",
        end: "bottom 45%",
        onEnter: () => status.current && (status.current.textContent = "● SYSTEM OPERATIONAL"),
        onLeaveBack: () => status.current && (status.current.textContent = "○ ESTABLISHING CONNECTIONS…"),
      });
      gsap.fromTo(
        ".guard-card",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".guard-grid", start: "top 82%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="architecture" className="px-6 py-24 md:px-12 md:py-36 border-t border-[#171717]/10">
      <SectionHeading
        index="03"
        kicker="AI architecture"
        title={<>How the systems <em className="font-light">run.</em></>}
      />
      <p className="mb-10 max-w-xl text-sm leading-relaxed opacity-60">
        The same backbone behind all three featured builds — drawn from the
        actual implementations, not a textbook diagram.
      </p>

      <div className="pipe-track relative mt-4">
        <svg
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-[2px] md:block"
          viewBox="0 0 2 1000"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="1" y1="0" x2="1" y2="1000" stroke="rgba(23,23,23,.15)" strokeWidth="2" />
          <path
            className="spine-draw"
            d="M1,0 L1,1000"
            stroke="#5A7300"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="space-y-2">
          {systemChain.map((s, i) => (
            <li key={s.id} className="pipe-node grid gap-3 py-5 md:grid-cols-12 md:gap-8 md:pl-12">
              <div className="flex items-center gap-4 md:col-span-4">
                <span className="node-dot block h-[15px] w-[15px] shrink-0 rounded-full bg-[#5A7300] md:-ml-12" style={{ willChange: "transform" }} />
                <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                <h3 className="display text-3xl md:text-4xl">{s.label}</h3>
              </div>
              <p className="max-w-md leading-relaxed opacity-70 md:col-span-5">{s.desc}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-40 md:col-span-3 md:text-right">
                {s.side}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-[#5A7300]">
        <span ref={status}>○ Establishing connections…</span>
      </p>

      <div className="guard-grid mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Grounded, not guessing", "RAG answers cite the retrieved context — the hospital bot never improvises medical claims."],
          ["Tools stay bounded", "Agents call named tools with retries and fallbacks; every external call is explicit, never ambient."],
          ["State is deliberate", "Session-based conversation memory in LangGraph — context persists across turns by design, not accident."],
        ].map(([t, d]) => (
          <div key={t} className="guard-card rounded-lg border border-[#171717]/15 p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5A7300]">Operating rule</p>
            <h4 className="display mt-3 text-2xl">{t}</h4>
            <p className="mt-3 text-sm leading-relaxed opacity-70">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
