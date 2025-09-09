import { getComponents } from '@repo/lib/shared/services/chakra/themes/base/components'
import { colors } from './colors'

export function getHyperChonkComponents(tokens: any, primaryTextColor: any) {
  const components = getComponents(tokens, primaryTextColor)

  return {
    ...components,
    Heading: {
      ...components.Heading,
      baseStyle: { ...components.Heading.baseStyle, fontWeight: '700' },
      variants: {
        ...components.Heading.variants,
        special: {
          ...components.Heading.variants.special,
          fontFamily: 'chillax',
        },
      },
    },
    Link: {
      ...components.Link,
      variants: {
        ...components.Link.variants,
        nav: {
          ...components.Link.variants.nav,
          color: '#ffffff',
          fontFamily: 'chillax',
          fontWeight: '600',
          fontSize: '1.1rem',
          _hover: {
            ...components.Link.variants.nav._hover,
            color: colors.hyperTeal,
          },
        },
      },
    },
    Button: {
      ...components.Button,
      variants: {
        ...components.Button.variants,
        primary: {
          ...components.Button.variants.primary,
          color: 'black',
          fontFamily: 'chillax',
        },
        buttonGroupActive: {
          ...components.Button.variants.buttonGroupActive,
          _dark: {
            color: '#eee',
          },
        },
        buttonGroupActiveGray: {
          ...components.Button.variants.buttonGroupActiveGray,
          _dark: {
            color: '#eee',
          },
        },
      },
    },
  }
}
