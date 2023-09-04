import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import { Box, Container, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import ReliefMissionCard from './ReliefMissionCard';

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
          <Router>
            <Container>
              <CssBaseline />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2 }}>
                    <div>
                      <Navigation />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} paddingTop={'50px'}>
                  <Box sx={{ p: 2 }}>
                    <div>
                      <ReliefMissionCard />
                      <ReliefMissionCard />
                      <ReliefMissionCard />
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Container> 
          </Router>
        </LocalizationProvider>
      </AppContext.Provider>
    </ThemeProvider>
  )
}
