// src/types/Product.ts
export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;  // Asegúrate de que 'imagen' esté aquí
    talla?: string;
  }
  
  export interface ProductInCart extends Producto {
    cantidad: number;
  }
  