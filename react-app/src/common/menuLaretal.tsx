import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Button from '@mui/material/Button';
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
  const { user, logout } = useAuth();

  return (
    <Box sx={{ width: 'auto', bgcolor:'#f8f9fa'}}>
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

          {[
            { text: 'Pedir hora', url: 'pedir-hora' },
            { text: 'Ver horas', url: 'ver-horas' },
            { text: 'Cancelar hora', url: 'cancelar-hora' },
            
          ].map((item, index) => (
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
      <Divider />
      <Box sx={{ p: 2 }}>
        {user ? (
            <>
              <Typography variant="body1">
                Bienvenido, {user}
              </Typography>
              <Button variant="contained" color="secondary" onClick={logout} sx={{mt:2}}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" href="/login">
              Login
            </Button>
          )}
      </Box>
    </Box>
  );
}

export default SidebarMenu;