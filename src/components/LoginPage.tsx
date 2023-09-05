import React from 'react';

interface LoginPageProps {
  message: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default LoginPage;
