//const ganache = require('ganache-cli');
//const web3 = new Web3(ganache.provider());
const Web3 = require('web3');
const networks = require('./inputs/networks.json');
const web3 = new Web3(new Web3.providers.HttpProvider(networks.mainnet));
const contract = require('./inputs/erc20Contracts.json');
const tokenABI = require('./inputs/chainlinkABI.json');
const wallet = require('./walletArray')
require('dotenv').config()
const etherscan_apikey = process.env.ETHERSCAN_APIKEY;


addressURL = contract;
//const axios = require("axios");
const fetch = require('node-fetch');
//const { url } = require('node:inspector');

// Fix the main() async function. It has to be internalized in tokenBalance()
// main() should return the "abi" for L27


async function getAbi() {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${addressURL.chainlink}&apikey=${etherscan_apikey}` ;
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
    const tokenInstance = await new web3.eth.Contract(contractAbi,contract.chainlink);
    const rawbal = await tokenInstance.methods.balanceOf(someAddress).call();
    const bal = await web3.utils.fromWei(rawbal);
    console.log(bal);
}

for ( let node of wallet ) {

  tokenBalance(node);
  
}



