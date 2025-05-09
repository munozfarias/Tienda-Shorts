// src/pages/Productos.tsx
import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion?: string;
  tallas?: string[];
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const search = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/products.json`)
      .then(res => res.json())
      .then((data: Producto[]) => setProductos(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtrados = useMemo(() => {
    if (!search) return productos;
    return productos.filter(p =>
      p.nombre.toLowerCase().includes(search) ||
      (p.descripcion?.toLowerCase().includes(search) ?? false)
    );
  }, [productos, search]);

  if (loading) {
    return <p className="text-center mt-8">Cargando catálogo…</p>;
  }

  return (
    <main className="p-6">
      {search && (
        <p className="mb-4 text-gray-600">
          Resultados para: <strong>{search}</strong>
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtrados.map(p => (
          <Link
            key={p.id}
            to={`/productos/${p.id}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={`${process.env.PUBLIC_URL}${p.imagen}`}
              alt={p.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{p.nombre}</h2>
              <p className="text-gray-700 mt-2">${p.precio.toLocaleString()}</p>
            </div>
          </Link>
        ))}
        {filtrados.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No encontramos productos para “{search}”
          </p>
        )}
      </div>
    </main>
  );
}
