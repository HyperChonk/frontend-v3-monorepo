import { getSemanticTokens as getBaseSemanticTokens } from '@repo/lib/shared/services/chakra/themes/base/semantic-tokens'

export function getHyperChonkSemanticTokens(tokens: any, colors: any) {
  const baseSemanticTokens = getBaseSemanticTokens(tokens, colors)

  return {
    ...baseSemanticTokens,
    colors: {
      ...baseSemanticTokens.colors,
      background: {
        ...baseSemanticTokens.colors.background,
        navbar: {
          default: tokens.colors.light.background.navbar,
          _dark: tokens.colors.dark?.background?.navbar || tokens.colors.dark.background.level1,
        },
      },
    },
    shadows: {
      ...baseSemanticTokens.shadows,
      sm: {
        _dark: 'none',
      },
      md: {
        _dark: 'none',
      },
      lg: {
        _dark: 'none',
      },
      xl: {
        _dark: 'none',
      },
      '2xl': {
        _dark: 'none',
      },
      '3xl': {
        _dark: 'none',
      },
      innerSm: 'none',
      innerBase: {
        _dark: 'none',
      },
      innerMd: 'none',
      innerLg: 'none',
      innerXl: {
        _dark: 'none',
      },
      innerRockShadow: {
        _dark: 'none',
      },
      innerRockShadowSm: {
        _dark: 'none',
      },
      btnDefault: {
        _dark: 'none',
      },
      btnDefaultActive: {
        _dark: 'none',
      },
      btnTertiary: {
        _dark: 'none',
      },
      fontDefault: {
        _dark: 'none',
      },
      fontLight: {
        _dark: 'none',
      },
      fontDark: {
        _dark: 'none',
      },
      input: {
        innerBase: {
          _dark: 'none',
        },
        innerFocus: {
          _dark: 'none',
        },
        innerError: {
          _dark: 'none',
        },
      },
    },
  }
}
