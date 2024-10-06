// import necessary modules
import { render, db } from "./lib/gameloop.js";
import { createWelcomeImage } from "./lib/imageGenerator.js";

export default function bootstrap(HUB_URL) {
  // Initialize the in-memory database if not already initialized
  if (!db.state) {
    db.state = { message: "Welcome" };
  }

  const renderHome = `
  <html lang="en">
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="of:accepts:xmtp" content="2024-02-01" />
      <meta property="fc:frame:image" content="https://flk-ipfs.xyz/ipfs/bafkreigo5vlviglcv3vnbohfsdyoyorhlcuetsi75pyzdibredvprwoxbe" />
      <meta property="fc:frame:image:aspect_ratio" content="1.91:1"/>
      <meta property="fc:frame:post_url" content="${HUB_URL}/?r=3" />
      <meta property="fc:frame:button:1" content="Let's play!" />
      <meta property="fc:frame:button:1:action" content="post" />
      <title>Fleek Test</title>
    </head>
    <body>
      <h1>Frame test</h1>
      <p>Click the button to start playing in warpcast</p>
      <a href="https://github.com/tobySolutions/fleek-frames-test">Source code</a>
    </body>
  </html>
  `;

  function getHtml(HUB_URL, imageDataUrl) {
    let framePostUrl = HUB_URL + "/";

    const stateString = encodeURIComponent(JSON.stringify(db.state));

    const str = `
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="of:accepts:xmtp" content="2024-02-01" />
        <meta property="fc:frame:image" content="${imageDataUrl}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1"/>
        <meta property="fc:frame:post_url" content="${framePostUrl}?r=3" />
        <meta property="fc:frame:input:text" content="Enter custom fruit..." />
        <meta property="fc:frame:button:1" content="Apples" data-value="apples" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:button:2" content="Oranges" data-value="oranges" />
        <meta property="fc:frame:button:2:action" content="post" />
        <meta property="fc:frame:button:3" content="Bananas" data-value="bananas" />
        <meta property="fc:frame:button:3:action" content="post" />
        <meta property="fc:frame:state" content="${stateString}" />
        <title>Fleek Test</title>
      </head>
    </html>
    `;

    return str;
  }

  async function POST({ request }) {
    let data = request.body && request.body.untrustedData;
    data = data || {};

    let fruitName = "";

    if (data.buttonIndex === "1" && !data.inputText) {
      const imageDataUrl = await createWelcomeImage(db.state);
      const html = getHtml(HUB_URL, imageDataUrl);
      return html;
    } else if (data.inputText) {
      // Handle text input from the user
      fruitName = data.inputText.trim();
    } else if (data.buttonIndex !== undefined) {
      // Handle fruit selection buttons
      const buttonIndex = data.buttonIndex.toString(); // Convert to string
      console.log("buttonIndex:", buttonIndex, "Type:", typeof buttonIndex);
      switch (buttonIndex) {
        case "1":
          fruitName = "Apples";
          break;
        case "2":
          fruitName = "Oranges";
          break;
        case "3":
          fruitName = "Bananas";
          break;
        default:
          fruitName = "";
      }
    } else {
      return renderHome;
    }

    if (fruitName) {
      db.state = { message: "Welcome " + fruitName };

      const imageDataUrl = await createWelcomeImage(db.state);

      const html = getHtml(HUB_URL, imageDataUrl);

      return html;
    } else {
      const imageDataUrl = await createWelcomeImage(db.state);
      const html = getHtml(HUB_URL, imageDataUrl);
      return html;
    }
  }

  return { POST };
}
