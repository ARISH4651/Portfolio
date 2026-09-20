import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Tier1Project } from "../data/content";
import { clamp, velocityBus } from "../lib/motion";
import { isReducedMotion } from "../lib/scramble";

gsap.registerPlugin(ScrollTrigger);

/**
 * Authentic Technical Diagram Component for each of the 6 Major Projects.
 * Replaces generic rectangles with genuine architectural and execution representations.
 */
function ProjectDiagram({ project }: { project: Tier1Project }) {
  const p = project;

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[460px] rounded-lg border border-white/15 bg-[#0e0e0e] overflow-hidden flex flex-col justify-between p-5 md:p-7 shadow-2xl select-none">
      {/* Cinematic project image — absolute background layer */}
      {p.image && (
        <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
          <img
            src={p.image}
            alt={`${p.titleA} ${p.titleB} visual`}
            className="w-full h-full object-cover object-center opacity-30"
            loading="lazy"
            decoding="async"
          />
          {/* Gradient overlay: dark edges + bottom fade for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(14,14,14,0.82) 0%, rgba(14,14,14,0.55) 50%, rgba(14,14,14,0.80) 100%)",
            }}
          />
        </div>
      )}
      {/* Background ambient lighting and blueprint grid */}
      <div
        className="glow absolute -top-12 -right-12 h-64 w-64 rounded-full opacity-35 blur-3xl pointer-events-none z-[1]"
        style={{ background: p.accent }}
      />
      <div className="grid-overlay opacity-60 pointer-events-none z-[1]" />

      {/* Terminal Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: p.accent }} />
          <span className="font-semibold text-white/90">SYS.{p.index} // {p.titleA}_{p.titleB}</span>
        </div>
        <span className="opacity-50 uppercase">{p.role}</span>
      </div>

      {/* Project-Specific Authentic Blueprint UI */}
      <div className="relative z-10 my-auto py-4">
        {p.index === "01" && (
          /* Healthcare RAG System */
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between rounded border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-[11px]">
              <span className="text-white/80">📄 CORPUS: KG_Hospital_Clinical_Records.pdf</span>
              <span className="text-[#C8F31D] text-[10px] font-semibold">INGESTION OK</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="rounded border border-white/10 bg-white/[0.02] p-2.5">
                <span className="block opacity-50 text-[9px]">CHUNKING</span>
                <span className="mt-1 block font-semibold text-white/90">512 Tokens · 10% Ovlp</span>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.02] p-2.5">
                <span className="block opacity-50 text-[9px]">EMBEDDINGS</span>
                <span className="mt-1 block font-semibold text-white/90">HuggingFace Dense</span>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.02] p-2.5">
                <span className="block opacity-50 text-[9px]">VECTOR STORE</span>
                <span className="mt-1 block font-semibold text-[#C8F31D]">FAISS / ChromaDB</span>
              </div>
            </div>

            <div className="rounded border border-[#C8F31D]/30 bg-[#C8F31D]/[0.05] p-3.5 text-[11px]">
              <div className="flex items-center justify-between text-[10px] text-[#C8F31D]">
                <span>TOP-K RETRIEVAL // COSINE MATCH: 0.948</span>
                <span>HALLUCINATION GUARD: PASSED</span>
              </div>
              <p className="mt-2 text-white/90 font-sans text-xs leading-relaxed">
                "Clinical query grounded directly in verified hospital protocols without model hallucinations."
              </p>
              <span className="mt-2.5 block text-[9px] text-white/50 border-t border-white/10 pt-2">
                AUDIT TELEMETRY: Stored in Firebase · AWS Production Cluster
              </span>
            </div>
          </div>
        )}

        {p.index === "02" && (
          /* Pydantic AI Search Agent */
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded border border-white/10 bg-white/[0.03] p-3.5">
              <div className="flex items-center justify-between text-[10px] opacity-60">
                <span>AGENT_LOOP_CONTROLLER</span>
                <span className="text-[#8FD8FF] font-semibold">PYDANTIC_AI</span>
              </div>
              <p className="mt-1.5 font-sans text-xs text-white/90">
                PROMPT: "Synthesize latest real-world agent orchestration benchmarks"
              </p>
            </div>

            <div className="rounded border border-[#8FD8FF]/30 bg-[#8FD8FF]/[0.05] p-3.5">
              <div className="flex items-center gap-2 text-[10px] text-[#8FD8FF]">
                <span className="inline-block animate-pulse">●</span>
                <span>TOOL DISPATCH: tavily_search(depth="advanced")</span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-[10px] opacity-85">
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span>→ arxiv.org/abs/2408.xxxxx</span>
                  <span className="text-[#8FD8FF]">TOP-1 MATCH (0.92)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>→ pydantic.dev/ai/agents</span>
                  <span className="text-white/60">VERIFIED DOC</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded border border-white/10 bg-white/[0.02] px-3.5 py-2 text-[10px]">
              <span className="text-white/70">GROQ LLAMA 3.1 70B: 340 TOK/S</span>
              <span className="text-[#8FD8FF] font-semibold">SCHEMA VALIDATED</span>
            </div>
          </div>
        )}

        {p.index === "03" && (
          /* LangChain + Groq Chat Assistant */
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded border border-white/10 bg-white/[0.03] p-3.5">
              <span className="block text-[10px] text-[#FFB86B] font-semibold">LANGGRAPH // STATE_GRAPH_COMPILED</span>
              <div className="mt-2.5 flex items-center justify-between text-[11px]">
                <span className="rounded bg-white/10 px-2.5 py-1">Input</span>
                <span className="text-[#FFB86B]">→</span>
                <span className="rounded bg-white/10 px-2.5 py-1">Session Buffer</span>
                <span className="text-[#FFB86B]">→</span>
                <span className="rounded bg-white/10 px-2.5 py-1">Router</span>
                <span className="text-[#FFB86B]">→</span>
                <span className="rounded bg-[#FFB86B]/20 text-[#FFB86B] px-2.5 py-1 font-semibold">Groq 120B</span>
              </div>
            </div>

            <div className="rounded border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="opacity-60">SESSION MEMORY BUFFER</span>
                <span className="text-white/80">Turn 05 / Active</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-[#FFB86B] rounded-full" />
              </div>
              <div className="flex justify-between text-[9px] opacity-50">
                <span>Context Window: 6,144 / 8,192 tokens</span>
                <span>Checkpoints: Persisted</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded border border-[#FFB86B]/30 bg-[#FFB86B]/[0.05] px-3.5 py-2 text-[10px]">
              <span className="text-[#FFB86B] font-semibold">GROQ GPT-OSS 120B ENGINE</span>
              <span className="text-white/80">TTFT: 135ms · 380 Tok/s</span>
            </div>
          </div>
        )}


        {p.index === "04" && (
          /* Desktop Assistant Astra */
          <div className="space-y-3 font-mono text-xs">
            <div className="rounded border border-white/10 bg-white/[0.03] p-3.5">
              <div className="flex items-center justify-between text-[10px] text-[#F472B6]">
                <span>PYSIDE6 DESKTOP CORE</span>
                <span>LOCAL-FIRST // PRIVACY 100%</span>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 py-1">
                <span className="h-2 w-1 bg-[#F472B6] rounded-full" />
                <span className="h-4 w-1 bg-[#F472B6] rounded-full" />
                <span className="h-6 w-1 bg-[#F472B6] rounded-full" />
                <span className="h-3 w-1 bg-[#F472B6] rounded-full" />
                <span className="h-5 w-1 bg-[#F472B6] rounded-full" />
                <span className="h-2 w-1 bg-[#F472B6] rounded-full" />
                <span className="ml-2 font-mono text-[10px] text-white/90">Offline Voice &amp; Intent Parser</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="rounded border border-white/10 bg-white/[0.02] p-2.5">
                <span className="block opacity-50 text-[9px]">FILE INDEXER</span>
                <span className="mt-1 block font-semibold text-white/90">SQLite Indexed (14k files)</span>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.02] p-2.5">
                <span className="block opacity-50 text-[9px]">AUTOMATION ENGINE</span>
                <span className="mt-1 block font-semibold text-[#F472B6]">Local Shell Actions</span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded border border-white/10 bg-white/[0.02] px-3.5 py-2 text-[10px]">
              <span className="text-white/70">CLOUD DEPENDENCY: ZERO</span>
              <span className="text-[#F472B6] font-semibold">MODULAR 3-TIER ARCH</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer architecture flow strip */}
      <div className="relative z-10 border-t border-white/10 pt-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-50">
          ARCHITECTURE PIPELINE
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-white/90">
          {p.architecture.map((a, k) => (
            <span key={a} className="flex items-center gap-1.5">
              <span className="rounded bg-white/10 px-2 py-0.5">{a}</span>
              {k < p.architecture.length - 1 && <span style={{ color: p.accent }}>→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 03 — SELECTED WORK
 * Centerpiece of the portfolio featuring 6 major engineering projects.
 * Driven by GSAP ScrollTrigger horizontal pinning on desktop with scrubbed parallax,
 * and elegant vertical cards on mobile.
 */
export default function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();

    // ---- Mobile / Reduced Motion: Vertical Scenes ----
    mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
      const ctx = gsap.context(() => {
        if (isReducedMotion()) return;
        gsap.utils.toArray<HTMLElement>(".stack-card").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 38, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            },
          );
        });
      }, root);
      return () => ctx.revert();
    });

    // ---- Desktop: Pinned Horizontal Showcase ----
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const track = root.current!.querySelector(".h-track") as HTMLElement;
        const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        let active = 0;
        const N = projects.length; // 4

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".work-scroll",
            start: "top top",
            // Each of the 4 projects gets 85vh of scroll distance → 340vh total
            end: `+=${N * 85}%`,
            scrub: 1.2,
            pin: ".work-pin",
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = Math.min(N - 1, Math.floor(p * N));

              if (counter.current) {
                const label = `${String(idx + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
                if (counter.current.textContent !== label) {
                  counter.current.textContent = label;
                  gsap.fromTo(
                    counter.current,
                    { yPercent: 40, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 0.3, ease: "expo.out", overwrite: "auto" },
                  );
                }
              }

              if (bar.current) bar.current.style.transform = `scaleX(${p})`;

              if (idx !== active) {
                active = idx;
              }

              const hint = root.current?.querySelector(".work-hint") as HTMLElement | null;
              if (hint) hint.style.opacity = p > 0.94 ? "0" : "1";
            },
          },
        });

        // Translate the horizontal track
        tl.to(track, { x: () => -dist(), duration: projects.length }, 0);

        // Parallax image drift
        tl.fromTo(".panel-vis-wrap", { x: 30 }, { x: -30, duration: projects.length }, 0);

        // Velocity skew
        const skewSetter = gsap.quickSetter(track, "skewX", "deg");
        let skew = 0;
        const tick = () => {
          const sTarget = clamp(velocityBus.value * -0.25, -2.5, 2.5);
          skew += (sTarget - skew) * 0.09;
          skewSetter(Math.abs(skew) > 0.04 ? skew : 0);
          if (Math.abs(skew) <= 0.04) skew = 0;
        };
        gsap.ticker.add(tick);

        // Cursor hover interactive depth
        const over = (e: MouseEvent) => {
          const scene = (e.target as HTMLElement).closest<HTMLElement>(".work-panel");
          panels.forEach((pn) => {
            const on = pn === scene;
            const vis = pn.querySelector(".panel-vis-wrap");
            if (vis) {
              gsap.to(vis, { scale: on ? 1.02 : 1, duration: 0.45, ease: "expo.out", overwrite: "auto" });
            }
          });
        };
        root.current!.addEventListener("mouseover", over, { passive: true });
        const section = root.current!;

        return () => {
          gsap.ticker.remove(tick);
          section.removeEventListener("mouseover", over);
        };
      }, root);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="work" className="work-section relative bg-[#151515] text-[#F1EEE7]">
      {/* ---------- Desktop Horizontal Journey ---------- */}
      <div className="work-scroll relative hidden md:block">
        <div className="work-pin flex h-screen flex-col overflow-hidden">
          {/* Top Bar with Section Label and Dynamic Progress Counter */}
          <div className="flex items-end justify-between px-12 pt-20 pb-3">
            <div className="flex items-center gap-3">
              <span className="kicker text-[#C8F31D]">03</span>
              <span aria-hidden className="h-px w-10 bg-white/25" />
              <span className="kicker opacity-75">SELECTED WORK — MAJOR PRODUCTION SYSTEMS</span>
            </div>
            <span ref={counter} className="inline-block font-mono text-xs tracking-[0.2em] text-[#C8F31D]">
              01 / 0{projects.length}
            </span>
          </div>

          <div className="mx-12 mb-2 h-px bg-white/15">
            <span ref={bar} className="block h-full w-full origin-left bg-[#C8F31D]" style={{ transform: "scaleX(0)" }} />
          </div>

          {/* Sliding Track containing all 6 projects */}
          <div className="flex-1 overflow-hidden">
            <div className="h-track flex h-full w-max" style={{ willChange: "transform" }}>
              {projects.map((p, i) => (
                <article
                  key={p.index}
                  className={`work-panel panel-${i} grid h-full w-screen shrink-0 grid-cols-12 content-center items-center gap-10 px-12 py-6`}
                  data-cursor="view"
                >
                  {/* Left Column: Project Narrative */}
                  <div className="col-span-5 flex flex-col justify-center py-2">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#C8F31D]">
                      PROJECT {p.index} // {p.category}
                    </p>

                    <h3 className="h-title mt-2 leading-[0.92]">
                      <span className="sans-black block text-[clamp(2.4rem,4.2vw,3.6rem)] font-bold tracking-tight text-white">
                        {p.titleA}
                      </span>
                      <span className="display block text-[clamp(2.4rem,4.2vw,3.6rem)] font-light italic" style={{ color: p.accent }}>
                        {p.titleB}
                      </span>
                    </h3>

                    <p className="mt-3 text-[0.95rem] leading-relaxed opacity-85 text-[#F1EEE7]/90 font-sans max-w-lg">
                      {p.description}
                    </p>

                    <p className="mt-2 text-xs leading-relaxed opacity-65 text-[#F1EEE7]/70 font-sans max-w-lg">
                      {p.support}
                    </p>

                    {/* Stack Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded border border-white/20 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Facts & Live Links */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-4">
                      {p.facts.map((f) => (
                        <span key={f} className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-70">
                          ● {f}
                        </span>
                      ))}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="open"
                          className="u-link font-mono text-[11px] font-medium uppercase tracking-[0.16em]"
                          style={{ color: p.accent }}
                        >
                          {p.liveLabel} ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Dedicated Authentic Architecture Diagram */}
                  <div className="col-span-7 flex items-center justify-center py-2">
                    <div className="panel-vis-wrap w-full max-w-[680px]">
                      <ProjectDiagram project={p} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="work-hint px-12 pb-6 font-mono text-[11px] uppercase tracking-[0.24em] opacity-60 transition-opacity duration-300 flex items-center gap-2">
            <span>Scroll horizontally through featured builds</span>
            <span className="text-[#C8F31D]">→</span>
          </p>
        </div>
      </div>

      {/* ---------- Mobile Vertical Scenes ---------- */}
      <div className="work-stack-fallback px-6 py-20 md:hidden space-y-16">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="kicker text-[#C8F31D]">03</span>
            <span aria-hidden className="h-px w-10 bg-white/25" />
            <span className="kicker opacity-75">SELECTED WORK</span>
          </div>
          <h2 className="display text-4xl text-white">
            Major <em className="font-light italic text-[#C8F31D]">systems.</em>
          </h2>
        </div>

        <div className="space-y-14">
          {projects.map((p) => (
            <article key={p.index} className="stack-card border-b border-white/15 pb-12" data-cursor="view">
              <ProjectDiagram project={p} />

              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C8F31D]">
                  PROJECT {p.index} // {p.category}
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                  {p.titleA} <em className="display font-light italic" style={{ color: p.accent }}>{p.titleB}</em>
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-85 text-[#F1EEE7]/90">{p.description}</p>
                <p className="mt-2 text-xs leading-relaxed opacity-65 text-[#F1EEE7]/70">{p.support}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded border border-white/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]">
                      {s}
                    </span>
                  ))}
                </div>

                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="u-link mt-5 inline-block font-mono text-xs uppercase tracking-[0.18em]"
                    style={{ color: p.accent }}
                  >
                    {p.liveLabel} ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
