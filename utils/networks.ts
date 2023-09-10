import { Chain } from "wagmi";

export const polygonMumbai = {
  id: 80001,
  name: "Polygon Mumbai",
  network: "maticmum",
  nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
 },
  rpcUrls: {
      alchemy: {
          http:  ["https://polygon-mumbai.g.alchemy.com/v2"],
          webSocket:  ["wss://polygon-mumbai.g.alchemy.com/v2"],
     },
      infura: {
          http:  ["https://polygon-mumbai.infura.io/v3"],
          webSocket:  ["wss://polygon-mumbai.infura.io/ws/v3"],
     },
      default: {
          http:  ["https://matic-mumbai.chainstacklabs.com"],
     },
      public: {
          http:  ["https://polygon-mumbai.g.alchemy.com/v2/SQOWu4glSvD5HKThQY-wpMV2nOHD5B3X"],
     },
 },
  blockExplorers: {
      etherscan: {
          name: "PolygonScan",
          url: "https://mumbai.polygonscan.com",
     },
      default: {
          name: "PolygonScan",
          url: "https://mumbai.polygonscan.com",
     },
 },
  contracts: {
      multicall3: {
          address: "0xca11bde05977b3631167028862be2a173976ca11",
          blockCreated: 25770160,
     },
 },
  testnet: true,
} as Chain;

export const arbitrumGoerli = {
    id: 421613,
    name: "Arbitrum Goerli",
    network: "arbitrum-goerli",
    nativeCurrency: {
        name: "Arbitrum Goerli Ether",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        alchemy: {
            http: ["https://arb-goerli.g.alchemy.com/v2"],
            webSocket: ["wss://arb-goerli.g.alchemy.com/v2"],
        },
        infura: {
            http: ["https://arbitrum-goerli.infura.io/v3"],
            webSocket: ["wss://arbitrum-goerli.infura.io/ws/v3"],
        },
        default: {
            http: ["https://goerli-rollup.arbitrum.io/rpc"],
        },
        public: {
            http: ["https://arb-goerli.g.alchemy.com/v2/btl1mNqjNlVRsa6SDM-44fZSL_Fx60w9"],
        },
    },
    blockExplorers: {
        etherscan: {
            name: "Arbiscan",
            url: "https://goerli.arbiscan.io/",
        },
        default: {
            name: "Arbiscan",
            url: "https://goerli.arbiscan.io/",
        },
    },
    contracts: {
        multicall3: {
            address: "0xca11bde05977b3631167028862be2a173976ca11",
            blockCreated: 88114,
        },
    },
    testnet: true,
} as Chain;


// export const avalancheFuji = {
//     id: 43113,
//     name: "Avalanche Fuji",
//     network: "avalanche-fuji",
//     nativeCurrency: {
//         decimals: 18,
//         name: "Avalanche Fuji",
//         symbol: "AVAX",
//     },
//     rpcUrls: {
//         default: {
//             http: ["https://api.avax-test.network/ext/bc/C/rpc"],
//         },
//         public: {
//             http: ["https://blue-methodical-log.avalanche-testnet.quiknode.pro/30bd65de567880d32913c015df543918655554e1/ext/bc/C/rpc/"],
//         },
//     },
//     blockExplorers: {
//         etherscan: {
//             name: "SnowTrace",
//             url: "https://testnet.snowtrace.io",
//         },
//         default: {
//             name: "SnowTrace",
//             url: "https://testnet.snowtrace.io",
//         },
//     },
//     contracts: {
//         multicall3: {
//             address: "0xca11bde05977b3631167028862be2a173976ca11",
//             blockCreated: 7096959,
//         },
//     },
//     testnet: true,
// } as Chain;

// export const bscTestnet = {
//     id: 97,
//     name: "Binance Smart Chain Testnet",
//     network: "bsc-testnet",
//     nativeCurrency: {
//         decimals: 18,
//         name: "BNB",
//         symbol: "tBNB",
//     },
//     rpcUrls: {
//         default: {
//             http: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
//         },
//         public: {
//             http: ["https://smart-solitary-orb.bsc-testnet.quiknode.pro/7e146d49536f41e7b69c6d06f94a343cc4934760/"],
//         },
//     },
//     blockExplorers: {
//         etherscan: {
//             name: "BscScan",
//             url: "https://testnet.bscscan.com",
//         },
//         default: {
//             name: "BscScan",
//             url: "https://testnet.bscscan.com",
//         },
//     },
//     contracts: {
//         multicall3: {
//             address: "0xca11bde05977b3631167028862be2a173976ca11",
//             blockCreated: 17422483,
//         },
//     },
//     testnet: true,
// } as Chain;