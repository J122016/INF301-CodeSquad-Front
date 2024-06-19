import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';


/**
 * ## Barra lateral Versión 0 (Base)
 * Sólo contiene menú de index 
 * 
 */
function SidebarMenu() {

  // Acceso para conocer locación/url
  const location = useLocation();
  const actualPath = location.pathname;

  return (
    <Box sx={{ width: 'auto', maxWidth: 360}}>
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
        Usuario sin autenticar
      </Box>
    </Box>
  );
}

export default SidebarMenu;