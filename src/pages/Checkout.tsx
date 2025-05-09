// src/pages/Checkout.tsx
import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { ProductInCart } from "../types/Product"; // Importa ProductInCart

export default function Checkout() {
  const { carrito } = useCarrito(); // Obtén el carrito del contexto

  // Calcula el total de la cantidad de productos
  const cantidadTotal = carrito.reduce(
    (acc: number, p: ProductInCart) => acc + p.cantidad,
    0
  );

  // Calcula el total de precio
  const precioTotal = carrito.reduce(
    (acc: number, p: ProductInCart) => acc + p.precio * p.cantidad,
    0
  );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resumen de Compra</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="mb-4">
            {carrito.map((item, idx) => (
              <li key={idx} className="border-b py-2">
                {item.nombre} — ${item.precio} × {item.cantidad}
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold">
            Total de ítems: {cantidadTotal}
          </p>
          <p className="text-xl font-bold">
            Total a pagar: ${precioTotal.toLocaleString()}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded"
            onClick={() => alert("Compra confirmada. ¡Gracias por tu compra!")}
          >
            Confirmar compra
          </button>
        </>
      )}
    </div>
  );
}
