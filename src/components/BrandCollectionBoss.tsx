import React, { useState, useMemo } from 'react';
import { Fragrance } from '../types';
import { Shield, Sparkles, Filter, ShoppingBag, Eye, Scale } from 'lucide-react';

interface BrandCollectionBossProps {
  fragrances: Fragrance[];
  onOpenProduct: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  onCompare: (fragrance: Fragrance) => void;
}

export const BrandCollectionBoss: React.FC<BrandCollectionBossProps> = ({
  fragrances,
  onOpenProduct,
  onAddToCart,
  onCompare,
}) => {
  const bossFragrances = useMemo(() => {
    return fragrances.filter((f) => f.brand === 'Hugo Boss');
  }, [fragrances]);

  const [lineFilter, setLineFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'Masculino' | 'Femenino'>('all');
  const [occasionFilter, setOccasionFilter] = useState<string>('all');

  const lines = ['Boss Bottled', 'The Scent', 'Hugo', 'Boss Alive'];
  const occasions = ['Trabajo / Oficina', 'Noche / Citas', 'Diario / Casual', 'Gala / Eventos'];

  const filtered = useMemo(() => {
    return bossFragrances.filter((f) => {
      const matchGender = genderFilter === 'all' || f.gender === genderFilter;
      const matchLine =
        lineFilter === 'all' || f.name.toLowerCase().includes(lineFilter.toLowerCase());
      const matchOccasion =
        occasionFilter === 'all' ||
        f.occasion.some((occ) => occ.toLowerCase().includes(occasionFilter.toLowerCase()));
      return matchGender && matchLine && matchOccasion;
    });
  }, [bossFragrances, genderFilter, lineFilter, occasionFilter]);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Editorial Narrative Header: Hugo Boss */}
      <section className="relative rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-[#1C150A] via-[#120E07] to-[#0B0B0E] p-8 sm:p-12 mb-16 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 z-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-3">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Be Your Own BOSS · Tailoring Heritage</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
              Hugo <br />
              <span className="font-normal tracking-wide text-amber-200">BOSS</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Nacida de la precisión de la sastrería alemana en Metzingen, la casa Hugo Boss define la elegancia ejecutiva del siglo XXI. Cada frasco es un traje impecable: líneas limpias, metales cepillados y formulaciones que proyectan confianza inquebrantable y poder sereno.
            </p>

            {/* Core Lines Breakdown */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-amber-500/20 pt-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Boss Bottled</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  La icónica manzana especiada con canela y maderas de olivo para el hombre de acción.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">The Scent</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  El magnetismo afrodisíaco de la fruta Maninka, jengibre y absoluto de vainilla negra.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">Boss Alive & Hugo</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  La vitalidad radiante de la mujer contemporánea y el espíritu urbano de la cantimplora militar.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/src/assets/images/showcase_boss_tailoring_1793893024078.jpg"
                alt="Sastrería y alta perfumería Hugo Boss"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Filters Bar */}
      <section className="mb-10 p-5 bg-[#131318] rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros de Colección:</span>
          </div>

          {/* Lines */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded border border-white/5 text-xs overflow-x-auto">
            <button
              onClick={() => setLineFilter('all')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer shrink-0 ${
                lineFilter === 'all' ? 'bg-amber-900/60 text-amber-200' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas las Líneas
            </button>
            {lines.map((l) => (
              <button
                key={l}
                onClick={() => setLineFilter(l)}
                className={`px-3 py-1 rounded transition-colors cursor-pointer shrink-0 ${
                  lineFilter === l ? 'bg-amber-900/60 text-amber-200' : 'text-slate-400 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Gender */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded border border-white/5 text-xs">
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                genderFilter === 'all' ? 'bg-amber-900/60 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setGenderFilter('Masculino')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                genderFilter === 'Masculino' ? 'bg-amber-900/60 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Él
            </button>
            <button
              onClick={() => setGenderFilter('Femenino')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                genderFilter === 'Femenino' ? 'bg-amber-900/60 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ella
            </button>
          </div>
        </div>

        {/* Occasion filter */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 shrink-0">Ocasión:</span>
          <select
            value={occasionFilter}
            onChange={(e) => setOccasionFilter(e.target.value)}
            className="bg-black/40 border border-white/10 text-xs text-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">Cualquier ocasión</option>
            {occasions.map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </div>

      </section>

      {/* Catalog Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((fragrance) => (
            <div
              key={fragrance.id}
              className="group bg-[#131318] border border-amber-500/20 hover:border-amber-500/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] bg-black/60 overflow-hidden cursor-pointer" onClick={() => onOpenProduct(fragrance)}>
                <img
                  src={fragrance.image}
                  alt={fragrance.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-amber-300 font-mono">
                  {fragrance.concentration}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-slate-300 font-mono">
                  {fragrance.performance.longevityHours}h fijación
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-medium">
                    {fragrance.bottleConcept.split(',')[0]}
                  </span>
                  <h3
                    onClick={() => onOpenProduct(fragrance)}
                    className="font-serif text-xl text-white font-medium mt-1 group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {fragrance.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {fragrance.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs text-slate-400">
                    <div>
                      <strong className="text-slate-300">Notas clave:</strong>{' '}
                      {fragrance.dominantNotes.join(', ')}
                    </div>
                    <div>
                      <strong className="text-slate-300">Ocasión:</strong>{' '}
                      {fragrance.occasion.join(' · ')}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xl text-white font-semibold tabular-nums">
                      ${fragrance.price.toFixed(2)}
                    </span>
                    <span className="block text-[10px] text-slate-500 uppercase">
                      50ml / 100ml
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCompare(fragrance)}
                      title="Comparar contra Jean Paul Gaultier"
                      className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenProduct(fragrance)}
                      className="py-2 px-3 text-xs uppercase tracking-wider font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ficha</span>
                    </button>
                    <button
                      onClick={() => onAddToCart(fragrance)}
                      className="py-2 px-3 text-xs uppercase tracking-wider font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Comprar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
