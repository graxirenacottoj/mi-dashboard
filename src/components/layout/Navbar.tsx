"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  TrendingUp,
  CalendarDays,
  Users,
  DollarSign,
  Sparkles,
  LogOut,
  RefreshCw,
  Bookmark,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ——— Rutas del dashboard ———
const RUTAS = [
  { href: "/hoy", etiqueta: "Hoy", icono: Flame },
  { href: "/feed", etiqueta: "Feed", icono: TrendingUp },
  { href: "/calendario", etiqueta: "Calendario", icono: CalendarDays },
  { href: "/competidores", etiqueta: "Competidores", icono: Users },
  { href: "/patrocinios", etiqueta: "Patrocinios", icono: DollarSign },
  { href: "/personalizar", etiqueta: "Personalizar", icono: Sparkles },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[48px] bg-[#111111] border-b border-borde flex items-center px-4 gap-2">
      {/* Logo + nombre */}
      <Link href="/hoy" className="flex items-center gap-2 mr-4 shrink-0">
        <div className="w-7 h-7 bg-acento rounded-md flex items-center justify-center">
          <Sparkles size={14} className="text-white" />
        </div>
        <span className="font-bold text-sm text-white hidden sm:block">
          Mi Dashboard
        </span>
      </Link>

      {/* Rutas principales */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {RUTAS.map(({ href, etiqueta, icono: Icono }) => {
          const activa = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold whitespace-nowrap transition-colors",
                activa
                  ? "bg-[#222] text-white"
                  : "text-texto-secundario hover:text-white"
              )}
            >
              <Icono size={13} />
              <span>{etiqueta}</span>
            </Link>
          );
        })}
      </div>

      {/* Utilidades derecha */}
      <div className="flex items-center gap-3 shrink-0 ml-2">
        <button
          title="Guardar"
          className="text-texto-secundario hover:text-white transition-colors"
        >
          <Bookmark size={16} />
        </button>
        <button
          title="Actualizar"
          className="text-texto-secundario hover:text-white transition-colors"
        >
          <RefreshCw size={16} />
        </button>

        {/* Avatar de usuario */}
        <div className="flex items-center gap-2 pl-2 border-l border-borde">
          <div className="w-7 h-7 rounded-full bg-acento flex items-center justify-center text-white text-xs font-bold">
            JG
          </div>
          <span className="text-xs text-white font-medium hidden md:block">
            Jose
          </span>
          <button
            title="Ajustes"
            className="text-texto-secundario hover:text-white transition-colors"
          >
            <Settings size={14} />
          </button>
        </div>

        <button
          title="Salir"
          className="text-texto-secundario hover:text-white transition-colors"
        >
          <LogOut size={15} />
        </button>
      </div>
    </nav>
  );
}
