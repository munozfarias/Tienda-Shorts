// src/pages/Detalle.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion?: string;
  tallas?: string[];
}

export default function Detalle() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/products.json`)
      .then(res => res.json())
      .then((data: Producto[]) => {
        const encontrado = data.find(p => p.id === id);
        if (encontrado) setProducto(encontrado);
      })
      .catch(console.error);
  }, [id]);

  const handleAgregar = () => {
    if (!producto) return;
  
    const carritoRaw = localStorage.getItem("carrito");
    const carrito = carritoRaw ? JSON.parse(carritoRaw) : [];
  
    const existe = carrito.find((p: Producto) => p.id === producto.id);
    if (!existe) {
      carrito.push({ ...producto, cantidad: 1 });
    } else {
      existe.cantidad += 1;
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("storage")); // 👈 Notifica al navbar
  
    alert("Producto agregado al carrito");
  };
  

  if (!producto) {
    return <p className="text-center mt-8">Cargando producto…</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={`${process.env.PUBLIC_URL}${producto.imagen}`}
          alt={producto.nombre}
          className="w-full md:w-1/2 object-cover h-96"
        />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>
          <p className="text-gray-700 mb-4">{producto.descripcion}</p>
          <p className="text-2xl font-semibold text-black mb-4">
            ${producto.precio.toLocaleString()}
          </p>
          {producto.tallas && (
            <div className="mb-4">
              <span className="font-semibold">Tallas disponibles:</span>
              <ul className="flex gap-2 mt-2">
                {producto.tallas.map(t => (
                  <li key={t} className="border px-3 py-1 rounded">{t}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleAgregar}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  );
}
