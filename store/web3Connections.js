//web3 connection functions
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import abi from "../abi.json";

//start a connection to the web3 provider positively
const getWeb3Modal = async() => {
  const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "78e38e6a5a0e4fdd8708de1596ddcbb1",
          rpc: {
              1: "https://mainnet.mycustomnode.com",
              137: "https://polygon-rpc.com",
              80001: 'https://matic-mumbai.chainstacklabs.com',
            },
          supportedChainIds: [1, 137, 80001]
        }
    }
  };
  const web3Modal = new Web3Modal({
      network: 'mumbai',
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
  return web3Modal;
}

const connectWeb3 = async() => {
  if(!window.ethereum) throw new Error("No crypto wallet found!");
  try{
      const web3Modal = await getWeb3Modal();
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      await switchNetwork();
      return web3;
  } catch(err) {
      console.log(err);
  }
}

// const fetchChainId = async() => {
//   const web3 = await connectWeb3();
//   const chainId = await web3.eth.net.getId();
//   return chainId;
// }

export const connectAccount = async() => {
  const web3 = await connectWeb3();
  try { 
    const accounts = await web3.eth.getAccounts();
    const account = web3.utils.toChecksumAddress(accounts[0]);
    return account;
  } catch(err) {
    console.log(err)
  }
}

export const connectForBalance = async() => {
  const web3 = await connectWeb3();
  const account = await connectAccount();
  try { 
    const balInWei = await web3.eth.getBalance(account);
    const balanceWhole = web3.utils.fromWei(balInWei);
    const balance = parseFloat(balanceWhole).toFixed(5);
    return balance;
  } catch(err) {
    console.log(err);
  }
}

//check if web3 connection but not trigger connection positively
export const fetchWeb3 = async() => {
  if(!window.ethereum) throw new Error("No crypto wallet found!");
  let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } 
    const web3 = new Web3(provider);
    await switchNetwork();
    return web3;
}

export const fetchAccount = async() => {
  const web3 = await fetchWeb3();
  try { 
    const accounts = await web3.eth.getAccounts();
    const account = web3.utils.toChecksumAddress(accounts[0]);
    return account;
  } catch(err) {
    console.log(err)
  }
}

export const fetchBalance = async() => {
  const web3 = await fetchWeb3();
  const account = await fetchAccount();
  try { 
    const balInWei = await web3.eth.getBalance(account);
    const balanceWhole = web3.utils.fromWei(balInWei);
    const balance = parseFloat(balanceWhole).toFixed(5);
    return balance;
  } catch(err) {
    console.log(err);
  }
}

//common internal functions in calling order
export const connectionChanges = async() => {
  try{
        window.ethereum.on("accountsChanged", (accounts) => {
            fetchAccount();
            fetchBalance();
        });
    } catch(err){
        console.log(err)
    }
}

export const switchNetwork = async() => {
  if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(80001) }], // chainId must be in hexadecimal numbers
        })
        .catch(err => {
            console.log(err);
          }
        );
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '80001',
                  rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    } 
}

export const fetchContract = async() => {
  const web3 = await fetchWeb3();
  const contract = "0xD27713a2b92F4aeCA566cB9e601092F9174DE6ca";
  const mintpassContract = await new web3.eth.Contract(abi, contract);
  return mintpassContract;
}

//deactivate() will call wallet's close() function,but metamask doesn't have that
export const disconnect = async() => {
  try {
      const web3Modal = await getWeb3Modal();
      web3Modal.clearCachedProvider();
      // window.ethereum.on('disconnect',setAccount(null));
      return "";              
  } catch (err) {
      console.log(err)
  }
}


