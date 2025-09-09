import { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import arbitrum from './arbitrum'
import avalanche from './avalanche'
import base from './base'
import berachain from './berachain'
import fantom from './fantom'
import fraxtal from './fraxtal'
import gnosis from './gnosis'
import hyperevm from './hyperevm'
import hyperevmTestnet from './hyperevmTesnet'
import mainnet from './mainnet'
import mode from './mode'
import optimism from './optimism'
import polygon from './polygon'
import sepolia from './sepolia'
import sonic from './sonic'
import zkevm from './zkevm'

const networkConfigs = {
  [GqlChain.Arbitrum]: arbitrum,
  [GqlChain.Avalanche]: avalanche,
  [GqlChain.Base]: base,
  [GqlChain.Gnosis]: gnosis,
  [GqlChain.Mainnet]: mainnet,
  [GqlChain.Polygon]: polygon,
  [GqlChain.Zkevm]: zkevm,
  [GqlChain.Optimism]: optimism,
  [GqlChain.Sepolia]: sepolia,
  [GqlChain.Mode]: mode,
  [GqlChain.Fraxtal]: fraxtal,
  [GqlChain.Fantom]: fantom,
  [GqlChain.Sonic]: sonic,
  [GqlChain.Hyperevm]: hyperevm,
  [GqlChain.HyperevmTestnet]: hyperevmTestnet,
  [GqlChain.Berachain]: berachain,
}

export default networkConfigs
