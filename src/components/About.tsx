import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";
import { education, links } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/** About: the real person — KGiSL, AI&DS '27, CGPA 8.3. Single reveal. */
export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-rise",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        },
      );
      gsap.fromTo(
        ".about-visual",
        { clipPath: "inset(12% 8% 12% 8% round 6px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 6px)",
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="px-6 py-24 md:px-12 md:py-36">
      <SectionHeading index="08" kicker="About" title={<>Engineer, <em className="font-light">not demo-maker.</em></>} />
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="about-visual work-visual aspect-[3/4] w-full bg-[#151515]" data-cursor="explore">
            <div className="glow h-60 w-60 bg-[#C8F31D]/50" style={{ left: "20%", top: "10%" }} />
            <div className="grid-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="display text-[7rem] text-[#F1EEE7]">A</span>
              <span className="display text-[7rem] italic text-[#C8F31D]">K</span>
            </div>
            <p className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] text-white/70">
              {education.school} — ’27
            </p>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="about-rise max-w-2xl text-[clamp(1.1rem,1.8vw,1.45rem)] leading-snug">
            I'm Arish K — a B.Tech AI & Data Science student building{" "}
            <em className="display">Python APIs, LLM applications,</em>{" "}
            agents, and RAG systems.
          </p>

          <p className="about-rise mt-6 max-w-2xl leading-relaxed opacity-70">
            I build with Python, FastAPI, SQL, and modern AI tooling, with a
            focus on RAG applications, LLM-powered agents, and backend systems.
            My work spans machine learning, generative AI, data, and software
            development — from learning builds to larger applications involving
            retrieval, APIs, databases, and deployment. I'm interested in
            understanding how these systems work end-to-end and turning them
            into software people can actually use.
          </p>
          <ol className="about-rise theme-line mt-10 divide-y divide-[#171717]/15 border-y border-[#171717]/15 font-mono text-xs">
            <li className="flex items-baseline justify-between gap-6 py-4">
              <span className="uppercase tracking-[0.2em] opacity-50">Now</span>
              <span className="text-right text-sm normal-case tracking-normal">AI Engineer — RAG systems, agents, backends</span>
            </li>
            <li className="flex items-baseline justify-between gap-6 py-4">
              <span className="uppercase tracking-[0.2em] opacity-50">2025</span>
              <span className="text-right text-sm normal-case tracking-normal">Data Science Intern — Appin Technology (Remote)</span>
            </li>
            <li className="flex items-baseline justify-between gap-6 py-4">
              <span className="uppercase tracking-[0.2em] opacity-50">2023–27</span>
              <span className="text-right text-sm normal-case tracking-normal">{education.school} — {education.degree}, {education.detail}</span>
            </li>
          </ol>
          <div className="about-rise mt-10 flex flex-wrap gap-4">
            <Magnetic href="#contact" strength={0.3}>
              <span
                data-cursor="contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#151515] px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#F1EEE7]"
              >
                Get in touch
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
            </Magnetic>
            <Magnetic href={links.github} strength={0.3}>
              <span
                data-cursor="open"
                className="inline-flex items-center gap-3 rounded-full border border-[#171717]/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em]"
              >
                GitHub ↗
              </span>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
