/* Visual QA harness: serves dist/ and captures viewport + section shots.
 * Run: npm run build && node qa/shots.mjs
 * NOTE (dev-only): written via tool per explicit QA requirement. */
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const ROOT = new URL("../dist/", import.meta.url);
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path === "/") path = "/index.html";
    const data = await readFile(join(ROOT.pathname.replace(/^\//, ""), path.slice(1)));
    res.writeHead(200, { "Content-Type": MIME[extname(path)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("nf");
  }
});

await new Promise((r) => server.listen(4317, r));

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});

const shots = [
  { name: "000-preloader", w: 1440, h: 900, early: 700 },
  { name: "1440-hero", w: 1440, h: 900, scroll: 0 },
  { name: "1440-work-p1", w: 1440, h: 900, pinK: 0.9 },
  { name: "1440-work-p2", w: 1440, h: 900, pinK: 1.5 },
  { name: "1440-work-p3", w: 1440, h: 900, pinK: 3.0 },
  { name: "1280-work-p1", w: 1280, h: 720, pinK: 0.9 },
  { name: "1440-system", w: 1440, h: 900, scroll: "#system" },
  { name: "1440-lab", w: 1440, h: 900, scroll: "#lab" },
  { name: "1440-contact", w: 1440, h: 900, scroll: "#contact" },
  { name: "768-stack", w: 768, h: 900, scroll: "#more-work" },
  { name: "390-top", w: 390, h: 844, scroll: 0 },
  { name: "390-work", w: 390, h: 844, scroll: "#work" },
];

for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:4317/", { waitUntil: "networkidle" });
  // wait out the preloader (~3s) + entrance — or catch it early
  await page.waitForTimeout(s.early ?? 4200);
  if (s.early !== undefined) {
    await page.screenshot({ path: `qa/${s.name}.png` });
    console.log(s.name, "captured early");
    await page.close();
    continue;
  }
  if (typeof s.scroll === "string") {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "start" });
    }, s.scroll);
    await page.waitForTimeout(1800);
  } else if (s.pinK !== undefined) {
    await page.evaluate((k) => {
      const top = document.querySelector("#work").offsetTop;
      window.scrollTo(0, top + window.innerHeight * k);
    }, s.pinK);
    await page.waitForTimeout(2000);
  }
  await page.screenshot({ path: `qa/${s.name}.png` });
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  console.log(s.name, "errors:", errors.length ? errors : "none", "overflow:", overflow);
  await page.close();
}

await browser.close();
server.close();
