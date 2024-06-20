import { useState, useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Button, TextField, Alert, Fade, MenuItem, Snackbar } from '@mui/material';
import './ejemplo.css'; // Importamos los estilos CSS
import { Link, useNavigate  } from 'react-router-dom';

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

const GET_ROLES_QUERY = gql`
    query GetRoles {
        getRoles {
            id
            rol
            nrol
        }
    }`;
interface Rol {
  id: string;
  rol: string;
  nrol: string;
}

const RegistroComponent: React.FC = () => {
  const client = useApolloClient();
  const [usuario, setUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [mail, setMail] = useState('');
  const [nrol, setNrol] = useState('5');
  const [registerMessage, setRegisterMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [options, setOptions] = useState<React.ReactNode[]>([]);
  const navigate = useNavigate();

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
      setTimeout(() => { navigate('/login') }, 3000);
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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await client.query({
          query: GET_ROLES_QUERY
        });
        setOptions(data.getRoles.map((rol: Rol) => (
          <MenuItem key={rol.id} value={rol.nrol}>
            {rol.rol}
          </MenuItem>
        )));
      } catch (error) {
        console.error('Error fetching roles:', error);
        setOptions([
          <MenuItem key='' value='rol'>
            rol
          </MenuItem>
        ]);
      }
    };
    fetchRoles();
  }, []);

  return (
    <Fade in={true}>
    <div className="container">
      <div className="component-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegister}>
          <TextField
            required
            type="text"
            label="Usuario"
            variant="outlined"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            sx={{mt:3}}
          />
          <TextField
            required
            type="password"
            label="Contraseña"
            variant="outlined"
            fullWidth
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            sx={{mt:3}}
          />
          <TextField
            required
            type="text"
            label="Nombre"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{mt:3}}
          />
          <TextField
            required
            type="text"
            label="RUT"
            variant="outlined"
            fullWidth
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            sx={{mt:3}}
          />
          <TextField
            required
            type="email"
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            sx={{mt:3}}
          />
          <TextField
            required
            label="Rol"
            variant="outlined"
            fullWidth
            select
            value={nrol}
            onChange={(e) => setNrol(e.target.value)}
            sx={{ mt: 3 }}
          >
            {options}
          </TextField>
          <div className="form-group">
          <Button type="submit" variant="contained" color="success">
            Registrarse en el centro
          </Button>
          <Button component={Link} to="/login" type="button" variant="contained" color="primary">
            Cancelar
          </Button>
          </div>
        </form>
      </div>

      <Snackbar
        open={openModal}
        autoHideDuration={3000}
        onClose={handleCloseModal}>
        <Alert variant="filled" severity={registerMessage === 'Usuario registrado correctamente' ? 'success' : 'error'}>
          {registerMessage}. redireccionando a inicio...
        </Alert>
      </Snackbar>
    </div>
    </Fade>
  );
};

export default RegistroComponent;
