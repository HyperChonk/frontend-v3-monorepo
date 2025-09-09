import { Box, Center, ModalOverlay } from '@chakra-ui/react'

export function SuccessOverlay({ startAnimation }: { startAnimation?: boolean }) {
  const enableRipple = false // disables animation entirely

  return (
    <ModalOverlay>
      {startAnimation && enableRipple && (
        <Center h="full" position="absolute" w="full">
          <Box className="ripple ripple-1" />
          <Box className="ripple ripple-2" />
          <Box className="ripple ripple-3" />
        </Center>
      )}
    </ModalOverlay>
  )
}
