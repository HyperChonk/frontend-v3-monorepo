'use client'

import { Chain } from '@rainbow-me/rainbowkit'
import { shouldUseAnvilFork } from '@repo/lib/config/app.config'
import { PROJECT_CONFIG } from '@repo/lib/config/getProjectConfig'
import { hyperevm } from '@repo/lib/config/networks/customChains'
import { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { getBaseUrl } from '@repo/lib/shared/utils/urls'
import { defaultAnvilForkRpcUrl } from '@repo/lib/test/utils/wagmi/fork.helpers'
import { keyBy } from 'lodash'
import {
  arbitrum,
  avalanche,
  base,
  berachain,
  fantom,
  fraxtal,
  gnosis,
  mainnet,
  mode,
  optimism,
  polygon,
  polygonZkEvm,
  sepolia,
  sonic,
} from 'wagmi/chains'

/* If a request with the default rpc fails, it will fall back to the next one in the list.
  https://viem.sh/docs/clients/transports/fallback#fallback-transport
*/
export const rpcFallbacks: Record<GqlChain, string | undefined> = {
  [GqlChain.Mainnet]: 'https://eth.llamarpc.com',
  [GqlChain.Arbitrum]: 'https://arbitrum.llamarpc.com',
  [GqlChain.Base]: 'https://base.llamarpc.com',
  [GqlChain.Avalanche]: 'https://avalanche.drpc.org',
  [GqlChain.Fantom]: 'https://1rpc.io/ftm',
  [GqlChain.Gnosis]: 'https://gnosis.drpc.org',
  [GqlChain.Optimism]: 'https://optimism.drpc.org',
  [GqlChain.Polygon]: 'https://polygon.llamarpc.com',
  [GqlChain.Zkevm]: 'https://polygon-zkevm.drpc.org',
  [GqlChain.Sepolia]: 'https://sepolia.gateway.tenderly.co',
  [GqlChain.Mode]: 'https://mode.drpc.org',
  [GqlChain.Fraxtal]: 'https://fraxtal.drpc.org',
  [GqlChain.Sonic]: 'https://rpc.soniclabs.com',
  [GqlChain.Hyperevm]: 'https://hyperliquid.drpc.org',
  [GqlChain.HyperevmTestnet]: 'https://rpc.hyperliquid-testnet.xyz/evm',
  [GqlChain.Berachain]: 'https://rpc.berachain.com',
}

const baseUrl = getBaseUrl()
const getPrivateRpcUrl = (chain: GqlChain) => {
  // Use anvil fork for E2E dev tests
  if (shouldUseAnvilFork) return defaultAnvilForkRpcUrl
  return `${baseUrl}/api/rpc/${chain}`
}

export const rpcOverrides: Record<GqlChain, string | undefined> = {
  [GqlChain.Mainnet]: getPrivateRpcUrl(GqlChain.Mainnet),
  [GqlChain.Arbitrum]: getPrivateRpcUrl(GqlChain.Arbitrum),
  [GqlChain.Base]: getPrivateRpcUrl(GqlChain.Base),
  [GqlChain.Avalanche]: getPrivateRpcUrl(GqlChain.Avalanche),
  [GqlChain.Fantom]: getPrivateRpcUrl(GqlChain.Fantom),
  [GqlChain.Gnosis]: getPrivateRpcUrl(GqlChain.Gnosis),
  [GqlChain.Optimism]: getPrivateRpcUrl(GqlChain.Optimism),
  [GqlChain.Polygon]: getPrivateRpcUrl(GqlChain.Polygon),
  [GqlChain.Zkevm]: getPrivateRpcUrl(GqlChain.Zkevm),
  [GqlChain.Sepolia]: getPrivateRpcUrl(GqlChain.Sepolia),
  [GqlChain.Mode]: getPrivateRpcUrl(GqlChain.Mode),
  [GqlChain.Fraxtal]: getPrivateRpcUrl(GqlChain.Fraxtal),
  [GqlChain.Sonic]: getPrivateRpcUrl(GqlChain.Sonic),
  [GqlChain.Hyperevm]: undefined,
  [GqlChain.HyperevmTestnet]: undefined,
  [GqlChain.Berachain]: undefined,
}

const gqlChainToWagmiChainMap = {
  [GqlChain.Mainnet]: { iconUrl: '/images/chains/MAINNET.svg', ...mainnet },
  [GqlChain.Arbitrum]: { iconUrl: '/images/chains/ARBITRUM.svg', ...arbitrum },
  [GqlChain.Base]: { iconUrl: '/images/chains/BASE.svg', ...base },
  [GqlChain.Avalanche]: { iconUrl: '/images/chains/AVALANCHE.svg', ...avalanche },
  [GqlChain.Fantom]: { iconUrl: '/images/chains/FANTOM.svg', ...fantom },
  [GqlChain.Gnosis]: { iconUrl: '/images/chains/GNOSIS.svg', ...gnosis },
  [GqlChain.Optimism]: { iconUrl: '/images/chains/OPTIMISM.svg', ...optimism },
  [GqlChain.Polygon]: { iconUrl: '/images/chains/POLYGON.svg', ...polygon },
  [GqlChain.Zkevm]: { iconUrl: '/images/chains/ZKEVM.svg', ...polygonZkEvm },
  [GqlChain.Sepolia]: { iconUrl: '/images/chains/SEPOLIA.svg', ...sepolia },
  [GqlChain.Mode]: { iconUrl: '/images/chains/MODE.svg', ...mode },
  [GqlChain.Fraxtal]: { iconUrl: '/images/chains/FRAXTAL.svg', ...fraxtal },
  [GqlChain.Sonic]: { iconUrl: '/images/chains/SONIC.svg', ...sonic },
  [GqlChain.Hyperevm]: { iconUrl: '/images/chains/HYPEREVM.svg', ...hyperevm },
  [GqlChain.HyperevmTestnet]: { iconUrl: '/images/chains/HYPEREVM.svg', ...hyperevm },
  [GqlChain.Berachain]: { iconUrl: '/images/chains/BERACHAIN.svg', ...berachain },
} as const satisfies Record<GqlChain, Chain>

export const supportedNetworks = PROJECT_CONFIG.supportedNetworks
const chainToFilter = PROJECT_CONFIG.defaultNetwork
const customChain = gqlChainToWagmiChainMap[chainToFilter]

export const chains: readonly [Chain, ...Chain[]] = [
  customChain,
  ...supportedNetworks
    .filter(chain => chain !== chainToFilter)
    .map(gqlChain => gqlChainToWagmiChainMap[gqlChain]),
]

export const chainsByKey = keyBy(chains, 'id')
export function getDefaultRpcUrl(chainId: number) {
  return chainsByKey[chainId].rpcUrls.default.http[0]
}
