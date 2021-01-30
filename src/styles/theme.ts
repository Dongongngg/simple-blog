import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
    },
    primary: {
      main: '#32325d',
      light: '#636090',
    },
    secondary: {
      main: '#00C895',
    },
    background: {
      default: '#f6f9fc',
    },
  },
  typography: {
    fontSize: 16,
    h2: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    body1: { fontFamily: "'Merriweather', serif" },
    body2: { fontFamily: "'Merriweather', serif" },
    fontFamily: [" 'Fraunces', serif", "'Merriweather', serif"].join(','),
  },
  spacing: 8,
});

theme = responsiveFontSizes(theme);

export default theme;
