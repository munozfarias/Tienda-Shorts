import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ProductInCart } from '../types/Product';

interface CarritoContextType {
  carrito: ProductInCart[];
  agregarAlCarrito: (producto: ProductInCart) => void;
  eliminarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

interface CarritoProviderProps {
  children: ReactNode;
}

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const [carrito, setCarrito] = useState<ProductInCart[]>(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto: ProductInCart) => {
    setCarrito((prevCarrito) => {
      const existeProducto = prevCarrito.find((item) => item.id === producto.id);
      if (existeProducto) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, producto];
      }
    });
  };

  const eliminarDelCarrito = (id: string) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((producto) => producto.id !== id)
    );
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id ? { ...producto, cantidad } : producto
      )
    );
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};
