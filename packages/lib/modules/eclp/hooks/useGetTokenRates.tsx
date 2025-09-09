import { balancerV3Contracts, vaultExtensionAbi_V3 } from '@burrbear/sdk'
import { getChainId } from '@repo/lib/config/app.config'
import { GqlPoolType } from '@repo/lib/shared/services/api/generated/graphql'
import { useMemo } from 'react'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'
import { isV3Pool } from '../../pool/pool.helpers'
import { Pool } from '../../pool/pool.types'
import { gyroEclpPoolAbi } from '../../web3/contracts/abi/generated'

export function useGetTokenRates(pool: Pool) {
  const chainId = getChainId(pool.chain)
  const isV3 = isV3Pool(pool)

  const v3Vault: Address =
    balancerV3Contracts.Vault[chainId as keyof typeof balancerV3Contracts.Vault] || ('' as Address)
  const contractAddress: Address = isV3 ? v3Vault : (pool.address as Address)

  const query = useReadContract({
    chainId,
    abi: isV3 ? vaultExtensionAbi_V3 : gyroEclpPoolAbi,
    functionName: isV3 ? 'getPoolTokenRates' : 'getTokenRates',
    address: contractAddress,
    query: { enabled: pool.type === GqlPoolType.Gyroe },
    args: isV3 ? [pool.address as Address] : [],
  })

  const data = useMemo(() => {
    if (!query.data) return null
    return (isV3 ? query.data[1] : query.data) as [bigint, bigint]
  }, [query.data, isV3])

  return {
    ...query,
    data,
  }
}
