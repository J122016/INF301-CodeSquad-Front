import React, { useState } from 'react';
import './ejemplo.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider, Link, Paper, Stack } from '@mui/material';

interface MyComponentProps {
  attribute: string;
}

//otra forma de definir estilos aparte de CSS
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 * ## Componente vista de ejemplo
 * Puede ser utilizado para testear react, MUI, incluye ejemplos básicos.
 * @param param0 String, ejemplo de parametro de entrada
 */
const VerRolesComponent: React.FC<MyComponentProps> = ({ attribute }) => {

  // Estados (si se requieren)
  const [openBoolean, setOpenBoolean] = useState(false);
  const [newCount, setNewCount] = useState(0); 
  const [inputValue, setInputValue] = useState('');
  const [inputValueHasError, setInputValueHasError] = useState(false);

  // funciones para acciones
  const handleClickExample = (event:any) => {
    event.preventDefault();
    setNewCount(newCount + 1); 
    setOpenBoolean(true);
  };

  const handleClose = () => {
    setOpenBoolean(false);
  }

  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
    if (inputValue!) {
      setInputValueHasError(true);
    }
  };

  // Siguientes bloques perfectamente pueden ser sub-componentes o tener más contenido.
  // Se mantienen aqui para dejarlos como ejemplos
  // Pd: si se maneja de esta forma, tienen que ir encapsulados en un fragmento (<React.Fragment>)
  const snackBarNotificationContent = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Ok
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  const modalContent = (
    <Modal
      open={openBoolean}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Título de modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Valor de entrada: {inputValue.trim() || "'vacio'"} 
        </Typography>
      </Box>
    </Modal>
  )

  // Retorno a renderizar
  return (
    <div className="container">
      <h1 className="title">Vista de ejemplo (src &gt; Vista0 &gt; ejemplo.tsx)</h1>
      <p>Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
    
      <Paper elevation={0} 
        sx={{
          paddingBlock:3,
          mx: 'auto', //márgenes automáticos
          width: {
            // !!! Para uso responsivo con X de 12 columnas y tamaños(breakpoints) predefinidos del tema !!!
            // más documentación en: https://mui.com/system/getting-started/usage/#responsive-values 
            xs: 12/12, // theme.breakpoints.up('xs')
            sm: 10/12, // theme.breakpoints.up('sm')
            md: 8/12, // theme.breakpoints.up('md')
            lg: 6/12, // theme.breakpoints.up('lg')
            xl: 4/12, // theme.breakpoints.up('xl')
          }
        }}>

        <Typography variant="overline" display="block" gutterBottom>
          FORMULARIO EJEMPLO
        </Typography>

        <Stack direction="column" spacing={2} 
          sx={{mx: 5}}>
          <TextField
            required
            helperText={inputValueHasError? "Obligatorio" : "ingrese valor"}
            error={inputValueHasError}
            id="outlined-required"
            label="Campo 1"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Divider />
          <Button variant="contained" onClick={handleClickExample}>
            Action button
          </Button>
        </Stack>
      </Paper>

      <div className="link-container">
        <Link href="https://mui.com/material-ui/all-components/" >
          Ver documentación componentes de Material UI (MUI)
        </Link>
      </div>
      

      <React.Fragment>
        {modalContent}
      </React.Fragment>

      <Snackbar
        open={openBoolean}
        autoHideDuration={6000}
        onClose={handleClose}
        message={"Confirmación " + newCount }
        action={snackBarNotificationContent}
      />
    </div>
  );
};

export default VerRolesComponent;