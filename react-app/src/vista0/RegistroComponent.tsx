import React, { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Button, TextField, Box, Modal, Alert, AlertTitle } from '@mui/material';
import './ejemplo.css'; // Importamos los estilos CSS

const ADD_USER_MUTATION = gql`
  mutation AddUsuario($insertUsuario: NuevoUsuario) {
    addUsuario(input: $insertUsuario) {
      id
      usuario
      pass
      nombre
      rut
      mail
      nrol
    }
  }
`;

const RegistroComponent: React.FC = () => {
  const client = useApolloClient();
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [mail, setMail] = useState('');
  const [nrol, setNrol] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = {
      usuario,
      pass,
      nombre,
      rut,
      mail,
      nrol,
    };

    try {
      const { data } = await client.mutate({
        mutation: ADD_USER_MUTATION,
        variables: { insertUsuario: input },
      });
      setRegisterMessage('Usuario registrado correctamente');
      setOpenModal(true);
      // Puedes manejar aquí lo que sucede después de registrar, como redireccionar o limpiar formularios
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setRegisterMessage('Error al registrar usuario');
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="container">
      <div className="component-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegister}>
          <TextField
            type="text"
            label="Usuario"
            variant="outlined"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="mt-3"
          />
          <TextField
            type="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="mt-3"
          />
          <TextField
            type="text"
            label="Nombre"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-3"
          />
          <TextField
            type="text"
            label="RUT"
            variant="outlined"
            fullWidth
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="mt-3"
          />
          <TextField
            type="email"
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="mt-3"
          />
          <TextField
            type="text"
            label="Número de rol"
            variant="outlined"
            fullWidth
            value={nrol}
            onChange={(e) => setNrol(e.target.value)}
            className="mt-3"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-3">
            Registrar Usuario
          </Button>
        </form>
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-container">
          <Alert severity={registerMessage === 'Usuario registrado correctamente' ? 'success' : 'error'}>
            <AlertTitle>{registerMessage === 'Usuario registrado correctamente' ? 'Éxito' : 'Error'}</AlertTitle>
            {registerMessage}
          </Alert>
          <Button onClick={handleCloseModal} color="primary" className="mt-2">
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RegistroComponent;
