import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Typography } from '@mui/material';


/**
 * ## Barra lateral Versión 0 (Base)
 * Sólo contiene menú de index 
 * 
 */
function SidebarMenu() {

  // Acceso para conocer locación/url
  const location = useLocation();
  const actualPath = location.pathname;
  const { user, rol, logout } = useAuth();

  return (
    <Box sx={{ width: 'auto', bgcolor:'#f8f9fa'}}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
          Bienvenido {user? user: null}
        </Typography>
      </Box>
      <Divider/>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/"
              sx={{ 
                bgcolor: actualPath === "/"? 'primary.main' : '', 
                color: actualPath === "/"? 'common.white' : '' 
                }}>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton component={Link} to="/login" onClick={() => {user && logout()}}
              sx={{ 
                bgcolor: actualPath === "/login"? 'primary.main' : '', 
                color: actualPath === "/login"? 'common.white' : '' 
                }}>
              <ListItemText primary={(user? "Cerrar": "Iniciar")+" sesión"} />
            </ListItemButton>
          </ListItem>

          {[
            { text: 'Pedir hora', url: 'pedir-hora', permissions:["Admin", "Paciente"] },
            { text: 'Ver horas', url: 'ver-horas', permissions:["Admin", "Paciente", "Secretaria"] }, //duda
            { text: 'Cancelar hora', url: 'cancelar-hora', permissions:["Admin", "Paciente"] },
            { text: 'Calendario médicos', url: 'calendario', permissions:["Admin", "Secretaria"] },
            { text: 'Pacientes en espera', url: 'consultar-paciente', permissions:["Admin", "Secretaria", "Medico"] },
            { text: 'Marcar atención médica', url: 'marcar-paciente', permissions:["Admin"] },
            { text: 'Emisión y registro de comisiones', url: 'historial-facturas', permissions:["Admin", "Secretaria"] },
            { text: 'Informe recaudación', url: 'informe-recaudacion', permissions:["Admin", "Secretaria"] },
            { text: 'Ver Usuarios', url: 'ver-usuarios', permissions:["Admin"] },
            { text: 'Ver Roles', url: 'ver-roles', permissions:["Admin"] },            
          ].filter((view) => view.permissions.includes(rol? rol:'')).map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} to={'/'+item.url}
                sx={{ 
                  bgcolor: actualPath.includes(item.url)? 'primary.main' : '', 
                  color: actualPath.includes(item.url)? 'common.white' : '' 
                  }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/ingreso-pago" 
              sx={{ 
                bgcolor: actualPath.includes("ingreso-pago")? 'primary.main' : '', 
                color: actualPath.includes("ingreso-pago")? 'common.white' : '' 
                }}>
              <ListItemText primary="Pagar atención" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default SidebarMenu;