import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"
import "@nomiclabs/hardhat-etherscan";
import "./task/block-number"
import "solidity-coverage"
import "@typechain/hardhat"



const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "http://localhost:8545"
const GOERLI1_PRIVATE_KEY = process.env.GOERLI1_PRIVATE_KEY || "fakekey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI1_PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'ETH'
  },
};
