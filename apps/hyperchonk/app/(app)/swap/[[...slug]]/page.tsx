import { SwapForm } from '@repo/lib/modules/swap/SwapForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swap tokens on HyperChonk',
  description: `Swap tokens on networks like Ethereum, Optimism, Arbitrum and Base via the HyperChonk decentralized exchange`,
}

export default function SwapPage() {
  return <SwapForm />
}
