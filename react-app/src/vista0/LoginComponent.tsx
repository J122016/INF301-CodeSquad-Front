import React, { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Button, TextField, Modal, Box, Typography, Alert, AlertTitle } from '@mui/material';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import './ejemplo.css'; // Importamos los estilos CSS

const LOGIN_QUERY = gql`
  query Login($datoslog1: login) {
    login(input: $datoslog1) {
      rut
      nrol
      mensaje
    }
  }
`;

const LoginComponent: React.FC = () => {
  const client = useApolloClient();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = {
      usuario: username,
      pass: password,
      mail: email
    };

    try {
      const { data } = await client.query({
        query: LOGIN_QUERY,
        variables: { datoslog1: input }
      });
      setLoginMessage(data.login.mensaje);
      if (data.login.mensaje === 'Login correcto') {
        login(username || email);
      }
      setOpenModal(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginMessage('Error al iniciar sesión');
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="container login-page">
      <div className="login-container">
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <TextField
              type="text"
              label="Usuario"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="form-group">
            <TextField
              type="email"
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="form-group">
            <TextField
              type="password"
              label="Contraseña"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="form-group">
            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-3">
              Iniciar Sesión
            </Button>
          </div>
        </form>
        <div className="register-link mt-3">
          <span>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></span>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-container">
          <Alert severity={loginMessage === 'Login correcto' ? 'success' : 'error'}>
            <AlertTitle>{loginMessage === 'Login correcto' ? 'Éxito' : 'Error'}</AlertTitle>
            {loginMessage === 'Login correcto'
              ? `Bienvenido, ${username || email}!`
              : loginMessage}
          </Alert>
          <Button onClick={handleCloseModal} color="primary" className="mt-2">
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginComponent;
