import React from 'react';
import { Container, Typography, Avatar } from '@mui/material';
import Keanu from '../assets/keanu.jpeg';

interface ProfileProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePhoto?: string;
  bio?: string;
}

const ProfilePage: React.FC<ProfileProps> = ({ 
  firstName = "Jeff", 
  lastName = "Pascoe", 
  email = "jeffpascoe@example.com", 
  profilePhoto = Keanu, 
  bio = "Default bio" 
}) => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {firstName} {lastName}'s Profile
      </Typography>
      
      <Avatar src={profilePhoto} alt={`${firstName} ${lastName}`} sx={{ width: 80, height: 80 }} />
      
      <Typography variant="h6" component="h2" gutterBottom>
        Email: {email}
      </Typography>
      
      <Typography variant="body1" component="p">
        Bio: {bio}
      </Typography>
    </Container>
  );
};

export default ProfilePage;
