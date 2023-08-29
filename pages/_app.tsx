import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { connectorsForWallets, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai, optimismGoerli, avalancheFuji, bscTestnet } from "@wagmi/core/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
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


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? [
    ] : [
      avalancheFuji,
      bscTestnet,
      polygonMumbai,
      optimismGoerli
    ])
  ],
  [
    alchemyProvider({apiKey: "SQOWu4glSvD5HKThQY-wpMV2nOHD5B3X"}),
    publicProvider(),
  ]
);

const projectId = "149f84ff95a763d7bccbb4f6cd3cf883";

const { wallets } = getDefaultWallets({
  appName: "Ultibets",
  projectId: projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
])

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
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
              <WagmiConfig config={config}>
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
