import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TopUp from './topup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "./Table"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <Table/>
  </React.StrictMode>
);

