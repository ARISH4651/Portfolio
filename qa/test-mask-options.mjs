import { chromium } from "playwright-core";
import { readFile } from "node:fs/promises";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--no-sandbox"],
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const imgBase64 = (await readFile("public/my.png")).toString("base64");

const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    background-color: #F4F1EA;
    margin: 0;
    padding: 30px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  .box {
    position: relative;
    height: 500px;
    background: #F4F1EA;
    border: 1px solid rgba(0,0,0,0.08);
    padding: 20px;
    box-sizing: border-box;
  }
  .headline {
    font-size: 3rem;
    font-weight: 900;
    font-style: italic;
    color: #151515;
    margin: 0;
  }
  .sub {
    font-family: monospace;
    font-size: 0.9rem;
    color: #77736B;
    margin-top: 10px;
  }
  .mission {
    font-size: 2rem;
    font-weight: 900;
    margin-top: 20px;
    color: #151515;
  }
  .divider {
    position: absolute;
    bottom: 40px;
    left: 20px;
    right: 20px;
    height: 1px;
    background: rgba(0,0,0,0.1);
  }
</style>
</head>
<body>
  <h2>Hero Composition Options for my.png</h2>
  <div class="grid">
    <!-- Option A: Soft organic gradient mask (top 5%, bottom 70%, left 25%, right 90%) -->
    <div class="box">
      <div class="headline">ARISH K</div>
      <div class="sub">AI ENGINEER / AI &amp; DATA SCIENCE</div>
      <div class="mission">I BUILD PLATFORMS.</div>
      <div class="divider"></div>
      
      <div style="position:absolute; right:24px; top:24px; width:340px; height:420px; pointer-events:none;
        mask-image: radial-gradient(ellipse 75% 70% at 55% 42%, black 45%, rgba(0,0,0,0.7) 65%, transparent 95%), linear-gradient(to bottom, black 65%, transparent 100%);
        -webkit-mask-image: radial-gradient(ellipse 75% 70% at 55% 42%, black 45%, rgba(0,0,0,0.7) 65%, transparent 95%), linear-gradient(to bottom, black 65%, transparent 100%);
        mask-composite: intersect; -webkit-mask-composite: source-in;">
        <img src="data:image/png;base64,${imgBase64}" style="width:100%; height:100%; object-fit:contain; object-position: center top;" />
      </div>
    </div>

    <!-- Option B: Linear feathered blend (seamless top/left/right/bottom) -->
    <div class="box">
      <div class="headline">ARISH K</div>
      <div class="sub">AI ENGINEER / AI &amp; DATA SCIENCE</div>
      <div class="mission">I BUILD PLATFORMS.</div>
      <div class="divider"></div>
      
      <div style="position:absolute; right:30px; top:20px; width:320px; height:410px; pointer-events:none;
        mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 58%, transparent 96%), linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 58%, transparent 96%), linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%);
        mask-composite: intersect; -webkit-mask-composite: source-in;">
        <img src="data:image/png;base64,${imgBase64}" style="width:100%; height:100%; object-fit:contain; object-position: center top;" />
      </div>
    </div>

    <!-- Option C: Tighter elliptical fade focused on subject -->
    <div class="box">
      <div class="headline">ARISH K</div>
      <div class="sub">AI ENGINEER / AI &amp; DATA SCIENCE</div>
      <div class="mission">I BUILD PLATFORMS.</div>
      <div class="divider"></div>
      
      <div style="position:absolute; right:20px; top:15px; width:350px; height:430px; pointer-events:none;
        mask-image: radial-gradient(ellipse 68% 62% at 52% 40%, black 35%, rgba(0,0,0,0.4) 62%, transparent 88%), linear-gradient(to bottom, black 60%, transparent 95%);
        -webkit-mask-image: radial-gradient(ellipse 68% 62% at 52% 40%, black 35%, rgba(0,0,0,0.4) 62%, transparent 88%), linear-gradient(to bottom, black 60%, transparent 95%);
        mask-composite: intersect; -webkit-mask-composite: source-in;">
        <img src="data:image/png;base64,${imgBase64}" style="width:100%; height:100%; object-fit:contain; object-position: center top;" />
      </div>
    </div>

    <!-- Option D: Soft wide linear gradient mask with 38vw max 420px -->
    <div class="box">
      <div class="headline">ARISH K</div>
      <div class="sub">AI ENGINEER / AI &amp; DATA SCIENCE</div>
      <div class="mission">I BUILD PLATFORMS.</div>
      <div class="divider"></div>
      
      <div style="position:absolute; right:25px; top:25px; width:330px; height:415px; pointer-events:none;
        mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 18%, black 55%, transparent 98%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 25%, black 75%, rgba(0,0,0,0.5) 88%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 18%, black 55%, transparent 98%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 12%, black 25%, black 75%, rgba(0,0,0,0.5) 88%, transparent 100%);
        mask-composite: intersect; -webkit-mask-composite: source-in;">
        <img src="data:image/png;base64,${imgBase64}" style="width:100%; height:100%; object-fit:contain; object-position: center top;" />
      </div>
    </div>
  </div>
</body>
</html>
`;

await page.setContent(html);
await page.screenshot({ path: "qa/mask-options.png" });
await browser.close();
console.log("Saved qa/mask-options.png");
