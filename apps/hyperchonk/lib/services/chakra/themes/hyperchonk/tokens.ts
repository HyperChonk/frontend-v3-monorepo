import { getTokens } from '@repo/lib/shared/services/chakra/themes/base/tokens'

export function getHyperChonkTokens(colors: any, primaryTextColor: any) {
  const baseTokens = getTokens(colors, primaryTextColor)

  return {
    ...baseTokens,
    colors: {
      ...baseTokens.colors,
      dark: {
        ...baseTokens.colors.dark,
        background: {
          ...baseTokens.colors.dark.background,
          base: '#162a2b', // generic
          level0: '#203b3c', // footer, table row highlight
          level1: '#1b3233', // navbar
          level2: '#1b3233', // pool list
          level3: '#314e59', // buttons, dialog
          level4: '#172b2c', // token logo
          level0WithOpacity: '#112223', // pool list header, burrcard
        },
        border: {
          ...baseTokens.colors.dark.border,
          divider: '#274849',
        },
        text: {
          ...baseTokens.colors.dark.text,
          primary: '#eaecec',
          secondary: '#c0c7c7',
          special: colors.hyperTeal,
        },
        button: {
          ...baseTokens.colors.light.button,
          background: {
            ...baseTokens.colors.dark.button.background,
            secondary: '#036dbd', // blue
          },
        },
      },
    },
  }
}
