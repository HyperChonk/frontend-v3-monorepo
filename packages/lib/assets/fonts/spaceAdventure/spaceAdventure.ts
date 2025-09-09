import localFont from 'next/font/local'

export const spaceAdventure = localFont({
  src: [
    {
      path: './Space-Adventure.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Space-Adventure.ttf', // Fallback for TTF if needed
      weight: '400',
      style: 'normal',
    },
    {
      path: './Space-Adventure-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Space-Adventure-Italic.ttf', // Fallback for TTF if needed
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-space-adventure',
})
