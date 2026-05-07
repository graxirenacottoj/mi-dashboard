import { cn } from "@/lib/utils";

type VarianteEtiqueta = "acento" | "info" | "exito" | "puntaje" | "alerta" | "neutro";

interface EtiquetaProps {
  texto: string;
  variante?: VarianteEtiqueta;
  className?: string;
}

const variantes: Record<VarianteEtiqueta, string> = {
  acento:  "bg-[#2a1a00] text-acento border border-acento/30",
  info:    "bg-[#001a2a] text-info border border-info/30",
  exito:   "bg-[#001a00] text-exito border border-exito/30",
  puntaje: "bg-[#2a0000] text-puntaje border border-puntaje/30",
  alerta:  "bg-[#2a1500] text-alerta border border-alerta/30",
  neutro:  "bg-borde text-texto-secundario border border-borde",
};

export default function Etiqueta({
  texto,
  variante = "neutro",
  className,
}: EtiquetaProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 rounded-full text-[10px] font-bold",
        variantes[variante],
        className
      )}
    >
      {texto}
    </span>
  );
}
