import { TrendingUp, Plus, RefreshCw } from "lucide-react";
import TarjetaOutlier from "@/components/dashboard/TarjetaOutlier";
import Etiqueta from "@/components/ui/Etiqueta";
import { outliers } from "@/lib/datos";

const FILTROS = [
  { etiqueta: "500×+ Viral", variante: "puntaje" as const },
  { etiqueta: "200×+ Fuerte", variante: "acento" as const },
  { etiqueta: "<200× Ver", variante: "neutro" as const },
];

export default function PaginaFeed() {
  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Feed de Outliers</h1>
          <p className="text-xs text-texto-secundario mt-1">
            Datos de YouTube en vivo · Haz clic en cualquier video →{" "}
            <span className="text-acento font-semibold">Genera tu versión</span>
          </p>
          <p className="text-[10px] text-texto-suave mt-0.5">
            Puntajes son análisis propio — datos vía YouTube API.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primario flex items-center gap-1.5">
            <Plus size={13} />
            Agregar canal
          </button>
          <button
            title="Actualizar"
            className="p-2 rounded-md border border-borde text-texto-secundario hover:text-white hover:border-acento transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Filtros de puntaje */}
      <div className="flex items-center gap-2 mb-5">
        {FILTROS.map((f) => (
          <Etiqueta key={f.etiqueta} texto={f.etiqueta} variante={f.variante} />
        ))}
        <span className="text-texto-suave text-xs ml-2">
          · {outliers.length} canales · ≤7 días
        </span>
      </div>

      {/* Lista de outliers */}
      {outliers.length === 0 ? (
        <div className="card p-12 text-center">
          <TrendingUp size={32} className="text-texto-suave mx-auto mb-3" />
          <p className="text-texto-secundario text-sm mb-1">No hay outliers aún</p>
          <p className="text-texto-suave text-xs">
            Agrega canales de YouTube para empezar a rastrear videos virales
          </p>
          <button className="btn-primario mt-4 mx-auto flex items-center gap-1.5">
            <Plus size={13} />
            Agregar mi primer canal
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {outliers.map((video) => (
            <TarjetaOutlier key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
