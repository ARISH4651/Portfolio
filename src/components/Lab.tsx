import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { labItems, labFilters, type LabFilter } from "../data/content";
import { links } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * THE LAB — filterable learning archive.
 * Dense index rows; on desktop a floating preview follows the cursor
 * with verified facts (or an honest "metadata on GitHub" for
 * name-only entries). COMPUTER VISION has no indexed builds yet and
 * says so instead of inventing any.
 */
export default function Lab() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<LabFilter>("ALL");
  const [active, setActive] = useState(0);

  const rows = useMemo(
    () => (filter === "ALL" ? labItems : labItems.filter((i) => i.cats.includes(filter))),
    [filter],
  );

  // reveal on filter change (cheap, no ScrollTrigger churn)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ".lab-row",
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.035, overwrite: "auto" },
    );
  }, [filter]);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lab-row",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".lab-list", start: "top 84%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  // floating preview follows cursor (fine pointers only)
  useEffect(() => {
    const card = preview.current;
    const section = root.current;
    if (!card || !section) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(card, { xPercent: -50, yPercent: -50, scale: 0.85, autoAlpha: 0 });
    const xTo = gsap.quickTo(card, "x", { duration: 0.5, ease: "expo.out" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.5, ease: "expo.out" });
    let rect = section.getBoundingClientRect();
    const refreshRect = () => {
      rect = section.getBoundingClientRect();
    };
    const move = (e: MouseEvent) => {
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };
    const enter = () => refreshRect();
    section.addEventListener("mouseenter", enter);
    section.addEventListener("mousemove", move, { passive: true });
    return () => {
      section.removeEventListener("mouseenter", enter);
      section.removeEventListener("mousemove", move);
    };
  }, []);

  const showPreview = (globalIndex: number) => {
    setActive(globalIndex);
    const card = preview.current;
    if (!card) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    gsap.to(card, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "expo.out" });
  };
  const hidePreview = () => {
    const card = preview.current;
    if (!card) return;
    gsap.to(card, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: "expo.out" });
  };

  const activeItem = labItems[active];

  return (
    <section ref={root} id="lab" className="relative px-6 py-20 md:px-12 md:py-28 bg-[#121212] text-[#F1EEE7]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          index="05"
          kicker="The Lab // Builds &amp; Experiments"
          dark
          title={
            <>
              Learning <em className="display font-normal italic text-[#C8F31D]">archive.</em>
            </>
          }
        />
        <p className="display pb-6 text-[clamp(3.5rem,8vw,7.5rem)] leading-none text-[#F1EEE7]/10 md:pb-10" aria-hidden>
          40+
        </p>
      </div>
      <p className="-mt-6 mb-8 max-w-xl text-sm leading-relaxed opacity-70 md:-mt-8">
        40+ learning builds and experiments. Verified repos show their real
        stacks — everything else is listed by name only, details on GitHub.
      </p>

      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter archive">
        {labFilters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-[background-color,border-color,color] duration-200 ${
              filter === f
                ? "border-[#C8F31D] bg-[#C8F31D] text-[#151515] font-semibold"
                : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="lab-list theme-line relative border-t border-white/15" onMouseLeave={hidePreview}>
        {rows.map((item) => {
          const globalIndex = labItems.indexOf(item);
          const inner = (
            <>
              <span className="col-span-2 font-mono text-xs opacity-50 group-hover:text-[#C8F31D] md:col-span-1">
                {item.n}
              </span>
              <span className="col-span-10 text-[clamp(1.1rem,2.2vw,1.6rem)] font-medium tracking-tight transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-[#C8F31D] md:col-span-5 md:group-hover:translate-x-3">
                {item.name}
              </span>
              <span className="col-span-6 col-start-3 font-mono text-[11px] uppercase tracking-[0.16em] opacity-50 md:col-span-4 md:col-start-auto">
                {item.cats.length ? item.cats.join(" · ").toLowerCase() : "unindexed archive"}
              </span>
              <span className="col-span-4 text-right font-mono text-xs opacity-60 md:col-span-2 group-hover:text-[#C8F31D]">
                {item.anchor ? "featured" : "github"}{" "}
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
            </>
          );
          const cls =
            "lab-row group grid grid-cols-12 items-baseline gap-2 border-b border-white/15 py-4.5 md:py-5 transition-[background-color,padding] duration-300 hover:bg-white/[0.04] hover:py-5.5 md:hover:py-6";
          return item.anchor ? (
            <a
              key={item.n}
              href={item.anchor}
              data-cursor="view"
              onMouseEnter={() => showPreview(globalIndex)}
              onFocus={() => setActive(globalIndex)}
              className={cls}
            >
              {inner}
            </a>
          ) : (
            <a
              key={item.n}
              href={links.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              onMouseEnter={() => showPreview(globalIndex)}
              onFocus={() => setActive(globalIndex)}
              className={cls}
            >
              {inner}
            </a>
          );
        })}

        {rows.length === 0 && (
          <p className="border-b border-white/15 py-10 font-mono text-xs uppercase tracking-[0.18em] opacity-60">
            No public computer-vision builds indexed yet — check GitHub for the latest.
          </p>
        )}

        {/* floating preview card */}
        <div
          ref={preview}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden w-72 rounded-lg bg-[#F1EEE7] p-6 text-[#151515] opacity-0 shadow-2xl lg:block"
        >
          <p className="font-mono text-[10px] tracking-[0.22em] text-[#5A7300]">
            EXP.{activeItem.n} — {activeItem.cats.length ? activeItem.cats[0] : "ARCHIVE"}
          </p>
          <p className="display mt-3 text-2xl">{activeItem.name}</p>
          {activeItem.preview ? (
            <div className="mt-3 space-y-1">
              {activeItem.preview.map((f) => (
                <p key={f} className="text-sm opacity-70">→ {f}</p>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm opacity-70">Metadata lives on GitHub →</p>
          )}
        </div>
      </div>

      <a
        href={links.github}
        target="_blank"
        rel="noreferrer"
        data-cursor="open"
        className="u-link mt-8 inline-block font-mono text-xs uppercase tracking-[0.2em]"
      >
        Full index on GitHub ↗
      </a>
    </section>
  );
}
