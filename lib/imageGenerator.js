import Svg from "./svg.js";
import svgToPng from "./svgToPng.js";

export async function createWelcomeImage(state) {
  const message = state.message;

  const svgDisplay = new Svg({
    width: 800,
    height: 800,
    fontSize: 60,
    fontFamily: "sans-serif", // Use a generic font
  });

  svgDisplay.clear();

  svgDisplay.drawBackground("#000000");

  // Set text properties and draw the message
  svgDisplay.drawTextCentered(message, {
    x: 400, // Center of the image width
    y: 400, // Center of the image height
    fontSize: 60,
    color: "#FFFFFF",
    fontFamily: "sans-serif", // Ensure font is available
  });

  const svgString = svgDisplay.render();

  const dataUrl =
    "data:image/svg+xml;base64," + Buffer.from(svgString).toString("base64");

  return dataUrl;
}
