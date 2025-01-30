import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      red: '#ff1a1a',
      darkRed: '#cc0000',
      pink: '#ff4d4d',
      black: '#1a1a1a',
      gray: '#333333',
    },
  },
  fonts: {
    heading: "'Pacifico', cursive",
    body: "system-ui, sans-serif",
    letter: "'Indie Flower', cursive",
  },
  styles: {
    global: {
      body: {
        bg: 'brand.black',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'xl',
        transition: 'all 0.2s ease-in-out',
        _hover: {
          transform: 'scale(1.05)',
        },
      },
      variants: {
        solid: {
          bg: 'brand.red',
          color: 'white',
          _hover: {
            bg: 'brand.darkRed',
            transform: 'scale(1.05)',
          },
        },
        outline: {
          borderColor: 'brand.red',
          color: 'brand.red',
          _hover: {
            bg: 'brand.red',
            color: 'white',
          },
        },
      },
    },
    Box: {
      baseStyle: {
        transition: 'all 0.3s ease-in-out',
      },
    },
    IconButton: {
      baseStyle: {
        transition: 'all 0.2s ease-in-out',
        _hover: {
          transform: 'scale(1.1)',
        },
      },
      variants: {
        outline: {
          borderColor: 'brand.red',
          color: 'brand.red',
          _hover: {
            bg: 'brand.red',
            color: 'white',
          },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.md',
      },
    },
  },
  transition: {
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    duration: {
      normal: '0.3s',
      fast: '0.2s',
      slow: '0.5s',
    },
  },
});

export default theme; 