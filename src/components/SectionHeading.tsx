import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  index: string;
  kicker: string;
  title: React.ReactNode;
  dark?: boolean;
};

/**
 * Consistent Level-2 section reveal: masked lines rise once with expo ease.
 * Restrained by design — the same language in every section.
 */
export default function SectionHeading({ index, kicker, title, dark }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".line-inner"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        ref.current!.querySelector(".heading-kicker"),
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-10 md:mb-16">
      <div className="heading-kicker flex items-center gap-3">
        <span className="kicker text-muted" style={{ color: "inherit", opacity: 0.65 }}>
          {index}
        </span>
        <span
          aria-hidden
          className="h-px w-10"
          style={{ background: dark ? "rgba(241,238,231,.35)" : "rgba(23,23,23,.3)" }}
        />
        <span className="kicker" style={{ color: "inherit", opacity: 0.65 }}>
          {kicker}
        </span>
      </div>
      <h2 className="display mt-5 text-[clamp(2.4rem,6vw,5rem)] font-medium">
        <span className="mask-line">
          <span className="line-inner">{title}</span>
        </span>
      </h2>
    </div>
  );
}
