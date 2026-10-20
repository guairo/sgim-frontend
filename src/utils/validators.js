/**
 * Validadores reutilizables para los formularios del SGIM.
 *
 * Cada funcion recibe el valor a validar y devuelve una cadena con el
 * mensaje de error, o la cadena vacia si el valor es valido.
 */

/**
 * Valida que un campo de texto no este vacio.
 */
export const requerido = (valor) => {
  if (valor === null || valor === undefined || String(valor).trim() === '') {
    return 'Este campo es obligatorio.';
  }
  return '';
};

/**
 * Valida que la placa cumpla con el formato interno:
 *   dos letras mayusculas, un guion y tres digitos (ejemplo: PC-001).
 */
export const placa = (valor) => {
  const errorBase = requerido(valor);
  if (errorBase) return errorBase;
  const regex = /^[A-Z]{2}-\d{3}$/;
  if (!regex.test(String(valor).toUpperCase().trim())) {
    return 'La placa debe tener el formato XX-000 (ej. PC-001).';
  }
  return '';
};

/**
 * Valida que un numero sea mayor o igual a cero.
 */
export const numeroPositivo = (valor) => {
  const errorBase = requerido(valor);
  if (errorBase) return errorBase;
  const n = Number(valor);
  if (Number.isNaN(n) || n < 0) {
    return 'Ingrese un valor numerico mayor o igual a cero.';
  }
  return '';
};

/**
 * Valida que la fecha no sea posterior al dia de hoy.
 */
export const fechaNoFutura = (valor) => {
  const errorBase = requerido(valor);
  if (errorBase) return errorBase;
  const fecha = new Date(valor);
  const hoy = new Date();
  hoy.setHours(23, 59, 59, 999);
  if (fecha > hoy) {
    return 'La fecha no puede ser posterior al dia de hoy.';
  }
  return '';
};

/**
 * Formatea un numero como moneda colombiana (COP).
 */
export const formatoMoneda = (valor) => {
  const n = Number(valor) || 0;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(n);
};

/**
 * Formatea una fecha ISO como dd/mm/aaaa.
 */
export const formatoFecha = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${d.getFullYear()}`;
};
