# SGIM - Sistema de Gestion para Inventario Municipal

**Evidencia AA4-EV03** - Codificacion del modulo del proyecto formativo.

- **Aprendiz:** Jonhatan Rivadeneira Pacheco
- **Programa:** Tecnologo en Analisis y Desarrollo de Software (ADSO) - SENA
- **Proyecto:** Sistema de Gestion para Inventario Municipal (SGIM)
- **Modulo entregado:** Gestion de Bienes (entidad central del sistema)

---

## 1. Descripcion

Este repositorio contiene la codificacion del **modulo de Bienes** del SGIM,
una aplicacion web desarrollada con React para la gestion del inventario
de bienes muebles en municipios colombianos de sexta categoria.

El modulo implementa el ciclo completo CRUD (Create, Read, Update, Delete)
sobre la entidad Bien, autenticacion basada en roles, enrutamiento con
rutas protegidas, y un dashboard de indicadores.

## 2. Tecnologias utilizadas

| Capa | Herramienta | Version |
| --- | --- | --- |
| Lenguaje | JavaScript (ES2022+) con JSX | - |
| Framework | React | 18.3 |
| Build tool | Vite | 5.4 |
| Enrutamiento | React Router DOM | 6.26 |
| Estilos | Tailwind CSS | 3.4 |
| Linter | ESLint + plugins de React | 8.57 |
| Versionamiento | Git | - |

## 3. Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Un navegador moderno (Chrome, Firefox, Edge)

## 4. Instalacion y ejecucion

```bash
# 1. Clonar o descomprimir el proyecto
cd JONHATAN_RIVADENEIRA_AA4_EV03

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo (http://localhost:5173)
npm run dev

# 4. Compilar para produccion
npm run build

# 5. Verificar estandares de codificacion
npm run lint
```

## 5. Credenciales de prueba

| Usuario    | Contrasena    | Rol             |
| ---------- | ------------- | --------------- |
| admin      | admin123      | ADMINISTRADOR   |
| auxiliar   | auxiliar123   | AUXILIAR        |
| consulta   | consulta123   | CONSULTA        |

> Nota: los roles ADMINISTRADOR y AUXILIAR pueden crear, editar y eliminar
> bienes. El rol CONSULTA solo puede visualizar.

## 6. Estructura del proyecto

```
src/
├── assets/              -> recursos estaticos (imagenes, iconos)
├── components/          -> componentes reutilizables (Button, Modal, Sidebar...)
├── pages/               -> vistas de la aplicacion (Login, Dashboard, Bienes...)
├── layouts/             -> layouts de pagina (MainLayout)
├── context/             -> contextos globales (AuthContext)
├── services/            -> capa de acceso a datos (bienesService)
├── data/                -> datos semilla para demostracion
├── utils/               -> funciones utilitarias (validators)
├── routes/              -> configuracion de rutas (AppRoutes)
├── App.jsx              -> componente raiz
├── main.jsx             -> punto de entrada
└── index.css            -> estilos globales + Tailwind
```

## 7. Trazabilidad con artefactos del ciclo de software

Este modulo implementa los siguientes casos de uso e historias de usuario
previamente documentados en las evidencias de analisis y diseno:

| Caso de uso | Historia de usuario | Vista React |
| --- | --- | --- |
| CU-01 Inicio de sesion | HU-01 | `LoginPage` |
| CU-02 Consultar inventario | HU-02, HU-03 | `BienesListPage` |
| CU-03 Registrar bien | HU-04 | `BienFormPage` (modo crear) |
| CU-04 Editar bien | HU-06 | `BienFormPage` (modo editar) |
| CU-05 Eliminar bien | HU-05 | `BienesListPage` + Modal |
| CU-06 Consultar ficha | HU-07 | `BienDetailPage` |

## 8. Estandares de codificacion aplicados

- **ESLint** con reglas recomendadas de React y React Hooks.
- **Nomenclatura:** PascalCase para componentes y camelCase para funciones y
  variables.
- **Comentarios JSDoc** en todos los modulos y funciones principales.
- **Imports organizados:** librerias externas, luego modulos internos.
- **Separacion por capas:** componentes, paginas, servicios, utilidades.
- **Validacion de formularios** centralizada en `utils/validators.js`.
- **Accesibilidad basica:** labels asociados a controles, atributos ARIA en
  modales, foco visible.

## 9. Repositorio de versiones

El enlace al repositorio Git publico se encuentra en el archivo
[`REPOSITORIO.txt`](./REPOSITORIO.txt).

## 10. Autor

Jonhatan Rivadeneira Pacheco - Aprendiz SENA ADSO - Colombia.
