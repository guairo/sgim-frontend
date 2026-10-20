/**
 * AppRoutes - Configuracion de rutas de la aplicacion SGIM.
 *
 * Define las rutas publicas (login) y privadas (modulo de bienes y resto
 * del sistema), aplicando el componente <RutaProtegida> para asegurar que
 * solo usuarios autenticados puedan acceder a las vistas internas.
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import BienesListPage from '../pages/BienesListPage.jsx';
import BienFormPage from '../pages/BienFormPage.jsx';
import BienDetailPage from '../pages/BienDetailPage.jsx';
import PlaceholderPage from '../pages/PlaceholderPage.jsx';

/**
 * <RutaProtegida> - Envoltorio que redirige al login si no hay sesion activa.
 */
function RutaProtegida({ children }) {
  const { estaAutenticado } = useAuth();
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Ruta publica: inicio de sesion */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas privadas dentro del layout principal */}
      <Route
        element={
          <RutaProtegida>
            <MainLayout />
          </RutaProtegida>
        }
      >
        <Route path="/" element={<DashboardPage />} />

        {/* Modulo de Bienes (CRUD completo) */}
        <Route path="/bienes" element={<BienesListPage />} />
        <Route path="/bienes/nuevo" element={<BienFormPage />} />
        <Route path="/bienes/:id" element={<BienDetailPage />} />
        <Route path="/bienes/:id/editar" element={<BienFormPage />} />

        {/* Modulos pendientes de implementacion en siguientes evidencias */}
        <Route
          path="/movimientos"
          element={<PlaceholderPage titulo="Movimientos" />}
        />
        <Route
          path="/mantenimientos"
          element={<PlaceholderPage titulo="Mantenimientos" />}
        />
        <Route
          path="/reportes"
          element={<PlaceholderPage titulo="Reportes" />}
        />
      </Route>

      {/* Catch-all: cualquier ruta desconocida redirige al dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
