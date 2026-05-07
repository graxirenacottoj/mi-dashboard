"use client";

import { useState } from "react";
import { Flame, Eye, ChevronDown, ChevronUp, Sparkles, Play } from "lucide-react";
import Etiqueta from "@/components/ui/Etiqueta";
import type { VideoOutlier } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TarjetaOutlierProps {
  video: VideoOutlier;
  expandidaPorDefecto?: boolean;
}

export default function TarjetaOutlier({
  video,
  expandidaPorDefecto = false,
}: TarjetaOutlierProps) {
  const [expandida, setExpandida] = useState(expandidaPorDefecto);

  // Color del puntaje según valor
  const colorPuntaje =
    video.puntaje >= 60
      ? "text-puntaje"
      : video.puntaje >= 30
      ? "text-acento"
      : "text-texto-secundario";

  return (
    <div className="card overflow-hidden">
      {/* Fila principal */}
      <div className="p-4 flex gap-3">
        {/* Miniatura */}
        <div className="w-[90px] h-[58px] rounded-md bg-borde shrink-0 overflow-hidden">
          {/* Reemplazar con <Image> cuando tengas miniaturas reales */}
          <div className="w-full h-full bg-gradient-to-br from-[#2a1a00] to-[#1a1a1a] flex items-center justify-center">
            <Play size={20} className="text-acento opacity-60" />
          </div>
        </div>

        {/* Información */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
            {video.titulo}
          </p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[11px] text-texto-secundario">
              {video.canal.nombre} · {video.canal.suscriptoresTexto} subs
            </span>
            <Etiqueta texto={video.tipoGancho} variante="acento" />
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-[11px] text-texto-secundario">
              <Eye size={11} />
              {video.vistasTexto}
            </span>
            <span className="text-[11px] text-texto-suave">
              prom. {video.canal.promedioVistas.toLocaleString("es-MX")}
            </span>
            <a
              href={video.urlVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-acento hover:underline"
            >
              Ver
            </a>
          </div>
        </div>

        {/* Puntaje + toggle */}
        <div className="flex items-start gap-2 shrink-0">
          <div
            className={cn(
              "flex items-center gap-1 bg-[#1a1a1a] border border-borde rounded-full px-2.5 py-1 text-xs font-bold",
              colorPuntaje
            )}
          >
            <Flame size={11} />
            {video.puntaje}×
          </div>
          <button
            onClick={() => setExpandida((v) => !v)}
            className="text-texto-suave hover:text-white transition-colors mt-0.5"
          >
            {expandida ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Panel expandido — análisis detallado */}
      {expandida && (
        <div className="border-t border-borde">
          {/* Barra de puntaje */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-texto-suave">Puntaje outlier</span>
              <span className={colorPuntaje}>
                {video.puntaje}× sobre el promedio del canal
              </span>
            </div>
            <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className="h-full bg-acento rounded-full"
                style={{ width: `${Math.min((video.puntaje / 100) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Celdas de análisis */}
          <div className="grid grid-cols-3 gap-px bg-borde border-t border-borde">
            <div className="bg-panel p-3">
              <p className="label-xs mb-1">Patrón de título</p>
              <p className="text-[11px] text-texto-secundario leading-snug">
                {video.patronTitulo}
              </p>
            </div>
            <div className="bg-panel p-3">
              <p className="label-xs mb-1">Miniatura</p>
              <p className="text-[11px] text-texto-secundario leading-snug">
                {video.estiloMiniatura}
              </p>
            </div>
            <div className="bg-panel p-3">
              <p className="label-xs mb-1">Tipo de gancho</p>
              <p className="text-[11px] text-texto-secundario leading-snug">
                {video.tipoGancho}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 p-3 border-t border-borde">
            <a
              href={video.urlVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secundario flex items-center gap-1.5"
            >
              <Play size={11} />
              Ver video
            </a>
            <button className="btn-primario flex-1 flex items-center justify-center gap-1.5">
              <Sparkles size={12} />
              Generar mi versión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
