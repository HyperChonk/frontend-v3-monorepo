import { Badge, Box, HStack, Text } from '@chakra-ui/react'
import { ExpandedPoolInfo } from '../../portfolio/PortfolioTable/useExpandedPools'
import { TokenIcon } from '../../tokens/TokenIcon'
import { getUserReferenceTokens } from '../pool-tokens.utils'
import { PoolListItem } from '../pool.types'

export function PoolListPoolName({ pool }: { pool: PoolListItem | ExpandedPoolInfo }) {
  const isFirstToken = (index: number) => index === 0
  const displayTokens = getUserReferenceTokens(pool)
  const zIndices = Array.from({ length: displayTokens.length }, (_, index) => index).reverse()

  return (
    <HStack alignItems="center" h={['32px', '36px']} my="0" p={['xxs', 'sm']} pr={[1.5, 'ms']}>
      {displayTokens.map((token, i) => (
        <Box key={token.address} ml={isFirstToken(i) ? 0 : -3} zIndex={zIndices[i]}>
          <TokenIcon
            address={token.address}
            alt={token.symbol}
            chain={pool.chain}
            size={20}
            weight={token.weight}
          />
        </Box>
      ))}
      <Badge
        bg="background.level2"
        borderColor="border.base"
        borderRadius="full"
        borderWidth={1}
        shadow="sm"
        textTransform="none"
        p={['xxs', 'sm']}
      >
        <Text fontWeight="medium" textAlign="left">
          {pool.name}
        </Text>
      </Badge>
    </HStack>
  )
}
