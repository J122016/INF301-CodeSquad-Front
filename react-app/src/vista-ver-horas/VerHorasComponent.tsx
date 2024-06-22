import React, { useState, useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import './ejemplo.css'; // Importamos los estilos CSS

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
  nombre_medico: string; // Nuevo campo para el nombre del médico
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

// Función para formatear la fecha en DD/MM/YYYY
const formatDate = (dateString: string): string => {
  const timestamp = Number(dateString);
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const VerHorasComponent: React.FC<VerHorasComponentProps> = ({ attribute }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener las reservas:', err);
        setError('Error al obtener las reservas');
        setLoading(false);
      }
    };

    fetchReservas();
  }, [attribute, client]);

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerHorasComponent;
