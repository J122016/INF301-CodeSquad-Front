import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: '10px' }}>
        <Typography variant="h6" component="div">
          Centro Médico Galenos
        </Typography>
        {user ? (
          <>
            <Typography variant="body1">
              Bienvenido, {user}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
