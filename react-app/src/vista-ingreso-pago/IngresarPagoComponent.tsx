import React from 'react';
import './ejemplo.css'; // Importamos los estilos CSS

interface IngresarPagoComponentProps {
  attribute: string;
}

const IngresarPagoComponent: React.FC<IngresarPagoComponentProps> = ({ attribute }) => {
  // Aquí va la lógica específica para IngresarPagoComponent si es necesario

  return (
    <div className="container">
      <div className="component-container">
        <h1 className="title">Vista de ejemplo (src &gt; Vistas &gt; IngresarPagoComponent.tsx)</h1>
        <p className="paragraph">Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
        {/* Aquí va el contenido específico de IngresarPagoComponent */}
      </div>
    </div>
  );
};

export default IngresarPagoComponent;
