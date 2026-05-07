import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TarjetaStatProps {
  etiqueta: string;
  valor: string | number;
  sublabel?: string;
  icono: LucideIcon;
  colorValor?: string; // clase Tailwind de color, ej: "text-puntaje"
  colorIcono?: string;
}

export default function TarjetaStat({
  etiqueta,
  valor,
  sublabel,
  icono: Icono,
  colorValor = "text-acento",
  colorIcono = "text-acento",
}: TarjetaStatProps) {
  return (
    <div className="card p-4 flex flex-col gap-2">
      {/* Encabezado */}
      <div className="flex items-center gap-1.5">
        <Icono size={12} className={colorIcono} />
        <span className="label-xs">{etiqueta}</span>
      </div>

      {/* Valor principal */}
      <div className={cn("stat-num", colorValor)}>{valor}</div>

      {/* Sublabel */}
      {sublabel && (
        <p className="text-[11px] text-texto-suave">{sublabel}</p>
      )}
    </div>
  );
}
