import { ThemeTypings, extendTheme } from '@chakra-ui/react'
import {
  fonts,
  styles,
  themeConfig,
} from '@repo/lib/shared/services/chakra/themes/base/foundations'
import { proseTheme } from '@repo/lib/shared/services/chakra/themes/base/prose'
import { colors, primaryTextColor } from './colors'
import { getHyperChonkComponents } from './components'
import { getHyperChonkSemanticTokens } from './semantic-tokens'
import { getHyperChonkTokens } from './tokens'

const tokens = getHyperChonkTokens(colors, primaryTextColor)
const components = getHyperChonkComponents(tokens, primaryTextColor)
const semanticTokens = getHyperChonkSemanticTokens(tokens, colors)

export const hyperchonkTheme = {
  config: { ...themeConfig, initialColorMode: 'dark' },
  fonts,
  styles,
  colors,
  semanticTokens,
  components,
}

export const theme = extendTheme(hyperchonkTheme, proseTheme) as ThemeTypings
