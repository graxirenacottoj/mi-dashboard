import { DollarSign, Plus } from "lucide-react";
import { patrocinios } from "@/lib/datos";
import type { EstadoPatrocinio } from "@/lib/types";

const COLORES_PATROCINIO: Record<EstadoPatrocinio, string> = {
  prospecto:   "bg-borde text-texto-secundario",
  contactado:  "bg-[#001a2a] text-info border border-info/30",
  negociando:  "bg-[#2a1a00] text-acento border border-acento/30",
  cerrado:     "bg-[#001a00] text-exito border border-exito/30",
  descartado:  "bg-[#2a0000] text-puntaje border border-puntaje/30",
};

const ETIQUETAS_PATROCINIO: Record<EstadoPatrocinio, string> = {
  prospecto:  "Prospecto",
  contactado: "Contactado",
  negociando: "Negociando",
  cerrado:    "Cerrado ✓",
  descartado: "Descartado",
};

export default function PaginaPatrocinios() {
  const total = patrocinios.reduce((acc, p) => acc + (p.valorEstimado ?? 0), 0);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Patrocinios</h1>
          <p className="text-xs text-texto-secundario mt-1">
            Gestiona tus oportunidades de patrocinio y deals
          </p>
        </div>
        <button className="btn-primario flex items-center gap-1.5">
          <Plus size={13} />
          Nuevo prospecto
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4">
          <p className="label-xs mb-2">Total prospectos</p>
          <p className="stat-num text-white">{patrocinios.length}</p>
        </div>
        <div className="card p-4">
          <p className="label-xs mb-2">Valor estimado</p>
          <p className="stat-num text-exito">${total.toLocaleString("es-MX")}</p>
        </div>
        <div className="card p-4">
          <p className="label-xs mb-2">Deals cerrados</p>
          <p className="stat-num text-acento">
            {patrocinios.filter((p) => p.estado === "cerrado").length}
          </p>
        </div>
      </div>

      {/* Lista */}
      {patrocinios.length === 0 ? (
        <div className="card p-12 text-center">
          <DollarSign size={32} className="text-texto-suave mx-auto mb-3" />
          <p className="text-texto-secundario text-sm">
            Aún no tienes prospectos de patrocinio
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {patrocinios.map((pat) => (
            <div key={pat.id} className="card p-4 flex items-center gap-4">
              {/* Marca */}
              <div className="w-10 h-10 rounded-md bg-borde flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-texto-secundario">
                  {pat.marca.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{pat.marca}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${COLORES_PATROCINIO[pat.estado]}`}
                  >
                    {ETIQUETAS_PATROCINIO[pat.estado]}
                  </span>
                </div>
                {pat.notas && (
                  <p className="text-xs text-texto-suave mt-0.5">{pat.notas}</p>
                )}
                {pat.fechaContacto && (
                  <p className="text-[10px] text-texto-suave mt-0.5">
                    Contacto:{" "}
                    {new Date(pat.fechaContacto).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              {pat.valorEstimado && (
                <div className="text-right shrink-0">
                  <p className="label-xs mb-1">Valor est.</p>
                  <p className="text-sm font-extrabold text-exito">
                    ${pat.valorEstimado.toLocaleString("es-MX")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
