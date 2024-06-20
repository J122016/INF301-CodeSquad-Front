// App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Grid } from '@mui/material';
import { AuthProvider } from './AuthContext';
import ExampleComponent from './vista0/ExampleComponent';
import ExampleViewComponent from './vista0/ejemplo';
import DefaultView from './common/defaultView';

import Header from './common/header';
import SidebarMenu from './common/menuLaretal';
import LoginComponent from './vista-login/LoginComponent';
import IngresarPagoComponent from './vista-ingreso-pago/IngresarPagoComponent';
import RegistroComponent from './vista-registro/RegistroComponent';
import PedirHoraComponent from './vista-pedir-hora/PedirHoraComponent';
import CancelarHoraComponent from './vista-cancelar-hora/CancelarHoraComponent';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Grid container spacing={0} columns={12} justifyContent="space-evenly" sx={{bgcolor:'#edf5fd'}}>
            <Grid item xs={10} md={2} mt={4} sx={{mt:0}}>
            <SidebarMenu />
            </Grid>
            <Grid item xs={10} mt={4} sx={{mt:0}}>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/registro" element={<RegistroComponent />} /> {/* Agrega la ruta para RegistroComponent */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <ExampleViewComponent attribute="example parameter" />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vistaEjemplo"
                element={
                  <PrivateRoute>
                    <DefaultView />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pedir-hora"
                element={
                  <PrivateRoute>
                    <PedirHoraComponent attribute="example parameter" />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cancelar-hora"
                element={
                  <PrivateRoute>
                    <CancelarHoraComponent attribute="example parameter" />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ingreso-pago"
                element={
                  <PrivateRoute>
                    <IngresarPagoComponent attribute="example parameter" />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<DefaultView />} />
            </Routes>
            </Grid>
          </Grid>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
