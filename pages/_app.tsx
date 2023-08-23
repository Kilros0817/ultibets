import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createClient, WagmiConfig, Chain } from 'wagmi';
import { polygon } from "wagmi/chains";
import { publicProvider } from 'wagmi/providers/public';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import sal from 'sal.js'
import './../node_modules/sal.js/dist/sal.css'
import Head from 'next/head'
import "./utbets-token/token-information/Pie.scss";
import store from '../store';
import Layout from '../layouts/layout'
import theme from '../utils/theme'

const polygonMumbai = {
  id: 80_001,
  name: 'Mumbai Chain',
  network: 'mumbai',
  nativeCurrency: {
    decimals: 18,
    name: 'Mumbai Chain',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: { http: ['https://empty-yolo-water.matic-testnet.quiknode.pro/8ff24115b3f512f968a2e9f858043f83cc3f9198/'] },
  },
  blockExplorers: {
    etherscan: { name: 'PolygonScan', url: 'https://mumbai.polygonscan.com/' },
    default: { name: 'PolygonScan', url: 'https://mumbai.polygonscan.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25_444_704,
    },
  },
} as Chain;

const bscTestnet = {
  id: 97,
  name: 'BNB Chain',
  network: 'bscTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB Chain',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: { http: ['https://attentive-twilight-frog.bsc-testnet.quiknode.pro/871c975adfdb298087b9b76e732be732fa499731/'] },
  },
  blockExplorers: {
    etherscan: { name: 'BSCScan', url: 'https://testnet.bscscan.com/' },
    default: { name: 'BSCScan', url: 'https://testnet.bscscan.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 17_419_571,
    },
  },
} as Chain;

const avalancheFuji = {
  id: 43_113,
  name: 'Avalanche Chain',
  network: 'avalancheFuji',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche Chain',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://multi-white-crater.avalanche-testnet.quiknode.pro/b581ac962a5564a662d2aa74bac0d55f2d6bfb38/ext/bc/C/rpc/'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7_096_959,
    },
  },
} as Chain;

const optimismGoerli = {
  id: 420,
  name: "Optimism Goerli",
  network: "optimism-goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://lively-serene-snow.optimism-goerli.quiknode.pro/fbfc891a24e2b980e162877223148913550f1c55/"]
    }
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io"
    },
    default: {
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 13_234_104
    }
  },
  testnet: true
} as Chain;



const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? [
    ] : [
      polygon,
      avalancheFuji,
      bscTestnet,
      polygonMumbai,
      optimismGoerli
    ])
  ],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sal({ threshold: 0.1, once: true } as any)
  }, [router.asPath])

  useEffect(() => {
    sal()
    setReady(true);
  }, [])

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="logo-final.svg" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter&family=Nunito&display=swap');
        </style>
        <title>UltiBets | Main App</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="UltiBets.com" />
        <meta property="og:image" content="/images/ultibets-logo.svg" />
        <meta property="og:image:url" content="/images/ultibets-logo.svg" />
        <meta property="og:image:alt" content="Visit UltiBets" />
        <meta property="og:title" content="UltiBets.com" />
        <meta property="og:description" content="Join UltiBets, the first-ever Cryptocurrency Multichain Prediction Market & GameFi Platform operating on four different blockchains: Avalanche, BSC, Optimism, and Polygon. We offer a truly decentralized and immersive experience for crypto enthusiasts. Join us now and start making winning predictions!" />
      </Head>
      {
        ready ? (
          <Provider store={store}>
              <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                  <ChakraProvider theme={theme}>
                    <Layout>
                      <Component {...pageProps} />
                      <ToastContainer position="top-center" />
                    </Layout>
                  </ChakraProvider>
                </RainbowKitProvider>
              </WagmiConfig>
          </Provider>
        ) : null
      }
    </>
  )
}

export default MyApp
