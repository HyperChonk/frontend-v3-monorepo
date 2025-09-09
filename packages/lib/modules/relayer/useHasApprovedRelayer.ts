import { getNetworkConfig } from '@repo/lib/config/app.config'
import { SupportedChainId } from '@repo/lib/config/config.types'
import { balancerV2VaultAbi } from '@repo/lib/modules/web3/contracts/abi/generated'
import { useUserAccount } from '@repo/lib/modules/web3/UserAccountProvider'
import { zeroAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { useChainSwitch } from '../web3/useChainSwitch'

export function useHasApprovedRelayer(chainId: SupportedChainId) {
  const { isConnected, userAddress } = useUserAccount()
  const { shouldChangeNetwork } = useChainSwitch(chainId)
  const config = getNetworkConfig(chainId)

  const query = useReadContract({
    chainId,
    abi: balancerV2VaultAbi,
    address: config.contracts.balancer.vaultV2,
    account: userAddress,
    functionName: 'hasApprovedRelayer',
    args: [userAddress, config.contracts.balancer.relayerV6],
    query: {
      enabled:
        isConnected && !shouldChangeNetwork && config.contracts.balancer.vaultV2 !== zeroAddress,
    },
  })

  return {
    ...query,
    hasApprovedRelayer: query.data ?? false,
  }
}
