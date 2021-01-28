import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    text: {
      primary: '#32325d',
      secondary: '',
    },
    primary: {
      main: '#32325d',
    },
    secondary: {
      main: '#f9de61',
    },
    background: {
      default: '#f6f9fc',
    },
  },

  spacing: 8,
});

theme = responsiveFontSizes(theme);

export default theme;
