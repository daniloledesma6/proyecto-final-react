import { useState } from 'react';

const usarLocalStorage = (clave, valorInicial) => {
  const valorAlmacenado = localStorage.getItem(clave);
  const inicial = valorAlmacenado ? JSON.parse(valorAlmacenado) : valorInicial;

  const [valor, setValor] = useState(inicial);

  const establecerValorAlmacenado = (nuevoValor) => {
    setValor(nuevoValor);
    localStorage.setItem(clave, JSON.stringify(nuevoValor));
  };

  return [valor, establecerValorAlmacenado];
};

export default usarLocalStorage;

