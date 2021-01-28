import React from 'react';
import ReactDOM from 'react-dom';
//mui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
//App
import App from './App';
//
import './styles/reset.css';

// theme.typography.h3 = {
//   fontSize: '1.2rem',
//   '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2rem',
//   },
// };
// // theme.typography.h2 = {
// //   fontWeight: 400,
// //   fontSize: '1.5rem',
// //   '@media (min-width:600px)': {
// //     fontSize: '2rem',
// //   },
// //   [theme.breakpoints.up('md')]: {
// //     fontSize: '2rem',
// //   },
// // };

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
