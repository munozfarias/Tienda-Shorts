import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductInCart } from "../types/Product";
import { useCarrito } from "../context/CarritoContext";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  talla: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/products.json`)
      .then(res => res.json())
      .then((data: Producto[]) => {
        const encontrado = data.find(p => p.id === id);
        setProducto(encontrado || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-8">Cargando producto…</p>;
  if (!producto) return <p className="text-center mt-8">Producto no encontrado</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={`${process.env.PUBLIC_URL}${producto.imagen}`}
        alt={producto.nombre}
        className="w-full max-h-96 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{producto.nombre}</h1>
      <p className="text-gray-700 mt-2">{producto.descripcion}</p>
      <p className="text-xl font-semibold mt-2">${producto.precio}</p>
      <p className="text-sm text-gray-500">Talla: {producto.talla}</p>
      <button
        onClick={() =>
          agregarAlCarrito({
            ...producto,
            cantidad: 1,
          })
        }
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductDetail;
