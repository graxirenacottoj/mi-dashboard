import { Flame, TrendingUp, Users, CalendarDays, Circle } from "lucide-react";
import TarjetaStat from "@/components/ui/TarjetaStat";
import BannerOnboarding from "@/components/ui/BannerOnboarding";
import TarjetaOutlier from "@/components/dashboard/TarjetaOutlier";
import { kpisHoy, outliers, elementosCalendario } from "@/lib/datos";
import { capitalizar, nombreDia, fechaLarga } from "@/lib/utils";
import Link from "next/link";
import PildoraEstado from "@/components/ui/PildoraEstado";

export default function PaginaHoy() {
  const hoy = new Date();
  const diaTexto = capitalizar(nombreDia(hoy));
  const fechaTexto = fechaLarga(hoy);
  const outlierTop = outliers[0];

  return (
    <div>
      <BannerOnboarding />

      {/* Encabezado de fecha */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="label-xs mb-1">HOY</p>
          <h1 className="text-[36px] font-extrabold text-white leading-none">
            {diaTexto}
          </h1>
          <div className="flex items-center gap-3 mt-1 text-xs text-texto-secundario">
            <span>{fechaTexto}</span>
            <span>
              <strong className="text-white">{kpisHoy.totalOutliers}</strong> outliers en{" "}
              <strong className="text-white">{kpisHoy.totalCanales}</strong> canales
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-exito text-xs font-semibold">
          <Circle size={8} fill="currentColor" />
          Datos en vivo
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <TarjetaStat
          etiqueta="Mejor puntaje"
          valor={`${kpisHoy.mejorPuntaje}×`}
          sublabel={kpisHoy.nombreMejorCanal}
          icono={Flame}
          colorValor="text-puntaje"
          colorIcono="text-puntaje"
        />
        <TarjetaStat
          etiqueta="Outliers"
          valor={kpisHoy.totalOutliers}
          sublabel="Últimas 48–72h"
          icono={TrendingUp}
          colorValor="text-acento"
          colorIcono="text-acento"
        />
        <TarjetaStat
          etiqueta="Canales"
          valor={kpisHoy.totalCanales}
          sublabel="Rastreados en vivo"
          icono={Users}
          colorValor="text-info"
          colorIcono="text-info"
        />
        <TarjetaStat
          etiqueta="Agendados"
          valor={kpisHoy.videosAgendados}
          sublabel="En el calendario"
          icono={CalendarDays}
          colorValor="text-acento"
          colorIcono="text-acento"
        />
      </div>

      {/* Contenido principal — 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* Feed — outlier #1 del día */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Flame size={14} className="text-puntaje" />
              Outlier #1 de hoy
            </h2>
            <Link href="/feed" className="text-xs text-acento hover:underline">
              Ver todos {kpisHoy.totalOutliers} →
            </Link>
          </div>
          {outlierTop ? (
            <TarjetaOutlier video={outlierTop} expandidaPorDefecto />
          ) : (
            <div className="card p-8 text-center text-texto-suave text-sm">
              No hay outliers hoy. Agrega canales en el Feed.
            </div>
          )}
        </div>

        {/* Sidebar — próximos videos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <CalendarDays size={14} className="text-acento" />
              Próximos
            </h2>
            <Link href="/calendario" className="text-xs text-acento hover:underline">
              Ver todos →
            </Link>
          </div>

          <div className="card divide-y divide-borde">
            {elementosCalendario.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-texto-suave text-xs mb-2">Aún no tienes videos agendados</p>
                <Link href="/feed" className="text-xs text-acento hover:underline">
                  Explorar outliers →
                </Link>
              </div>
            ) : (
              elementosCalendario.map((el) => (
                <div key={el.id} className="p-3 flex items-start gap-3">
                  <PildoraEstado estado={el.estado} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white line-clamp-2">
                      {el.titulo}
                    </p>
                    <p className="text-[10px] text-texto-suave mt-0.5">
                      {new Date(el.fecha).toLocaleDateString("es-ES", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
