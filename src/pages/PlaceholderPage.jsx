/**
 * <PlaceholderPage> - Pagina temporal para modulos aun no implementados.
 *
 * Se usa para los modulos "Movimientos", "Mantenimientos" y "Reportes",
 * que seran construidos en evidencias posteriores del proyecto formativo.
 */
function PlaceholderPage({ titulo }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 max-w-2xl">
      <h2 className="text-2xl font-bold text-sgim-700 mb-2">{titulo}</h2>
      <p className="text-slate-600">
        Este modulo sera implementado en una proxima evidencia del proyecto
        formativo del programa SENA ADSO. En la presente evidencia (AA4-EV03)
        se desarrolla el modulo central de <strong>Bienes</strong>.
      </p>
    </div>
  );
}

export default PlaceholderPage;
