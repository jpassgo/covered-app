import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationDrawer from './NavigationDrawer';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import HomePage from './HomePage';
import DonatePage from './DonatePage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import { useRef, useEffect } from 'react';
import { useAppContext } from './AppContext';

export default function Navigation() {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const { toggleDrawer } = useAppContext();

  const handleClick = (event: MouseEvent) => {
    if (drawerRef.current && event.target instanceof Node && !drawerRef.current.contains(event.target)) {
        toggleDrawer(false); // function to close the drawer, get it from context
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
        <div style={{ marginTop: '10px' }} ref={drawerRef}>
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
  );
}
