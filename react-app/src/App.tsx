import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Vistas
import Header from './common/header';
import DefaultView from './common/defaultView';
import ExampleViewComponent from './vista0/ejemplo';
import SidebarMenu from './common/menuLaretal';
import { Stack } from '@mui/material';

/**
 * ## Raíz de aplicativo web
 * - Ruteo (actualmente estático)
 * - Layout (header, sideBar, contenido principal)
 * 
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Stack direction="row">
          <SidebarMenu />
          <Routes>
            <Route path="/" element={<DefaultView/>} />
            <Route path="/vistaEjemplo" element={<ExampleViewComponent atribute='example parameter'/>} />
            <Route path="/pedir-hora" element={<ExampleViewComponent atribute='url: pedir-hora'/>} />
            <Route path="/cancelar-hora" element={<ExampleViewComponent atribute='url: cancelar-hora'/>} />
            <Route path="/login" element={<ExampleViewComponent atribute='url: login'/>} />
            <Route path="/ingreso-pago" element={<ExampleViewComponent atribute='url: ingreso-pago'/>} />
            <Route path="*" element={<DefaultView/>} />
          </Routes>
        </Stack>
      </div>
    </Router>
  );
}

export default App;
