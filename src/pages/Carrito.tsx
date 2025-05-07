import React from 'react';
import { useCarrito } from '../context/CarritoContext';

export default function Carrito() {
  const { productos, agregarProducto } = useCarrito();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
      {productos.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul className="space-y-2">
          {productos.map((prod, idx) => (
            <li key={idx}>
              {prod.nombre} — ${prod.precio} × {prod.cantidad}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() =>
          agregarProducto({
            id: Date.now(),
            nombre: 'Producto de prueba',
            precio: 100,
            descripcion: 'Producto genérico',
            imagen: '/images/short1.jpg',
            tallas: ['M'],
            cantidad: 1
          })
        }
        className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Agregar Producto de prueba
      </button>
    </div>
  );
}
