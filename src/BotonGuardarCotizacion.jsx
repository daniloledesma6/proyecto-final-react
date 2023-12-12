import React, { useState } from 'react';
import { usarCotizacion } from './CotizadorContext';
import '/src/Formulario.css';



const BotonGuardarCotizacion = () => {
  const { guardarCotizacionEnHistorial, cotizacion } = usarCotizacion();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const manejarGuardarCotizacion = (e) => {
    e.preventDefault();
    try {
      guardarCotizacionEnHistorial();
      const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
      historialCotizaciones.push(cotizacion);
      localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));

      
      setMensaje('Cotización guardada');
    } catch (error) {
      
      setMensaje('Cotización inválida');
    } finally {
      
      setMostrarMensaje(true);
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000); 
    }
  };

  return (
    <div>
      <button onClick={manejarGuardarCotizacion} className='botones-final'>
        Guardar Cotización
      </button>
      {mostrarMensaje && (
        <div className='popup-container'>
          <div className='popup'>
            <p>{mensaje}</p>
            <button onClick={() => setMostrarMensaje(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotonGuardarCotizacion;





