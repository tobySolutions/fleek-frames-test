//import {Message, getSSLHubRpcClient} from "@farcaster/hub-nodejs";

import { render, db } from "./lib/gameloop.js";

export default function bootstrap(HUB_URL) {
  // @todo state should be validated with framecast

  function getHtml() {
    let framePostUrl = HUB_URL + "/";

    // @todo for now we only have one move buttons but if user is in a stair or item we should change the options
    const str = `
  <html lang="en">
            <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="of:accepts:xmtp" content="2024-02-01" />
            <meta property="fc:frame:image" content="https://flk-ipfs.xyz/ipfs/bafkreigo5vlviglcv3vnbohfsdyoyorhlcuetsi75pyzdibredvprwoxbe" />
            <meta property="fc:frame:image:aspect_ratio" content="1:1" />
            <meta property="fc:frame:post_url" content="${framePostUrl}?r=3" />
            <meta property="fc:frame:input:text" content="Enter custom fruit..." />
            <meta property="fc:frame:button:1" content="Apples" data-value="apples"/>
            <meta property="fc:frame:button:1:action" content="post"/>
            <meta property="fc:frame:button:2" content="Oranges" data-value="oranges"/>
            <meta property="fc:frame:button:2:action" content="post"/>
            <meta property="fc:frame:button:3" content="Bananas" data-value="bananas"/>
            <meta property="fc:frame:button:3:acti on" content="post"/>
            <meta property="fc:frame:state" content="${db.state}" />
 
            <title>Fleek Test</title>
            </head>
          </html>`;

    return str;
  }

  const renderHome = `
  <html lang="en">
            <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="of:accepts:xmtp" content="2024-02-01" />
            <meta property="fc:frame:image" content="https://flk-ipfs.xyz/ipfs/bafkreigo5vlviglcv3vnbohfsdyoyorhlcuetsi75pyzdibredvprwoxbe" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1"/>
            <meta property="fc:frame:post_url" content="${HUB_URL}/?r=3" />
            <meta property="fc:frame:button:1" content="Lets play!" />
            <title>Fleek Test</title>
    
            </head>
            <body>
            <h1>Frame test</h1>
            <p>Click the button to start playing in warpcast</p>
            <a href="https://warpcast.com/an0n/0x3748eeea" class="button">Lets play!</a><br />
            <a href="https://github.com/eugenioclrc/fleek-user-dungeons">Source code</a>
            </body>
          </html>
          `;

  async function POST({ request }) {
    let data = request.body && request.body.untrustedData;
    data = data || {};
    if (data.state) {
      db.state = data.state;
    }

    if (!data.buttonIndex) {
      return renderHome;
    }

    // const image = await render(data.fid, data.buttonIndex);
    const html = String(getHtml(HUB_URL));
    delete db.state;
    return html;
  }

  return { POST };
}
