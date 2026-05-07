"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Link from "next/link";

export default function BannerOnboarding() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="card p-4 flex items-center gap-4 mb-6">
      <Sparkles size={18} className="text-acento shrink-0" />

      <div className="flex-1">
        <p className="text-sm text-white font-semibold">
          ¡Bienvenido a Mi Dashboard!
        </p>
        <p className="text-xs text-texto-secundario mt-0.5">
          Tu feed de outliers se está cargando — rastrea videos virales en
          tiempo real. Para personalizar tu estrategia completa, termina tu{" "}
          <strong className="text-white">Plan de Marca Personal</strong> primero.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link href="/personalizar" className="btn-primario flex items-center gap-1.5">
          <Sparkles size={12} />
          <span>Crear mi plan</span>
        </Link>
        <button
          onClick={() => setVisible(false)}
          className="text-texto-secundario hover:text-white transition-colors"
          title="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
