import Web3 from "web3"
type ApolloResolver<Root = any, T = any, Context = any, R = any> = (root: Root, args: T, ctx: Context) => R | Promise<R>
type AP<T = {}, R> = ApolloResolver<{}, T, any, R>
let host = new Web3.providers.HttpProvider("./", 2)
let web3 = new Web3(host)
export const accounts: AP<{}, string[]> = () => web3.eth.getAccounts()
export const block: AP<{
  address: string
}, string> = (_, {address}) => web3.eth.getBalance(address, 'latest')