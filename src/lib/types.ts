// ============================================================
// TIPOS GLOBALES — mi-dashboard
// ============================================================

// ——— Usuario ———
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  planActivo: boolean;
  blueprintCompleto: boolean;
}

// ——— Canal de YouTube ———
export interface Canal {
  id: string;
  nombre: string;
  suscriptores: number;   // número absoluto
  suscriptoresTexto: string; // ej: "482.0M"
  miniatura?: string;
  promedioVistas: number;
}

// ——— Tipos de gancho (hook) ———
export type TipoGancho =
  | "Brecha de curiosidad"
  | "Número impactante"
  | "Reto o apuesta"
  | "Antes y después"
  | "Secreto revelado"
  | "Controversia"
  | "Lista de X cosas"
  | "Historia personal";

// ——— Video outlier ———
export interface VideoOutlier {
  id: string;
  titulo: string;
  canal: Canal;
  vistas: number;          // número absoluto
  vistasTexto: string;     // ej: "76.9M"
  puntaje: number;         // multiplicador vs promedio del canal
  patronTitulo: string;    // ej: "Cómo [Tema] cambió mi vida"
  estiloMiniatura: string; // ej: "Cara sorprendida + número grande"
  tipoGancho: TipoGancho;
  urlVideo: string;
  urlMiniatura: string;
  fechaPublicacion: string; // ISO string
  horasDesdePublicacion: string; // ej: "48–72h"
}

// ——— Estado de contenido en el pipeline ———
export type EstadoContenido =
  | "idea"
  | "guionado"
  | "grabado"
  | "editado"
  | "publicado";

export const ETIQUETAS_ESTADO: Record<EstadoContenido, string> = {
  idea: "Idea",
  guionado: "Guionado",
  grabado: "Grabado",
  editado: "Editado",
  publicado: "Publicado",
};

export const COLORES_ESTADO: Record<EstadoContenido, string> = {
  idea: "bg-[#2a2a2a] text-texto-secundario",
  guionado: "bg-[#2a1a00] text-acento border border-acento/30",
  grabado: "bg-[#001a2a] text-info border border-info/30",
  editado: "bg-[#1a002a] text-purple-400 border border-purple-400/30",
  publicado: "bg-[#001a00] text-exito border border-exito/30",
};

// ——— Elemento del calendario ———
export interface ElementoCalendario {
  id: string;
  titulo: string;
  estado: EstadoContenido;
  fecha: string; // ISO date string YYYY-MM-DD
  canal?: string;
  duracionEstimada?: string; // ej: "10 min"
  inspiradoEn?: string;      // id del videoOutlier
}

// ——— Competidor ———
export interface Competidor {
  id: string;
  canal: Canal;
  relacionConTigo: string;   // ej: "Mismo nicho — finanzas personales"
  frecuenciaPublicacion: string; // ej: "3x por semana"
  mejorVideo?: Pick<VideoOutlier, "titulo" | "puntaje" | "vistasTexto">;
}

// ——— Patrocinio ———
export type EstadoPatrocinio = "prospecto" | "contactado" | "negociando" | "cerrado" | "descartado";

export interface Patrocinio {
  id: string;
  marca: string;
  logo?: string;
  estado: EstadoPatrocinio;
  valorEstimado?: number; // en USD
  fechaContacto?: string;
  notas?: string;
}

// ——— KPIs de la página Hoy ———
export interface KPIsHoy {
  mejorPuntaje: number;
  nombreMejorCanal: string;
  totalOutliers: number;
  totalCanales: number;
  videosAgendados: number;
}
