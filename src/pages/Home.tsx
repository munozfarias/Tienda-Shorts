// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  tallas: string[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/products.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Cargando productos...</p>;
  }

  return (
    <main className="font-sans">
      {/* Hero */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Lleva tu entrenamiento al siguiente nivel
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Descubre nuestra nueva colección de shorts de Muay Thai
          </p>
          <Link
            to="/productos"
            className="bg-yellow-500 text-black font-semibold py-3 px-6 rounded-md hover:bg-yellow-600 transition"
          >
            Ver colección
          </Link>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <img
                src={`${process.env.PUBLIC_URL}${p.imagen}`}
                alt={p.nombre}
                className="w-full h-48 object-cover rounded"
              />

              <h3 className="mt-4 text-xl font-semibold">{p.nombre}</h3>
              <p className="mt-2 text-gray-700">${p.precio.toFixed(2)}</p>
              <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Vídeo */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <video className="w-full rounded-lg" autoPlay loop muted>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta vídeos.
          </video>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Ana", "Luis", "María"].map((name) => (
            <blockquote key={name} className="bg-white p-6 rounded-lg shadow">
              <p className="italic">
                “Excelente calidad y envío rápido. ¡Recomendado!”
              </p>
              <footer className="mt-4 font-semibold">— {name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-2">TiendaShorts</h4>
            <p>Shorts de Muay Thai de alta calidad.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Enlaces</h4>
            <ul>
              <li>
                <Link to="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:text-white">
                  Productos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2">Síguenos</h4>
            <div className="flex space-x-4">
              {/* Aquí tus íconos sociales */}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
