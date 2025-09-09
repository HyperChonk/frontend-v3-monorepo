import { HyperChonkLogoType } from '@bal/lib/components/imgs/HyperChonkLogoType'
import { NavBarContainer } from '@bal/lib/components/navs/NavBarContainer'
import { ThemeProvider } from '@bal/lib/services/chakra/ThemeProvider'
import '@repo/lib/assets/css/global.css'
import { chillax } from '@repo/lib/assets/fonts/chillax/chillax'
import { inter } from '@repo/lib/assets/fonts/inter/inter'
import { Footer } from '@repo/lib/shared/components/navs/Footer'
import { Providers } from '@repo/lib/shared/components/site/providers'
import { Fathom } from '@repo/lib/shared/services/fathom/Fathom'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import { ThemeProvider as ColorThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { PropsWithChildren } from 'react'
import { OpenWidget } from '@repo/lib/shared/components/other/OpenWidget'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'

export const metadata: Metadata = {
  title: 'HyperChonk DeFi Liquidity Pools',
  description: `HyperChonk is a stablecoin-focused DEX on HyperEVM featuring Chonky Pools for yield-boosting via lending, high-efficiency RWA Pools, and classic Volatile Pools for unpegged asset trading.`,
  icons: [
    { rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-light.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon-dark.png',
      media: '(prefers-color-scheme: dark)',
    },
  ],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://w.appzi.io/w.js?token=q3jIa" />
      </head>
      <body
        className={`${inter.className} ${chillax.variable} `}
        style={{ marginRight: '0px !important' }} // Required to prevent layout shift introduced by Rainbowkit
        suppressHydrationWarning
      >
        <Fathom />
        <NextTopLoader color="#68fcbe" showSpinner={false} />
        <ColorThemeProvider defaultTheme="dark">
          <ThemeProvider>
            <Providers>
              <NavBarContainer />
              {children}
              <Footer
                logoType={<HyperChonkLogoType />}
                subTitle=""
                title=""
                // subTitle="HyperChonk isn't just a toolkit — it's a full-send AMM experience. Strong, simple, and unapologetically chonky."
                // title="AMMs with Extra Chonk."
              />
              <SpeedInsights />
              <OpenWidget organizationId={PROJECT_CONFIG.openWidgetOrganizationId} />
            </Providers>
          </ThemeProvider>
        </ColorThemeProvider>
      </body>
    </html>
  )
}
