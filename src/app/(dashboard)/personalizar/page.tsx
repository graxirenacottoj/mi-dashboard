"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, Circle } from "lucide-react";

const PASOS_INICIALES = [
  {
    numero: 1,
    titulo: "Tu nicho y audiencia",
    descripcion: "Define a quién le hablas y qué problema resuelves",
  },
  {
    numero: 2,
    titulo: "Tu propuesta de valor única",
    descripcion: "¿Por qué alguien te seguiría a ti y no a otro?",
  },
  {
    numero: 3,
    titulo: "Tu estilo de contenido",
    descripcion: "Tono, formato, duración y frecuencia ideal",
  },
  {
    numero: 4,
    titulo: "Canales a rastrear",
    descripcion: "Canales de referencia en tu nicho para analizar",
  },
  {
    numero: 5,
    titulo: "Tus metas de crecimiento",
    descripcion: "Suscriptores, vistas y monetización en 90 días",
  },
];

export default function PaginaPersonalizar() {
  const [completados, setCompletados] = useState<Set<number>>(new Set());

  const togglePaso = (numero: number) => {
    setCompletados((prev) => {
      const siguiente = new Set(prev);
      if (siguiente.has(numero)) {
        siguiente.delete(numero);
      } else {
        siguiente.add(numero);
      }
      return siguiente;
    });
  };

  const total = PASOS_INICIALES.length;
  const cantidadCompletados = completados.size;
  const porcentaje = Math.round((cantidadCompletados / total) * 100);

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
          {cantidadCompletados} de {total} pasos completados
        </p>
      </div>

      {/* Pasos */}
      <div className="flex flex-col gap-3">
        {PASOS_INICIALES.map((paso) => {
          const estaCompletado = completados.has(paso.numero);
          return (
            <div
              key={paso.numero}
              className={`card p-4 flex items-start gap-4 transition-colors ${
                estaCompletado ? "opacity-60" : "hover:border-acento/50"
              }`}
            >
              {estaCompletado ? (
                <CheckCircle2 size={20} className="text-exito shrink-0 mt-0.5" />
              ) : (
                <Circle size={20} className="text-texto-suave shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-texto-suave font-bold">
                    PASO {paso.numero}
                  </span>
                  {estaCompletado && (
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
              <button
                onClick={() => togglePaso(paso.numero)}
                className="btn-primario shrink-0 text-[11px] py-1.5"
              >
                {estaCompletado ? "Deshacer" : "Completar"}
              </button>
            </div>
          );
        })}
      </div>

      {/* CTA final */}
      <div className="mt-8 card p-6 text-center">
        <Sparkles size={24} className="text-acento mx-auto mb-2" />
        <h3 className="text-sm font-bold text-white mb-1">
          Desbloquea tu estrategia completa
        </h3>
        <p className="text-xs text-texto-secundario mb-4 max-w-xs mx-auto">
          Al completar tu plan, la IA generará scripts personalizados, títulos y
          estrategias basadas en tu estilo único.
        </p>
        <button className="btn-primario mx-auto flex items-center gap-1.5">
          <Sparkles size={13} />
          Empezar ahora
        </button>
      </div>
    </div>
  );
}
