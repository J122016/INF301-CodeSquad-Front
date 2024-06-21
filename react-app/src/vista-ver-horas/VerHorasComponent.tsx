import React from 'react';
import './ejemplo.css'; // Importamos los estilos CSS

interface VerHorasComponentProps {
  attribute: string;
}

const VerHorasComponent: React.FC<VerHorasComponentProps> = ({ attribute }) => {
  // Aquí va la lógica específica para VerHorasComponent si es necesario

  return (
    <div className="container">
      <div className="component-container">
        <h1 className="title">Vista de ejemplo (src &gt; Vistas &gt; VerHorasComponent.tsx)</h1>
        <p className="paragraph">Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
        {/* Aquí va el contenido específico de VerHorasComponent */}
      </div>
    </div>
  );
};

export default VerHorasComponent;
