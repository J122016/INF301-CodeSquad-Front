import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: '10px' }}>
        <Typography variant="h6" component="div">
          Centro Médico Galenos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;