'use client'
import { Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function BurrBanner({
  children,
  ...rest
}: {
  children: ReactNode | ReactNode[]
} & ContainerProps) {
  return (
    <Container
      backgroundImage={`url('/images/main-bg-left.jpg')`}
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      backgroundColor="burrLightGreen"
      height="full"
      maxWidth="full"
      p="0"
      width="full"
    >
      <Container
        backgroundImage={{
          base: 'none',
          md: `url('/images/main-bg-right.jpg')`,
        }}
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backgroundColor="transparent"
        backgroundPosition="right"
        height="full"
        maxWidth="full"
        p="0"
        width="full"
        {...rest}
      >
        {children}
      </Container>
    </Container>
  )
}
