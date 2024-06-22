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
import SidebarMenu from './common/menuLateral';
import LoginComponent from './vista-login/LoginComponent';
import IngresarPagoComponent from './vista-ingreso-pago/IngresarPagoComponent';
import RegistroComponent from './vista-registro/RegistroComponent';
import PedirHoraComponent from './vista-pedir-hora/PedirHoraComponent';
import VerHorasComponent from './vista-ver-horas/VerHorasComponent';
import CancelarHoraComponent from './vista-cancelar-hora/CancelarHoraComponent';
import CalendarioComponent from './vista-calendario/CalendarioComponent';
import ConsultarPacienteComponent from './vista-consultar-paciente/ConsultarPacienteComponent';
import VerUsuariosComponent from './vista-ver-usuarios/VerUsuariosComponent';
import InformeRecaudacionComponent from './vista-informe-recaudacion/InformeRecaudacionComponent';
import MarcarPacienteComponent from './vista-marcar-paciente/MarcarPacienteComponent';
import HistorialFacturasComponent from './vista-historial-facturas/HistorialFacturasComponent';
import VerRolesComponent from './vista-ver-roles/VerRolesComponent';

function App() {

  const rut = window.sessionStorage.getItem('rut');

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
                path="/ver-horas"
                element={
                  <PrivateRoute>
                    <VerHorasComponent attribute={rut!} />
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
              <Route path="/calendario" 
                element={
                  <PrivateRoute>
                    <CalendarioComponent attribute="calendario" />
                  </PrivateRoute>
                } />
              <Route path="/consultar-paciente" 
                element={
                  <PrivateRoute>
                    <ConsultarPacienteComponent attribute="consultar pacientes" />
                  </PrivateRoute>
                  } />
              <Route path="/marcar-paciente" 
                element={
                  <PrivateRoute>
                    <MarcarPacienteComponent attribute="marcar pacientes" />
                  </PrivateRoute>
                  } />
              <Route path="/ver-usuarios" 
                element={
                  <PrivateRoute>
                    <VerUsuariosComponent attribute="ver usuarios"/>
                  </PrivateRoute>
                  } />
              <Route path="/ver-roles" 
                element={
                  <PrivateRoute>
                    <VerRolesComponent attribute="ver roles"/>
                  </PrivateRoute>
                  } />
              <Route path="/historial-facturas" 
                element={
                  <PrivateRoute>
                    <HistorialFacturasComponent attribute="historial facturas" />
                  </PrivateRoute>
                  } />
              <Route path="/informe-recaudacion" 
                element={
                  <PrivateRoute>
                    <InformeRecaudacionComponent attribute="informe recaudación" />
                  </PrivateRoute>
                  } />
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
