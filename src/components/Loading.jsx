import React from 'react';
import './Loading.css'; // Importa estilos personalizados

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando...</p>
      <small>Nuestro servidor está poniéndose en marcha. La primera carga puede ser un poco lenta, ¡gracias por entender!...</small>
    </div>
  );
};

export default Loading;
