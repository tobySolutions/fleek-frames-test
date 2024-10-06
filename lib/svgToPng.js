import { svg2png, initialize } from "svg2png-wasm";
import wasm from "svg2png-wasm/svg2png_wasm_bg.wasm";

let isInitialized = false;

export default async function svgToPng(svgString) {
  if (!isInitialized) {
    await initialize(wasm());
    isInitialized = true;
  }

  const pngBuffer = await svg2png(svgString, {
    scale: 1.0,
    backgroundColor: "#FFFFFF",
    // You can add fonts if necessary
  });

  return Buffer.from(pngBuffer);
}
