import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, 
  TableRow, TextField, Button, Select, MenuItem, FormControl, 
  InputLabel, TableContainer, SelectChangeEvent, 
  Paper,
  Tooltip} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIOS, GET_ROLES, ADD_USUARIO, UPDATE_USUARIO, DELETE_USUARIO } from './graphql';
import { User, Rol } from './Models';

const emptyUserForm = {
  usuario: '',
  pass: '',
  nombre: '',
  mail: '',
  rut: '',
  nrol: ''
}

const ResultsTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);

  const { data: usuariosData } = useQuery(GET_USUARIOS);
  const { data: rolesData } = useQuery(GET_ROLES);
  const [addUser] = useMutation(ADD_USUARIO);
  const [updateUser] = useMutation(UPDATE_USUARIO);
  const [deleteUser] = useMutation(DELETE_USUARIO);
  const [formCreateUser, setFormState] = useState<User>(emptyUserForm);
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  useEffect(() => {
    if (usuariosData) {
      console.log("usuariosData", usuariosData);
      setUsers(usuariosData.getUsuarios);
    }
  }, [usuariosData]);

  useEffect(() => {
    if (rolesData) {
      console.log("rolesData", rolesData);
      setRoles(rolesData.getRoles);
    }
  }, [rolesData]);

  const findRolName = (nrol:string) => {
    const rol = roles.find((r) => r.nrol === nrol);
    return rol? rol.rol: 'seleccione rol';
  }

  const findNrolRol = (rol:string) => {
    const rolObj = roles.find((r) => r.rol === rol);
    return rolObj? rolObj.nrol: '';
  }

  const handleFormReset = () => {
    //clean state, con ello inputs + select 
    setFormState(emptyUserForm);
  }

  const handleInputCreateUserChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectCreateUserChange = (
    event: SelectChangeEvent<string>
  ) => {
    const value = event.target.value;
    setFormState((prevState) => ({
      ...prevState,
      "nrol": value,
    }));
  };

  const handleUserCreate = async () => {
    let validCreateUserForm = true;

    //verificando validez de valores en formulario
    Object.keys(formCreateUser).forEach(field => {
      if (!formCreateUser[field as keyof User] || (field === "mail" && !formCreateUser.mail.match(isValidEmail))){
        validCreateUserForm = false;
      }
    })

    if (!validCreateUserForm) {
      alert('Formulario de usuario inválido.\nRevise los datos e intente nuevamente.');
      return;
    }

    //make mutation and update query
    try {
      const { data } = await addUser({
        variables: { insertUsuario: formCreateUser },
        refetchQueries: [{ query: GET_USUARIOS }], 
      });

      if (data) {
        alert('Usuario creado exitosamente!');
        setFormState(emptyUserForm);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const handleUserUpdate = async (userRut: string) => {
    // Assuming you have a way to get updated user data (e.g., from an edit form)
    const updatedUser = {
      usuario: (document.querySelector(`#usuario-${userRut}`) as HTMLInputElement)?.value || '',
      nombre: (document.querySelector(`#nombre-${userRut}`) as HTMLInputElement)?.value || '',
      mail: (document.querySelector(`#mail-${userRut}`) as HTMLInputElement)?.value || '',
      pass: (document.querySelector(`#pass-${userRut}`) as HTMLInputElement)?.value || '',
      nrol: findNrolRol((document.querySelector(`#rol-${userRut}`) as HTMLInputElement)?.innerText || '')
    };  

    try {
      const { data } = await updateUser({
        variables: {
          rut: userRut,
          modUsuario: updatedUser,
        },
        refetchQueries: [{ query: GET_USUARIOS }], 
      });

      if (data) {
        alert('Usuario actualizado correctamente');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleUserDelete = async (userRut: string) => {
    if (!window.confirm('Un usuario borrado no se podrá recuperar. ¿Desea continuar?')) {
      return;
    }

    try {
      const { data } = await deleteUser({ 
        variables: { rut: userRut },
        refetchQueries: [{ query: GET_USUARIOS }], 
      });

      if (data) {
        alert(data.deleteUsuario.mensaje);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="main-box container-fluid">
      <div className="row justify-content-center">
        <Paper elevation={1}>
          <TableContainer sx={{maxHeight:'92vh'}}>
            <Table id="resultsTable" sx={{width:'max-content'}} aria-label="user table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Rut</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Mail</TableCell>
                  <TableCell>Constraseña</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField type="text" id="rutUsuarioNuevo" label="Rut" name='rut' required
                      value={formCreateUser.rut} onChange={handleInputCreateUserChange} />
                  </TableCell>
                  <TableCell>
                    <TextField type="text" id="usuarioUsuarioNuevo" label="Usuario (alias)" name='usuario' required 
                      value={formCreateUser.usuario} onChange={handleInputCreateUserChange} />
                  </TableCell>
                  <TableCell>
                    <TextField type="text" id="nombreUsuarioNuevo" label="Nombre" name='nombre' required
                      value={formCreateUser.nombre} onChange={handleInputCreateUserChange} />
                  </TableCell>
                  <TableCell>
                    <TextField type="email" id="mailUsuarioNuevo" label="Mail" name='mail' required
                      value={formCreateUser.mail} onChange={handleInputCreateUserChange}/>
                  </TableCell>
                  <TableCell>
                    <TextField type="password" id="claveUsuarioNuevo" label="Clave" name='pass' required
                      value={formCreateUser.pass} onChange={handleInputCreateUserChange}/>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id="rolUsuarioNuevoLabel">Rol*</InputLabel>
                      <Select labelId="rolUsuarioNuevoLabel" id="rolUsuarioNuevo" name='rol' required
                              label="Rol" disabled={roles.length==0} onChange={handleSelectCreateUserChange} 
                              value={formCreateUser.nrol}>
                        {roles.map((rolObj) => (
                          <MenuItem key={rolObj.id} value={rolObj.nrol}>
                            {rolObj.rol} 
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" style={{ margin: '2px' }}
                      onClick={() => handleUserCreate()}>
                      Crear
                    </Button>
                    <Button type="reset" variant="contained" color="error" style={{ margin: '2px' }}
                      onClick={()=> handleFormReset()}>
                      Descartar
                    </Button>
                  </TableCell>
                </TableRow>
                {users.map((user) => (
                  <TableRow key={user.rut}>
                    <TableCell>
                      <Tooltip title={`ID: ${user.id}`}>
                      <TextField id={`rut-${user.rut}`} type="text" defaultValue={user.rut} disabled required/>
                      </Tooltip> 
                    </TableCell>
                    <TableCell>
                      <TextField id={`usuario-${user.rut}`} type="text" defaultValue={user.usuario} required/> 
                    </TableCell>
                    <TableCell>
                      <TextField id={`nombre-${user.rut}`} type="text" defaultValue={user.nombre} required/> 
                    </TableCell>
                    <TableCell>
                      <TextField id={`mail-${user.rut}`} type="email" defaultValue={user.mail} required/> 
                    </TableCell>
                    <TableCell>
                      <TextField id={`pass-${user.rut}`} type="password" defaultValue={user.pass} required/>
                    </TableCell>
                    <TableCell style={{gap: "15px", display: "flex"}}>
                      <FormControl fullWidth>
                        <InputLabel id={`rolLabel-${user.rut}`}>Rol</InputLabel>
                        <Select id={`rol-${user.rut}`} labelId={`rolLabel-${user.rut}`} label="Rol" defaultValue={user.nrol} required>
                          {roles.map((rolObj) => (
                            <MenuItem key={rolObj.id} value={rolObj.nrol}>
                              {findRolName(rolObj.nrol)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Button
                        style={{ margin: '2px' }}
                        type="button"
                        variant="contained"
                        color="warning"
                        onClick={() => handleUserUpdate(user.rut)}
                      >
                        Guardar
                      </Button>
                      <Button
                        style={{ margin: '2px' }}
                        type="button"
                        variant="contained"
                        color="error"
                        onClick={() => handleUserDelete(user.rut)}
                      >
                        Borrar
                      </Button>
                    </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default ResultsTable;