/**
 * <LoginPage> - Pagina de inicio de sesion del SGIM.
 *
 * Caso de uso implementado: CU-01 Inicio de sesion.
 * Historia de usuario: HU-01 "Como usuario del sistema quiero autenticarme
 * para acceder a las funcionalidades del SGIM segun mi rol".
 */
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
import FormField, { estilosControl } from '../components/FormField.jsx';

function LoginPage() {
  const { login, estaAutenticado } = useAuth();
  const navegar = useNavigate();

  // Estado controlado del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Si el usuario ya esta autenticado, redirige al dashboard
  if (estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  /**
   * Maneja el envio del formulario de inicio de sesion.
   */
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError('');
    setCargando(true);

    // Pequena espera para simular latencia de red
    await new Promise((r) => setTimeout(r, 400));

    const resultado = login(username, password);
    if (resultado.ok) {
      navegar('/', { replace: true });
    } else {
      setError(resultado.mensaje);
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sgim-700 to-sgim-900 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-sgim-700">SGIM</h1>
          <p className="text-sm text-slate-600 mt-1">
            Sistema de Gestion para Inventario Municipal
          </p>
        </div>

        <h2 className="text-xl font-semibold text-sgim-700 mb-4">
          Inicio de sesion
        </h2>

        <form onSubmit={manejarEnvio} noValidate>
          <FormField id="username" label="Usuario" requerido>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={estilosControl}
              placeholder="Ingrese su usuario"
              autoComplete="username"
              autoFocus
            />
          </FormField>

          <FormField id="password" label="Contrasena" requerido>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={estilosControl}
              placeholder="Ingrese su contrasena"
              autoComplete="current-password"
            />
          </FormField>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variante="primario"
            deshabilitado={cargando}
            className="w-full"
          >
            {cargando ? 'Validando...' : 'Entrar'}
          </Button>
        </form>

        {/* Credenciales de prueba (visibles solo en el entorno formativo) */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <p className="font-semibold mb-1">Credenciales de prueba:</p>
          <ul className="space-y-0.5">
            <li>admin / admin123</li>
            <li>auxiliar / auxiliar123</li>
            <li>consulta / consulta123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
