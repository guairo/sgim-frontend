/**
 * <FormField> - Campo de formulario reutilizable.
 *
 * Encapsula la etiqueta, el control (input, select o textarea) y el
 * mensaje de error. Esto garantiza una presentacion uniforme en todos
 * los formularios del SGIM y centraliza la logica de accesibilidad.
 *
 * @param {Object} props
 * @param {string} props.id        Identificador del control (vincula label y control)
 * @param {string} props.label     Texto de la etiqueta
 * @param {string} [props.error]   Mensaje de error (si existe)
 * @param {boolean}[props.requerido=false] Marca el campo como obligatorio
 * @param {React.ReactNode} props.children El control del formulario (input/select/textarea)
 */
function FormField({ id, label, error, requerido = false, children }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-sgim-700 mb-1">
        {label}
        {requerido && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/**
 * Estilos reutilizados para todos los controles de formulario del SGIM.
 */
export const estilosControl =
  'w-full px-3 py-2 border border-slate-300 rounded-md text-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-sgim-500 focus:border-sgim-500 ' +
  'disabled:bg-slate-100 disabled:text-slate-500';

export default FormField;
