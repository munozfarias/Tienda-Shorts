import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSearch(false);
    }, 200);
  };

  return (
    <nav className="bg-white shadow font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/">TiendaShorts</Link>
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Menú"
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

          {/* Menú principal en desktop */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black">Inicio</Link>
            <Link to="/productos" className="text-gray-700 hover:text-black">Productos</Link>
            <Link to="/contacto" className="text-gray-700 hover:text-black">Contacto</Link>
          </div>

          {/* Íconos en desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(prev => !prev)}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Buscar"
            >
              <FaSearch size={18} />
            </button>

            {showSearch && (
              <input
                type="text"
                placeholder="Buscar..."
                className="ml-2 w-0 transition-all duration-300 ease-in-out focus:w-48 focus:px-3 focus:py-1 focus:border-blue-500 border border-gray-300 rounded"
                autoFocus
                onBlur={handleSearchBlur}
                onKeyDown={(e) => e.key === 'Enter' && setShowSearch(false)}
              />
            )}

            <Link to="/perfil" className="text-gray-600 hover:text-gray-800">
              <FaUser size={20} />
            </Link>
            <Link to="/carrito" className="text-gray-600 hover:text-gray-800">
              <FaShoppingCart size={20} />
            </Link>
          </div>
        </div>

        {/* Menú móvil colapsado */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-start space-y-4 mt-4 pb-4 border-t border-gray-200">
            <Link to="/" className="text-gray-700 hover:text-black w-full" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/productos" className="text-gray-700 hover:text-black w-full" onClick={() => setMenuOpen(false)}>Productos</Link>
            <Link to="/contacto" className="text-gray-700 hover:text-black w-full" onClick={() => setMenuOpen(false)}>Contacto</Link>

            {/* Íconos y búsqueda en móvil */}
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => setShowSearch(prev => !prev)}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Buscar"
              >
                <FaSearch size={18} />
              </button>

              <Link to="/perfil" className="text-gray-600 hover:text-gray-800">
                <FaUser size={20} />
              </Link>
              <Link to="/carrito" className="text-gray-600 hover:text-gray-800">
                <FaShoppingCart size={20} />
              </Link>
            </div>

            {showSearch && (
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full mt-2 px-3 py-1 border border-gray-300 rounded"
                autoFocus
                onBlur={handleSearchBlur}
                onKeyDown={(e) => e.key === 'Enter' && setShowSearch(false)}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
