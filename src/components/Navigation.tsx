import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationDrawer from './NavigationDrawer';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

export default function Navigation() {

  return (
    <Router>
      <Container>
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <div>
                <NavigationDrawer />
              </div>
            </Box>
          </Grid>
        </Grid>
        <div style={{ marginTop: '10px' }}>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/home" Component={HomePage} />
            <Route path="/findMission" Component={DonatePage} />
            <Route path="/profile" Component={ProfilePage} />
            <Route path="/login" Component={LoginPage} />
          </Routes>
        </div>
      </Container>
    </Router>
  );
}
