// src/pages/Carrito.tsx
import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { ProductInCart } from '../types/Product'; // Importa ProductInCart

export default function Carrito() {
  const { carrito } = useCarrito(); // Obtén el carrito del contexto

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="space-y-2">
          {carrito.map((prod: ProductInCart, idx: number) => (
            <li key={idx}>
              {prod.nombre} — ${prod.precio} × {prod.cantidad}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
