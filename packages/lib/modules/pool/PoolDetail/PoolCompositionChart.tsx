import { Box, Skeleton, VStack } from '@chakra-ui/react'
import { useTokens } from '@repo/lib/modules/tokens/TokensProvider'
import ButtonGroup, {
  ButtonGroupOption,
} from '@repo/lib/shared/components/btns/button-group/ButtonGroup'
import { BurrCard } from '@repo/lib/shared/components/containers/BurrCard'
import { GqlChain } from '@repo/lib/shared/services/api/generated/graphql'
import { useState } from 'react'
import { getCompositionTokens, getFlatCompositionTokens } from '../pool-tokens.utils'
import { isQuantAmmPool } from '../pool.helpers'
import { Pool } from '../pool.types'
import { usePool } from '../PoolProvider'
import { PoolWeightChart } from './PoolWeightCharts/PoolWeightChart'
import { PoolWeightShiftsChart } from './PoolWeightCharts/PoolWeightShiftsChart'

const TABS_LIST: ButtonGroupOption[] = [
  { value: 'weight-shifts', label: 'Weight shifts' },
  { value: 'composition', label: 'Composition' },
]

interface CompositionViewProps {
  chain: GqlChain
  heightPx: number
  isMobile: boolean
  pool: Pool
  totalLiquidity: string
}

function CompositionView({ chain, pool, totalLiquidity }: CompositionViewProps) {
  return (
    <>
      <PoolWeightChart
        chain={chain}
        displayTokens={getFlatCompositionTokens(pool)}
        hasLegend
        totalLiquidity={totalLiquidity}
      />
    </>
  )
}

export function PoolCompositionChart({ height, isMobile }: { height: number; isMobile: boolean }) {
  const { chain, isLoading, pool } = usePool()
  const { calcTotalUsdValue } = useTokens()

  const isQuantAmm = isQuantAmmPool(pool.type)
  const [activeTab, setActiveTab] = useState(TABS_LIST[isQuantAmm ? 0 : 1])

  const compositionTokens = getCompositionTokens(pool)
  const totalLiquidity = calcTotalUsdValue(compositionTokens, chain)
  const heightPx = height - 35

  const compositionViewProps: CompositionViewProps = {
    chain,
    heightPx,
    isMobile,
    pool,
    totalLiquidity,
  }

  return (
    <BurrCard
      cardProps={{
        height: [isQuantAmm ? '395px' : '300px', `${heightPx}px`],
        overflow: 'hidden',
        position: 'relative',
      }}
      contentProps={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
    >
      {isLoading ? (
        <Skeleton h="full" w="full" />
      ) : isQuantAmm ? (
        <VStack h="full" p={{ base: 'sm', md: 'md' }} spacing="md" w="full">
          <Box alignSelf="flex-start">
            <ButtonGroup
              currentOption={activeTab}
              groupId="composition-chart"
              onChange={tab => setActiveTab(tab)}
              options={TABS_LIST}
              size="xxs"
            />
          </Box>
          {activeTab.value === 'weight-shifts' ? (
            <PoolWeightShiftsChart />
          ) : (
            <CompositionView {...compositionViewProps} />
          )}
        </VStack>
      ) : (
        <CompositionView {...compositionViewProps} />
      )}
    </BurrCard>
  )
}
