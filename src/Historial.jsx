import React from 'react';
import { Link } from 'react-router-dom';
import '/src/Historial.css';

const Historial = () => {
  const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];

  const handleLimpiarHistorial = () => {
    localStorage.removeItem('historialCotizaciones');
    
    window.location.reload();
  };

  return (
    <main className='contenedor-historial'>
      <h1 className='titulo'>Historial de Cotizaciones</h1>
      <Link to="/">
        <button className='botones-final bordes font-13 margin-5'>Volver</button>
        <button className='botones-final bordes font-13 margin-5' onClick={handleLimpiarHistorial}>Vaciar Historial</button>
      </Link>
      {historialCotizaciones.length === 0 ? (
        <p className='no-hay-cot bold'>No hay cotizaciones guardadas.</p>
      ) : (
        
        <section>
          
          <ul>
            {historialCotizaciones.map((cotizacion, index) => (
              <div key={index}>
                <strong className='cot'>Cotización {index + 1}:</strong>
                {cotizacion ? (
                  <ul>
                    <li><strong>Tipo de Video:</strong> {cotizacion.tipoVideo}</li>
                    <li><strong>Plataforma:</strong> {cotizacion.plataforma}</li>
                    <li><strong>Minutos:</strong> {cotizacion.minutos}</li>
                    <li><strong>Precio Total:</strong> ${cotizacion.montoCotizacion}</li>
                    <div className='separador-dos'></div>
                  </ul>
      
                ) : (
                  <p>Error: Cotización inválida</p>
                )}
              </div>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Historial;








