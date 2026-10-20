/**
 * <BienesListPage> - Listado del inventario de bienes.
 *
 * Casos de uso implementados:
 *   CU-02 Consultar inventario de bienes
 *   CU-05 Eliminar bien
 *
 * Historias de usuario:
 *   HU-02 Como auxiliar quiero ver todos los bienes registrados.
 *   HU-03 Como auxiliar quiero buscar bienes por placa o nombre.
 *   HU-05 Como administrador quiero eliminar bienes que fueron registrados por error.
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarBienes, eliminarBien } from '../services/bienesService.js';
import { DEPENDENCIAS_MOCK, CATEGORIAS_MOCK } from '../data/seed.js';
import { formatoMoneda, formatoFecha } from '../utils/validators.js';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
import Modal from '../components/Modal.jsx';
import EstadoBienBadge from '../components/EstadoBienBadge.jsx';
import { estilosControl } from '../components/FormField.jsx';

function BienesListPage() {
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const puedeAdministrar = usuario?.rol === 'ADMINISTRADOR' || usuario?.rol === 'AUXILIAR';

  const [bienes, setBienes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  // Estado para el modal de confirmacion de eliminacion
  const [bienAEliminar, setBienAEliminar] = useState(null);

  /**
   * Carga el inventario desde el servicio.
   * Se extrae en una funcion para poder refrescar tras eliminar.
   */
  const cargar = async () => {
    setCargando(true);
    const datos = await listarBienes();
    setBienes(datos);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  /**
   * Lista filtrada en memoria. useMemo evita recalcularla en cada render.
   */
  const bienesFiltrados = useMemo(() => {
    const texto = filtro.trim().toLowerCase();
    return bienes.filter((b) => {
      const coincideTexto =
        !texto ||
        b.placa.toLowerCase().includes(texto) ||
        b.nombre.toLowerCase().includes(texto) ||
        b.responsable.toLowerCase().includes(texto);
      const coincideEstado = !filtroEstado || b.estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
  }, [bienes, filtro, filtroEstado]);

  /**
   * Obtiene el nombre de una entidad relacionada a partir de su id.
   */
  const nombreCategoria = (id) =>
    CATEGORIAS_MOCK.find((c) => c.id === id)?.nombre || '-';
  const nombreDependencia = (id) =>
    DEPENDENCIAS_MOCK.find((d) => d.id === id)?.nombre || '-';

  /**
   * Confirma la eliminacion del bien seleccionado.
   */
  const confirmarEliminacion = async () => {
    if (!bienAEliminar) return;
    await eliminarBien(bienAEliminar.id);
    setBienAEliminar(null);
    await cargar();
  };

  return (
    <div>
      {/* Encabezado y acciones */}
      <header className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-2xl font-bold text-sgim-700">Inventario de bienes</h2>
          <p className="text-sm text-slate-600 mt-1">
            {bienesFiltrados.length} de {bienes.length} bienes
          </p>
        </div>
        {puedeAdministrar && (
          <Button onClick={() => navegar('/bienes/nuevo')}>+ Nuevo bien</Button>
        )}
      </header>

      {/* Barra de filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-slate-200 flex flex-wrap gap-3">
        <input
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Buscar por placa, nombre o responsable..."
          className={`${estilosControl} flex-1 min-w-[200px]`}
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className={`${estilosControl} max-w-xs`}
        >
          <option value="">Todos los estados</option>
          <option value="ACTIVO">Activo</option>
          <option value="EN_MANTENIMIENTO">En mantenimiento</option>
          <option value="EN_TRASLADO">En traslado</option>
          <option value="DADO_DE_BAJA">Dado de baja</option>
        </select>
      </div>

      {/* Tabla principal */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
        {cargando ? (
          <p className="p-6 text-slate-500">Cargando bienes...</p>
        ) : bienesFiltrados.length === 0 ? (
          <p className="p-6 text-slate-500">
            No se encontraron bienes con los filtros aplicados.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-sgim-700">Placa</th>
                <th className="px-4 py-3 text-left font-semibold text-sgim-700">Nombre</th>
                <th className="px-4 py-3 text-left font-semibold text-sgim-700">Categoria</th>
                <th className="px-4 py-3 text-left font-semibold text-sgim-700">Dependencia</th>
                <th className="px-4 py-3 text-right font-semibold text-sgim-700">Valor</th>
                <th className="px-4 py-3 text-center font-semibold text-sgim-700">Estado</th>
                <th className="px-4 py-3 text-center font-semibold text-sgim-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bienesFiltrados.map((b) => (
                <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs">{b.placa}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/bienes/${b.id}`}
                      className="text-sgim-700 hover:underline font-medium"
                    >
                      {b.nombre}
                    </Link>
                    <p className="text-xs text-slate-500">
                      Adquirido: {formatoFecha(b.fechaAdquisicion)}
                    </p>
                  </td>
                  <td className="px-4 py-3">{nombreCategoria(b.categoriaId)}</td>
                  <td className="px-4 py-3">{nombreDependencia(b.dependenciaId)}</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatoMoneda(b.valorAdquisicion)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <EstadoBienBadge estado={b.estado} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/bienes/${b.id}`}
                        className="text-sgim-700 hover:underline text-xs"
                      >
                        Ver
                      </Link>
                      {puedeAdministrar && (
                        <>
                          <Link
                            to={`/bienes/${b.id}/editar`}
                            className="text-sgim-700 hover:underline text-xs"
                          >
                            Editar
                          </Link>
                          <button
                            type="button"
                            onClick={() => setBienAEliminar(b)}
                            className="text-red-600 hover:underline text-xs"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de confirmacion de eliminacion */}
      <Modal
        abierto={Boolean(bienAEliminar)}
        onCerrar={() => setBienAEliminar(null)}
        titulo="Confirmar eliminacion"
        acciones={
          <>
            <Button variante="secundario" onClick={() => setBienAEliminar(null)}>
              Cancelar
            </Button>
            <Button variante="peligro" onClick={confirmarEliminacion}>
              Eliminar
            </Button>
          </>
        }
      >
        <p>
          Esta accion eliminara permanentemente el bien{' '}
          <strong>{bienAEliminar?.placa}</strong> ({bienAEliminar?.nombre}).
        </p>
        <p className="mt-2 text-red-600">Esta operacion no se puede deshacer.</p>
      </Modal>
    </div>
  );
}

export default BienesListPage;
