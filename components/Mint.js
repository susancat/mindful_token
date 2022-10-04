import { useWeb3React } from "@web3-react/core";

import NFT from '../build/contracts/MindfulOcean.json';
require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");

const { account } = useWeb3React();
const mnemonic = process.env.MNEMONIC
const private_key = process.env.PRIVATE_KEY
const matic_url = process.env.MATIC_RPC_URL
const mumbai_url = process.env.MUMBAI_RPC_URL
const NFT_CONTRACT_ADDRESS = "0xD5dfc36463bb0E6a303d13915C3eB76D3Ab2e245";
const OWNER_ADDRESS = account;
const NUM_ITEMS = 5;//number of hft each user can mint

const NFT_ABI = NFT.abi;

async function mint() {
    try {
      //*define web3, contract and wallet instances
      const provider = new new HDWalletProvider(private_key, mumbai_url);
  
      const web3Instance = new web3(provider);
  
      const nftContract = new web3Instance.eth.Contract(
        NFT_ABI,
        NFT_CONTRACT_ADDRESS,
      );
  
  
        //* just mint:use my drawing.png as an test example
      await nftContract.methods
        .createMONFT(OWNER_ADDRESS, `https://ipfs.io/ipfs/bafybeidmaf2sbynirqs3ywqufwv6qnevaz33tnbxry5znc6arot2p4w7ae`)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));
  
  
      //* mint for a certain amount
      /*
      for (var i = 1; i < NUM_ITEMS; i++) {
        await nftContract.methods
          .mintItem(OWNER_ADDRESS, `https://ipfs.io/ipfs/QmZ13J2TyXTKjjyA46rYENRQYxEKjGtG6qyxUSXwhJZmZt/${i}.json`)
          .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));
      }
      */
    }
    
    catch (e) {
      console.log(e)
    }
  }
  
  //invoke
  mint().then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
    //when click "mint" at navbar, call mint function above and import this component to Nav.js