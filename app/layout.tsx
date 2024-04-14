import type { Metadata } from "next";
import "../app/globals.css"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Providers from "./providers";
import OrganizationsContextProvider from "@/contexts/organizations.context";
import StackContextProvider from "@/contexts/stack.context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "getleads.dev",
  description: "Get leads as a developer by finding companies that use your favorite technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrganizationsContextProvider>
    <StackContextProvider>
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
    </StackContextProvider>
    </OrganizationsContextProvider>
  )
}

