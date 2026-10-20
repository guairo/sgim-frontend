/**
 * Componente raiz de la aplicacion SGIM.
 * Envuelve toda la aplicacion con los proveedores de contexto necesarios
 * (autenticacion) y el enrutador principal basado en React Router.
 */
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
