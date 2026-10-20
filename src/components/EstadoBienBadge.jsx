/**
 * <EstadoBienBadge> - Insignia visual que representa el estado de un bien.
 *
 * Se muestra como un sello de color estandarizado para que el usuario
 * reconozca rapidamente el estado del bien en listados y detalles.
 *
 * @param {{ estado: 'ACTIVO'|'EN_MANTENIMIENTO'|'EN_TRASLADO'|'DADO_DE_BAJA' }} props
 */
function EstadoBienBadge({ estado }) {
  // Mapa estado -> estilos y etiqueta en espanol
  const config = {
    ACTIVO: { clases: 'bg-green-100 text-green-800', etiqueta: 'Activo' },
    EN_MANTENIMIENTO: { clases: 'bg-yellow-100 text-yellow-800', etiqueta: 'En mantenimiento' },
    EN_TRASLADO: { clases: 'bg-blue-100 text-blue-800', etiqueta: 'En traslado' },
    DADO_DE_BAJA: { clases: 'bg-red-100 text-red-800', etiqueta: 'Dado de baja' },
  };

  const { clases, etiqueta } = config[estado] || {
    clases: 'bg-slate-100 text-slate-700',
    etiqueta: estado || 'Desconocido',
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${clases}`}
    >
      {etiqueta}
    </span>
  );
}

export default EstadoBienBadge;
