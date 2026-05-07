# CLAUDE.md — Mi Dashboard

> Archivo de contexto para Claude Code. Lee esto antes de tocar cualquier archivo.

---

## ¿Qué es este proyecto?

Un **dashboard SaaS en español** para creadores de contenido de YouTube, inspirado en la estructura y experiencia de Slee Studio (sleestudio.com/dashboard). Permite:

- Ver el feed de "outliers" (videos virales de canales rastreados)
- Entender el patrón de cada video: título, miniatura, tipo de gancho
- Generar versiones propias con IA
- Organizar contenido en un calendario editorial
- Analizar competidores y gestionar patrocinios

**Todo el texto de la interfaz está en español.**

---

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 15 (App Router) | Framework principal |
| React | 19 | UI |
| TypeScript | 5 | Tipado |
| Tailwind CSS | 3.4 | Estilos |
| Lucide React | latest | Íconos |
| clsx + tailwind-merge | latest | Clases dinámicas |

---

## Estructura de carpetas

```
src/
├── app/
│   ├── layout.tsx              ← Layout raíz (html, body, fuente)
│   ├── page.tsx                ← Redirect a /dashboard/hoy
│   ├── globals.css             ← Variables CSS + utilidades Tailwind
│   ├── (auth)/
│   │   └── login/page.tsx      ← TODO: página de login
│   └── (dashboard)/
│       ├── layout.tsx          ← Layout con Navbar compartida
│       ├── hoy/page.tsx        ← Página principal (Today)
│       ├── feed/page.tsx       ← Feed de outliers
│       ├── calendario/page.tsx ← Calendario editorial
│       ├── competidores/page.tsx
│       ├── patrocinios/page.tsx
│       └── personalizar/page.tsx ← Blueprint / onboarding
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          ← Navbar fija, con rutas activas
│   ├── ui/
│   │   ├── TarjetaStat.tsx     ← KPI card (ícono + número + sublabel)
│   │   ├── Etiqueta.tsx        ← Badge de color (variante semántica)
│   │   ├── PildoraEstado.tsx   ← Estado del pipeline (Idea→Publicado)
│   │   └── BannerOnboarding.tsx ← Banner dismissible de onboarding
│   └── dashboard/
│       └── TarjetaOutlier.tsx  ← Card expandible de video outlier
│
├── lib/
│   ├── types.ts                ← Todas las interfaces TypeScript
│   ├── datos.ts                ← Mock data de ejemplo (reemplazar con API)
│   └── utils.ts                ← cn(), formatearNumero(), nombreDia(), etc.
│
├── hooks/                      ← (vacío) Aquí van los custom hooks
└── store/                      ← (vacío) Aquí va el estado global (Zustand)
```

---

## Sistema de diseño

### Paleta de colores (tokens CSS en globals.css)

```css
--fondo:      #0d0d0d   /* Background principal */
--panel:      #1a1a1a   /* Cards y paneles */
--borde:      #2a2a2a   /* Bordes */
--acento:     #d4831a   /* Dorado — CTA principal, links, íconos activos */
--puntaje:    #e53935   /* Rojo — mejor score, urgencia */
--info:       #42a5f5   /* Azul — canales, información */
--exito:      #4caf50   /* Verde — publicado, live data */
--alerta:     #ff9800   /* Naranja — pendiente */
--texto:      #ffffff
--texto-sec:  #888888
--texto-suave:#555555
```

### Clases utilitarias (globals.css → @layer components)

- `.card` → bg-panel + border border-borde + rounded-card
- `.label-xs` → 9px font-bold uppercase tracking-widest texto-suave
- `.stat-num` → 22px font-extrabold leading-none
- `.btn-primario` → fondo acento, texto blanco, pill
- `.btn-secundario` → fondo panel, borde, texto secundario

### Regla de diseño principal

El **único** elemento brillante en la UI es el botón primario dorado. Todo lo demás es oscuro. Esto hace que el CTA sea irresistible sin ser agresivo.

---

## Componentes clave

### `TarjetaOutlier`
El componente más complejo. Tiene dos estados:
- **Colapsado**: thumbnail (placeholder) + título + canal + puntaje badge
- **Expandido**: agrega barra de puntaje + 3 celdas de análisis (Patrón título / Miniatura / Tipo de gancho) + botones Ver / Generar mi versión

### `TarjetaStat`
Acepta props: `etiqueta`, `valor`, `sublabel`, `icono`, `colorValor`, `colorIcono`. Renderiza un KPI card oscuro con el número grande en el color semántico correcto.

### `Navbar`
Client component. Usa `usePathname()` para la ruta activa. Tiene: logo + nombre, rutas del dashboard, utilidades (bookmark, refresh, avatar, settings, logout).

---

## Rutas del dashboard

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | page.tsx | Redirect a /dashboard/hoy |
| `/dashboard/hoy` | hoy/page.tsx | Vista principal: fecha, KPIs, outlier top, próximos |
| `/dashboard/feed` | feed/page.tsx | Lista completa de outliers con filtros |
| `/dashboard/calendario` | calendario/page.tsx | Calendario semanal + pipeline |
| `/dashboard/competidores` | competidores/page.tsx | Análisis de canales del mismo nicho |
| `/dashboard/patrocinios` | patrocinios/page.tsx | CRM básico de deals de patrocinio |
| `/dashboard/personalizar` | personalizar/page.tsx | Blueprint de marca personal + pasos |

---

## Datos

Actualmente todos los datos vienen de `src/lib/datos.ts` (mock data estático). 

**Próximo paso crítico**: conectar con datos reales.

### Para conectar YouTube Data API:
1. Crear `src/lib/youtube.ts` con funciones fetch
2. Crear API routes en `src/app/api/outliers/route.ts`
3. Reemplazar imports de `datos.ts` por llamadas a la API
4. Agregar variables de entorno en `.env.local`:
   ```
   YOUTUBE_API_KEY=
   NEXT_PUBLIC_APP_URL=
   ```

---

## Lo que falta (próximas tareas para Claude Code)

### Prioridad alta
- [ ] Autenticación con Clerk o NextAuth (página `/login`)
- [ ] Conectar YouTube Data API para outliers reales
- [ ] Algoritmo de puntaje outlier (vistas / promedio del canal)
- [ ] Drag & drop en el calendario (usar `@dnd-kit/core`)
- [ ] Función "Generar mi versión" con IA (API de Claude o OpenAI)

### Prioridad media
- [ ] Búsqueda y filtros en el Feed (por puntaje, canal, gancho)
- [ ] Base de datos (Supabase + Prisma) para persistir calendario y patrocinios
- [ ] Estado global con Zustand (`src/store/`)
- [ ] Custom hooks: `useOutliers()`, `useCalendario()`, `useUsuario()`
- [ ] Miniaturas reales de YouTube con `<Image>` de Next.js

### Prioridad baja
- [ ] Páginas de competidores con datos reales de YouTube API
- [ ] Notificaciones / alertas de nuevos outliers
- [ ] Export del calendario a Google Calendar / .ics
- [ ] Modal "Generar mi versión" con editor de script

---

## Comandos de desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev        # → http://localhost:3000

# Build de producción
npm run build
npm start

# Linting
npm run lint
```

---

## Convenciones de código

1. **Nombres en español** para variables, funciones, interfaces y archivos de UI
2. **Props interfaces** inline dentro del mismo archivo del componente
3. **`"use client"`** solo cuando el componente usa hooks o eventos de navegador
4. **Nunca usar `any`** — tipar todo correctamente con las interfaces de `types.ts`
5. **Imports absolutos** con alias `@/` (configurado en tsconfig.json)
6. **Función `cn()`** de `@/lib/utils` para clases condicionales de Tailwind

---

## Contexto de diseño

Este proyecto está inspirado en Slee Studio (sleestudio.com/dashboard), un Content Studio para creadores de YouTube. Copiamos su **estructura y patrones UX** que funcionan:
- Dark mode total como identidad de marca
- Navbar horizontal (sin sidebar)
- Score/puntaje como métrica central y gancho del producto
- Layout 65/35 en la página principal (feed + sidebar)
- CTA dorado como único elemento brillante
- Análisis en 3 celdas por video (título / miniatura / gancho)
- Banner de onboarding dismissible para activación

La propuesta de valor, el nicho y el contenido son **originales y auténticos** al creador.
