'use client'
import { Button, Card, HStack, Heading, Skeleton, Stack, Text, VStack } from '@chakra-ui/react'
import { PoolName } from '@repo/lib/modules/pool/PoolName'
import { ClaimModal } from '@repo/lib/modules/pool/actions/claim/ClaimModal'
import { ClaimProvider } from '@repo/lib/modules/pool/actions/claim/ClaimProvider'
import { getUserReferenceTokens } from '@repo/lib/modules/pool/pool-tokens.utils'
import { isMaBeetsPool } from '@repo/lib/modules/pool/pool.helpers'
import { Pool } from '@repo/lib/modules/pool/pool.types'
import { ChainSlug, getChainSlug } from '@repo/lib/modules/pool/pool.utils'
import { ClaimNetworkPoolsLayout } from '@repo/lib/modules/portfolio/PortfolioClaim/ClaimNetworkPools/ClaimNetworkPoolsLayout'
import { usePortfolio } from '@repo/lib/modules/portfolio/PortfolioProvider'
import { TokenIconStack } from '@repo/lib/modules/tokens/TokenIconStack'
import { NetworkIcon } from '@repo/lib/shared/components/icons/NetworkIcon'
import { useCurrency } from '@repo/lib/shared/hooks/useCurrency'
import { capitalize } from 'lodash'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function ClaimNetworkPoolsLayoutWrapper() {
  const { toCurrency } = useCurrency()
  const { chain } = useParams()
  const {
    poolsByChainMap,
    poolRewardsMap,
    totalFiatClaimableBalanceByChain,
    isLoadingRewards,
    refetchClaimPoolData,
  } = usePortfolio()

  const gqlChain = getChainSlug(chain as ChainSlug)

  const pools = poolsByChainMap[gqlChain]
  const chainName = capitalize(chain as string)
  const claimableFiatBalance = totalFiatClaimableBalanceByChain[gqlChain]

  const [modalPools, setModalPools] = useState<Pool[]>([])

  const poolsWithClaims = useMemo(() => {
    if (!pools) return []

    return pools
      .filter(
        pool =>
          // filter out mabeets pool so it doesn't count and also filter out pools with no claims
          !isMaBeetsPool(pool.id) &&
          poolRewardsMap[pool.id]?.totalFiatClaimBalance?.isGreaterThan(0)
      )
      .sort(
        (a, b) =>
          // sort the pools according to pending fiat claim amount
          (poolRewardsMap[b.id]?.totalFiatClaimBalance?.toNumber() || 0) -
          (poolRewardsMap[a.id]?.totalFiatClaimBalance?.toNumber() || 0)
      )
  }, [pools, poolRewardsMap])

  const hasMultipleClaims = useMemo(() => poolsWithClaims.length > 1, [poolsWithClaims])

  const isClaimAllDisabled = useMemo(() => {
    const validClaims = pools?.filter(pool =>
      poolRewardsMap[pool.id]?.totalFiatClaimBalance?.isGreaterThan(0)
    )
    return validClaims.length === 0 || validClaims.length !== 1
  }, [pools, poolRewardsMap])

  return (
    <ClaimNetworkPoolsLayout backLink="/portfolio" title="Portfolio">
      <HStack justifyContent="space-between" pb="1">
        <HStack spacing="xs">
          <NetworkIcon chain={gqlChain} size={12} />
          <Stack spacing="none">
            <Heading size="md">{chainName} incentives</Heading>
          </Stack>
        </HStack>
        <Heading size="md" variant="special">
          {claimableFiatBalance && toCurrency(claimableFiatBalance)}
        </Heading>
      </HStack>
      <Stack gap="md" py="4">
        {isLoadingRewards ? (
          <Skeleton height="126px" />
        ) : poolsWithClaims.length > 0 ? (
          poolsWithClaims.map(pool => (
            <Card key={pool.id} variant="subSection">
              <VStack align="start">
                <HStack w="full">
                  <PoolName fontSize="lg" fontWeight="bold" pool={pool} />
                  <Text fontWeight="bold" ml="auto" variant="special">
                    {toCurrency(poolRewardsMap[pool.id]?.totalFiatClaimBalance?.toNumber() || 0)}
                  </Text>
                </HStack>
                <HStack w="full">
                  <TokenIconStack
                    chain={pool.chain}
                    size={36}
                    tokens={getUserReferenceTokens(pool)}
                  />
                  {hasMultipleClaims && (
                    <Button
                      minW="60px"
                      ml="auto"
                      onClick={() => {
                        setModalPools([pool])
                      }}
                      size="sm"
                      variant="secondary"
                    >
                      Claim
                    </Button>
                  )}
                </HStack>
              </VStack>
            </Card>
          ))
        ) : (
          <Text p="10" textAlign="center" variant="secondary">
            You have no liquidity incentives to claim
          </Text>
        )}
      </Stack>
      {poolsWithClaims.length > 0 && (
        <Button
          isDisabled={isClaimAllDisabled}
          onClick={() => {
            setModalPools(poolsWithClaims)
          }}
          size="lg"
          variant="secondary"
          width="100%"
        >
          {`Claim${hasMultipleClaims ? ' all' : ''}`}
        </Button>
      )}
      {modalPools.length > 0 && (
        <ClaimProvider pools={modalPools}>
          <ClaimModal
            chain={gqlChain}
            isOpen={modalPools.length > 0}
            onClose={(isSuccess: boolean) => {
              if (isSuccess) {
                refetchClaimPoolData()
              }

              setModalPools([])
            }}
          />
        </ClaimProvider>
      )}
    </ClaimNetworkPoolsLayout>
  )
}
