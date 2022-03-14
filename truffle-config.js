require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: "./client/contracts",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    matic: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC.toString().trim(),
          },
          addressIndex: 1,
          privateKeys: [process.env.PRIVATE_KEY],
          providerOrUrl: `https://matic-mumbai.chainstacklabs.com`,
        }),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      gas: 6000000,
      gasPrice: 10000000000,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "^0.8.7",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
