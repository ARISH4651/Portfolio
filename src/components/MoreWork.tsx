import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { tier2, dashboards, mlProject } from "../data/content";
import { links } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * MORE WORK — Levels 2–3 of the hierarchy: other engineering builds,
 * BI dashboards, and the ML project. Editorial index rows, one shared
 * reveal language, zero cards. Verified stacks only.
 */
export default function MoreWork() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".more-group").forEach((g) => {
        gsap.fromTo(
          g.querySelectorAll(".more-row"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.07,
            scrollTrigger: { trigger: g, start: "top 82%", once: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="more-work" className="px-6 py-24 md:px-12 md:py-36">
      <SectionHeading index="04" kicker="More work" title={<>Beyond the <em className="font-light">headliners.</em></>} />

      {/* Level 2 — engineering */}
      <p className="kicker mb-4 opacity-50">Level 2 — Engineering builds</p>
      <div className="more-group theme-line border-t border-[#171717]/15">
        {tier2.map((p) => (
          <article key={p.index} className="more-row grid gap-3 border-b border-[#171717]/15 py-7 md:grid-cols-12 md:gap-6">
            <span className="font-mono text-xs opacity-50 md:col-span-1">{p.index}</span>
            <div className="md:col-span-4">
              <h3 className="text-[clamp(1.3rem,2.6vw,2rem)] font-bold tracking-tight">{p.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">{p.category}</p>
            </div>
            <p className="max-w-xl text-sm leading-relaxed opacity-70 md:col-span-4">{p.line}</p>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.12em] opacity-60 md:col-span-3 md:text-right">
              {p.stack.join(" · ")}
            </p>
          </article>
        ))}
      </div>

      {/* Level 3 — data + ML */}
      <p className="kicker mb-4 mt-16 opacity-50">Level 3 — Data & machine learning</p>
      <div className="more-group theme-line border-t border-[#171717]/15">
        {dashboards.map((p) => (
          <article key={p.index} className="more-row grid gap-3 border-b border-[#171717]/15 py-7 md:grid-cols-12 md:gap-6">
            <span className="font-mono text-xs opacity-50 md:col-span-1">{p.index}</span>
            <div className="md:col-span-4">
              <h3 className="text-[clamp(1.3rem,2.6vw,2rem)] font-bold tracking-tight">{p.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">{p.category}</p>
            </div>
            <p className="max-w-xl text-sm leading-relaxed opacity-70 md:col-span-4">{p.line}</p>
            <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.12em] opacity-60 md:col-span-3 md:text-right">
              {p.stack.join(" · ")}
            </p>
          </article>
        ))}
        <article className="more-row grid gap-3 border-b border-[#171717]/15 py-7 md:grid-cols-12 md:gap-6">
          <span className="font-mono text-xs opacity-50 md:col-span-1">{mlProject.index}</span>
          <div className="md:col-span-4">
            <h3 className="text-[clamp(1.3rem,2.6vw,2rem)] font-bold tracking-tight">{mlProject.name}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">{mlProject.category} · Appin Technology</p>
          </div>
          <div className="md:col-span-4">
            <p className="max-w-xl text-sm leading-relaxed opacity-70">{mlProject.line}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] opacity-60">
              {mlProject.pipeline.join(" ↓ ")}
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase leading-loose tracking-[0.12em] opacity-60 md:col-span-3 md:text-right">
            {mlProject.stack.join(" · ")}
          </p>
        </article>
      </div>

      <a
        href={links.github}
        target="_blank"
        rel="noreferrer"
        data-cursor="open"
        className="u-link mt-8 inline-block font-mono text-xs uppercase tracking-[0.2em]"
      >
        Source on GitHub ↗
      </a>
    </section>
  );
}
