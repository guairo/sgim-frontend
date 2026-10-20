/**
 * bienesService - Capa de servicios para la entidad "Bien".
 *
 * Encapsula el acceso a datos y simula las operaciones que en produccion
 * seran peticiones HTTP al back-end. Para esta evidencia los datos se
 * persisten en localStorage, de modo que los cambios sobreviven al refresco
 * del navegador.
 *
 * Si en el futuro se conecta el back-end real, basta con sustituir el
 * cuerpo de estas funciones por llamadas a Axios manteniendo las mismas
 * firmas, sin modificar los componentes que las consumen.
 */
import { BIENES_MOCK } from '../data/seed.js';

const STORAGE_KEY = 'sgim_bienes';
// Latencia simulada para apreciar los estados de carga en la UI
const LATENCIA_MS = 300;

/**
 * Devuelve una promesa que resuelve despues de N milisegundos.
 */
const esperar = (ms = LATENCIA_MS) => new Promise((r) => setTimeout(r, ms));

/**
 * Lee el inventario completo desde el almacenamiento local.
 * Si no existe aun, lo inicializa con los datos semilla.
 */
const leerInventario = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // Si el contenido esta corrupto se restaura con el seed
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(BIENES_MOCK));
  return [...BIENES_MOCK];
};

/**
 * Persiste el inventario completo en el almacenamiento local.
 */
const guardarInventario = (lista) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
};

/**
 * Obtiene todos los bienes registrados.
 *
 * @returns {Promise<Array>} Promesa con el arreglo de bienes.
 */
export async function listarBienes() {
  await esperar();
  return leerInventario();
}

/**
 * Obtiene un bien por su identificador.
 *
 * @param {number} id Identificador del bien.
 * @returns {Promise<Object|null>} Bien encontrado o null si no existe.
 */
export async function obtenerBien(id) {
  await esperar();
  const lista = leerInventario();
  return lista.find((b) => b.id === Number(id)) || null;
}

/**
 * Crea un nuevo bien en el inventario. Genera un id autoincremental.
 *
 * @param {Object} datos Datos del bien a crear (sin id).
 * @returns {Promise<Object>} Bien creado con su id asignado.
 */
export async function crearBien(datos) {
  await esperar();
  const lista = leerInventario();
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((b) => b.id)) + 1 : 1;
  const nuevo = { id: nuevoId, ...datos };
  const actualizada = [...lista, nuevo];
  guardarInventario(actualizada);
  return nuevo;
}

/**
 * Actualiza un bien existente.
 *
 * @param {number} id   Identificador del bien a actualizar.
 * @param {Object} datos Nuevos datos del bien (sin id).
 * @returns {Promise<Object>} Bien actualizado.
 */
export async function actualizarBien(id, datos) {
  await esperar();
  const lista = leerInventario();
  const indice = lista.findIndex((b) => b.id === Number(id));
  if (indice === -1) {
    throw new Error(`No existe el bien con id ${id}.`);
  }
  const actualizado = { ...lista[indice], ...datos, id: Number(id) };
  const actualizada = [...lista];
  actualizada[indice] = actualizado;
  guardarInventario(actualizada);
  return actualizado;
}

/**
 * Elimina un bien del inventario.
 *
 * @param {number} id Identificador del bien a eliminar.
 * @returns {Promise<boolean>} true si el bien fue eliminado.
 */
export async function eliminarBien(id) {
  await esperar();
  const lista = leerInventario();
  const filtrada = lista.filter((b) => b.id !== Number(id));
  guardarInventario(filtrada);
  return true;
}

/**
 * Restaura el inventario a los datos semilla originales. Util para pruebas.
 */
export function resetearInventario() {
  localStorage.removeItem(STORAGE_KEY);
}
