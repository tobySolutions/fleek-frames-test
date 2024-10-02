import bootstrap from "./dist/index.js";

export const main = (request) => {
  const { POST } = bootstrap(
    window
      ? "https://fleek-test.network/services/1/ipfs/" + window.location.host
      : "https://fleek-test.network/services/1/ipfs/bafkreidgletb4otxorevoxk7vvggx5jxbwd64c6s3fggscq7hmkolnkmse"
  );
  return POST({ request });
};
// npm run build
// fleek functions deploy  --name fudGame --path fleek.js
// fleek functions deploy  --name bootstrap --path ./dist/index.js