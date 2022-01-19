//const ganache = require('ganache-cli');
//const web3 = new Web3(ganache.provider());
const Web3 = require('web3');
const networks = require('./networks.json');
const web3 = new Web3(new Web3.providers.HttpProvider(networks.mainnet));
const contract = require('./contractAddresses.json');
const tokenABI = require('./chainlinkABI.json');
const wallets = require('./walletAddresses.json');
const etherscan_apikey = "WFNEX4S15R9XXQBJ5QVCZK1F2NG8PGMIIK";
addressURL = contract;
//const axios = require("axios");
const fetch = require('node-fetch');
//const { url } = require('node:inspector');

// Fix the main() async function. It has to be internalized in tokenBalance()
// main() should return the "abi" for L27


async function getAbi() {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${addressURL.anyswap}&apikey=${etherscan_apikey}` ;
  const response = await fetch(url);
  const data = await response.json();
  const abi = data.result;
  return abi;
  //res = await axios.get(url);
  //const abi = JSON.parse(res.data.result);
  //console.log(abi);
}

// Get balance of selected token:
async function tokenBalance(someAddress) {
    const abi = await getAbi();
    const contractAbi = JSON.parse(abi);
    const tokenInstance = await new web3.eth.Contract(contractAbi,contract.anyswap);
    const rawbal = await tokenInstance.methods.balanceOf(someAddress).call();
    const bal = await web3.utils.fromWei(rawbal);
    console.log(bal);
}
tokenBalance(wallets.brave);



