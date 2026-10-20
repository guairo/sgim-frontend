/**
 * Punto de entrada de la aplicacion SGIM.
 * Monta el componente raiz <App /> dentro del elemento #root del index.html
 * y habilita StrictMode para detectar problemas potenciales en desarrollo.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
