// src/api.js
export const empresasData = [
  { id: '1', nombre: 'Grupo Minorista Luxe', categoria: 'Moda y Accesorios', status: 'Activo' },
  { id: '2', nombre: 'Logística Global', categoria: 'Logística y Envío', status: 'Inactivo' },
  { id: '3', nombre: 'Cervezas Artesanales', categoria: 'Alimentos y Bebidas', status: 'Pago Pendiente' },
  { id: '4', nombre: 'Sistemas TechNode', categoria: 'Software SaaS', status: 'Activo' },
];

export const addEmpresa = (nuevaEmpresa) => {
  empresasData.push({ id: Date.now().toString(), ...nuevaEmpresa, status: 'Activo' });
};