import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6">Catálogo Completo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <Link
            key={p.id}
            to={`/producto/${p.id}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img src={p.imagen} alt={p.nombre} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{p.nombre}</h2>
              <p className="text-gray-700 mt-2">${p.precio.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
