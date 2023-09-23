import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid } from '@mui/material';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send the form data to the server
    console.log(formData);
  };

  return (
    <Container>
      <Grid item container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
              />
            </Grid>
            <Grid item xs={4} style={{ marginTop: '10px' }}>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
