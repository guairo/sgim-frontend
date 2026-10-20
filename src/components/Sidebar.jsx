/**
 * <Sidebar> - Barra de navegacion lateral del SGIM.
 *
 * Muestra los modulos principales del sistema y resalta el activo
 * utilizando el componente <NavLink> de React Router.
 */
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Lista de modulos del sistema. Cada item define la ruta, el titulo y
 * el icono (texto simple en esta version para no depender de otra libreria).
 */
const MODULOS = [
  { ruta: '/', titulo: 'Dashboard', icono: '🏠' },
  { ruta: '/bienes', titulo: 'Bienes', icono: '📦' },
  { ruta: '/movimientos', titulo: 'Movimientos', icono: '🔁' },
  { ruta: '/mantenimientos', titulo: 'Mantenimientos', icono: '🛠️' },
  { ruta: '/reportes', titulo: 'Reportes', icono: '📊' },
];

function Sidebar() {
  const { usuario, logout } = useAuth();

  return (
    <aside className="bg-sgim-900 text-white w-60 min-h-screen flex flex-col">
      <div className="px-5 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold">SGIM</h1>
        <p className="text-xs text-white/70 mt-1">Inventario Municipal</p>
      </div>

      <nav className="flex-1 py-4">
        {MODULOS.map((m) => (
          <NavLink
            key={m.ruta}
            to={m.ruta}
            end={m.ruta === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-sgim-700 text-white border-l-4 border-white'
                  : 'text-white/80 hover:bg-sgim-700/50 border-l-4 border-transparent'
              }`
            }
          >
            <span>{m.icono}</span>
            <span>{m.titulo}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10 text-xs">
        <p className="font-semibold">{usuario?.nombre}</p>
        <p className="text-white/70">{usuario?.rol}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-3 w-full text-left text-white/80 hover:text-white underline"
        >
          Cerrar sesion
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
