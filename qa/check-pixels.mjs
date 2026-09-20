import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
const page = await browser.newPage();
const imgBase64 = (await readFile("public/my.png")).toString("base64");
await page.setContent(`<img id="pic" src="data:image/png;base64,${imgBase64}" />`);
const res = await page.evaluate(() => {
  const canvas = document.createElement("canvas");
  const img = document.getElementById("pic");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const get = (x, y) => Array.from(ctx.getImageData(x, y, 1, 1).data);
  return {
    dimensions: [canvas.width, canvas.height],
    corners: {
      tl: get(5, 5),
      tr: get(canvas.width - 5, 5),
      bl: get(5, canvas.height - 5),
      br: get(canvas.width - 5, canvas.height - 5),
      top_mid: get(Math.floor(canvas.width / 2), 5),
      left_mid: get(5, Math.floor(canvas.height / 2)),
      right_mid: get(canvas.width - 5, Math.floor(canvas.height / 2))
    }
  };
});
console.log(JSON.stringify(res, null, 2));
await browser.close();
