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

const theme = createTheme({
  palette: {
    primary: {
      main: '#94A89A', // replace with your primary color
    },
    secondary: {
      main: '#373E40', // replace with your secondary color
    },
    // ... add other color overrides as needed
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#797D81',
        },
      },
    },
  },
});

const defaultContext = {}

export const AppContext = React.createContext(defaultContext);

export function App() {

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{defaultContext}}>
        <LocalizationProvider>
          <AuthProvider >
            <Router>
              <Container>
                <CssBaseline />
                <Routes>
                  <Route path="/" Component={HomePage} />
                  <Route path="/home" Component={HomePage} />
                  <Route path="/donate" Component={DonatePage} />
                  <Route path="/profile" Component={ProfilePage} />
                  <Route path="/login" Component={LoginPage} />
                </Routes>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2 }}>
                      <div>
                        <Navigation />
                      </div>
                    </Box>
                  </Grid>
                </Grid>
              </Container> 
            </Router>
          </AuthProvider>
        </LocalizationProvider>
      </AppContext.Provider>
    </ThemeProvider>
  )
}
