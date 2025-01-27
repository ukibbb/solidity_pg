import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "Bet World",
  description: "More than a betting platform.",
};

// mt margin
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle className="fixed top-0 left-0 mt-2 ml-2 border-0" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
