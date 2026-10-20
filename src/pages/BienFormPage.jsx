/**
 * <BienFormPage> - Formulario de creacion y edicion de un bien.
 *
 * Casos de uso implementados:
 *   CU-03 Registrar bien
 *   CU-04 Editar bien
 *
 * Historias de usuario:
 *   HU-04 Como auxiliar quiero registrar un nuevo bien con todos sus datos.
 *   HU-06 Como auxiliar quiero actualizar los datos de un bien existente.
 */
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  crearBien,
  actualizarBien,
  obtenerBien,
} from '../services/bienesService.js';
import { CATEGORIAS_MOCK, DEPENDENCIAS_MOCK, ESTADOS_BIEN } from '../data/seed.js';
import * as V from '../utils/validators.js';
import Button from '../components/Button.jsx';
import FormField, { estilosControl } from '../components/FormField.jsx';

/**
 * Estado inicial del formulario (bien vacio).
 */
const ESTADO_INICIAL = {
  placa: '',
  nombre: '',
  categoriaId: '',
  dependenciaId: '',
  responsable: '',
  valorAdquisicion: '',
  fechaAdquisicion: '',
  estado: 'ACTIVO',
  observaciones: '',
};

function BienFormPage() {
  const { id } = useParams();
  const navegar = useNavigate();
  const modoEdicion = Boolean(id);

  const [valores, setValores] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [cargandoDatos, setCargandoDatos] = useState(modoEdicion);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  /**
   * Si estamos en modo edicion, se carga el bien existente al montar.
   */
  useEffect(() => {
    if (!modoEdicion) return;
    (async () => {
      const bien = await obtenerBien(id);
      if (bien) {
        setValores({
          placa: bien.placa,
          nombre: bien.nombre,
          categoriaId: String(bien.categoriaId),
          dependenciaId: String(bien.dependenciaId),
          responsable: bien.responsable,
          valorAdquisicion: String(bien.valorAdquisicion),
          fechaAdquisicion: bien.fechaAdquisicion,
          estado: bien.estado,
          observaciones: bien.observaciones || '',
        });
      }
      setCargandoDatos(false);
    })();
  }, [id, modoEdicion]);

  /**
   * Actualiza un campo del formulario de forma inmutable.
   */
  const cambiar = (campo) => (evento) => {
    setValores((previo) => ({ ...previo, [campo]: evento.target.value }));
    // Limpia el error del campo al modificarlo
    if (errores[campo]) {
      setErrores((previo) => ({ ...previo, [campo]: '' }));
    }
  };

  /**
   * Valida todos los campos del formulario antes de enviar.
   * Devuelve true si no hay errores.
   */
  const validar = () => {
    const nuevos = {
      placa: V.placa(valores.placa),
      nombre: V.requerido(valores.nombre),
      categoriaId: V.requerido(valores.categoriaId),
      dependenciaId: V.requerido(valores.dependenciaId),
      responsable: V.requerido(valores.responsable),
      valorAdquisicion: V.numeroPositivo(valores.valorAdquisicion),
      fechaAdquisicion: V.fechaNoFutura(valores.fechaAdquisicion),
    };
    // Filtra solo los campos que efectivamente tienen error
    const soloErrores = Object.fromEntries(
      Object.entries(nuevos).filter(([, v]) => v !== '')
    );
    setErrores(soloErrores);
    return Object.keys(soloErrores).length === 0;
  };

  /**
   * Maneja el envio del formulario: valida, llama al servicio y navega.
   */
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setMensaje('');
    if (!validar()) return;

    setGuardando(true);
    try {
      // Normaliza los datos antes de persistir
      const datos = {
        placa: valores.placa.toUpperCase().trim(),
        nombre: valores.nombre.trim(),
        categoriaId: Number(valores.categoriaId),
        dependenciaId: Number(valores.dependenciaId),
        responsable: valores.responsable.trim(),
        valorAdquisicion: Number(valores.valorAdquisicion),
        fechaAdquisicion: valores.fechaAdquisicion,
        estado: valores.estado,
        observaciones: valores.observaciones.trim(),
      };

      if (modoEdicion) {
        await actualizarBien(id, datos);
      } else {
        await crearBien(datos);
      }
      navegar('/bienes', { replace: true });
    } catch (error) {
      console.error('[BienFormPage] Error al guardar:', error);
      setMensaje('Ocurrio un error al guardar el bien. Intente de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  if (cargandoDatos) {
    return <p className="text-slate-500">Cargando datos del bien...</p>;
  }

  return (
    <div>
      <header className="mb-5">
        <h2 className="text-2xl font-bold text-sgim-700">
          {modoEdicion ? 'Editar bien' : 'Registrar nuevo bien'}
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Complete los datos del bien. Los campos marcados con{' '}
          <span className="text-red-600">*</span> son obligatorios.
        </p>
      </header>

      <form
        onSubmit={manejarEnvio}
        noValidate
        className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 max-w-3xl"
      >
        {/* Fila: placa + nombre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField id="placa" label="Placa" requerido error={errores.placa}>
            <input
              id="placa"
              type="text"
              value={valores.placa}
              onChange={cambiar('placa')}
              placeholder="XX-000"
              maxLength={6}
              className={estilosControl}
            />
          </FormField>

          <FormField
            id="nombre"
            label="Nombre del bien"
            requerido
            error={errores.nombre}
          >
            <input
              id="nombre"
              type="text"
              value={valores.nombre}
              onChange={cambiar('nombre')}
              className={estilosControl}
            />
          </FormField>
        </div>

        {/* Fila: categoria + dependencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="categoriaId"
            label="Categoria"
            requerido
            error={errores.categoriaId}
          >
            <select
              id="categoriaId"
              value={valores.categoriaId}
              onChange={cambiar('categoriaId')}
              className={estilosControl}
            >
              <option value="">-- Seleccione --</option>
              {CATEGORIAS_MOCK.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="dependenciaId"
            label="Dependencia"
            requerido
            error={errores.dependenciaId}
          >
            <select
              id="dependenciaId"
              value={valores.dependenciaId}
              onChange={cambiar('dependenciaId')}
              className={estilosControl}
            >
              <option value="">-- Seleccione --</option>
              {DEPENDENCIAS_MOCK.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Fila: responsable + valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="responsable"
            label="Funcionario responsable"
            requerido
            error={errores.responsable}
          >
            <input
              id="responsable"
              type="text"
              value={valores.responsable}
              onChange={cambiar('responsable')}
              className={estilosControl}
            />
          </FormField>

          <FormField
            id="valorAdquisicion"
            label="Valor de adquisicion (COP)"
            requerido
            error={errores.valorAdquisicion}
          >
            <input
              id="valorAdquisicion"
              type="number"
              min="0"
              step="1"
              value={valores.valorAdquisicion}
              onChange={cambiar('valorAdquisicion')}
              className={estilosControl}
            />
          </FormField>
        </div>

        {/* Fila: fecha + estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="fechaAdquisicion"
            label="Fecha de adquisicion"
            requerido
            error={errores.fechaAdquisicion}
          >
            <input
              id="fechaAdquisicion"
              type="date"
              value={valores.fechaAdquisicion}
              onChange={cambiar('fechaAdquisicion')}
              className={estilosControl}
            />
          </FormField>

          <FormField id="estado" label="Estado" requerido>
            <select
              id="estado"
              value={valores.estado}
              onChange={cambiar('estado')}
              className={estilosControl}
            >
              {ESTADOS_BIEN.map((e) => (
                <option key={e.valor} value={e.valor}>
                  {e.etiqueta}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Observaciones */}
        <FormField id="observaciones" label="Observaciones">
          <textarea
            id="observaciones"
            rows={3}
            value={valores.observaciones}
            onChange={cambiar('observaciones')}
            className={estilosControl}
            placeholder="Notas adicionales sobre el bien (opcional)."
          />
        </FormField>

        {mensaje && (
          <div className="my-3 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
            {mensaje}
          </div>
        )}

        {/* Botones de accion */}
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200">
          <Link to="/bienes">
            <Button variante="secundario">Cancelar</Button>
          </Link>
          <Button type="submit" deshabilitado={guardando}>
            {guardando ? 'Guardando...' : modoEdicion ? 'Actualizar' : 'Guardar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BienFormPage;
