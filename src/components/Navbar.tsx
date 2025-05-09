// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaThList } from 'react-icons/fa';
import { useCarrito } from '../context/CarritoContext';

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Usamos el hook useCarrito para acceder al carrito
  const { carrito } = useCarrito();

  // Calculamos el número total de productos en el carrito
  const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  return (
    <nav className="bg-white shadow relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 font-sans">
          {/* Móvil: botón menú */}
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(true)} className="text-gray-700 hover:text-black">
              <FaBars size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none flex-1 flex justify-center lg:justify-start">
            <Link to="/" className="text-2xl font-bold text-gray-800">TiendaShorts</Link>
          </div>

          {/* Escritorio: enlaces */}
          <div className="hidden lg:flex flex-1 justify-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black">Inicio</Link>
            <Link to="/productos" className="text-gray-700 hover:text-black">Productos</Link>
            <Link to="/amigos" className="text-gray-700 hover:text-black">Amigos</Link>
            <Link to="/contacto" className="text-gray-700 hover:text-black">Contacto</Link>
          </div>

          {/* Iconos y búsqueda */}
          <div ref={searchRef} className="flex-1 flex justify-end items-center space-x-4 relative">
            <button onClick={() => setShowSearch(v => !v)} className="text-gray-600 hover:text-gray-800">
              <FaSearch size={18} />
            </button>

            {/* Popover de búsqueda */}
            <div className={`
              absolute top-12 right-0 bg-white shadow-md border rounded p-3 w-64 z-40
              transform transition-all duration-200 ease-in-out
              ${showSearch ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
            `}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="¿Qué short buscas?"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                autoFocus
              />
            </div>

            <Link to="/perfil" className="text-gray-600 hover:text-gray-800"><FaUser size={20} /></Link>
            
            {/* Icono de carrito con número de ítems */}
            <Link to="/carrito" className="text-gray-600 hover:text-gray-800 relative">
              <FaShoppingCart size={20} />
              {totalProductos > 0 && (
                <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-600 text-white text-xs rounded-full text-center -translate-x-1/2 translate-y-1/2">
                  {totalProductos}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <FaThList className="text-gray-700" />
              <span className="text-lg font-semibold text-gray-700">Menú</span>
            </div>
            <button onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-black">
              <FaTimes size={24} />
            </button>
          </div>
          <button className="w-full bg-black text-white py-2 rounded mb-6 hover:bg-gray-900 transition">
            Iniciar Sesión
          </button>
          <nav className="flex flex-col space-y-4 text-lg">
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/productos" onClick={() => setMenuOpen(false)}>Productos</Link>
            <Link to="/amigos" onClick={() => setMenuOpen(false)}>Amigos</Link>
            <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
