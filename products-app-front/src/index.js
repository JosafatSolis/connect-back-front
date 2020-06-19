import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UIkit from 'uikit';
import "uikit/dist/css/uikit.min.css";
// Para poder importar los íconos...
// Opción: fontawesome react
import Icons from 'uikit/dist/js/uikit-icons';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Permite conectar con el gestor de rutas del navegador (historial - back), 
// se puede comportar de forma inteligente con el navegador
import { BrowserRouter } from 'react-router-dom';

// Es necesario hacer esto para poder importar los íconos en UIKint
UIkit.use(Icons);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
