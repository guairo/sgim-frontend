/**
 * <BienDetailPage> - Ficha de detalle de un bien.
 *
 * Caso de uso implementado: CU-06 Consultar ficha de un bien.
 * Historia de usuario: HU-07 Como funcionario quiero consultar la ficha
 * completa de un bien incluyendo su estado y observaciones.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { obtenerBien } from '../services/bienesService.js';
import { CATEGORIAS_MOCK, DEPENDENCIAS_MOCK } from '../data/seed.js';
import { formatoMoneda, formatoFecha } from '../utils/validators.js';
import Button from '../components/Button.jsx';
import EstadoBienBadge from '../components/EstadoBienBadge.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * <FichaFila> - Fila etiqueta/valor reutilizable para presentar atributos.
 */
function FichaFila({ etiqueta, children }) {
  return (
    <div className="py-2 grid grid-cols-1 sm:grid-cols-3 gap-1 border-b border-slate-100">
      <dt className="text-xs text-slate-500 uppercase tracking-wider">
        {etiqueta}
      </dt>
      <dd className="sm:col-span-2 text-sm text-sgim-700 font-medium">
        {children}
      </dd>
    </div>
  );
}

function BienDetailPage() {
  const { id } = useParams();
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const puedeAdministrar = usuario?.rol === 'ADMINISTRADOR' || usuario?.rol === 'AUXILIAR';

  const [bien, setBien] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerBien(id)
      .then(setBien)
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p className="text-slate-500">Cargando bien...</p>;

  if (!bien) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-sgim-700 mb-2">Bien no encontrado</h2>
        <p className="text-slate-600 mb-4">
          El bien que busca no existe o fue eliminado.
        </p>
        <Link to="/bienes">
          <Button>Volver al listado</Button>
        </Link>
      </div>
    );
  }

  const categoria = CATEGORIAS_MOCK.find((c) => c.id === bien.categoriaId);
  const dependencia = DEPENDENCIAS_MOCK.find((d) => d.id === bien.dependenciaId);

  return (
    <div>
      {/* Encabezado */}
      <header className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-2xl font-bold text-sgim-700">{bien.nombre}</h2>
          <p className="text-sm text-slate-600 font-mono mt-1">
            Placa: {bien.placa}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <EstadoBienBadge estado={bien.estado} />
          {puedeAdministrar && (
            <Button onClick={() => navegar(`/bienes/${bien.id}/editar`)}>
              Editar
            </Button>
          )}
          <Link to="/bienes">
            <Button variante="secundario">Volver</Button>
          </Link>
        </div>
      </header>

      {/* Ficha de datos */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-3xl">
        <h3 className="text-lg font-semibold text-sgim-700 mb-3">
          Informacion general
        </h3>
        <dl>
          <FichaFila etiqueta="Placa">{bien.placa}</FichaFila>
          <FichaFila etiqueta="Nombre">{bien.nombre}</FichaFila>
          <FichaFila etiqueta="Categoria">{categoria?.nombre || '-'}</FichaFila>
          <FichaFila etiqueta="Dependencia">{dependencia?.nombre || '-'}</FichaFila>
          <FichaFila etiqueta="Responsable">{bien.responsable}</FichaFila>
          <FichaFila etiqueta="Valor de adquisicion">
            {formatoMoneda(bien.valorAdquisicion)}
          </FichaFila>
          <FichaFila etiqueta="Fecha de adquisicion">
            {formatoFecha(bien.fechaAdquisicion)}
          </FichaFila>
          <FichaFila etiqueta="Estado">
            <EstadoBienBadge estado={bien.estado} />
          </FichaFila>
          <FichaFila etiqueta="Observaciones">
            {bien.observaciones || <span className="text-slate-400 italic">Sin observaciones</span>}
          </FichaFila>
        </dl>
      </div>
    </div>
  );
}

export default BienDetailPage;
