/**
 * <Button> - Boton reutilizable del sistema SGIM.
 *
 * Admite tres variantes visuales: primaria, secundaria y peligrosa.
 * Centraliza los estilos para garantizar consistencia visual.
 *
 * @param {Object}   props
 * @param {'primario'|'secundario'|'peligro'} [props.variante='primario']
 * @param {'submit'|'button'|'reset'} [props.type='button']
 * @param {boolean}  [props.deshabilitado=false]
 * @param {Function} [props.onClick]
 * @param {React.ReactNode} props.children
 */
function Button({
  variante = 'primario',
  type = 'button',
  deshabilitado = false,
  onClick,
  children,
  className = '',
}) {
  // Mapa de clases por variante - evita condicionales dispersos en el markup
  const variantes = {
    primario: 'bg-sgim-700 hover:bg-sgim-600 text-white',
    secundario: 'bg-white hover:bg-slate-50 text-sgim-700 border border-sgim-700',
    peligro: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const base =
    'px-4 py-2 rounded-md font-medium text-sm shadow-sm transition-colors ' +
    'disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none ' +
    'focus:ring-2 focus:ring-offset-1 focus:ring-sgim-500';

  return (
    <button
      type={type}
      disabled={deshabilitado}
      onClick={onClick}
      className={`${base} ${variantes[variante]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
