import React, { useState } from 'react';
import './ejemplo.css';

interface MyComponentProps {
  attribute: string;
}

/**
 * ## Componente vista de ejemplo
 * Puede ser utilizado para testear react, MUI, incluye ejemplos básicos.
 * @param param0 String, ejemplo de parametro de entrada
 */
const VerUsuariosComponent: React.FC<MyComponentProps> = ({ attribute }) =>{
    // Aquí va la lógica específica para VerUsuariosComponent si es necesario

    return (
      <div className="container">
        <div className="component-container">
          <h1 className="title">Vista de ejemplo (src &gt; Vistas &gt; VerUsuariosComponent.tsx)</h1>
          <p className="paragraph">Parámetro desde componente padre en caso de necesitarlo: {attribute}</p>
          {/* Aquí va el contenido específico de VerUsuariosComponent */}
        </div>
      </div>
    );
};

export default VerUsuariosComponent;