import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#586069',
    textSecondary: 'white',
    primary: '#24292e',
    secondary: '#0366d6',
    main: '#e1e4e8',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'system',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
