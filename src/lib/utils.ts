import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind sin conflictos */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea un número grande a texto legible */
export function formatearNumero(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

/** Devuelve el nombre del día en español */
export function nombreDia(fecha: Date = new Date()): string {
  return fecha.toLocaleDateString("es-ES", { weekday: "long" });
}

/** Formatea una fecha en español largo */
export function fechaLarga(fecha: Date = new Date()): string {
  return fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Capitaliza la primera letra */
export function capitalizar(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
