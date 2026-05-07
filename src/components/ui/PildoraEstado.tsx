import { cn } from "@/lib/utils";
import { ETIQUETAS_ESTADO, COLORES_ESTADO, type EstadoContenido } from "@/lib/types";

interface PildoraEstadoProps {
  estado: EstadoContenido;
  onClick?: () => void;
  className?: string;
}

export default function PildoraEstado({
  estado,
  onClick,
  className,
}: PildoraEstadoProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 rounded-full text-[10px] font-bold transition-opacity hover:opacity-80",
        COLORES_ESTADO[estado],
        className
      )}
    >
      {ETIQUETAS_ESTADO[estado]}
    </button>
  );
}
