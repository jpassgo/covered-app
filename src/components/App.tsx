import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import { Box, Container, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import ReliefMissionCard from './ReliefMissionCard';
import volcano from '../assets/volcano.jpeg';
import town from '../assets/town.jpeg';
import trees from '../assets/trees.jpeg';

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
                      <ReliefMissionCard title={'Volcano Relief'} description={'Brief explantation of situation goes here'} image={volcano}/>
                      <ReliefMissionCard title={'Deforestation Relief'} description={'Brief explantation of situation goes here'} image={trees}/>
                      <ReliefMissionCard title={'Preservation Relief'} description={'Brief explantation of situation goes here'} image={town}/>
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
