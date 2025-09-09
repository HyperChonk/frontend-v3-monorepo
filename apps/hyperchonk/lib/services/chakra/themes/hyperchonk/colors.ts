import { colors as baseColors } from '@repo/lib/shared/services/chakra/themes/base/colors'

export const colors = {
  ...baseColors,
  base: {
    // light: '#f3fce6',
    light: '#eaf0e2',
    hslLight: '44,22%,90%',
    dark: '#112223',
    hslDark: '216,12%,25%',
  },
  gradient: {
    ...baseColors.gradient,
    dawnDark: '#68fcbe',
  },
  hyperTeal: '#68fcbe',
}

export const primaryTextColor = `red`
