import { chromium } from "playwright-core";
import { readFile, writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
const imgBase64 = (await readFile("public/my.png")).toString("base64");

await page.setContent(`<img id="pic" src="data:image/png;base64,${imgBase64}" />`);

const dataUrl = await page.evaluate(() => {
  const img = document.getElementById("pic");
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  // Let's flood-fill or edge-aware background key from (0,0)
  const w = canvas.width;
  const h = canvas.height;
  const visited = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0, tail = 0;

  // Push all border pixels that are very dark
  for (let x = 0; x < w; x++) {
    queue[tail++] = x; // y = 0
    visited[x] = 1;
    queue[tail++] = (h - 1) * w + x; // y = h - 1
    visited[(h - 1) * w + x] = 1;
  }
  for (let y = 0; y < h; y++) {
    queue[tail++] = y * w; // x = 0
    visited[y * w] = 1;
    queue[tail++] = y * w + (w - 1); // x = w - 1
    visited[y * w + (w - 1)] = 1;
  }

  // Flood fill background connectivity where luminance is very low (< 18)
  while (head < tail) {
    const idx = queue[head++];
    const x = idx % w;
    const y = Math.floor(idx / w);
    const pIdx = idx * 4;

    const r = data[pIdx];
    const g = data[pIdx + 1];
    const b = data[pIdx + 2];
    const maxVal = Math.max(r, g, b);

    // If it's part of the dark studio background
    if (maxVal < 22) {
      data[pIdx + 3] = 0; // make transparent
    } else if (maxVal < 36) {
      // soft feather
      const alpha = Math.floor(((maxVal - 22) / (36 - 22)) * 255);
      data[pIdx + 3] = Math.min(data[pIdx + 3], alpha);
    } else {
      continue; // do not propagate into subject
    }

    // Neighbors
    const neighbors = [
      idx - 1, idx + 1, idx - w, idx + w
    ];
    for (let n of neighbors) {
      if (n >= 0 && n < w * h && visited[n] === 0) {
        visited[n] = 1;
        const npIdx = n * 4;
        if (Math.max(data[npIdx], data[npIdx + 1], data[npIdx + 2]) < 36) {
          queue[tail++] = n;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL("image/png");
});

const buffer = Buffer.from(dataUrl.split(",")[1], "base64");
await writeFile("qa/my-keyed.png", buffer);
console.log("Saved qa/my-keyed.png");
await browser.close();
