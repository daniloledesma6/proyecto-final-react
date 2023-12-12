import React from 'react';
import { Link } from 'react-router-dom';
import Formulario from './Formulario';
import { Cotizador, usarCotizacion } from '/src/CotizadorContext.jsx';
import BotonGuardarCotizacion from './BotonGuardarCotizacion';
import Header from './Header';


const App = () => {
  return (
    <Cotizador>
      <div>
        <Header />
        <Formulario />
        <Link to="/historial">
          <button className='botones-final-dos'>Historial de Cotizaciones</button>
        </Link>
      </div>
    </Cotizador>
  );
};

export default App;





