/**
 * Datos semilla (seed) del sistema SGIM.
 *
 * Contiene informacion ficticia utilizada para la demostracion del modulo
 * cuando no existe conexion con el back-end. En produccion este archivo
 * desaparece: las listas se consumen desde los endpoints REST.
 */

/**
 * Usuarios de ejemplo. Credenciales de prueba:
 *   admin / admin123       -> rol administrador
 *   auxiliar / auxiliar123 -> rol auxiliar de inventario
 *   consulta / consulta123 -> rol de consulta
 */
export const USUARIOS_MOCK = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    nombre: 'Jonhatan Rivadeneira',
    rol: 'ADMINISTRADOR',
  },
  {
    id: 2,
    username: 'auxiliar',
    password: 'auxiliar123',
    nombre: 'Maria Lopez',
    rol: 'AUXILIAR',
  },
  {
    id: 3,
    username: 'consulta',
    password: 'consulta123',
    nombre: 'Pedro Perez',
    rol: 'CONSULTA',
  },
];

/**
 * Dependencias de la alcaldia (unidades administrativas).
 */
export const DEPENDENCIAS_MOCK = [
  { id: 1, nombre: 'Secretaria General' },
  { id: 2, nombre: 'Secretaria de Hacienda' },
  { id: 3, nombre: 'Secretaria de Planeacion' },
  { id: 4, nombre: 'Secretaria de Gobierno' },
  { id: 5, nombre: 'Oficina de Control Interno' },
];

/**
 * Categorias de los bienes muebles.
 */
export const CATEGORIAS_MOCK = [
  { id: 1, nombre: 'Equipos de computo' },
  { id: 2, nombre: 'Mobiliario de oficina' },
  { id: 3, nombre: 'Vehiculos' },
  { id: 4, nombre: 'Equipos de comunicaciones' },
  { id: 5, nombre: 'Herramientas' },
];

/**
 * Estados validos para un bien dentro del ciclo de vida del inventario.
 */
export const ESTADOS_BIEN = [
  { valor: 'ACTIVO', etiqueta: 'Activo', color: 'green' },
  { valor: 'EN_MANTENIMIENTO', etiqueta: 'En mantenimiento', color: 'yellow' },
  { valor: 'EN_TRASLADO', etiqueta: 'En traslado', color: 'blue' },
  { valor: 'DADO_DE_BAJA', etiqueta: 'Dado de baja', color: 'red' },
];

/**
 * Inventario inicial de bienes para la demostracion.
 */
export const BIENES_MOCK = [
  {
    id: 1,
    placa: 'PC-001',
    nombre: 'Portatil Dell Latitude 5420',
    categoriaId: 1,
    dependenciaId: 1,
    responsable: 'Jonhatan Rivadeneira',
    valorAdquisicion: 3500000,
    fechaAdquisicion: '2024-03-15',
    estado: 'ACTIVO',
    observaciones: 'Entregado con cargador, mouse y maletin.',
  },
  {
    id: 2,
    placa: 'MO-014',
    nombre: 'Escritorio en L madera',
    categoriaId: 2,
    dependenciaId: 2,
    responsable: 'Maria Lopez',
    valorAdquisicion: 850000,
    fechaAdquisicion: '2023-08-22',
    estado: 'ACTIVO',
    observaciones: '',
  },
  {
    id: 3,
    placa: 'VH-002',
    nombre: 'Camioneta Toyota Hilux 2022',
    categoriaId: 3,
    dependenciaId: 4,
    responsable: 'Pedro Perez',
    valorAdquisicion: 145000000,
    fechaAdquisicion: '2022-11-05',
    estado: 'EN_MANTENIMIENTO',
    observaciones: 'En taller - cambio de aceite y revision 60.000 km.',
  },
  {
    id: 4,
    placa: 'EC-003',
    nombre: 'Impresora multifuncional Epson L3250',
    categoriaId: 1,
    dependenciaId: 3,
    responsable: 'Ana Castro',
    valorAdquisicion: 950000,
    fechaAdquisicion: '2024-01-30',
    estado: 'ACTIVO',
    observaciones: 'Usa tanque de tinta externa.',
  },
  {
    id: 5,
    placa: 'HE-010',
    nombre: 'Taladro percutor Bosch',
    categoriaId: 5,
    dependenciaId: 5,
    responsable: 'Luis Torres',
    valorAdquisicion: 320000,
    fechaAdquisicion: '2021-06-10',
    estado: 'DADO_DE_BAJA',
    observaciones: 'Dano irreparable en motor - acta de baja N. 015/2024.',
  },
];
