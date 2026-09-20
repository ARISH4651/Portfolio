import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";
import { education, links } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const focusAreas = [
  {
    n: "01",
    title: "Generative AI & RAG",
    desc: "Production RAG pipelines with semantic chunking, dense embeddings, vector retrieval (FAISS / ChromaDB), and verifiable source grounding.",
    stack: "LangChain · LangGraph · Pydantic AI · Groq · Ollama",
  },
  {
    n: "02",
    title: "Autonomous AI Agents",
    desc: "Bounded multi-turn agent systems with live tool integration (Tavily search), dynamic intent routing, and checkpointed session memory.",
    stack: "Pydantic AI · LangGraph · Multi-Agent OS · Tools",
  },
  {
    n: "03",
    title: "Backend & Systems",
    desc: "Asynchronous APIs, real-time WebSocket messaging, persistent storage, and containerized deployments built for resilient production load.",
    stack: "Python · FastAPI · PostgreSQL · Redis · Docker",
  },
  {
    n: "04",
    title: "ML & Data Science",
    desc: "Supervised ML, regression, feature engineering, and cross-validation pipelines practiced on real enterprise datasets.",
    stack: "Scikit-learn · XGBoost · Pandas · Power BI",
  },
];

/**
 * 02 — PROFILE / ABOUT
 * Editorial floating monochrome portrait composition.
 * Sits directly on the cream page background with organic feathering.
 * Zero cards, zero borders, zero boxes.
 */
export default function Profile() {
  const root = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) return;

    const ctx = gsap.context(() => {
      // Editorial content rise
      gsap.fromTo(
        ".profile-rise",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      // Portrait entrance
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { y: 45, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              once: true,
            },
          },
        );

        // Subtle scroll-driven parallax
        gsap.to(portraitRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Smooth cursor parallax on fine pointers
      const fine = window.matchMedia("(pointer: fine)").matches;
      const section = root.current;

      if (fine && section && portraitRef.current && imgRef.current) {
        const xTo = gsap.quickTo(portraitRef.current, "x", {
          duration: 0.9,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(portraitRef.current, "y", {
          duration: 0.9,
          ease: "power3.out",
        });

        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();

          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;

          xTo(nx * 14);
          yTo(ny * 10);

          if (imgRef.current) {
            gsap.to(imgRef.current, {
              scale: 1.015,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);

          if (imgRef.current) {
            gsap.to(imgRef.current, {
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        section.addEventListener("mousemove", onMove, { passive: true });
        section.addEventListener("mouseleave", onLeave);

        return () => {
          section.removeEventListener("mousemove", onMove);
          section.removeEventListener("mouseleave", onLeave);
        };
      }
    }, root);

    return () => ctx.revert();
  }, []);

  // Gmail compose URL
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    links.email,
  )}`;

  return (
    <section
      ref={root}
      id="about"
      className="relative overflow-hidden px-6 pt-14 pb-20 md:px-12 md:pt-20 md:pb-28"
    >
      <SectionHeading
        index="02"
        kicker="Profile / About"
        title={
          <>
            AI / ML{" "}
            <em className="display font-normal italic">Engineer.</em>
          </>
        }
      />

      {/* Asymmetric Editorial Composition */}
      <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left / Center: Large Floating Monochrome Portrait */}
        <div className="flex justify-center lg:col-span-5 lg:justify-start">
          <div
            ref={portraitRef}
            className="relative w-full max-w-[380px] select-none will-change-transform sm:max-w-[420px] lg:max-w-[460px]"
            data-cursor="explore"
          >
            {/* Ambient editorial technical watermark behind portrait */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-6 -left-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#171717]/25"
            >
              SYS.ID // ARISH_K_’27
            </div>

            {/* Floating Portrait Image */}
            <div
              className="relative w-full overflow-visible"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 72%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 72%, transparent 100%)",
              }}
            >
              <img
                ref={imgRef}
                src="/portrait_nobg.png"
                alt="Arish K — AI & Data Science Engineer"
                className="relative block h-auto w-full object-contain object-bottom filter contrast-[1.08] brightness-[0.98] transition-transform will-change-transform"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Specific Profile Content */}
        <div className="lg:col-span-7 lg:pl-6">
          <div className="profile-rise">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#5A7300]">
              Identity &amp; Focus
            </p>

            <h3 className="mt-3 text-[clamp(1.5rem,2.7vw,2.4rem)] font-bold leading-tight tracking-tight text-[#151515]">
              AI &amp; Data Science undergraduate building{" "}
              <em className="display font-normal italic">
                Python APIs, LLM applications,
              </em>{" "}
              agents, and RAG systems that actually ship.
            </h3>
          </div>

          <div className="profile-rise mt-6 space-y-4 text-[0.98rem] leading-relaxed text-[#171717]/85">
            <p>
              I am <strong>Arish K</strong>, pursuing my B.Tech in Artificial
              Intelligence and Data Science at{" "}
              <strong>{education.school}</strong> (2023–2027, CGPA 8.3). I work
              mainly with Python, backend development, and generative AI,
              building things like RAG applications, AI agents, APIs, and
              machine learning projects.
            </p>

            <p>
              I have worked on <strong>40+ learning builds</strong> across AI,
              machine learning, data, and software development. Most of my
              projects are about learning how these technologies work in
              practice — connecting models with APIs, databases, retrieval
              systems, and application logic to build something usable.
            </p>
          </div>

          {/* Academic & Experience Spec Strip */}
          <div className="profile-rise mt-8 border-y border-[#171717]/15 py-4 font-mono text-xs">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="kicker text-[10px] opacity-50">
                  ACADEMIC CREDENTIAL
                </span>

                <p className="mt-1 font-semibold text-[#151515]">
                  {education.degree}
                </p>

                <p className="opacity-65">
                  {education.school} · {education.period}
                </p>
              </div>

              <div>
                <span className="kicker text-[10px] opacity-50">
                  INDUSTRY EXPERIENCE
                </span>

                <p className="mt-1 font-semibold text-[#151515]">
                  Data Science Intern
                </p>

                <p className="opacity-65">
                  Appin Technology · June 2025 – July 2025
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="profile-rise mt-8 flex flex-wrap items-center gap-4">
            <Magnetic href="#work" strength={0.3}>
              <span
                data-cursor="view"
                className="group inline-flex items-center gap-3 rounded-full bg-[#151515] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#F1EEE7] transition-colors duration-300 hover:bg-[#222]"
              >
                View selected work

                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </span>
            </Magnetic>

            {/* Gmail Contact Button */}
            <Magnetic href={gmailUrl} strength={0.3}>
              <span
                data-cursor="contact"
                className="inline-flex items-center gap-3 rounded-full border border-[#171717]/25 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#171717] transition-colors duration-300 hover:bg-[#171717] hover:text-[#F1EEE7]"
              >
                Get in touch ↗
              </span>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Core Engineering Domains */}
      <div className="mt-20 border-t border-[#171717]/15 pt-10">
        <p className="kicker mb-8 opacity-50">
          CORE CAPABILITIES &amp; ENGINEERING DOMAINS
        </p>

        <div className="divide-y divide-[#171717]/10">
          {focusAreas.map((f) => (
            <div
              key={f.n}
              className="profile-rise group grid gap-4 py-6 transition-all duration-300 hover:pl-2 md:grid-cols-12 md:items-baseline"
            >
              <div className="flex items-center gap-3 md:col-span-1">
                <span className="font-mono text-xs font-semibold text-[#5A7300]">
                  {f.n}
                </span>
              </div>

              <div className="md:col-span-4">
                <h4 className="display text-[clamp(1.3rem,2vw,1.75rem)] font-medium tracking-tight text-[#151515] transition-colors duration-300 group-hover:text-[#5A7300]">
                  {f.title}
                </h4>
              </div>

              <p className="text-sm leading-relaxed text-[#171717] opacity-75 md:col-span-4">
                {f.desc}
              </p>

              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5A7300] opacity-80 md:col-span-3 md:text-right">
                {f.stack}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}