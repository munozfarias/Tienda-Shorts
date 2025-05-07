import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  tallas: string[];
  cantidad: number;
}

interface CarritoContextType {
  productos: Producto[];
  agregarProducto: (producto: Producto) => void;
  eliminarProducto: (id: number) => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const agregarProducto = (producto: Producto) => {
    setProductos(prev => [...prev, producto]);
  };

  const eliminarProducto = (id: number) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <CarritoContext.Provider value={{ productos, agregarProducto, eliminarProducto }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return ctx;
};
