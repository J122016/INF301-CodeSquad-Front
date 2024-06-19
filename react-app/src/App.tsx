// App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './common/header';
import DefaultView from './common/defaultView';
import SidebarMenu from './common/menuLaretal';
import LoginComponent from './vista0/LoginComponent';
import IngresarPagoComponent from './vista0/IngresarPagoComponent';
import RegistroComponent from './vista0/RegistroComponent'; // Importa RegistroComponent
import PrivateRoute from './PrivateRoute';
import { Stack } from '@mui/material';
import { AuthProvider } from './AuthContext';
import ExampleComponent from './vista0/ExampleComponent';
import PedirHoraComponent from './vista0/PedirHoraComponent';
import CancelarHoraComponent from './vista0/CancelarHoraComponent';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Stack direction="row">
            <SidebarMenu />
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/registro" element={<RegistroComponent />} /> {/* Agrega la ruta para RegistroComponent */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <DefaultView />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vistaEjemplo"
                element={
                  <PrivateRoute>
                    <ExampleComponent attribute="example parameter" />
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
          </Stack>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
