import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: '#0E0F16',
    scarlet: {
      200: '#F56565',
      500: '#E53E3E',
    },
    rose: {
      // 200: '#ED5B82',
      200: '#F33A6A',
      500: '#F33A6A',
    },
    upvote: '#FF8b60',
    downvote: '#9494FF',
    gray: {
      75: '#EFF3F8',
      250: '#D3DBE5',
      1000: '#13131c',
    },
    redditblue: '#5bbad5',
  },
  fonts,
  breakpoints,
})

export default theme
