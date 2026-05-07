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
  X,
  Target,
  CalendarDays,
  TrendingUp,
  Lightbulb,
  DollarSign,
  Handshake,
  Package,
  Zap,
  BarChart3,
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
  const [estrategiaAbierta, setEstrategiaAbierta] = useState(false);

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
          onClick={() => setEstrategiaAbierta(true)}
          className="btn-primario mx-auto flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles size={13} />
          {completados === PASOS.length ? "Generar mi estrategia" : "Empezar ahora"}
        </button>
      </div>

      {/* Modal de estrategia generada */}
      {estrategiaAbierta && (
        <ModalEstrategia
          datos={datos}
          onCerrar={() => setEstrategiaAbierta(false)}
        />
      )}
    </div>
  );
}

// ============================================================
// MODAL DE ESTRATEGIA GENERADA
// ============================================================

function ModalEstrategia({
  datos,
  onCerrar,
}: {
  datos: DatosBlueprint;
  onCerrar: () => void;
}) {
  // Lista de canales de referencia
  const canalesLista = datos.canales
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean);

  // ——— FUENTES DE INGRESO (priorizadas por velocidad de implementación) ———
  const fuentesIngreso = [
    {
      nombre: "Marketing de afiliados",
      fase: "Desde el día 1",
      potencial: "$50–$2,000/mes",
      facilidad: "Fácil",
      descripcion: `Recomienda productos relacionados con ${datos.nicho.toLowerCase()} y gana comisión por cada venta. Coloca enlaces en la descripción.`,
      requiere: "0 suscriptores",
      color: "exito" as const,
    },
    {
      nombre: "AdSense (YouTube Partner Program)",
      fase: "1,000 subs + 4,000h",
      potencial: "$1–$5 por cada 1,000 vistas",
      facilidad: "Automático",
      descripcion: `Una vez calificado, YouTube paga por cada vista monetizada. Con tu meta de ${datos.metaVistas || "vistas mensuales"} esto genera ingresos pasivos.`,
      requiere: "1,000 suscriptores",
      color: "info" as const,
    },
    {
      nombre: "Patrocinios directos",
      fase: "5,000+ subs",
      potencial: "$500–$5,000 por video",
      facilidad: "Negociación",
      descripcion: `Marcas pagan menciones en tus videos. Usa el módulo de Patrocinios del dashboard para gestionar deals.`,
      requiere: "5,000 suscriptores",
      color: "acento" as const,
    },
    {
      nombre: "Producto digital propio",
      fase: "10,000+ subs",
      potencial: "$2,000–$20,000/lanzamiento",
      facilidad: "Requiere creación",
      descripcion: `Curso, ebook o plantillas sobre ${datos.nicho.toLowerCase()}. Tu propuesta única ("${datos.diferenciador.slice(0, 60)}${datos.diferenciador.length > 60 ? "..." : ""}") es la base de venta.`,
      requiere: "10,000 suscriptores",
      color: "acento" as const,
    },
    {
      nombre: "Servicio premium / consultoría",
      fase: "Cualquier fase",
      potencial: "$200–$5,000 por cliente",
      facilidad: "Alto valor",
      descripcion: `Coaching 1-a-1 o servicios para tu audiencia (${datos.audiencia.split(",")[0] || "tu nicho"}). El margen más alto.`,
      requiere: "Audiencia comprometida",
      color: "puntaje" as const,
    },
  ];

  // ——— PATROCINIOS POTENCIALES por categoría según nicho ———
  const categoriasMarcas = generarCategoriasMarcas(datos.nicho);

  // ——— PRODUCTOS DIGITALES sugeridos ———
  const productosDigitales = [
    {
      tipo: "Curso completo",
      titulo: `Masterclass de ${datos.nicho}`,
      precio: "$197 – $497",
      esfuerzo: "Alto",
      margen: "85%",
    },
    {
      tipo: "Ebook / Guía",
      titulo: `La guía definitiva sobre ${datos.problema.split(" ").slice(0, 5).join(" ") || "tu tema"}`,
      precio: "$17 – $47",
      esfuerzo: "Medio",
      margen: "95%",
    },
    {
      tipo: "Plantillas / Recursos",
      titulo: `Kit de plantillas de ${datos.nicho}`,
      precio: "$27 – $97",
      esfuerzo: "Bajo",
      margen: "98%",
    },
    {
      tipo: "Comunidad de pago",
      titulo: `Membresía privada para ${datos.audiencia.split(",")[0] || "tu audiencia"}`,
      precio: "$19 – $49/mes",
      esfuerzo: "Recurrente",
      margen: "90%",
    },
  ];

  // ——— TÍTULOS QUE MONETIZAN MEJOR ———
  // Tipos probados que retienen audiencia y permiten patrocinios naturales
  const titulosMonetizables = [
    {
      patron: `Cuánto gané con ${datos.nicho.toLowerCase()} en mi primer año (cifras reales)`,
      monetiza: "Patrocinios financieros + productos propios",
    },
    {
      patron: `Probé [herramienta del nicho] por 30 días — esto cambió mi negocio`,
      monetiza: "Afiliados + patrocinios de la herramienta",
    },
    {
      patron: `Las 7 herramientas que uso para ${datos.nicho.toLowerCase()} (y cuánto pago)`,
      monetiza: "100% afiliados — alta conversión",
    },
    {
      patron: `Cómo escalé de $0 a [cifra] en ${datos.nicho.toLowerCase()} sin [objeción común]`,
      monetiza: "Producto digital propio + curso",
    },
    {
      patron: `Reseña honesta: [marca/producto popular] vs [alternativa]`,
      monetiza: "Patrocinios + afiliados (alto CPC)",
    },
  ];

  // ——— PROYECCIÓN DE INGRESOS por fase ———
  const fasesIngresos = [
    {
      fase: "Mes 1-3 — Construcción",
      meta: "$50 – $500 / mes",
      activos: ["Afiliados", "Servicios premium"],
      enfoque:
        "Construir audiencia + cerrar primeros clientes de coaching/consultoría",
    },
    {
      fase: "Mes 4-6 — Activación",
      meta: "$500 – $3,000 / mes",
      activos: ["Afiliados", "AdSense", "Primeros patrocinios"],
      enfoque: "Califica para YouTube Partner + cierra 1-2 patrocinios",
    },
    {
      fase: "Mes 7-12 — Escala",
      meta: `$3,000 – ${datos.metaMonetizacion || "$10,000+"} / mes`,
      activos: ["Patrocinios recurrentes", "Producto digital", "Servicios"],
      enfoque: "Lanza tu producto digital — el activo de mayor margen",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      onClick={onCerrar}
    >
      <div
        className="card max-w-3xl w-full my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-start justify-between p-5 border-b border-borde">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-acento rounded-lg flex items-center justify-center shrink-0">
              <DollarSign size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">
                Tu estrategia de monetización
              </h2>
              <p className="text-xs text-texto-secundario mt-0.5">
                5 fuentes de ingreso, productos sugeridos y proyección a 12 meses
              </p>
            </div>
          </div>
          <button
            onClick={onCerrar}
            className="text-texto-secundario hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 flex flex-col gap-6">
          {/* Banner de meta */}
          <div className="bg-gradient-to-br from-[#2a1a00] to-[#1a1a1a] border border-acento/40 rounded-card p-4">
            <p className="label-xs mb-1.5 flex items-center gap-1.5">
              <Target size={11} />
              Tu meta declarada
            </p>
            <p className="text-base font-extrabold text-acento">
              {datos.metaMonetizacion}
            </p>
            <p className="text-[11px] text-texto-secundario mt-1">
              Esta estrategia está diseñada para llevarte ahí en 6-12 meses
              combinando 5 fuentes de ingreso.
            </p>
          </div>

          {/* 5 fuentes de ingreso */}
          <Seccion
            icono={DollarSign}
            titulo="Tus 5 fuentes de ingreso (ordenadas por facilidad)"
          >
            <div className="flex flex-col gap-2">
              {fuentesIngreso.map((f, i) => (
                <div
                  key={i}
                  className="bg-panel border border-borde rounded-md p-3"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-acento text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {f.nombre}
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold text-exito shrink-0">
                      {f.potencial}
                    </span>
                  </div>
                  <p className="text-[11px] text-texto-secundario leading-relaxed mb-2">
                    {f.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Tag>{f.fase}</Tag>
                    <Tag>Requiere: {f.requiere}</Tag>
                    <Tag>{f.facilidad}</Tag>
                  </div>
                </div>
              ))}
            </div>
          </Seccion>

          {/* Patrocinios potenciales */}
          <Seccion
            icono={Handshake}
            titulo="Categorías de marcas para patrocinios"
          >
            <p className="text-[11px] text-texto-suave mb-2">
              Marcas que típicamente patrocinan creadores en tu nicho. Agrégalas
              al módulo de Patrocinios:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categoriasMarcas.map((cat, i) => (
                <div
                  key={i}
                  className="bg-panel border border-borde rounded-md p-2.5"
                >
                  <p className="text-xs font-bold text-white mb-0.5">
                    {cat.categoria}
                  </p>
                  <p className="text-[10px] text-texto-secundario mb-1">
                    {cat.ejemplos}
                  </p>
                  <p className="text-[10px] font-bold text-exito">
                    {cat.cpm}
                  </p>
                </div>
              ))}
            </div>
          </Seccion>

          {/* Productos digitales sugeridos */}
          <Seccion
            icono={Package}
            titulo="Productos digitales que puedes crear"
          >
            <div className="flex flex-col gap-2">
              {productosDigitales.map((p, i) => (
                <div
                  key={i}
                  className="bg-panel border border-borde rounded-md p-2.5 flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-bold text-acento bg-[#2a1a00] px-1.5 py-0.5 rounded uppercase">
                        {p.tipo}
                      </span>
                    </div>
                    <p className="text-xs text-white font-semibold">
                      {p.titulo}
                    </p>
                    <p className="text-[10px] text-texto-suave mt-0.5">
                      Esfuerzo: {p.esfuerzo} · Margen: {p.margen}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-exito shrink-0">
                    {p.precio}
                  </span>
                </div>
              ))}
            </div>
          </Seccion>

          {/* Títulos que monetizan */}
          <Seccion icono={Lightbulb} titulo="Patrones de títulos que monetizan mejor">
            <ul className="flex flex-col gap-2">
              {titulosMonetizables.map((t, i) => (
                <li
                  key={i}
                  className="bg-panel border border-borde rounded-md p-2.5"
                >
                  <p className="text-xs text-white font-semibold leading-snug">
                    <span className="text-acento font-bold mr-1.5">
                      {i + 1}.
                    </span>
                    {t.patron}
                  </p>
                  <p className="text-[10px] text-exito mt-1 flex items-center gap-1">
                    <Zap size={9} />
                    Monetiza con: {t.monetiza}
                  </p>
                </li>
              ))}
            </ul>
          </Seccion>

          {/* Proyección de ingresos por fase */}
          <Seccion
            icono={BarChart3}
            titulo="Tu hoja de ruta de ingresos a 12 meses"
          >
            <div className="flex flex-col gap-2">
              {fasesIngresos.map((f, i) => (
                <div
                  key={i}
                  className="bg-panel border border-borde rounded-md p-3"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-white">{f.fase}</h4>
                    <span className="text-sm font-extrabold text-exito">
                      {f.meta}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {f.activos.map((a, j) => (
                      <Tag key={j}>{a}</Tag>
                    ))}
                  </div>
                  <p className="text-[11px] text-texto-secundario">
                    <span className="text-acento font-bold">Enfoque: </span>
                    {f.enfoque}
                  </p>
                </div>
              ))}
            </div>
          </Seccion>

          {/* Plan resumen del usuario */}
          <Seccion icono={CalendarDays} titulo="Tu plan de contenido">
            <div className="grid grid-cols-2 gap-2">
              <CampoEstrategia etiqueta="Frecuencia" valor={datos.frecuencia} />
              <CampoEstrategia etiqueta="Duración ideal" valor={datos.duracion} />
            </div>
            <p className="text-[11px] text-texto-suave mt-1">
              Con tu frecuencia, en 90 días publicarás{" "}
              <span className="text-white font-bold">
                ~{estimarPublicaciones(datos.frecuencia)} videos
              </span>
              . Cada uno es una oportunidad de afiliado + posible patrocinio.
            </p>
          </Seccion>

          {/* Canales referencia (compactos) */}
          {canalesLista.length > 0 && (
            <Seccion
              icono={TrendingUp}
              titulo="Canales que ya monetizan en tu nicho"
            >
              <div className="flex flex-wrap gap-1.5">
                {canalesLista.map((canal, i) => (
                  <span
                    key={i}
                    className="bg-[#001a2a] text-info border border-info/30 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                  >
                    {canal}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-texto-suave mt-2">
                Estudia sus videos top en el Feed para ver qué patrocinios
                aceptan y qué productos venden.
              </p>
            </Seccion>
          )}
        </div>

        {/* Pie */}
        <div className="border-t border-borde p-4 flex items-center justify-between">
          <p className="text-[11px] text-texto-suave">
            Próximo: IA generará scripts optimizados para conversión
          </p>
          <button
            onClick={onCerrar}
            className="btn-primario text-xs flex items-center gap-1.5"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ——— Helpers ———

function generarCategoriasMarcas(nicho: string) {
  const n = nicho.toLowerCase();
  // Categorías universales que aplican a casi todos los nichos
  const universales = [
    {
      categoria: "SaaS / Software",
      ejemplos: "Notion, ClickUp, Canva Pro",
      cpm: "CPM: $40–$120",
    },
    {
      categoria: "VPN / Privacidad",
      ejemplos: "NordVPN, ExpressVPN, Surfshark",
      cpm: "Pago: $300–$2,000",
    },
  ];

  // Categorías específicas por palabras clave del nicho
  const especificas: Array<{ categoria: string; ejemplos: string; cpm: string }> = [];

  if (/finanz|inversi|cripto|dinero|economi/.test(n)) {
    especificas.push(
      {
        categoria: "Brokers / Trading",
        ejemplos: "eToro, Robinhood, Trading 212",
        cpm: "Pago: $500–$5,000",
      },
      {
        categoria: "Tarjetas / Bancos",
        ejemplos: "Wise, Revolut, Mercury",
        cpm: "Pago: $200–$1,500",
      }
    );
  }

  if (/tecnolog|gadget|dev|programa|app|software/.test(n)) {
    especificas.push(
      {
        categoria: "Hosting / Cloud",
        ejemplos: "Hostinger, Vercel, DigitalOcean",
        cpm: "Pago: $300–$3,000",
      },
      {
        categoria: "Hardware tech",
        ejemplos: "Logitech, Razer, Samsung",
        cpm: "Producto + $500–$2,000",
      }
    );
  }

  if (/educaci|aprend|idioma|carrera/.test(n)) {
    especificas.push(
      {
        categoria: "Plataformas educativas",
        ejemplos: "Skillshare, Coursera, Domestika",
        cpm: "Pago: $400–$2,000",
      },
      {
        categoria: "Idiomas",
        ejemplos: "Duolingo, Babbel, Italki",
        cpm: "Pago: $300–$1,500",
      }
    );
  }

  if (/fitness|salud|deporte|nutricion/.test(n)) {
    especificas.push(
      {
        categoria: "Suplementos",
        ejemplos: "MyProtein, Athletic Greens",
        cpm: "Producto + $500–$3,000",
      },
      {
        categoria: "Apps de fitness",
        ejemplos: "Whoop, Strava, MyFitnessPal",
        cpm: "Pago: $200–$1,500",
      }
    );
  }

  if (/viaje|turismo|travel|aventura/.test(n)) {
    especificas.push(
      {
        categoria: "Booking / Viajes",
        ejemplos: "Booking, Airbnb, Expedia",
        cpm: "Comisión 4–8% por reserva",
      },
      {
        categoria: "Equipo / Cámaras",
        ejemplos: "GoPro, DJI, Sony",
        cpm: "Producto + $500–$2,500",
      }
    );
  }

  if (/cocina|comida|gastronom|recet/.test(n)) {
    especificas.push(
      {
        categoria: "Meal kits / Comida",
        ejemplos: "HelloFresh, Factor",
        cpm: "Pago: $300–$1,500",
      },
      {
        categoria: "Utensilios cocina",
        ejemplos: "Le Creuset, Ninja, Vitamix",
        cpm: "Producto + $200–$1,000",
      }
    );
  }

  if (/negocio|emprende|marketing|venta/.test(n)) {
    especificas.push(
      {
        categoria: "E-commerce / Tools",
        ejemplos: "Shopify, ConvertKit, ClickFunnels",
        cpm: "Pago: $500–$5,000",
      },
      {
        categoria: "Cursos de negocio",
        ejemplos: "MasterClass, Foundr",
        cpm: "Pago: $400–$2,500",
      }
    );
  }

  // Combina específicas + universales (máximo 6)
  return [...especificas, ...universales].slice(0, 6);
}

function estimarPublicaciones(frecuencia: string): number {
  const f = frecuencia.toLowerCase();
  // Detecta números en el texto
  const matchNum = f.match(/(\d+)/);
  const num = matchNum ? parseInt(matchNum[1], 10) : 1;

  if (/diari|cada día|todos los días/.test(f)) return 90;
  if (/semana/.test(f)) return num * 13; // ~13 semanas en 90 días
  if (/mes/.test(f)) return num * 3;
  if (/quincen/.test(f)) return num * 6;

  return num * 13; // default: por semana
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] bg-borde text-texto-secundario px-1.5 py-0.5 rounded font-semibold">
      {children}
    </span>
  );
}

// ——— Sub-componentes del modal ———
function Seccion({
  icono: Icono,
  titulo,
  children,
}: {
  icono: React.ComponentType<{ size?: number; className?: string }>;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-2">
        <Icono size={14} className="text-acento" />
        {titulo}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function CampoEstrategia({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="bg-panel border border-borde rounded-md p-2.5">
      <p className="label-xs mb-1">{etiqueta}</p>
      <p className="text-xs text-white whitespace-pre-line">{valor}</p>
    </div>
  );
}
