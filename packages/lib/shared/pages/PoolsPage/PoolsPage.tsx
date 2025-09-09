'use client'

import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react'
import { isHyperChonk } from '@repo/lib/config/getProjectConfig'
import { PoolList } from '@repo/lib/modules/pool/PoolList/PoolList'
import { DefaultPageContainer } from '@repo/lib/shared/components/containers/DefaultPageContainer'
import FadeInOnView from '@repo/lib/shared/components/containers/FadeInOnView'
import { PropsWithChildren, Suspense } from 'react'
import BurrBanner from '../../components/layout/BurrBanner'
import HyperChonkBanner from '../../components/layout/HyperChonkBanner'
import { FeaturedPartners } from './FeaturedPartners'
import { PoolPageStats } from './PoolPageStats'

type PoolsPageProps = PropsWithChildren & {
  rewardsClaimed24h?: string
}

// Reusable banner wrapper component
const BannerWrapper = ({
  children,
  BannerComponent,
  rewardsClaimed24h,
  isTall,
}: {
  children: React.ReactNode
  BannerComponent: React.ComponentType<any>
  rewardsClaimed24h?: string
  isTall?: boolean
}) => (
  <BannerComponent overflow="hidden" position="relative" shadow="innerBase">
    <DefaultPageContainer
      pb={['xl', 'xl', isTall ? '80px' : '50px']}
      pr={{ base: '0 !important', md: 'md !important' }}
      pt={['xl', isTall ? '80px' : '50px']}
    >
      <FadeInOnView animateOnce={false}>
        <Flex
          align={{ base: 'center', md: 'center' }}
          direction={{ base: 'column', lg: isHyperChonk ? 'column' : 'row' }}
          gap="4"
          justify={{ base: 'start', md: 'space-between' }}
        >
          <Box>
            <Heading sx={{ textWrap: 'balance' }} variant="special">
              Liquidity Pools
            </Heading>
          </Box>
          <PoolPageStats rewardsClaimed24h={rewardsClaimed24h} />
        </Flex>
      </FadeInOnView>
      <FadeInOnView animateOnce={false}>
        {/* <BeetsPromoBanner /> */}
        {children}
      </FadeInOnView>
      {/* <FadeInOnView animateOnce={false}>
        <Box pt="20" pb="4">
          <FeaturedPools featuredPools={featuredPools} />
        </Box>
      </FadeInOnView> */}
    </DefaultPageContainer>
  </BannerComponent>
)

export function PoolsPage({ children, rewardsClaimed24h }: PoolsPageProps) {
  const BannerComponent = isHyperChonk ? HyperChonkBanner : BurrBanner
  const isTall = isHyperChonk

  return (
    <>
      <Box borderBottom={isHyperChonk ? 'none' : '1px solid'} borderColor="border.base">
        <BannerWrapper
          BannerComponent={BannerComponent}
          isTall={isTall}
          rewardsClaimed24h={rewardsClaimed24h}
        >
          {children}
        </BannerWrapper>
      </Box>
      <DefaultPageContainer noVerticalPadding pb="2xl" pt={['lg', '54px']}>
        <FadeInOnView animateOnce={false}>
          <Suspense fallback={<Skeleton h="500px" w="full" />}>
            <PoolList />
          </Suspense>
        </FadeInOnView>
      </DefaultPageContainer>
      <FeaturedPartners />
    </>
  )
}
