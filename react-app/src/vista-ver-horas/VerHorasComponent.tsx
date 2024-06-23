import React, { useState, useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Modal, Box, Button, TextField, MenuItem } from '@mui/material';
import './ejemplo.css';

interface VerHorasComponentProps {
  attribute: string;
}

interface Reserva {
  id: string;
  rut: string;
  fecha: string;
  hora: string;
  id_medico: string;
  atendido: boolean;
  facturado: boolean;
  pagado: boolean;
  nombre_medico: string;
}

interface Medico {
  id: string;
  nombre: string;
}

const RESERVAS_QUERY = gql`
  query GetReservasCliente($rutcte: RutInput) {
    getReservasCliente(input: $rutcte) {
      id
      rut
      fecha
      hora
      id_medico
      atendido
      facturado
      pagado
    }
  }
`;

const USUARIO_QUERY = gql`
  query GetUsuario($id_medico: String!) {
    getUsuario(id: $id_medico) {
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

const MEDICOS_QUERY = gql`
  query GetUsuarioRol {
    getUsuarioRol(input: {nrol:"3"}) {
      id
      nombre
    }
  }
`;

const UPDATE_RESERVA_MUTATION = gql`
  mutation ModificarReserva2($id_reserva: String!,$input: ReservaInput) {
    modificarReserva2(id: $id_reserva,update: $input) {
      id
      mensaje
    }
  }
`;

const DELETE_RESERVA_MUTATION = gql`
  mutation cancelarReserva2($id: String!) {
    cancelarReserva2(id: $id) {
      id  
      mensaje
    }
  }
`;

const formatDate = (dateString: string): string => {
  const timestamp = Number(dateString);
  const date = new Date(timestamp);

  // Obtener la zona horaria local y compensar la fecha
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const day = String(localDate.getDate()).padStart(2, '0');
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const year = localDate.getFullYear();

  return `${year}-${month}-${day}`;
};

const VerHorasComponent: React.FC<VerHorasComponentProps> = ({ attribute }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentReserva, setCurrentReserva] = useState<Reserva | null>(null);
  const [formValues, setFormValues] = useState({
    fecha: '',
    hora: '',
    id_medico: ''
  });
  const client = useApolloClient();

  useEffect(() => {
    const fetchReservas = async () => {
      const input = { rut: attribute };
      try {
        const { data } = await client.query({
          query: RESERVAS_QUERY,
          variables: { rutcte: input },
        });

        const reservasConNombreMedico = await Promise.all(
          data.getReservasCliente.map(async (reserva: Reserva) => {
            try {
              const { data } = await client.query({
                query: USUARIO_QUERY,
                variables: { id_medico: reserva.id_medico },
              });
              return { ...reserva, nombre_medico: data.getUsuario.nombre, fecha: formatDate(reserva.fecha) };
            } catch (err) {
              console.error(`Error al obtener el nombre del médico para la reserva ${reserva.id}:`, err);
              return { ...reserva, nombre_medico: 'Desconocido', fecha: formatDate(reserva.fecha) };
            }
          })
        );

        setReservas(reservasConNombreMedico);
      } catch (err) {
        console.error('Error al obtener las reservas:', err);
        setError('Error al obtener las reservas');
      } finally {
        setLoading(false);
      }
    };

    const fetchMedicos = async () => {
      try {
        const { data } = await client.query({ query: MEDICOS_QUERY });
        setMedicos(data.getUsuarioRol);
      } catch (err) {
        console.error('Error al obtener los médicos:', err);
      }
    };

    fetchReservas();
    fetchMedicos();
  }, [attribute, client]);

  const handleEdit = (reserva: Reserva) => {
    setCurrentReserva(reserva);
    setFormValues({
      fecha: reserva.fecha,
      hora: reserva.hora,
      id_medico: reserva.id_medico
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await client.mutate({
        mutation: DELETE_RESERVA_MUTATION,
        variables: { id },
      });
      setReservas(reservas.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!currentReserva) return;

    const updatedReserva = {
      ...currentReserva,
      ...formValues
    };

    try {
      const { data } = await client.mutate({
        mutation: UPDATE_RESERVA_MUTATION,
        variables: { id_reserva: currentReserva.id, input: formValues },
      });
      setReservas(reservas.map(r => (r.id === currentReserva.id ? updatedReserva : r)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentReserva(null);
    setFormValues({
      fecha: '',
      hora: '',
      id_medico: ''
    });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="component-container">
        <h1 className="title">Vista de ejemplo (src &gt; Vistas &gt; VerHorasComponent.tsx)</h1>
        <p className="paragraph">Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Nombre Médico</th>
              <th>Atendido</th>
              <th>Facturado</th>
              <th>Pagado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.nombre_medico}</td>
                <td>{reserva.atendido ? 'Sí' : 'No'}</td>
                <td>{reserva.facturado ? 'Sí' : 'No'}</td>
                <td>{reserva.pagado ? 'Sí' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(reserva)}>Editar</button>
                  <button onClick={() => handleDelete(reserva.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="modal-title">Editar Reserva</h2>
          <form>
            <TextField
              label="Fecha"
              type="date"
              name="fecha"
              value={formValues.fecha}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Hora"
              type="time"
              name="hora"
              value={formValues.hora}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Médico"
              select
              name="id_medico"
              value={formValues.id_medico}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            >
              {medicos.map((medico) => (
                <MenuItem key={medico.id} value={medico.id}>
                  {medico.nombre}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Guardar
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default VerHorasComponent;
