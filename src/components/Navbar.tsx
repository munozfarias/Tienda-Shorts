import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSearch(false);
    }, 200);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center h-20 font-sans">
          {/* Logo a la izquierda */}
          <div className="flex-1">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              TiendaShorts
            </Link>
          </div>

          {/* Enlaces centrados */}
          <div className="flex-1 flex justify-center space-x-8">
            <Link to="/" className="nav-link text-gray-700 hover:text-black">Inicio</Link>
            <Link to="/productos" className="nav-link text-gray-700 hover:text-black">Productos</Link>
            <Link to="/contacto" className="nav-link text-gray-700 hover:text-black">Contacto</Link>
          </div>

          {/* Iconos a la derecha */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* Botón de búsqueda */}
            <button
              onClick={() => setShowSearch(prev => !prev)}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
              aria-label="Buscar"
            >
              <FaSearch size={18} />
            </button>

            {/* Input de búsqueda */}
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

            <Link to="/perfil" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
              <FaUser size={20} />
            </Link>

            <Link to="/carrito" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
              <FaShoppingCart size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
