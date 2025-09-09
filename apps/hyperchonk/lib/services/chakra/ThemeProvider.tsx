'use client'

import { ChakraProvider, ThemeTypings } from '@chakra-ui/react'
import { useCow } from '@repo/lib/modules/cow/useCow'
import { useIsMounted } from '@repo/lib/shared/hooks/useIsMounted'
import { ReactNode, useMemo } from 'react'
import { theme as cowTheme } from './themes/cow/cow.theme'
import { theme as hyperchonkTheme } from './themes/hyperchonk/hyperchonk.theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { isCowPath, isCowVariant } = useCow()
  const isMounted = useIsMounted()

  function getTheme(): ThemeTypings {
    if (isCowPath || isCowVariant) return cowTheme

    return hyperchonkTheme
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const theme = useMemo(() => getTheme(), [isCowPath, isCowVariant])

  // Avoid hydration error in turbopack mode
  if (!isMounted) return null

  return (
    <ChakraProvider
      cssVarsRoot="body"
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'bottom-left' } }}
    >
      {children}
    </ChakraProvider>
  )
}
