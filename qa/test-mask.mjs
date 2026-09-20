import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const ROOT = new URL("../dist/", import.meta.url);
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" };

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

await new Promise((r) => server.listen(4321, r));

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--no-sandbox", "--force-device-scale-factor=1"],
});

const viewports = [
  { name: "hero-1440", w: 1440, h: 900 },
  { name: "hero-1280", w: 1280, h: 800 },
  { name: "hero-1024", w: 1024, h: 768 },
  { name: "hero-768", w: 768, h: 1024 },
  { name: "hero-390", w: 390, h: 844 },
];

for (const v of viewports) {
  const page = await browser.newPage({ viewport: { width: v.w, height: v.h } });
  await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
  await page.waitForTimeout(4200);
  await page.screenshot({ path: `qa/${v.name}.png` });
  console.log(`Captured ${v.name}`);
  await page.close();
}

await browser.close();
server.close();
