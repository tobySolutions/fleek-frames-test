import bootstrap from "./dist/index.js";

export const main = (request) => {
  const { POST } = bootstrap(
    window
      ? "https://fleek-test.network/services/1/ipfs/" + window.location.host
      : "https://fleek-test.network/services/1/ipfs/bafybeifofhb5ygs2vxaio4to2q7ybnho65lu52c2udgqhmunzvvuwfcbye"
  );
  return POST({ request });
};
// npm run build
// fleek functions deploy  --name fudGame --path fleek.js
// fleek functions deploy  --name bootstrap --path ./dist/index.js