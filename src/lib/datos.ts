// ============================================================
// DATOS DE EJEMPLO — reemplazar con datos reales de tu API
// ============================================================
import type {
  VideoOutlier,
  ElementoCalendario,
  Competidor,
  Patrocinio,
  KPIsHoy,
} from "./types";

// ——— KPIs del día ———
export const kpisHoy: KPIsHoy = {
  mejorPuntaje: 80,
  nombreMejorCanal: "MrBeast",
  totalOutliers: 12,
  totalCanales: 3,
  videosAgendados: 2,
};

// ——— Outliers de ejemplo ———
export const outliers: VideoOutlier[] = [
  {
    id: "v1",
    titulo: "Abandoné a 100 personas en la selva por $250,000",
    canal: {
      id: "c1",
      nombre: "MrBeast",
      suscriptores: 482000000,
      suscriptoresTexto: "482M",
      promedioVistas: 38560000,
    },
    vistas: 76900000,
    vistasTexto: "76.9M",
    puntaje: 80,
    patronTitulo: "Hice [Acción extrema] por $[Cantidad]",
    estiloMiniatura: "Visual de dinero + número grande + cara sorprendida",
    tipoGancho: "Brecha de curiosidad",
    urlVideo: "https://youtube.com/watch?v=ejemplo1",
    urlMiniatura: "https://i.ytimg.com/vi/ejemplo1/maxresdefault.jpg",
    fechaPublicacion: new Date(Date.now() - 50 * 60 * 60 * 1000).toISOString(),
    horasDesdePublicacion: "48–72h",
  },
  {
    id: "v2",
    titulo: "Invertí $10,000 en cripto por 30 días — esto pasó",
    canal: {
      id: "c2",
      nombre: "Andrei Jikh",
      suscriptores: 2100000,
      suscriptoresTexto: "2.1M",
      promedioVistas: 350000,
    },
    vistas: 3200000,
    vistasTexto: "3.2M",
    puntaje: 55,
    patronTitulo: "Invertí $[Cantidad] en [Tema] por [Tiempo] — esto pasó",
    estiloMiniatura: "Gráfica de crecimiento + expresión de sorpresa",
    tipoGancho: "Reto o apuesta",
    urlVideo: "https://youtube.com/watch?v=ejemplo2",
    urlMiniatura: "https://i.ytimg.com/vi/ejemplo2/maxresdefault.jpg",
    fechaPublicacion: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    horasDesdePublicacion: "24–48h",
  },
  {
    id: "v3",
    titulo: "El secreto que los ricos no quieren que sepas sobre impuestos",
    canal: {
      id: "c3",
      nombre: "Graham Stephan",
      suscriptores: 4700000,
      suscriptoresTexto: "4.7M",
      promedioVistas: 620000,
    },
    vistas: 4100000,
    vistasTexto: "4.1M",
    puntaje: 42,
    patronTitulo: "El secreto que [Autoridad] no quiere que sepas sobre [Tema]",
    estiloMiniatura: "Texto grande + fondo oscuro + expresión seria",
    tipoGancho: "Secreto revelado",
    urlVideo: "https://youtube.com/watch?v=ejemplo3",
    urlMiniatura: "https://i.ytimg.com/vi/ejemplo3/maxresdefault.jpg",
    fechaPublicacion: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    horasDesdePublicacion: "12–24h",
  },
];

// ——— Calendario de contenido ———
export const elementosCalendario: ElementoCalendario[] = [
  {
    id: "e1",
    titulo: "Mi versión del reto de los $10,000",
    estado: "guionado",
    fecha: new Date().toISOString().split("T")[0],
    canal: "Mi Canal Principal",
    duracionEstimada: "12 min",
    inspiradoEn: "v2",
  },
  {
    id: "e2",
    titulo: "Los 5 errores que cometí al empezar",
    estado: "idea",
    fecha: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    canal: "Mi Canal Principal",
    duracionEstimada: "8 min",
  },
  {
    id: "e3",
    titulo: "Reseña honesta de [Producto]",
    estado: "grabado",
    fecha: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    canal: "Mi Canal Principal",
    duracionEstimada: "10 min",
  },
];

// ——— Competidores ———
export const competidores: Competidor[] = [
  {
    id: "comp1",
    canal: {
      id: "c2",
      nombre: "Andrei Jikh",
      suscriptores: 2100000,
      suscriptoresTexto: "2.1M",
      promedioVistas: 350000,
    },
    relacionConTigo: "Mismo nicho — inversiones y finanzas personales",
    frecuenciaPublicacion: "2x por semana",
    mejorVideo: {
      titulo: "Invertí $10,000 en cripto por 30 días",
      puntaje: 55,
      vistasTexto: "3.2M",
    },
  },
  {
    id: "comp2",
    canal: {
      id: "c3",
      nombre: "Graham Stephan",
      suscriptores: 4700000,
      suscriptoresTexto: "4.7M",
      promedioVistas: 620000,
    },
    relacionConTigo: "Nicho adyacente — bienes raíces y frugalidad",
    frecuenciaPublicacion: "3x por semana",
    mejorVideo: {
      titulo: "El secreto que los ricos no quieren que sepas",
      puntaje: 42,
      vistasTexto: "4.1M",
    },
  },
];

// ——— Patrocinios ———
export const patrocinios: Patrocinio[] = [
  {
    id: "p1",
    marca: "NordVPN",
    estado: "contactado",
    valorEstimado: 2000,
    fechaContacto: "2026-04-20",
    notas: "Enviamos propuesta, esperando respuesta",
  },
  {
    id: "p2",
    marca: "Skillshare",
    estado: "negociando",
    valorEstimado: 3500,
    fechaContacto: "2026-04-28",
    notas: "Segunda ronda de negociación — piden 2 menciones",
  },
  {
    id: "p3",
    marca: "Robinhood",
    estado: "prospecto",
    notas: "Ver si cumplo los requisitos mínimos de suscriptores",
  },
];
