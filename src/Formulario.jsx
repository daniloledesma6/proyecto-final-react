import React, { useState, useEffect } from 'react';
import { usarCotizacion } from './CotizadorContext';
import BotonGuardarCotizacion from './BotonGuardarCotizacion';
import '/src/Formulario.css';

const Formulario = () => {
  const { actualizarCotizacion, cotizacion } = usarCotizacion();
  const [opciones, setOpciones] = useState([]);
  const [tipoVideo, setTipoVideo] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [minutos, setMinutos] = useState('');
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState('');

  useEffect(() => {
    fetch('/data/data.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setOpciones(datos);
      })
      .catch((error) => console.error('Error al cargar las opciones:', error));
  }, []);

  const validarFormulario = () => {
    if (!tipoVideo || !plataforma || !minutos) {
      setMensajePopup('Todos los campos son obligatorios');
      setMostrarPopup(true);
      return false;
    }

    const minutosValor = parseFloat(minutos);

    if (isNaN(minutosValor) || minutosValor <= 0 || minutosValor > 10000) {
      setMensajePopup('La duración debe ser un número mayor a 0 y no mayor a 10000');
      setMostrarPopup(true);
      return false;
    }

    return true;
  };

  const manejarCambioTipoVideo = (e) => {
    setTipoVideo(e.target.value);
  };

  const manejarCambioPlataforma = (e) => {
    setPlataforma(e.target.value);
  };

  const manejarCambioMinutos = (e) => {
    setMinutos(e.target.value);
  };

  const manejarCotizacion = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const factorTipo = opciones.find((opt) => opt.categoria === 'Tipo' && opt.tipo === tipoVideo)?.factor || 1;
      const factorPlataforma = opciones.find((opt) => opt.categoria === 'Plataforma' && opt.tipo === plataforma)?.factor || 1;

      const montoCotizacion = factorTipo * factorPlataforma * parseFloat(minutos);

      actualizarCotizacion({
        tipoVideo,
        plataforma,
        minutos,
        montoCotizacion: montoCotizacion.toFixed(2),
      });
    }
  };

  return (
    <form>
      <h2 className='subtitulo'>Ingresa las características de tu proyecto 🖊</h2>
      <div className='separador'></div>
      {mostrarPopup && (
        <div className='popup-container'>
          <div className='popup'>
            <p>{mensajePopup}</p>
            <button onClick={() => setMostrarPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
      <label className='tipo-plataforma-min'>
        Tipo de Video:
        <select value={tipoVideo} onChange={manejarCambioTipoVideo}>
          <option value="">Seleccionar</option>
          {opciones
            .filter((opt) => opt.categoria === 'Tipo')
            .map((tipo) => (
              <option key={tipo.tipo} value={tipo.tipo}>
                {tipo.tipo}
              </option>
            ))}
        </select>
      </label>
      <br />
      <label className='tipo-plataforma-min'>
        Plataforma Destinada:
        <select value={plataforma} onChange={manejarCambioPlataforma}>
          <option value="" className='opcion-b'>Seleccionar</option>
          {opciones
            .filter((opt) => opt.categoria === 'Plataforma')
            .map((plataforma) => (
              <option key={plataforma.tipo} value={plataforma.tipo}>
                {plataforma.tipo}
              </option>
            ))}
        </select>
      </label>
      <br />
      <label className='tipo-plataforma-min'>
        Duración (en minutos):
        <input className='input-minutos' type="number" value={minutos} onChange={manejarCambioMinutos} />
      </label>
      <br />
      <button className='boton-cotizar' onClick={manejarCotizacion}>
        Cotizar
      </button>

      {cotizacion && (
        <div className='precio-cotizado'>
          <p>
            <strong className='precio-cotizado'>Precio:</strong> ${cotizacion.montoCotizacion}
          </p>
        </div>
      )}
      <BotonGuardarCotizacion />
      
    </form>
  );
};

export default Formulario;





