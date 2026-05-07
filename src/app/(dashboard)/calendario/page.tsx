import { CalendarDays, Flame, Plus } from "lucide-react";
import PildoraEstado from "@/components/ui/PildoraEstado";
import { elementosCalendario } from "@/lib/datos";
import type { EstadoContenido } from "@/lib/types";

// Genera los 7 días de la semana actual
function semanaActual(): Date[] {
  const hoy = new Date();
  const inicio = new Date(hoy);
  inicio.setDate(hoy.getDate() - hoy.getDay()); // domingo
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(inicio);
    d.setDate(inicio.getDate() + i);
    return d;
  });
}

const DIAS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const ESTADOS_PIPELINE: EstadoContenido[] = [
  "idea",
  "guionado",
  "grabado",
  "editado",
  "publicado",
];

export default function PaginaCalendario() {
  const dias = semanaActual();
  const hoyStr = new Date().toISOString().split("T")[0];

  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Calendario de Contenido</h1>
          <p className="text-xs text-texto-secundario mt-1">
            Arrastra para reprogramar · Haz clic en el estado para avanzar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-acento bg-[#2a1a00] border border-acento/30 px-3 py-1.5 rounded-pill">
            <Flame size={12} />
            0 días de racha
          </div>
          <button className="btn-primario flex items-center gap-1.5">
            <Plus size={13} />
            Agregar video
          </button>
        </div>
      </div>

      {/* Pipeline de estados */}
      <div className="flex items-center gap-2 mb-5">
        {ESTADOS_PIPELINE.map((estado) => (
          <PildoraEstado key={estado} estado={estado} />
        ))}
        <span className="text-texto-suave text-[10px] ml-2">
          Haz clic para avanzar →
        </span>
      </div>

      {/* Vista semanal */}
      <div className="card overflow-hidden mb-6">
        {/* Cabecera de semana */}
        <div className="grid grid-cols-7 border-b border-borde">
          {dias.map((dia, i) => {
            const esHoy = dia.toISOString().split("T")[0] === hoyStr;
            return (
              <div
                key={i}
                className={`p-3 text-center border-r border-borde last:border-r-0 ${
                  esHoy ? "bg-acento/10" : ""
                }`}
              >
                <p className="text-[10px] text-texto-suave uppercase">
                  {DIAS_ES[dia.getDay()]}
                </p>
                <div
                  className={`w-7 h-7 flex items-center justify-center mx-auto mt-1 rounded-full text-sm font-bold ${
                    esHoy
                      ? "bg-acento text-white"
                      : "text-texto-secundario"
                  }`}
                >
                  {dia.getDate()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Celdas de contenido */}
        <div className="grid grid-cols-7 min-h-[140px]">
          {dias.map((dia, i) => {
            const diaStr = dia.toISOString().split("T")[0];
            const items = elementosCalendario.filter((e) => e.fecha === diaStr);
            const esHoy = diaStr === hoyStr;

            return (
              <div
                key={i}
                className={`p-2 border-r border-borde last:border-r-0 min-h-[140px] ${
                  esHoy ? "bg-acento/5" : ""
                }`}
              >
                <button className="w-full text-center text-texto-suave hover:text-acento transition-colors mb-1">
                  <Plus size={14} className="mx-auto" />
                </button>
                {items.map((el) => (
                  <div
                    key={el.id}
                    className="bg-panel border border-borde rounded-md p-1.5 mb-1 cursor-pointer hover:border-acento/50 transition-colors"
                  >
                    <PildoraEstado estado={el.estado} />
                    <p className="text-[10px] text-texto-secundario mt-1 line-clamp-2 leading-snug">
                      {el.titulo}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Consistencia — últimas 4 semanas */}
      <div className="card p-4">
        <h3 className="label-xs mb-3 flex items-center gap-1.5">
          <CalendarDays size={11} />
          Consistencia de publicación · últimas 4 semanas
        </h3>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 28 }, (_, i) => {
            const publicado = Math.random() > 0.75;
            return (
              <div
                key={i}
                className={`w-4 h-4 rounded-sm ${
                  publicado ? "bg-exito/70" : "bg-borde"
                }`}
                title={publicado ? "Publicado" : "Sin publicar"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
