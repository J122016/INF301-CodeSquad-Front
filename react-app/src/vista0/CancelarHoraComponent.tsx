import React from 'react';
import './ejemplo.css'; // Importamos los estilos CSS

interface CancelarHoraComponentProps {
  attribute: string;
}

const CancelarHoraComponent: React.FC<CancelarHoraComponentProps> = ({ attribute }) => {
  // Aquí va la lógica específica para CancelarHoraComponent si es necesario

  return (
    <div className="container">
      <div className="component-container">
        <h1 className="title">Vista de ejemplo (src &gt; Vistas &gt; CancelarHoraComponent.tsx)</h1>
        <p className="paragraph">Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
        {/* Aquí va el contenido específico de CancelarHoraComponent */}
      </div>
    </div>
  );
};

export default CancelarHoraComponent;
