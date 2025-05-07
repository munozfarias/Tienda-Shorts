import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrito, Producto } from '../context/CarritoContext';

interface ProductData {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  tallas: string[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then((data: ProductData[]) => {
        const found = data.find(p => p.id === id);
        setProduct(found || null);
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <p className="p-6">Producto no encontrado.</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.imagen} alt={product.nombre} className="w-full md:w-1/2 rounded" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.nombre}</h1>
          <p className="text-gray-700 mt-2">{product.descripcion}</p>
          <p className="text-2xl font-semibold mt-4">${product.precio.toFixed(2)}</p>
          <div className="mt-4">
            <label className="block mb-1">Talla:</label>
            <select className="border rounded p-2">
              {product.tallas.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button
            onClick={() =>
              agregarProducto({
                id: Number(product.id),
                nombre: product.nombre,
                precio: product.precio,
                descripcion: product.descripcion,
                imagen: product.imagen,
                tallas: product.tallas,
                cantidad: 1
              } as Producto)
            }
            className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </main>
  );
}
