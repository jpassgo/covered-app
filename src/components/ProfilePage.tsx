import React from 'react';

interface ProfilePageProps {
  message: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default ProfilePage;
