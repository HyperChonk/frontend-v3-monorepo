'use client'

import { Address } from '@burrbear/sdk'
import { useUserAccount } from '@repo/lib/modules/web3/UserAccountProvider'
import { useBalance } from 'wagmi'

export function useUserBalance({ chainId, token }: { chainId: number; token: Address }) {
  const { userAddress } = useUserAccount()
  const { data, isLoading, isError, error } = useBalance({
    chainId,
    address: userAddress,
    token,
  })

  return {
    balanceData: data,
    isLoading,
    isError,
    error,
  }
}
