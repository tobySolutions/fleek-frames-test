
import { svg2png, initialize } from 'svg2png-wasm';

import svg2png_wasm_bg from 'svg2png-wasm/svg2png_wasm_bg.wasm';
//import roboto from './MonaspaceArgon-Regular.otf';
import roboto from '../Roboto-Regular.ttf';

let isInit = false;

export default async function main(svg) {
    if(!isInit) {
        await initialize(svg2png_wasm_bg());
        isInit = true;
    }
    const png = await svg2png(
        svg, {
            scale: 0.5,
            backgroundColor: 'black', // optional
            fonts: [roboto],
            defaultFontFamily: {
                sansSerifFamily: "Roboto",
                serifFamily: "Roboto",
                cursiveFamily: "Roboto",
                fantasyFamily: "Roboto",
                monospaceFamily: "Roboto",
                monospace: "Roboto",
            },
        }
    )
    return png;
}
