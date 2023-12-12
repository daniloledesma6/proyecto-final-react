import React, { createContext, useContext, useState } from 'react';

const ContextoCotizador = createContext();

export const Cotizador = ({ children }) => {
  const [cotizacion, setCotizacion] = useState(null);
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  const actualizarCotizacion = (datosCotizacion) => {
    setCotizacion(datosCotizacion);
  };

  const guardarCotizacionEnHistorial = () => {
    cotizacion && setHistorialCotizaciones((historialPrevio) => [cotizacion, ...historialPrevio]);
  };

  return (
    <ContextoCotizador.Provider
      value={{ cotizacion, actualizarCotizacion, historialCotizaciones, guardarCotizacionEnHistorial }}
    >
      {children}
    </ContextoCotizador.Provider>
  );
};

export const usarCotizacion = () => {
  const contexto = useContext(ContextoCotizador);
  if (!contexto);
  return contexto;
};




