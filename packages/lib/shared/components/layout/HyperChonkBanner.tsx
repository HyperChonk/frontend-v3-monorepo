'use client'
import { Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function HyperChonkBanner({
  children,
  ...rest
}: {
  children: ReactNode | ReactNode[]
} & ContainerProps) {
  return (
    <Container
      background="linear-gradient(0deg,rgba(27, 48, 54, 1) 0%, rgba(26, 34, 70, 1) 50%)"
      height="full"
      maxWidth="full"
      p="0"
      width="full"
    >
      <Container
        backgroundImage={`url('/images/bg-stars.png')`}
        backgroundRepeat="repeat-x"
        backgroundSize="contain"
        height="full"
        maxWidth="full"
        p="0"
        width="full"
      >
        <Container
          backgroundImage={{
            base: 'none',
            md: `url('/images/main-bg-left.png')`,
          }}
          backgroundRepeat="no-repeat"
          backgroundSize="contain"
          height="full"
          maxWidth="full"
          p="0"
          width="full"
        >
          <Container
            backgroundImage={`url('/images/main-bg-right.png')`}
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundColor={'transparent'}
            backgroundPosition="right"
            height="full"
            maxWidth="full"
            p="0"
            width="full"
          >
            <Container
              backgroundImage={`url('/images/bg-overlay.png')`}
              backgroundRepeat="repeat-x"
              backgroundSize="contain"
              backgroundColor={'transparent'}
              height="full"
              maxWidth="full"
              p="0"
              width="full"
              {...rest}
            >
              {children}
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}
