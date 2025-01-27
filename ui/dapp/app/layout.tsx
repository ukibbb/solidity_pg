"use client";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/global.css";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ThemeProvider } from "../components/theme-provider";
import { pulsechainV4 } from "wagmi/chains";
import { Navigation } from "@/components/main/Navigation";

const projectId = "5420cce62a20475728552fb3ad675fc9";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient();
  const config = getDefaultConfig({
    appName: "letsGamble",
    projectId,
    chains: [pulsechainV4],
  });
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <RainbowKitProvider showRecentTransactions={true}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Navigation>{children}</Navigation>
              </ThemeProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
