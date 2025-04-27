import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Urdu to Devanagari Translator",
  description: "Easily translate Urdu text to Devanagari script using AI4Bharat's IndicXlit model",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>
          {`
            @font-face {
              font-family: 'Noto Nastaliq Urdu';
              src: url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap');
              font-weight: normal;
              font-style: normal;
            }
            
            @font-face {
              font-family: 'Noto Sans Devanagari';
              src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap');
              font-weight: normal;
              font-style: normal;
            }
            
            .font-urdu {
              font-family: 'Noto Nastaliq Urdu', serif;
            }
            
            .font-devanagari {
              font-family: 'Noto Sans Devanagari', sans-serif;
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
