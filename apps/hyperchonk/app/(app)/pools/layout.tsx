import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'HyperChonk DeFi Liquidity Pools',
  description: `
    HyperChonk is a stablecoin-focused DEX on HyperEVM featuring Chonky Pools
    for yield-boosting via lending, high-efficiency RWA Pools, and classic
    Volatile Pools for unpegged asset trading.
  `,
}

export default async function Pools({ children }: PropsWithChildren) {
  return <>{children}</>
}
