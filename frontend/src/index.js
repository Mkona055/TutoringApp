import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

const history = createBrowserHistory();
root.render(
  <React.StrictMode>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);

