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