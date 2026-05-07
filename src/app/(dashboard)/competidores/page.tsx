import { Users, Plus, TrendingUp } from "lucide-react";
import { competidores } from "@/lib/datos";
import Etiqueta from "@/components/ui/Etiqueta";

export default function PaginaCompetidores() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Competidores</h1>
          <p className="text-xs text-texto-secundario mt-1">
            Rastrea canales de tu nicho y compara tu rendimiento
          </p>
        </div>
        <button className="btn-primario flex items-center gap-1.5">
          <Plus size={13} />
          Agregar competidor
        </button>
      </div>

      {competidores.length === 0 ? (
        <div className="card p-12 text-center">
          <Users size={32} className="text-texto-suave mx-auto mb-3" />
          <p className="text-texto-secundario text-sm">Aún no tienes competidores agregados</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {competidores.map((comp) => (
            <div key={comp.id} className="card p-5">
              <div className="flex items-start gap-4">
                {/* Avatar del canal */}
                <div className="w-12 h-12 rounded-full bg-borde flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-texto-suave">
                    {comp.canal.nombre.charAt(0)}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white">
                      {comp.canal.nombre}
                    </h3>
                    <span className="text-xs text-texto-suave">
                      {comp.canal.suscriptoresTexto} suscriptores
                    </span>
                  </div>
                  <p className="text-xs text-texto-secundario mt-0.5">
                    {comp.relacionConTigo}
                  </p>
                  <p className="text-xs text-texto-suave mt-0.5">
                    Publica: {comp.frecuenciaPublicacion}
                  </p>

                  {/* Mejor video */}
                  {comp.mejorVideo && (
                    <div className="mt-3 bg-[#111] border border-borde rounded-md p-3">
                      <p className="label-xs mb-1 flex items-center gap-1">
                        <TrendingUp size={10} />
                        Mejor video reciente
                      </p>
                      <p className="text-xs text-white font-semibold line-clamp-1">
                        {comp.mejorVideo.titulo}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Etiqueta
                          texto={`${comp.mejorVideo.puntaje}× puntaje`}
                          variante={comp.mejorVideo.puntaje >= 50 ? "puntaje" : "acento"}
                        />
                        <span className="text-[10px] text-texto-suave">
                          {comp.mejorVideo.vistasTexto} vistas
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Promedio vistas */}
                <div className="text-right shrink-0">
                  <p className="label-xs mb-1">Promedio vistas</p>
                  <p className="text-lg font-extrabold text-info">
                    {comp.canal.promedioVistas.toLocaleString("es-MX")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
