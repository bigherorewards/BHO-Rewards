import Web3 from "web3"

let host = new Web3.providers.HttpProvider("./", 2)
let web3 = new Web3(host)
export const accounts = () => web3.eth.getAccounts()

