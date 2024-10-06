import Svg from "./svg.js";
import svgToPng from "./svgToPng.js";

export async function createWelcomeImage(state) {
  const stateObj = JSON.parse(state);
  const message = stateObj.message;

  // Create an instance of the Svg class
  const svgDisplay = new Svg({
    width: 800,
    height: 800,
    fontSize: 60,
    fontFamily: "sans-serif",
  });

  // Clear any existing content
  svgDisplay.clear();

  // Draw the background
  svgDisplay.drawBackground("#000000");

  // Set text properties and draw the message
  svgDisplay.drawTextCentered(message, {
    x: 400, // Center of the image width
    y: 400, // Center of the image height
    fontSize: 60,
    color: "#FFFFFF",
    fontFamily: "sans-serif",
  });

  // Generate the SVG string
  const svgString = svgDisplay.render();

  // Convert SVG to PNG using svg2png-wasm
  const pngBuffer = await svgToPng(svgString);

  // Convert the PNG buffer to a Data URL
  const dataUrl = "data:image/png;base64," + pngBuffer.toString("base64");

  return dataUrl;
}
