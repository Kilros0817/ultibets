import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { connectorsForWallets, getDefaultWallets, RainbowKitProvider, createAuthenticationAdapter, RainbowKitAuthenticationProvider, AuthenticationStatus } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  trustWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { avalancheFuji, bscTestnet, polygon } from "@wagmi/core/chains";
import { publicProvider } from 'wagmi/providers/public';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react'
import { Provider } from 'react-redux';
import { SiweMessage } from 'siwe';
import sal from 'sal.js'
import './../node_modules/sal.js/dist/sal.css'
import Head from 'next/head'
import "./utbets-token/token-information/Pie.scss";
import store from '../store';
import Layout from '../layouts/layout'
import theme from '../utils/theme'
import { arbitrumGoerli, polygonMumbai } from '../utils/networks';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_MAINNET_OR_TESTNET == "mainnet" ? [
    ] : [
      polygon,
      arbitrumGoerli,
      avalancheFuji,
      bscTestnet,
      polygonMumbai,
    ])
  ],
  [
    publicProvider(),
  ]
);

const projectId = "a10bb5aab9167131c79cc6df874d98af";

const { wallets } = getDefaultWallets({
  appName: "Ultibets",
  projectId: projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      trustWallet({projectId, chains}),
    ]
  }
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

  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('loading');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sal({ threshold: 0.1, once: true } as any)
  }, [router])

  useEffect(() => {
    sal()
    setReady(true);
  }, [])

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        const response = await fetch('/api/auth/me');
        const json = await response.json();
        setAuthStatus(json.address ? 'authenticated' : 'unauthenticated');
      } catch (_error) {
        setAuthStatus('unauthenticated');
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    // 1. page loads
    fetchStatus();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', fetchStatus);
    return () => window.removeEventListener('focus', fetchStatus);
  }, []);

  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch('/api/auth/nonce');
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Ethereum to the app.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce,
        });
      },

      getMessageBody: ({ message }) => {
        return message.prepareMessage();
      },

      verify: async ({ message, signature }) => {
        verifyingRef.current = true;

        try {
          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, signature }),
          });

          const authenticated = Boolean(response.ok);

          if (authenticated) {
            setAuthStatus(authenticated ? 'authenticated' : 'unauthenticated');
          }

          return authenticated;
        } catch (error) {
          return false;
        } finally {
          verifyingRef.current = false;
        }
      },

      signOut: async () => {
        setAuthStatus('unauthenticated');
        await fetch('/api/auth/logout');
      },
    });
  }, []);

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
        <meta property="og:description" content="Join UltiBets, the first-ever Cryptocurrency Multichain Prediction Market & GameFi Platform operating on four different blockchains: Arbitrum, Avalanche, BSC, and Polygon. We offer a truly decentralized and immersive experience for crypto enthusiasts. Join us now and start making winning predictions!" />
      </Head>
      {
        ready ? (
          <Provider store={store}>
            <WagmiConfig config={config}>
              <RainbowKitAuthenticationProvider
                adapter={authAdapter}
                status={authStatus}
              >
                <RainbowKitProvider chains={chains}>
                  <ChakraProvider theme={theme}>
                    <Layout>
                      <Component {...pageProps} />
                      <ToastContainer position="top-center" />
                    </Layout>
                  </ChakraProvider>
                </RainbowKitProvider>
              </RainbowKitAuthenticationProvider>
            </WagmiConfig>
          </Provider >
        ) : null
      }
    </>
  )
}

export default MyApp
