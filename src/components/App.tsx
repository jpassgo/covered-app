import { LocalizationProvider } from '@mui/x-date-pickers';
import Navigation from './Navigation';
import { ThemeProvider, createTheme } from '@mui/material';
import AuthProvider from './AuthProvider';
import AppProvider from './AppContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#495867', // replace with your primary color
    },
    secondary: {
      main: '#B7B7A4', // replace with your secondary color
    },
    // ... add other color overrides as needed
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
        },
        'a:link': {
          color: '#0000EE', // Color for links that have not been visited
        },
        'a:visited': {
          color: '#551A8B', // Color for visited links (Change this to any color you want)
        },
      },
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider>
        <AuthProvider>
          <AppProvider>
            <Navigation />
          </AppProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
