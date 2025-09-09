import { PERMIT2, balancerV3Contracts } from '@burrbear/sdk'
import { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { convertHexToLowerCase } from '@repo/lib/shared/utils/objects'
import { zeroAddress } from 'viem'
import { berachain } from 'viem/chains'
import { NetworkConfig } from '../config.types'

const networkConfig: NetworkConfig = {
  chainId: 80094,
  name: 'Berachain Mainnet',
  shortName: 'Berachain',
  chain: GqlChain.Berachain,
  iconPath: '/images/chains/BERACHAIN.svg',
  blockExplorer: {
    baseUrl: 'https://berascan.com',
    name: 'Berachain Blockchain Explorer',
  },
  tokens: {
    addresses: {
      bal: '0x28e0e3b9817012b356119df9e217c25932d609c2',
      wNativeAsset: '0x6969696969696969696969696969696969696969',
    },
    nativeAsset: {
      name: 'BERA',
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'BERA',
      decimals: 18,
    },
    supportedWrappers: [],
    /**
     * The approval function for these tokens doesn't allow setting a new approval
     * level if the current level is > 0. Thus they must be approved in two steps
     * first setting to 0 then setting to the required amount.
     */
    doubleApprovalRequired: [],
    defaultSwapTokens: {
      tokenIn: '0x0000000000000000000000000000000000000000',
    },
    popularTokens: {},
  },
  contracts: {
    multicall2: '0xcA11bde05977b3631167028862bE2a173976CA11',
    balancer: {
      vaultV2: '0xBE09E71BDc7b8a50A05F7291920590505e3C7744',
      vaultV3: balancerV3Contracts.Vault[berachain.id],
      relayerV6: zeroAddress,
      minter: '0x487822DcB1e7EB66E76EB53798f48d8E152667d1',
      router: balancerV3Contracts.Router[berachain.id],
      batchRouter: balancerV3Contracts.BatchRouter[berachain.id],

      compositeLiquidityRouterBoosted: balancerV3Contracts.CompositeLiquidityRouter[berachain.id],
      WeightedPool2TokensFactory: zeroAddress,
      vaultAdminV3: balancerV3Contracts.VaultAdmin[berachain.id],
    },
    feeDistributor: zeroAddress,
    veDelegationProxy: zeroAddress,
    veBAL: zeroAddress,
    omniVotingEscrow: zeroAddress,
    permit2: PERMIT2[berachain.id],
    gaugeController: zeroAddress,
  },
  pools: convertHexToLowerCase({
    issues: {},
    disallowNestedActions: [],
  }),
  lbps: {
    collateralTokens: [],
  },
} as const satisfies NetworkConfig

export default networkConfig
