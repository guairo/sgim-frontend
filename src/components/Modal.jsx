/**
 * <Modal> - Ventana modal reutilizable.
 *
 * Oscurece el fondo y muestra un panel central con el contenido pasado
 * como children. Se usa principalmente para confirmaciones destructivas
 * (eliminar un bien, dar de baja, etc.).
 *
 * @param {Object}   props
 * @param {boolean}  props.abierto      Controla la visibilidad del modal
 * @param {Function} props.onCerrar     Callback al cerrar (clic en fondo o boton)
 * @param {string}   props.titulo       Encabezado del modal
 * @param {React.ReactNode} props.children Contenido principal
 * @param {React.ReactNode} [props.acciones] Botones de accion (pie del modal)
 */
function Modal({ abierto, onCerrar, titulo, children, acciones }) {
  // Si no esta abierto, no se renderiza nada (ahorra memoria)
  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      {/* Panel principal: detiene la propagacion del clic para no cerrar al interactuar */}
      <div
        className="bg-white w-full max-w-md rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-3 border-b border-slate-200 flex justify-between items-center">
          <h3 id="modal-titulo" className="text-lg font-semibold text-sgim-700">
            {titulo}
          </h3>
          <button
            type="button"
            onClick={onCerrar}
            className="text-slate-500 hover:text-slate-700 text-xl leading-none"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </header>
        <div className="px-5 py-4 text-sm text-slate-700">{children}</div>
        {acciones && (
          <footer className="px-5 py-3 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-lg">
            {acciones}
          </footer>
        )}
      </div>
    </div>
  );
}

export default Modal;
