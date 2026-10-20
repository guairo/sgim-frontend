/**
 * AuthContext - Contexto global de autenticacion del SGIM.
 *
 * Encapsula el estado del usuario autenticado y las funciones de inicio
 * y cierre de sesion. Al ser un sistema formativo, la autenticacion se
 * resuelve contra una lista mock de usuarios almacenada en /src/data/seed.js.
 * En un escenario de produccion este contexto consumiria el endpoint
 * /api/auth/login del back-end y manejaria tokens JWT.
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { USUARIOS_MOCK } from '../data/seed.js';

// Clave para persistir la sesion en el almacenamiento local del navegador
const STORAGE_KEY = 'sgim_session';

// Contexto que sera consumido por los componentes hijos
const AuthContext = createContext(null);

/**
 * Proveedor del contexto de autenticacion.
 * Debe envolver el arbol de componentes que necesiten acceder a la sesion.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function AuthProvider({ children }) {
  // Estado principal: usuario autenticado (o null si no hay sesion)
  const [usuario, setUsuario] = useState(() => {
    // Al iniciar, se intenta recuperar la sesion previa del localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  /**
   * Persiste cambios de sesion en el navegador cada vez que el usuario cambia.
   */
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [usuario]);

  /**
   * Intenta iniciar sesion con las credenciales proporcionadas.
   *
   * @param {string} username  Nombre de usuario
   * @param {string} password  Contrasena
   * @returns {{ ok: boolean, mensaje: string }} Resultado del intento
   */
  const login = (username, password) => {
    const encontrado = USUARIOS_MOCK.find(
      (u) => u.username === username.trim() && u.password === password
    );

    if (!encontrado) {
      return { ok: false, mensaje: 'Usuario o contrasena incorrectos.' };
    }

    // No se guarda la contrasena en el estado por seguridad basica
    const { password: _omitida, ...publico } = encontrado;
    setUsuario(publico);
    return { ok: true, mensaje: 'Inicio de sesion correcto.' };
  };

  /**
   * Cierra la sesion activa y limpia el almacenamiento local.
   */
  const logout = () => {
    setUsuario(null);
  };

  // useMemo evita que el valor del contexto cambie en cada render
  const value = useMemo(
    () => ({
      usuario,
      estaAutenticado: Boolean(usuario),
      login,
      logout,
    }),
    [usuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook personalizado para consumir el contexto de autenticacion.
 * Lanza un error si se usa fuera del AuthProvider.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe utilizarse dentro de un <AuthProvider>.');
  }
  return ctx;
}
