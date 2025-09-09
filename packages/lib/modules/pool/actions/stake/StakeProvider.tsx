'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { HumanAmount } from '@burrbear/sdk'
import { useTransactionSteps } from '@repo/lib/modules/transactions/transaction-steps/useTransactionSteps'
import { useUserAccount } from '@repo/lib/modules/web3/UserAccountProvider'
import { useTokenAllowances } from '@repo/lib/modules/web3/useTokenAllowances'
import { LABELS } from '@repo/lib/shared/labels'
import { useMandatoryContext } from '@repo/lib/shared/utils/contexts'
import { isDisabledWithReason } from '@repo/lib/shared/utils/functions/isDisabledWithReason'
import { bn } from '@repo/lib/shared/utils/numbers'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Address } from 'viem'
import { usePool } from '../../PoolProvider'
import { getUserWalletBalance, getUserWalletBalanceUsd } from '../../user-balance.helpers'
import { useStakeSteps } from './useStakeSteps'

export type UseStakeResponse = ReturnType<typeof useStakeLogic>
export const StakeContext = createContext<UseStakeResponse | null>(null)

export function useStakeLogic() {
  const { userAddress, isConnected } = useUserAccount()
  const { pool, chainId, isLoadingOnchainUserBalances } = usePool()
  const { isDisabled, disabledReason } = isDisabledWithReason([
    !isConnected,
    LABELS.walletNotConnected,
  ])

  // To maintain amount in modal after confirmation
  const [quoteAmountIn, setQuoteAmountIn] = useState<HumanAmount>('0')
  const [quoteAmountInUsd, setQuoteAmountInUsd] = useState<HumanAmount>('0')

  const tokenAllowances = useTokenAllowances({
    chainId,
    userAddress,
    spenderAddress: pool.staking?.address as Address,
    tokenAddresses: [pool.address as Address],
  })

  /**
   * Step construction
   */
  const { isLoadingSteps, steps } = useStakeSteps(pool)
  const transactionSteps = useTransactionSteps(steps, isLoadingSteps)

  const stakeTxHash = transactionSteps.lastTransaction?.result?.data?.transactionHash

  /**
   * Side-effects
   */
  useEffect(() => {
    const stakableBalance: HumanAmount = getUserWalletBalance(pool)
    const stakableBalanceUsd: HumanAmount = getUserWalletBalanceUsd(pool).toFixed() as HumanAmount

    if (bn(stakableBalance).gt(0)) {
      setQuoteAmountIn(stakableBalance)
      setQuoteAmountInUsd(stakableBalanceUsd)
    }
  }, [pool.userBalance?.walletBalance, isLoadingOnchainUserBalances])

  return {
    pool,
    transactionSteps,
    isDisabled,
    disabledReason,
    quoteAmountIn,
    quoteAmountInUsd,
    tokenAllowances,
    stakeTxHash,
    isLoading: isLoadingSteps,
  }
}

export function StakeProvider({ children }: PropsWithChildren) {
  const hook = useStakeLogic()
  return <StakeContext.Provider value={hook}>{children}</StakeContext.Provider>
}

export const useStake = (): UseStakeResponse => useMandatoryContext(StakeContext, 'Stake')
