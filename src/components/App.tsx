import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import { Box, Container, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import AuthProvider from './AuthProvider';
import DonatePage from './DonatePage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
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
          color: '#0000EE',  // Color for links that have not been visited
        },
        'a:visited': {
          color: '#551A8B',  // Color for visited links (Change this to any color you want)
        },
      },
    },
  },
});

const defaultContext = {
  isDrawerOpen: false,
  toggleDrawer: () => {},
};

export const AppContext = React.createContext(defaultContext);

export function App() {

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(prevState => !prevState);  
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider>
        <AuthProvider>
          <AppProvider>
            <Router>
              <Container>
                <CssBaseline />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2 }}>
                      <div>
                        <Navigation/>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                <div style={{ marginTop: '10px' }} onClick={closeDrawer}>
                  <Routes>
                    <Route path="/" Component={HomePage} />
                    <Route path="/home" Component={HomePage} />
                    <Route path="/donate" Component={DonatePage} />
                    <Route path="/profile" Component={ProfilePage} />
                    <Route path="/login" Component={LoginPage} />
                  </Routes>
                </div>
              </Container> 
            </Router>
          </AppProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}