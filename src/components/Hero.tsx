import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clamp, velocityBus } from "../lib/motion";
import { isReducedMotion } from "../lib/scramble";
import Magnetic from "./Magnetic";
import { links } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

type Props = { ready: boolean };

/**
 * HERO — unified identity and coordinated editorial entrance.
 * Communicates: ARISH K, AI ENGINEER, and BUILDING intelligent SYSTEMS.
 */
export default function Hero({ ready }: Props) {
  const root = useRef<HTMLElement>(null);
  const dynamicTextRef = useRef<HTMLSpanElement>(null);

  // Staged coordinated entrance sequence
  useEffect(() => {
    if (!ready || !root.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Top technical metadata
      tl.fromTo(
        ".hero-meta-top",
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" },
        0.05
      );

      // Line 1: "ARISH" masked reveal with slight vertical movement and opacity
      tl.fromTo(
        ".hero-name-1",
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: "expo.out" },
        0.15
      );

      // Line 2: "K" staggered masked reveal
      tl.fromTo(
        ".hero-name-2",
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: "expo.out" },
        0.28
      );

      // Role: AI ENGINEER
      tl.fromTo(
        ".hero-role-inner",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
        0.42
      );

      // Mission tagline
      tl.fromTo(
        ".hero-mission-inner",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: "expo.out" },
        0.55
      );

      // Supporting paragraph, CTAs & Specs
      tl.fromTo(
        ".hero-content-fade",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.07, ease: "expo.out" },
        0.68
      );

      // Subtle scroll hint pulse
      gsap.to(".scroll-indicator", {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: "sine.inOut",
      });

      // Caret blink
      gsap.fromTo(
        ".hero-caret",
        { opacity: 1 },
        { opacity: 0, duration: 0.5, repeat: -1, ease: "steps(1)" }
      );

      // The prefix never moves; only this text node is erased and retyped.
      const dynamicText = dynamicTextRef.current;
      if (dynamicText) {
        const typeTl = gsap.timeline({
          delay: 2.2,
          repeat: -1,
          repeatDelay: 0.5,
          onRepeat: () => setText("PLATFORMS."),
        });
        const charsPerSecond = 18;
        const setText = (text: string) => {
          dynamicText.textContent = text;
        };
        const erase = (text: string) => {
          const state = { length: text.length };
          return gsap.to(state, {
            length: 0,
            duration: text.length / charsPerSecond,
            ease: "none",
            onUpdate: () => setText(text.slice(0, Math.round(state.length))),
          });
        };
        const type = (text: string, start = 0) => {
          const state = { length: start };
          return gsap.to(state, {
            length: text.length,
            duration: (text.length - start) / charsPerSecond,
            ease: "none",
            onUpdate: () => setText(text.slice(0, Math.round(state.length))),
            onComplete: () => setText(text),
          });
        };
        const replace = (from: string, to: string) =>
          gsap.timeline().add(erase(from)).to({}, { duration: 0.12 }).add(type(to));

        setText("PLATFORMS.");
        typeTl.to({}, { duration: 1.35 });
        typeTl.add(replace("PLATFORMS.", "AI"));
        typeTl.to({}, { duration: 0.9 });
        typeTl.add(type("AI SOLUTIONS.", 2));
        typeTl.to({}, { duration: 1.35 });
        typeTl.add(replace("AI SOLUTIONS.", "SYSTEMS."));
        typeTl.to({}, { duration: 1.35 });
        typeTl.add(type("RAG APPLICATIONS.", 2));
        typeTl.to({}, { duration: 1.35 });
        typeTl.add(replace("RAG APPLICATIONS.", "DATA PRODUCTS."));
        typeTl.to({}, { duration: 1.35 });
        typeTl.add(replace("DATA PRODUCTS.", "PLATFORMS."));
      }
    }, root);

    return () => ctx.revert();
  }, [ready]);

  // Subtle scroll displacement & interactive pointer depth
  useEffect(() => {
    if (!root.current) return;
    if (isReducedMotion()) return;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      gsap.to(".hero-name-wrap", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      gsap.to(".hero-sub-wrap", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      const skewSetter = gsap.quickSetter(".velocity-skew", "skewX", "deg");
      let skew = 0;
      const tick = () => {
        const target = clamp(velocityBus.value * -0.5, -4, 4);
        skew += (target - skew) * 0.08;
        skewSetter(Math.abs(skew) > 0.04 ? skew : 0);
        if (Math.abs(skew) <= 0.04) skew = 0;
      };
      gsap.ticker.add(tick);

      let removeMouse = () => {};
      if (fine) {
        const xTo = gsap.quickTo(".hero-name-wrap", "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(".hero-name-wrap", "y", { duration: 0.8, ease: "power3.out" });
        const onMouse = (e: MouseEvent) => {
          const r = root.current!.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          xTo(nx * 14);
          yTo(ny * 10);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        root.current!.addEventListener("mousemove", onMouse, { passive: true });
        root.current!.addEventListener("mouseleave", onLeave);
        removeMouse = () => {
          root.current?.removeEventListener("mousemove", onMouse);
          root.current?.removeEventListener("mouseleave", onLeave);
        };
      }

      return () => {
        gsap.ticker.remove(tick);
        removeMouse();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[90vh] flex-col justify-between overflow-clip px-6 pt-28 pb-10 md:px-12 md:pt-32 md:pb-14"
    >
      {/* ── Hero portrait — transparent cutout, scales to fit without cropping ── */}
      <div
        aria-hidden
        className="hero-portrait-wrapper pointer-events-none absolute z-[1] hidden md:block"
        style={{
          top: "95px",
          right: "7%",
          // Hard boundary well above the divider.
          // Section padding bottom + metadata block ≈ 231px.
          // 240px ensures we never overlap or cross the divider.
          bottom: "200px",
          width: "clamp(500px, 38vw, 650px)", // Increased 10-15%
        }}
      >
        <img
          src="/arish_mono.png"
          alt="Portrait of Arish K"
          className="w-full h-full block"
          style={{
            // objectFit: contain ensures the image scales down proportionally
            // if the screen is short, rather than hard-clipping the shoulders.
            objectFit: "contain",
            objectPosition: "center top",
            // mix-blend-mode: multiply allows the grayscale image to inherit the cream background,
            // removing the "pasted PNG sticker" look and creating a printed editorial feel.
            mixBlendMode: "multiply",
            filter: "contrast(1.05) brightness(0.98)",
            // Organic editorial fade (Reduced intensity):
            // 1. Wider radial vignette keeps the subject more solid, only feathering extreme edges.
            // 2. Linear bottom fade pushed lower to preserve more torso before disappearing.
            WebkitMaskImage: [
              "radial-gradient(ellipse 75% 90% at 50% 30%, black 40%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,0.7) 85%, transparent 100%)",
              "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.5) 92%, transparent 100%)",
            ].join(", "),
            maskImage: [
              "radial-gradient(ellipse 75% 90% at 50% 30%, black 40%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,0.7) 85%, transparent 100%)",
              "linear-gradient(to bottom, black 0%, black 65%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0.5) 92%, transparent 100%)",
            ].join(", "),
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ── Dominant editorial identity ───────────────────────────────────── */}
      <div className="velocity-skew relative z-10 my-auto py-8 md:py-12 select-none">

        {/*
          ARISH K
          ────────
          Heavy italic neo-grotesk: Barlow Condensed 900 italic.
          Single line, full-bleed across the hero width.
          Two mask-line spans so each word can animate independently
          but render on the same visual line.
        */}
        <h1
          className="hero-name-wrap"
          aria-label="Arish K, AI Engineer"
        >
          {/* Word 1: ARISH */}
          <span className="mask-line leading-none">
            <span
              className="hero-name-1 hero-name block text-[clamp(4rem,16.5vw,10rem)] text-[#151515]"
            >
              ARISH K
            </span>
          </span>
          
        </h1>

        <div className="hero-sub-wrap mt-5 md:mt-7">
          {/*
            AI ENGINEER / AI & DATA SCIENCE
            ────────────────────────────────
            Monospace: IBM Plex Mono — uppercase, wide tracking, small size.
            Contrasts strongly against the heavy italic headline above.
          */}
          <div className="mask-line">
            <p className="hero-role-inner font-mono text-[clamp(0.72rem,1.9vw,1.15rem)] uppercase tracking-[0.3em] text-[#77736B]">
              AI ENGINEER <span className="opacity-35 mx-1">/</span> AI &amp; DATA SCIENCE
            </p>
          </div>

          {/*
            I BUILD SYSTEMS.
            ──────────────────────────────
            Heavy condensed neo-grotesk (Barlow Condensed), uppercase, tight tracking.
            Static "I BUILD" prefix with animated text replacement and blinking caret.
          */}
          <div className="mask-line mt-4 md:mt-5">
            <h2 className="hero-mission-inner text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.01em] text-[#151515] font-hero font-black uppercase">
              <span className="hero-static mr-[0.25em]">I BUILD</span>
              <span className="hero-dynamic inline-flex items-baseline text-[#171717]">
                <span ref={dynamicTextRef} className="hero-dynamic-text">SYSTEMS.</span>
                <span className="hero-caret inline-block w-[0.06em] h-[0.8em] bg-[#151515] ml-[0.05em] align-baseline"></span>
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Bottom context metadata ───────────────────────────────────────── */}
      <div className="relative z-10 grid gap-8 md:grid-cols-12 md:items-end border-t border-[#171717]/10 pt-6">
        <div className="hero-content-fade md:col-span-6">
          <p className="max-w-xl text-[clamp(1rem,1.45vw,1.2rem)] leading-relaxed text-[#171717]/85 font-sans">
            Designing and building intelligent systems with{" "}
            <strong className="font-semibold text-[#151515]">LLMs, RAG, agents</strong>{" "}
            and Python backends that solve real problems.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Magnetic href="#work" strength={0.3}>
              <span
                data-cursor="view"
                className="group inline-flex items-center gap-3 rounded-full bg-[#151515] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#F1EEE7] transition-colors duration-300 hover:bg-[#222]"
              >
                Selected work
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </span>
            </Magnetic>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="u-link font-mono text-xs uppercase tracking-[0.18em] text-[#171717]/75 hover:text-[#171717]"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="hero-content-fade md:col-span-6 md:col-start-7">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs border-l border-[#171717]/10 pl-6 md:pl-8">
            <div>
              <dt className="kicker opacity-50 text-[10px]">SPECIALIZATION</dt>
              <dd className="mt-1 font-medium text-[#171717]">Generative AI · RAG · Agents</dd>
            </div>
            <div>
              <dt className="kicker opacity-50 text-[10px]">CORE STACK</dt>
              <dd className="mt-1 font-medium text-[#171717]">Python · RestAPI · FastAPI · PostgresSQL · Tavily · Groq · Docker</dd>
            </div>
            <div>
              <dt className="kicker opacity-50 text-[10px]">EXPERIENCE &amp; BUILDS</dt>
              <dd className="mt-1 font-medium text-[#171717]">40+ Builds</dd>
            </div>
            <div>
              <dt className="kicker opacity-50 text-[10px]">AVAILABILITY</dt>
              <dd className="mt-1 flex items-center gap-1.5 font-medium text-[#171717]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8F31D]" />
                Open to work
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
