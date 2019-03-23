require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {

  networks: {
    ropsten: {
      provider: function() { 
        return new HDWalletProvider( 
          process.env.MNEMONIC,
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
      ) },
      gasPrice: 25000000000,
      network_id: 3,
      skipDryRun: true
    },
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.4.24",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       }
      }
    }
  }
}
