import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterApp from '/src/appRouter.jsx';
import '/src/Index.css';

const raiz = document.getElementById('contenedor');
const elementoRaiz = ReactDOM.createRoot(raiz);
elementoRaiz.render(<RouterApp />);

