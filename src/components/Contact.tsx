import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";
import { links } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Final transmission: clip-path wipe into the closing chapter, giant
 * LET'S BUILD, live-demo links for the two deployed agents, Gmail CTA.
 */
export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-wipe",
        { clipPath: "inset(12% 4% 12% 4% round 12px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".contact-giant .line-inner",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-giant",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".contact-fade",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-giant",
            start: "top 60%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  // Opens Gmail directly in the browser instead of the system email client.
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    links.email,
  )}`;

  return (
    <section
      ref={root}
      id="contact"
      className="px-3 pb-3 md:px-6 md:pb-6"
    >
      <div className="contact-wipe overflow-hidden rounded-xl bg-[#0c0c0c] px-6 pb-10 pt-24 text-[#F1EEE7] md:px-12 md:pt-32">
        <p className="contact-fade kicker opacity-60">
          07 — Final transmission
        </p>

        <h2 className="contact-giant mt-6 select-none">
          <span className="mask-line">
            <span className="line-inner sans-black block text-[clamp(3.4rem,13vw,13rem)] font-bold">
              LET&apos;S BUILD
            </span>
          </span>

          <span className="mask-line">
            <span className="line-inner display block text-[clamp(3.4rem,13vw,13rem)] font-light italic text-[#C8F31D]">
              something real.
            </span>
          </span>
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-6 md:mt-16">
          <Magnetic
            href={gmailUrl}
            strength={0.35}
          >
            <span
              data-cursor="contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#C8F31D] px-9 py-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#151515]"
            >
              {links.email}

              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </Magnetic>

          <div className="contact-fade flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em]">
            <a
              className="u-link"
              href={links.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <footer className="contact-fade mt-10 flex items-center justify-between border-t border-white/15 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 md:mt-14">
          <span>© 2026 Arish K</span>

          <a
            href="#top"
            data-cursor="menu"
            className="u-link"
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}