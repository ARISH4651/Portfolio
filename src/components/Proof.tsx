import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { experience, certifications, education } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const keyMetrics = [
  { value: 320, label: "LeetCode Solved", sub: "Contest Rating 1440" },
  { value: 1000, label: "CodeChef Problems", sub: "Contest Rating 1160" },
  { value: 40, label: "Learning Builds", sub: "Public Git Repositories" },
  { value: 10, label: "Production Systems", sub: "RAG, Agents & Backends" },
];

/**
 * 06 — PROOF
 * Editorial evidence layout: no cards, just strong numbers + thin dividers.
 * Tighter vertical rhythm, information-first.
 */
export default function Proof() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proof-rise",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        },
      );

      // Number count-up
      gsap.utils.toArray<HTMLElement>(".count-num").forEach((el) => {
        const target = Number(el.dataset.count ?? "0");
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.v).toLocaleString("en-IN")}+`;
              },
            });
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="proof" className="px-6 py-14 md:px-12 md:py-20 border-t border-[#171717]/10">
      <SectionHeading
        index="06"
        kicker="Proof & Evidence"
        title={
          <>
            EVIDENCE, <em className="display font-normal italic">not claims.</em>
          </>
        }
      />

      {/* Metrics — editorial large numbers, no card shells */}
      <div className="proof-rise mb-12">
        <p className="kicker opacity-40 mb-6 text-[10px]">COMPETITIVE &amp; BUILD METRICS</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-0 border-t border-[#171717]/15 md:grid-cols-4">
          {keyMetrics.map((s, i) => (
            <div
              key={s.label}
              className={`py-7 ${i < keyMetrics.length - 1 ? "md:border-r md:border-[#171717]/15" : ""} md:px-6 first:md:pl-0`}
            >
              <p
                className="count-num sans-black text-[clamp(2.6rem,5vw,4rem)] font-bold tabular-nums text-[#151515]"
                data-count={s.value}
              >
                {s.value}+
              </p>
              <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#171717]">
                {s.label}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-45 mt-0.5">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience + Credentials — two column editorial layout */}
      <div className="grid gap-12 border-t border-[#171717]/15 pt-10 md:grid-cols-2 lg:grid-cols-12">

        {/* Experience */}
        <div className="proof-rise lg:col-span-5">
          <p className="kicker opacity-40 text-[10px] mb-4">VERIFIED EXPERIENCE</p>
          <h3 className="text-xl font-bold tracking-tight text-[#151515]">{experience.company}</h3>
          <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.16em] text-[#5A7300]">
            {experience.role}
          </p>
          <p className="font-mono text-[11px] opacity-50 mt-0.5">{experience.period}</p>

          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#171717]/85">
            {experience.bullets.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span className="text-[#5A7300] font-bold shrink-0">→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications + Education */}
        <div className="proof-rise lg:col-span-4 lg:col-start-7 space-y-8">
          <div>
            <p className="kicker opacity-40 text-[10px] mb-4">CERTIFICATIONS</p>
            <div className="divide-y divide-[#171717]/10">
              {certifications.map((c) => (
                <div key={c.name} className="py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A7300] font-semibold">{c.org}</p>
                  <p className="mt-1 font-medium text-sm text-[#151515]">{c.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="kicker opacity-40 text-[10px] mb-4">ACADEMIC DEGREE</p>
            <p className="font-mono text-xs font-semibold text-[#151515]">{education.school}</p>
            <p className="font-mono text-[11px] opacity-70 mt-0.5">{education.degree}</p>
            <p className="font-mono text-[10px] opacity-50 mt-1">{education.period} · {education.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
