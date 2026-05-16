"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { WagmiProvider } from "wagmi";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { http, defineChain } from "viem";

const arcTestnet = defineChain({
  id: 5042002,

  name: "ARC Testnet",

  nativeCurrency: {
    decimals: 18,
    name: "ARC",
    symbol: "ARC",
  },

  rpcUrls: {
    default: {
      http: [
        "https://rpc.testnet.arc.network",
      ],
    },
  },
});

const config = getDefaultConfig({
  appName: "ARCZONE",

  projectId: "demo",

  chains: [arcTestnet],

  transports: {
    [arcTestnet.id]: http(),
  },
});

const queryClient =
  new QueryClient();

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider
        client={queryClient}
      >
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

