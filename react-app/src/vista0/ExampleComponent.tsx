// ExampleComponent.tsx
import React from 'react';
import { Button, Snackbar, IconButton, TextField, Modal, Box, Typography, Divider, Link, Paper, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ejemplo.css';

interface ExampleComponentProps {
  attribute: string;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ attribute }) => {
  // Aquí va la lógica específica para ExampleComponent si es necesario

  return (
    <div className="container">
      <h1 className="title">Vista de ejemplo (src &gt; Vistas &gt; ExampleComponent.tsx)</h1>
      <p>Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
      {/* Aquí va el contenido específico de ExampleComponent */}
    </div>
  );
};

export default ExampleComponent;
