'use client'

import { BoxProps, Card, CardProps, VStack } from '@chakra-ui/react'
import ButtonGroup, {
  ButtonGroupOption,
} from '@repo/lib/shared/components/btns/button-group/ButtonGroup'
import { BurrCard } from '@repo/lib/shared/components/containers/BurrCard'
import { useEffect, useState } from 'react'
import { usePool } from '../../../PoolProvider'
import { hasTotalBalance } from '../../../user-balance.helpers'
import { PoolSnapshotValues } from './PoolSnapshotValues'
import { UserSnapshotValues } from './UserSnapshotValues'

const COMMON_NOISY_CARD_PROPS: { contentProps: BoxProps; cardProps: BoxProps } = {
  contentProps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 'none',
    borderTopLeftRadius: 'none',
    borderBottomRightRadius: 'none',
  },
  cardProps: {
    position: 'relative',
    height: 'full',
  },
}

const TABS = [
  {
    value: 'poolStats',
    label: 'Pool stats',
  },
  {
    value: 'myStats',
    label: 'My stats',
  },
] as const

export function PoolSnapshot({ ...props }: CardProps) {
  const [activeTab, setActiveTab] = useState<ButtonGroupOption>(TABS[0])
  const { pool } = usePool()

  function handleTabChanged(option: ButtonGroupOption) {
    setActiveTab(option)
  }

  useEffect(() => {
    if (hasTotalBalance(pool)) {
      setActiveTab(TABS[1])
    }
  }, [pool])

  return (
    <Card h={{ base: '464px', md: '484px' }} position="relative" {...props}>
      <BurrCard
        cardProps={COMMON_NOISY_CARD_PROPS.cardProps}
        contentProps={COMMON_NOISY_CARD_PROPS.contentProps}
      >
        <VStack
          align="flex-start"
          gap="lg"
          h="full"
          justify="flex-start"
          m="auto"
          mb="sm"
          p="md"
          role="group"
          spacing="xl"
          w="full"
          zIndex={1}
        >
          <ButtonGroup
            currentOption={activeTab}
            groupId="pool-stats"
            onChange={handleTabChanged}
            options={TABS}
            size="xxs"
          />
          {activeTab.value === 'poolStats' && <PoolSnapshotValues />}
          {activeTab.value === 'myStats' && <UserSnapshotValues />}
        </VStack>
      </BurrCard>
    </Card>
  )
}
