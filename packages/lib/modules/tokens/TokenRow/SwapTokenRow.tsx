import { HumanAmount } from '@burrbear/sdk'
import { HStack, Text, VStack } from '@chakra-ui/react'
import { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { slippageDiffLabel } from '@repo/lib/shared/utils/slippage'
import { Address } from 'viem'
import { useSwap } from '../../swap/SwapProvider'
import TokenRow from './TokenRow'

export function ReceiptTokenOutRow({
  chain,
  actualReceivedTokenAmount,
  tokenAddress,
}: {
  chain: GqlChain
  actualReceivedTokenAmount: HumanAmount
  tokenAddress: string
}) {
  const { simulationQuery } = useSwap()
  const expectedTokenOut = simulationQuery?.data?.returnAmount as HumanAmount
  return (
    <SwapTokenRow
      chain={chain}
      label="You got"
      rightLabel={slippageDiffLabel(actualReceivedTokenAmount, expectedTokenOut)}
      tokenAddress={tokenAddress}
      tokenAmount={actualReceivedTokenAmount}
    />
  )
}

export function SwapTokenRow({
  label,
  rightLabel,
  chain,
  tokenAmount,
  tokenAddress,
}: {
  label: string
  chain: GqlChain
  tokenAmount: string
  tokenAddress: string
  rightLabel?: string
}) {
  return (
    <VStack align="start" spacing="md">
      <HStack justify="space-between" w="full">
        <Text color="font.primary" variant="primaryGradient">
          {label}
        </Text>
        {rightLabel && <Text color="font.primary">{rightLabel}</Text>}
      </HStack>

      <TokenRow
        abbreviated={false}
        address={tokenAddress as Address}
        chain={chain}
        value={tokenAmount}
      />
    </VStack>
  )
}
