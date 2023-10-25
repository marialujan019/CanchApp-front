// NavigationArrows.js
import React from 'react';
import './navigationArrows.css'; // Importa tu archivo de estilos para las flechas de navegación

const NavigationArrows = ({ onPrev, onNext, canGoPrev, canGoNext }) => {
  return (
    <div className="navigation-arrows">
      <button onClick={onPrev} disabled={!canGoPrev}>
        &lt; Anterior
      </button>
      <button onClick={onNext} disabled={!canGoNext}>
        Siguiente &gt;
      </button>
    </div>
  );
};

export default NavigationArrows;
