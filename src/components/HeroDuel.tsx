import React from 'react';
import { ArrowRight, Flame, Shield, Sparkles } from 'lucide-react';

interface HeroDuelProps {
  onSelectBrand: (brand: 'jpg' | 'boss') => void;
  onStartDuel: () => void;
  onExploreNotes: () => void;
}

export const HeroDuel: React.FC<HeroDuelProps> = ({
  onSelectBrand,
  onStartDuel,
  onExploreNotes,
}) => {
  return (
    <section className="relative border-b border-white/10 overflow-hidden bg-[#0B0B0E]">
      
      {/* Editorial Top Headline Banner */}
      <div className="py-6 px-4 text-center border-b border-white/5 bg-gradient-to-r from-rose-950/20 via-black to-amber-950/20">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-medium">
          El Arte del Aroma · Duelo de Titanes
        </p>
      </div>

      {/* Dual Split Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px] lg:min-h-[640px]">
        
        {/* Left Side: Jean Paul Gaultier */}
        <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 group">
          {/* Background Image with Measured Scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/hero_jpg_perfume_art_1793893022052.jpg"
              alt="Jean Paul Gaultier Le Male Elixir en frasco dorado estriado"
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 opacity-40 lg:opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/80 to-[#120814]/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose-400 font-medium mb-3">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Sensualidad & Escultura Teatral</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.05] tracking-tight text-balance">
              Jean Paul <br />
              <span className="font-normal italic text-rose-200">Gaultier</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
              La provocación elevada a alta costura. De los torsos marineros de <strong className="text-white font-medium">Le Male</strong> y las curvas esculturales de <strong className="text-white font-medium">La Belle</strong> hasta la audacia irreverente de <strong className="text-white font-medium">Scandal</strong>.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="text-rose-300 font-medium">Acordes insignia:</span>
              <span>Miel dorada</span>
              <span aria-hidden="true">·</span>
              <span>Vainilla Bourbon</span>
              <span aria-hidden="true">·</span>
              <span>Menta fresca</span>
              <span aria-hidden="true">·</span>
              <span>Haba Tonka</span>
            </div>
          </div>

          <div className="relative z-10 mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => onSelectBrand('jpg')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white bg-rose-600 hover:bg-rose-500 transition-colors rounded shadow-lg flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>Descubre Gaultier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400">
              Icono 2026: <span className="text-slate-200 font-medium">Le Male Elixir (12h)</span>
            </span>
          </div>
        </div>

        {/* Right Side: Hugo Boss */}
        <div className="relative p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden group">
          {/* Background Image with Measured Scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/hero_boss_perfume_art_1793893023571.jpg"
              alt="Hugo Boss Bottled Elixir con resplandor ambarino"
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 opacity-40 lg:opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/80 to-[#181206]/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Sastrería & Éxito Contemporáneo</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.05] tracking-tight text-balance">
              Hugo <br />
              <span className="font-normal tracking-wide text-amber-200">BOSS</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
              La arquitectura del éxito moderno. La manzana crujiente de <strong className="text-white font-medium">Boss Bottled</strong>, el magnetismo de la fruta Maninka en <strong className="text-white font-medium">The Scent</strong> y la energía vital de <strong className="text-white font-medium">Alive</strong>.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="text-amber-300 font-medium">Acordes insignia:</span>
              <span>Incienso místico</span>
              <span aria-hidden="true">·</span>
              <span>Manzana crujiente</span>
              <span aria-hidden="true">·</span>
              <span>Fruta Maninka</span>
              <span aria-hidden="true">·</span>
              <span>Canela noble</span>
            </div>
          </div>

          <div className="relative z-10 mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => onSelectBrand('boss')}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors rounded shadow-lg flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>Explora Hugo Boss</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400">
              Icono 2026: <span className="text-slate-200 font-medium">Boss Bottled Elixir (12h)</span>
            </span>
          </div>
        </div>

      </div>

      {/* Floating Center Badge: Quick Duel Launch */}
      <div className="border-t border-white/10 bg-[#131318] py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <p className="text-xs text-slate-300">
            <span className="font-semibold text-white">¿Indeciso entre las dos casas?</span> Enfrenta sus pirámides aromáticas en el comparador directo.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onStartDuel}
            className="text-xs uppercase tracking-widest font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Iniciar Duelo de Fragancias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={onExploreNotes}
            className="text-xs uppercase tracking-widest font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Filtrar por Notas
          </button>
        </div>
      </div>

    </section>
  );
};
