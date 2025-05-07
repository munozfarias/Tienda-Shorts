// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Asegúrate de que App esté exportado correctamente
import './index.css'; // Esto importa tus estilos de Tailwind
import { CarritoProvider } from './context/CarritoContext'; // Importa el CarritoProvider

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Envolver App con CarritoProvider */}
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
