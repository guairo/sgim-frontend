/**
 * <MainLayout> - Esqueleto general de las vistas autenticadas.
 *
 * Combina el <Sidebar> con el area de contenido donde React Router renderiza
 * la ruta activa mediante <Outlet>.
 */
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
