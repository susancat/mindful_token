This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

## Learn More
- for testing, please gain some faucet polygon at https://faucet.polygon.technology/
- web3: web3.js, web3model, walletConnect
- smart contract deployment: Remix
- Twitter OAuth: next-auth
- Database: mongoDB/mongoose
- frontend style: bootstrap
- IPFS API: NFT.storage

- about generating a metadata file when participant submitting an image and minting a mint pass, one possible solution is to generate and upload a metadata file to NFT.storage through NFT.storage (please refer to pages/mintpass.js file), but the difficulty is to setting tokenURI one by one because the original baseURI() function in ERC721 will give all the tokens the same path of baseURI (so the each single tokenURI would be `${baseURI}/${tokenId}`). But metadata uploaded here will generate URLs with different paths.

