"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Save,
  Pencil,
} from "lucide-react";

// ——— Tipos del formulario ———
interface DatosBlueprint {
  // Paso 1
  nicho: string;
  audiencia: string;
  problema: string;
  // Paso 2
  propuestaValor: string;
  diferenciador: string;
  // Paso 3
  tono: string;
  formato: string;
  duracion: string;
  frecuencia: string;
  // Paso 4
  canales: string;
  // Paso 5
  metaSuscriptores: string;
  metaVistas: string;
  metaMonetizacion: string;
}

const DATOS_INICIALES: DatosBlueprint = {
  nicho: "",
  audiencia: "",
  problema: "",
  propuestaValor: "",
  diferenciador: "",
  tono: "",
  formato: "",
  duracion: "",
  frecuencia: "",
  canales: "",
  metaSuscriptores: "",
  metaVistas: "",
  metaMonetizacion: "",
};

const STORAGE_KEY = "mi-dashboard:blueprint";

// ——— Definición de los 5 pasos y sus campos ———
const PASOS = [
  {
    numero: 1,
    titulo: "Tu nicho y audiencia",
    descripcion: "Define a quién le hablas y qué problema resuelves",
    campos: [
      {
        clave: "nicho" as const,
        etiqueta: "¿Cuál es tu nicho?",
        placeholder: "Ej: Finanzas personales para jóvenes profesionales",
        multiline: false,
      },
      {
        clave: "audiencia" as const,
        etiqueta: "¿Quién es tu audiencia ideal?",
        placeholder: "Ej: Hombres y mujeres 25-35, ingresos medios, urbanos",
        multiline: true,
      },
      {
        clave: "problema" as const,
        etiqueta: "¿Qué problema les resuelves?",
        placeholder: "Ej: No saben cómo invertir su primer salario",
        multiline: true,
      },
    ],
    obligatorios: ["nicho", "audiencia", "problema"] as const,
  },
  {
    numero: 2,
    titulo: "Tu propuesta de valor única",
    descripcion: "¿Por qué alguien te seguiría a ti y no a otro?",
    campos: [
      {
        clave: "propuestaValor" as const,
        etiqueta: "¿Cuál es tu propuesta de valor?",
        placeholder: "Ej: Explico finanzas con humor y casos reales de mi vida",
        multiline: true,
      },
      {
        clave: "diferenciador" as const,
        etiqueta: "¿Qué te hace diferente de los demás?",
        placeholder: "Ej: Soy CPA con 10 años en Wall Street y bilingüe",
        multiline: true,
      },
    ],
    obligatorios: ["propuestaValor", "diferenciador"] as const,
  },
  {
    numero: 3,
    titulo: "Tu estilo de contenido",
    descripcion: "Tono, formato, duración y frecuencia ideal",
    campos: [
      {
        clave: "tono" as const,
        etiqueta: "Tono de voz",
        placeholder: "Ej: Casual y motivador con toques de humor",
        multiline: false,
      },
      {
        clave: "formato" as const,
        etiqueta: "Formato preferido",
        placeholder: "Ej: Tutoriales paso a paso con ejemplos en vivo",
        multiline: false,
      },
      {
        clave: "duracion" as const,
        etiqueta: "Duración ideal",
        placeholder: "Ej: 8-12 minutos",
        multiline: false,
      },
      {
        clave: "frecuencia" as const,
        etiqueta: "Frecuencia de publicación",
        placeholder: "Ej: 2 videos por semana, lunes y jueves",
        multiline: false,
      },
    ],
    obligatorios: ["tono", "formato", "duracion", "frecuencia"] as const,
  },
  {
    numero: 4,
    titulo: "Canales a rastrear",
    descripcion: "Canales de referencia en tu nicho para analizar",
    campos: [
      {
        clave: "canales" as const,
        etiqueta: "Lista de canales (uno por línea)",
        placeholder:
          "Andrei Jikh\nGraham Stephan\nMeet Kevin\nThe Plain Bagel",
        multiline: true,
      },
    ],
    obligatorios: ["canales"] as const,
  },
  {
    numero: 5,
    titulo: "Tus metas de crecimiento",
    descripcion: "Suscriptores, vistas y monetización en 90 días",
    campos: [
      {
        clave: "metaSuscriptores" as const,
        etiqueta: "Meta de suscriptores en 90 días",
        placeholder: "Ej: 10,000 suscriptores",
        multiline: false,
      },
      {
        clave: "metaVistas" as const,
        etiqueta: "Meta de vistas mensuales",
        placeholder: "Ej: 500,000 vistas/mes",
        multiline: false,
      },
      {
        clave: "metaMonetizacion" as const,
        etiqueta: "Meta de monetización",
        placeholder: "Ej: $2,000/mes entre AdSense y patrocinios",
        multiline: true,
      },
    ],
    obligatorios: ["metaSuscriptores", "metaVistas", "metaMonetizacion"] as const,
  },
];

export default function PaginaPersonalizar() {
  const [datos, setDatos] = useState<DatosBlueprint>(DATOS_INICIALES);
  const [pasoAbierto, setPasoAbierto] = useState<number | null>(1);
  const [cargado, setCargado] = useState(false);

  // Cargar de localStorage al montar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        setDatos({ ...DATOS_INICIALES, ...JSON.parse(guardado) });
      }
    } catch {
      // Ignorar errores de parsing
    }
    setCargado(true);
  }, []);

  // Guardar en localStorage cuando cambia
  useEffect(() => {
    if (cargado) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
    }
  }, [datos, cargado]);

  // Determina si un paso está completo (todos sus campos obligatorios llenos)
  const estaCompleto = (paso: (typeof PASOS)[number]) =>
    paso.obligatorios.every((campo) => datos[campo].trim().length > 0);

  const completados = PASOS.filter(estaCompleto).length;
  const porcentaje = Math.round((completados / PASOS.length) * 100);

  const togglePaso = (numero: number) => {
    setPasoAbierto((actual) => (actual === numero ? null : numero));
  };

  const actualizarCampo = (clave: keyof DatosBlueprint, valor: string) => {
    setDatos((prev) => ({ ...prev, [clave]: valor }));
  };

  return (
    <div className="max-w-2xl">
      {/* Encabezado */}
      <div className="flex items-start gap-3 mb-8">
        <div className="w-10 h-10 bg-acento rounded-lg flex items-center justify-center shrink-0">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Plan de Marca Personal
          </h1>
          <p className="text-xs text-texto-secundario mt-1">
            Completa tu blueprint para desbloquear estrategias personalizadas y
            scripts generados con IA
          </p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-texto-secundario font-semibold">
            Progreso del blueprint
          </span>
          <span className="text-acento font-bold">{porcentaje}%</span>
        </div>
        <div className="h-2 bg-borde rounded-full overflow-hidden">
          <div
            className="h-full bg-acento rounded-full transition-all duration-300"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
        <p className="text-[10px] text-texto-suave mt-1.5">
          {completados} de {PASOS.length} pasos completados
        </p>
      </div>

      {/* Pasos */}
      <div className="flex flex-col gap-3">
        {PASOS.map((paso) => {
          const completado = estaCompleto(paso);
          const abierto = pasoAbierto === paso.numero;

          return (
            <div
              key={paso.numero}
              className={`card overflow-hidden transition-colors ${
                abierto ? "border-acento/50" : ""
              }`}
            >
              {/* Cabecera del paso (clic para expandir/colapsar) */}
              <button
                onClick={() => togglePaso(paso.numero)}
                className="w-full p-4 flex items-start gap-4 text-left hover:bg-[#222]/30 transition-colors"
              >
                {completado ? (
                  <CheckCircle2
                    size={20}
                    className="text-exito shrink-0 mt-0.5"
                  />
                ) : (
                  <Circle
                    size={20}
                    className="text-texto-suave shrink-0 mt-0.5"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-texto-suave font-bold">
                      PASO {paso.numero}
                    </span>
                    {completado && (
                      <span className="text-[10px] text-exito font-bold">
                        ✓ Completado
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {paso.titulo}
                  </h3>
                  <p className="text-xs text-texto-secundario mt-0.5">
                    {paso.descripcion}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="btn-primario text-[11px] py-1.5 flex items-center gap-1.5 pointer-events-none">
                    {completado ? (
                      <>
                        <Pencil size={11} />
                        Editar
                      </>
                    ) : (
                      <>
                        {abierto ? (
                          <ChevronUp size={12} />
                        ) : (
                          <ChevronDown size={12} />
                        )}
                        {abierto ? "Cerrar" : "Completar"}
                      </>
                    )}
                  </span>
                </div>
              </button>

              {/* Formulario expandido */}
              {abierto && (
                <div className="border-t border-borde p-4 bg-[#0f0f0f]">
                  <div className="flex flex-col gap-4">
                    {paso.campos.map((campo) => (
                      <div key={campo.clave}>
                        <label
                          htmlFor={campo.clave}
                          className="block text-xs font-semibold text-white mb-1.5"
                        >
                          {campo.etiqueta}
                        </label>
                        {campo.multiline ? (
                          <textarea
                            id={campo.clave}
                            value={datos[campo.clave]}
                            onChange={(e) =>
                              actualizarCampo(campo.clave, e.target.value)
                            }
                            placeholder={campo.placeholder}
                            rows={3}
                            className="w-full bg-panel border border-borde rounded-md px-3 py-2 text-xs text-white placeholder:text-texto-suave focus:outline-none focus:border-acento transition-colors resize-none"
                          />
                        ) : (
                          <input
                            id={campo.clave}
                            type="text"
                            value={datos[campo.clave]}
                            onChange={(e) =>
                              actualizarCampo(campo.clave, e.target.value)
                            }
                            placeholder={campo.placeholder}
                            className="w-full bg-panel border border-borde rounded-md px-3 py-2 text-xs text-white placeholder:text-texto-suave focus:outline-none focus:border-acento transition-colors"
                          />
                        )}
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-2 border-t border-borde">
                      <p className="text-[10px] text-texto-suave">
                        {completado
                          ? "✓ Datos guardados automáticamente"
                          : "Llena los campos obligatorios para marcar como completado"}
                      </p>
                      <button
                        onClick={() => setPasoAbierto(null)}
                        className="btn-primario text-[11px] py-1.5 flex items-center gap-1.5"
                      >
                        <Save size={11} />
                        Listo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA final */}
      <div className="mt-8 card p-6 text-center">
        <Sparkles size={24} className="text-acento mx-auto mb-2" />
        <h3 className="text-sm font-bold text-white mb-1">
          {completados === PASOS.length
            ? "¡Tu blueprint está completo!"
            : "Desbloquea tu estrategia completa"}
        </h3>
        <p className="text-xs text-texto-secundario mb-4 max-w-xs mx-auto">
          {completados === PASOS.length
            ? "Ya puedes generar scripts personalizados, títulos y estrategias basadas en tu plan."
            : "Al completar tu plan, la IA generará scripts personalizados, títulos y estrategias basadas en tu estilo único."}
        </p>
        <button
          disabled={completados !== PASOS.length}
          className="btn-primario mx-auto flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={13} />
          {completados === PASOS.length ? "Generar mi estrategia" : "Empezar ahora"}
        </button>
      </div>
    </div>
  );
}
