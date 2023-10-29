import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'purple.800' : 'purple.100',
      },
    }),
  },
  colors: {
    primary: {
      50: '#F3EBFE',
      100: '#E1D1FD',
      200: '#CBB2F9',
      300: '#AF8AF5',
      400: '#9973F2',
      500: '#7C3AEB',
      600: '#6225D4',
      700: '#521BA9',
      800: '#3D1376',
      900: '#2E1055',
    },
    secondary: {
      50: '#D3E8EC',
      100: '#A5D9DE',
      200: '#74C7CB',
      300: '#4DB5B6',
      400: '#349CA3',
      500: '#208EA1',
      600: '#1A7A8C',
      700: '#17616F',
      800: '#114C52',
      900: '#0E3E44',
    },
    accent: {
      50: '#FDEAE4',
      100: '#F8C5B8',
      200: '#F29B8A',
      300: '#EC6956',
      400: '#E94232',
      500: '#E3261A',
      600: '#C71E16',
      700: '#A21711',
      800: '#7B0F0D',
      900: '#5B0C0A',
    },
  },
});

export default theme;
