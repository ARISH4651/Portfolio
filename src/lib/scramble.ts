import gsap from "gsap";

/**
 * SIGNATURE #1 — cinematic text resolution.
 * Headings resolve left-to-right from technical glyphs into final text:
 * unresolved chars sit faint, a 2-char window flickers, resolved chars
 * lock in. Editorial and premium — not a hacker terminal.
 *
 * Respects prefers-reduced-motion (sets final text immediately).
 */

const GLYPHS = "01X></\\*+~_#/";
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export function isReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function render(el: HTMLElement, text: string, progress: number, seed: string[]) {
  const n = text.length;
  const resolved = progress * (n + 2);
  let html = "";
  for (let i = 0; i < n; i++) {
    const ch = text[i];
    if (ch === " ") {
      html += " ";
      continue;
    }
    if (resolved > i + 1) {
      html += `<span>${ch}</span>`;
    } else if (resolved > i - 1) {
      // active window: flickering glyph, muted
      const g = seed[(i + Math.floor(progress * 24)) % seed.length];
      html += `<span style="opacity:.45">${g}</span>`;
    } else {
      // pending: faint glyph holds the layout
      html += `<span style="opacity:.14">${seed[i % seed.length]}</span>`;
    }
  }
  el.innerHTML = html;
}

/**
 * Resolve `el` into `text` over `duration` seconds.
 * Returns the tween (killed automatically on context revert).
 */
export function scramble(
  el: HTMLElement,
  text: string,
  duration = 0.7,
  delay = 0,
): gsap.core.Tween {
  const seed = Array.from({ length: Math.max(text.length, 8) }, rand);
  if (isReducedMotion()) {
    el.textContent = text;
    return gsap.to({}, { duration: 0 });
  }
  render(el, text, 0, seed);
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration,
    delay,
    ease: "power2.inOut",
    onUpdate: () => render(el, text, state.p, seed),
    onComplete: () => {
      el.textContent = text;
    },
  });
}

/** Instantly set final text (reduced-motion / cleanup path). */
export function settle(el: HTMLElement, text: string) {
  gsap.killTweensOf(el);
  el.textContent = text;
}
