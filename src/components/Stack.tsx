import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { stackGroups } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * 04 — TOOLKIT (System / Capabilities Map)
 * Uses the same editorial list language as the Learning Archive.
 * Subtle hover movement and technical grouping.
 */
export default function Stack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-row",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".stack-list", start: "top 82%", once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="system" className="px-6 py-20 md:px-12 md:py-28 border-t border-[#171717]/10">
      <SectionHeading
        index="04"
        kicker="System / Capabilities"
        title={
          <>
            ENGINEERING <em className="display font-normal italic">system map.</em>
          </>
        }
      />
      <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed opacity-65 md:-mt-8">
        Organized by functional system layer. Every framework, model, and database listed below
        is verified in an active build on this portfolio.
      </p>

      <div className="stack-list theme-line border-t border-[#171717]/15">
        {stackGroups.map((g, i) => (
          <div
            key={g.label}
            className="stack-row group grid grid-cols-12 items-baseline gap-4 border-b border-[#171717]/15 py-6 md:py-7 transition-[background-color,padding] duration-300 hover:bg-black/[0.02] hover:pl-2"
          >
            <div className="col-span-12 md:col-span-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#5A7300] font-semibold">0{i + 1}</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                // {g.label}
              </span>
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-wrap items-center gap-2.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[#171717]/15 bg-white/50 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#151515] transition-[background-color,border-color,color] duration-200 group-hover:border-[#171717]/35 hover:bg-[#151515] hover:text-[#C8F31D]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
