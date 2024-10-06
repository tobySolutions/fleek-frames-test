export default class Svg {
	constructor(opts = { width: 800, height: 800, fontSize: 60, fontFamily: "sans-serif" }) {
	  this.opts = opts;
	  this.elements = [];
	}
  
	clear() {
	  this.elements = [];
	}
  
	drawBackground(color) {
	  const { width, height } = this.opts;
	  this.elements.push(`<rect width="${width}" height="${height}" fill="${color}" />`);
	}
  
	drawTextCentered(text, options = {}) {
	  const { x, y, fontSize, color, fontFamily } = {
		x: this.opts.width / 2,
		y: this.opts.height / 2,
		fontSize: this.opts.fontSize,
		color: "#000000",
		fontFamily: this.opts.fontFamily,
		...options,
	  };
	  const textElement = `<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" font-family="${fontFamily}" text-anchor="middle" alignment-baseline="middle">${text}</text>`;
	  this.elements.push(textElement);
	}
  
	render() {
	  const { width, height } = this.opts;
	  const svgContent = this.elements.join("\n");
	  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">\n${svgContent}\n</svg>`;
	  return svg;
	}
  }
  