import React, { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Button, TextField, Modal, Alert, AlertTitle, Fade, Container } from '@mui/material';
import { useAuth } from '../AuthContext';
import { useRut } from '../RutContext';
import { Link, useNavigate } from 'react-router-dom';
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
  const { setRut } = useRut();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

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
      setRut(data.login.rut);
      setLoginMessage(data.login.mensaje);
      if (data.login.mensaje === 'Login correcto') {
        login(username || email, data.login.nrol);
        setTimeout(() => { 
          switch (data.login.nrol) {
            case '5':
              //Paciente
              navigate('/pedir-hora');
              break
            case '3':
              //Medico
              navigate('/consultar-paciente');
              break
            case '1':
              //admin
              navigate('/ver-usuarios');
              break
            case '2':
              //secretaria
              navigate('/calendario');
              break;
            case '4':
              //cajero
              navigate('/ingreso-pago');
              break;
            default:
              //otro
              navigate('/inicio')
              break;
          } }, 3500);
      }
      setOpenModal(true);
      setTimeout(() => { setOpenModal(true) }, 2000);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginMessage('Error al iniciar sesión');
      setOpenModal(true);
      setTimeout(() => { setOpenModal(false) }, 3000);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Fade in={true}>
    <div className="container login-page">
      <div className="login-container">
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleLogin}>
            <TextField
              required={!email}
              type="text"
              label="Usuario"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{mt:3}}
            />
            <TextField
              disabled={!!username}
              required={!username}
              type="email"
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{mt:3}}
            />
            <TextField
              required
              type="password"
              label="Contraseña"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{mt:3}}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{mt:3}}>
              Iniciar Sesión
            </Button>
        </form>
        <Container sx={{mt:3}} className="register-link">
          <span>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></span>
        </Container>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Alert variant="filled" severity={loginMessage === 'Login correcto' ? 'success' : 'error'}>
            <AlertTitle>{loginMessage === 'Login correcto' ? 'Éxito' : 'Error'}</AlertTitle>
            {loginMessage === 'Login correcto'
              ? `Bienvenido, ${username || email}!`
              : loginMessage}
          </Alert>
      </Modal>
    </div>
    </Fade>
  );
};

export default LoginComponent;
