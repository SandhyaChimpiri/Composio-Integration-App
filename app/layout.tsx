import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientProvider } from "@/components/client-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// Import local fonts
const faunaFont = localFont({
  src: "./fonts/fauna-thin.ttf",
  variable: "--font-fauna",
  display: "swap",
});

const allianceFont = localFont({
  src: "./fonts/AllianceNo2-Regular.woff",
  variable: "--font-alliance",
  display: "swap",
});

const tataFont = localFont({
  src: "./fonts/TT_Firs_Neue_Trial_Var_Roman.ttf",
  variable: "--font-tata-firs-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Composio Integration Dashboard",
  description:
    "Manage your Composio apps, integrations, actions, and connections",
  generator: "Composio Dashboard",
  keywords: [
    "composio",
    "integrations",
    "actions",
    "api",
    "dashboard",
    "connections",
  ],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${faunaFont.variable} ${allianceFont.variable} ${tataFont.variable}`}
    >
      <body
        className={`${geistSans.className} font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ClientProvider>{children}</ClientProvider>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
