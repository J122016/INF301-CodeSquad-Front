import React from 'react';
import './ejemplo.css'; // Importamos los estilos CSS

interface PedirHoraComponentProps {
  attribute: string;
}

const PedirHoraComponent: React.FC<PedirHoraComponentProps> = ({ attribute }) => {
  // Aquí va la lógica específica para PedirHoraComponent si es necesario

  return (
    <div className="container">
      <div className="component-container">
        <h1 className="title">Vista de ejemplo (src &gt; Vistas &gt; PedirHoraComponent.tsx)</h1>
        <p className="paragraph">Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
        {/* Aquí va el contenido específico de PedirHoraComponent */}
      </div>
    </div>
  );
};

export default PedirHoraComponent;
