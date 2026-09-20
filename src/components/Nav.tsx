import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { label: "Work", href: "#work" },
  { label: "System", href: "#system" },
  { label: "Lab", href: "#lab" },
  { label: "Proof", href: "#proof" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** Fixed editorial nav: wordmark, section links with active indicator, availability dot. */
export default function Nav({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(ref.current, { y: 0, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.1 },
      );
      items.forEach((it) => {
        const section = document.querySelector(it.href);
        const link = ref.current!.querySelector(`a[href="${it.href}"]`);
        if (!section || !link) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => link.setAttribute("data-active", String(self.isActive)),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [visible]);

  const [mobileOpen, setMobileOpen] = useState(false);

  if (!visible) return null;

  return (
    <>
      <header
        ref={ref}
        className="fixed inset-x-0 top-0 z-[100] opacity-0"
        style={{ mixBlendMode: "difference", color: "#F1EEE7" }}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-12">
          <a href="#top" data-cursor="menu" className="font-sans text-sm font-bold tracking-tight">
           <span className="align-super text-[10px]"></span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                data-cursor="menu"
                className="u-link font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                {it.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8F31D] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C8F31D]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                Open to work
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex flex-col gap-1 md:hidden p-1.5 focus:outline-none"
              aria-label="Toggle Navigation"
              aria-expanded={mobileOpen}
            >
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Same 6 items, zero duplicate navbars) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[95] flex flex-col justify-center bg-[#151515]/95 backdrop-blur-md px-8 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#C8F31D]">
              Navigation
            </span>
            {items.map((it, idx) => (
              <a
                key={it.href}
                href={it.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-baseline justify-between border-b border-white/10 pb-3 font-sans text-2xl font-bold tracking-tight text-[#F1EEE7] hover:text-[#C8F31D]"
              >
                <span>{it.label}</span>
                <span className="font-mono text-xs text-[#C8F31D]">0{idx + 1}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
