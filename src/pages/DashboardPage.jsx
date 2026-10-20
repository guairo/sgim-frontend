/**
 * <DashboardPage> - Pantalla principal del sistema.
 *
 * Muestra indicadores basicos del inventario: total de bienes, bienes
 * activos, bienes en mantenimiento y bienes dados de baja. Permite al
 * usuario tener una vision general al ingresar al sistema.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { listarBienes } from '../services/bienesService.js';
import { formatoMoneda } from '../utils/validators.js';

/**
 * <TarjetaIndicador> - Pequena tarjeta reutilizable para mostrar un KPI.
 */
function TarjetaIndicador({ titulo, valor, color = 'bg-sgim-700' }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-slate-200">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{titulo}</p>
      <p className="text-2xl font-bold text-sgim-700">{valor}</p>
      <div className={`mt-3 h-1 w-12 rounded-full ${color}`}></div>
    </div>
  );
}

function DashboardPage() {
  const { usuario } = useAuth();
  const [bienes, setBienes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Al montar el componente, carga el inventario para calcular los indicadores
  useEffect(() => {
    listarBienes()
      .then(setBienes)
      .finally(() => setCargando(false));
  }, []);

  // Calculo de indicadores a partir del arreglo de bienes
  const total = bienes.length;
  const activos = bienes.filter((b) => b.estado === 'ACTIVO').length;
  const mantenimiento = bienes.filter((b) => b.estado === 'EN_MANTENIMIENTO').length;
  const baja = bienes.filter((b) => b.estado === 'DADO_DE_BAJA').length;
  const valorTotal = bienes.reduce((acc, b) => acc + Number(b.valorAdquisicion || 0), 0);

  return (
    <div>
      {/* Encabezado de la pagina */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-sgim-700">
          Bienvenido, {usuario?.nombre}
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Panel general del Sistema de Gestion para Inventario Municipal.
        </p>
      </header>

      {cargando ? (
        <p className="text-slate-500">Cargando indicadores...</p>
      ) : (
        <>
          {/* Grilla de indicadores KPI */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <TarjetaIndicador titulo="Total de bienes" valor={total} color="bg-sgim-700" />
            <TarjetaIndicador titulo="Activos" valor={activos} color="bg-green-600" />
            <TarjetaIndicador titulo="En mantenimiento" valor={mantenimiento} color="bg-yellow-500" />
            <TarjetaIndicador titulo="Dados de baja" valor={baja} color="bg-red-600" />
          </section>

          {/* Resumen del valor total del inventario */}
          <section className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Valor total del inventario
            </h3>
            <p className="text-3xl font-bold text-sgim-700">
              {formatoMoneda(valorTotal)}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Suma del valor de adquisicion de todos los bienes registrados.
            </p>
          </section>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
