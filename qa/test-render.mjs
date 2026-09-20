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
    padding: 40px;
    font-family: sans-serif;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  .box {
    position: relative;
    height: 400px;
    background: #F4F1EA;
    overflow: hidden;
    border: 1px dashed #ccc;
  }
</style>
</head>
<body>
  <h2>Comparison of blending/masking options for my.png</h2>
  <div class="grid">
    <div class="box">
      <h4>1. Direct with current mask</h4>
      <div style="position:absolute; right:0; top:0; width:100%; height:100%; 
        mask-image: linear-gradient(to left, transparent 0%, rgba(0,0,0,0.15) 8%, black 28%), linear-gradient(to bottom, black 42%, rgba(0,0,0,0.6) 68%, transparent 92%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 12%, black 32%);
        -webkit-mask-image: linear-gradient(to left, transparent 0%, rgba(0,0,0,0.15) 8%, black 28%), linear-gradient(to bottom, black 42%, rgba(0,0,0,0.6) 68%, transparent 92%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 12%, black 32%);
        mask-composite: intersect; -webkit-mask-composite: source-in;">
        <img src="data:image/png;base64,${imgBase64}" style="width:100%; height:100%; object-fit:cover; object-position: 65% top;" />
      </div>
    </div>
    <div class="box">
      <h4>2. Soft radial / vignette mask</h4>
      <div style="position:absolute; right:0; top:0; width:100%; height:100%;
        mask-image: radial-gradient(ellipse at 50% 35%, black 40%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse at 50% 35%, black 40%, transparent 75%);">
        <img src="data:image/png;base64,${imgBase64}" style="width:100%; height:100%; object-fit:contain; object-position: center top;" />
      </div>
    </div>
    <div class="box">
      <h4>3. Direct object-contain with bottom fade</h4>
      <div style="position:absolute; right:0; top:0; width:100%; height:100%;
        mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);">
        <img src="data:image/png;base64,${imgBase64}" style="width:100%; height:100%; object-fit:contain; object-position: center top;" />
      </div>
    </div>
  </div>
</body>
</html>
`;

await page.setContent(html);
await page.screenshot({ path: "qa/test-compare.png" });
await browser.close();
console.log("Rendered compare shot");
