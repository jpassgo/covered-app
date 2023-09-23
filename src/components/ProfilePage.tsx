import React from 'react';
import { Container, Typography, Avatar, Grid, Box } from '@mui/material';
import Keanu from '../assets/keanu.jpeg';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';

interface ProfileProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePhoto?: string;
  bio?: string;
}

const ProfilePage: React.FC<ProfileProps> = ({
  firstName = 'Jeff',
  lastName = 'Pascoe',
  email = 'jeffpascoe@example.com',
  profilePhoto = Keanu,
  bio = 'Default bio',
}) => {
  return (
    <Container
      sx={{ padding: '2em', backgroundColor: '#f8f9fa', borderRadius: '10px' }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Avatar
            src={profilePhoto}
            alt={`${firstName} ${lastName}`}
            sx={{
              width: 150,
              height: 150,
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: 'center' }}
          >
            {firstName} {lastName}
          </Typography>

          <Box display="flex" alignItems="center" marginBottom="1em">
            <EmailIcon color="primary" sx={{ marginRight: '10px' }} />
            <Typography variant="h6" component="h2" gutterBottom>
              {email}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <InfoIcon color="action" sx={{ marginRight: '10px' }} />
            <Typography variant="body1" component="p">
              Bio: {bio}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
