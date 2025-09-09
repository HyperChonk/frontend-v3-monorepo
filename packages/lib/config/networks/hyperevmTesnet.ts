import { PERMIT2, balancerV3Contracts } from '@burrbear/sdk'
import { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { convertHexToLowerCase } from '@repo/lib/shared/utils/objects'
import { zeroAddress } from 'viem'
import { NetworkConfig } from '../config.types'
import { hyperevm } from './customChains'

const networkConfig: NetworkConfig = {
  chainId: 998,
  name: 'Hyperliquid EVM Testnet',
  shortName: 'HyperEVM Testnet',
  chain: GqlChain.HyperevmTestnet,
  iconPath: '/images/chains/HYPEREVM.svg',
  blockExplorer: {
    baseUrl: 'https://testnet.purrsec.com/',
    name: 'HyperEVM Testnet Explorer',
  },
  tokens: {
    addresses: {
      bal: '0x58A501c3Cc724aB1Ac9184452C16E158d5122d48', // testBAL token (@todo: replace once official token is deployed)
      wNativeAsset: '0x5555555555555555555555555555555555555555',
    },
    nativeAsset: {
      name: 'HYPE',
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      symbol: 'HYPE',
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
      tokenIn: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    popularTokens: {},
  },
  contracts: {
    // @todo: these are hyperevm mainnet contracts, replace with testnet once available
    multicall2: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    balancer: {
      vaultV2: zeroAddress,
      vaultV3: balancerV3Contracts.Vault[hyperevm.id],
      relayerV6: zeroAddress,
      minter: zeroAddress,
      router: balancerV3Contracts.Router[hyperevm.id],
      batchRouter: balancerV3Contracts.BatchRouter[hyperevm.id],

      compositeLiquidityRouterBoosted: balancerV3Contracts.CompositeLiquidityRouter[hyperevm.id],
      WeightedPool2TokensFactory: zeroAddress,
      vaultAdminV3: balancerV3Contracts.VaultAdmin[hyperevm.id],
    },
    feeDistributor: zeroAddress,
    veDelegationProxy: zeroAddress,
    veBAL: zeroAddress,
    omniVotingEscrow: zeroAddress,
    permit2: PERMIT2[hyperevm.id],
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
