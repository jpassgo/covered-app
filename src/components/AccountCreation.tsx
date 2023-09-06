import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const AccountCreationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

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
      <Typography variant="h4" component="h1" gutterBottom>
        Create Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          margin="normal"
          fullWidth
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          margin="normal"
          fullWidth
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
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
        <Button variant="contained" color="primary" type="submit">
          Create Account
        </Button>
      </form>
    </Container>
  );
};

export default AccountCreationPage;
