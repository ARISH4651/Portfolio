import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import SelectedWork from "./components/SelectedWork";
import Architecture from "./components/Architecture";
import Stack from "./components/Stack";
import MoreWork from "./components/MoreWork";
import Lab from "./components/Lab";
import Proof from "./components/Proof";
import Contact from "./components/Contact";
import { clamp, velocityBus } from "./lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // heroGo: preloader lifts → hero entrance starts underneath.
  // gone: preloader unmounted. (ready = heroGo, kept for section triggers)
  const [heroGo, setHeroGo] = useState(false);
  const [gone, setGone] = useState(false);
  const ready = heroGo;
  const chapter = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const onReveal = useCallback(() => setHeroGo(true), []);
  const onGone = useCallback(() => {
    setHeroGo(true);
    setGone(true);
  }, []);

  // Lenis smooth scroll + GSAP ticker + shared velocity bus
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", (e: { velocity?: number }) => {
      ScrollTrigger.update();
      const v = clamp(e.velocity ?? 0, -60, 60);
      velocityBus.value = v;
      velocityBus.intensity += (Math.min(1, Math.abs(v) / 30) - velocityBus.intensity) * 0.12;
    });
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // anchor links ride Lenis instead of jumping
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // stop scroll while the preloader owns the screen
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!ready) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      return;
    }
    document.body.style.overflow = "";
    lenis?.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  // chapter transitions: HERO light → WORK dark → SYSTEM light →
  // LAB dark → PROOF/ABOUT light → CONTACT dark. Intentional, alternating.
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chapter.current?.setAttribute("data-theme", "light");
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      const setTheme = (theme: string) => chapter.current?.setAttribute("data-theme", theme);
      const range = (trigger: string, endTrigger: string, end: string) =>
        ScrollTrigger.create({
          trigger,
          start: "top 55%",
          endTrigger,
          end,
          onEnter: () => setTheme("dark"),
          onLeave: () => setTheme("light"),
          onEnterBack: () => setTheme("dark"),
          onLeaveBack: () => setTheme("light"),
        });
      range("#work", "#system", "top 55%");
      range("#lab", "#proof", "top 55%");
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top 70%",
        onEnter: () => setTheme("dark"),
        onLeaveBack: () => setTheme("light"),
      });
      return () => window.removeEventListener("load", onLoad);
    });
    return () => ctx.revert();
  }, [ready]);

  return (
    <div ref={chapter} id="chapter-root" data-theme="light" className="grain min-h-screen">
      <Cursor />
      {!gone && <Preloader onReveal={onReveal} onGone={onGone} />}
      <Nav visible={ready} />
      <main>
        <Hero ready={ready} />
        <Profile />
        <SelectedWork />
        <Architecture />
        <MoreWork />
        <Stack />
        <Lab />
        <Proof />
        <Contact />
      </main>
    </div>
  );
}
