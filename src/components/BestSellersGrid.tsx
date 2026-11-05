import React, { useState, useMemo } from 'react';
import { Fragrance } from '../types';
import { Search, Scale, ShoppingBag, Eye, Star } from 'lucide-react';

interface BestSellersGridProps {
  fragrances: Fragrance[];
  onOpenProduct: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  onCompare: (fragrance: Fragrance) => void;
}

export const BestSellersGrid: React.FC<BestSellersGridProps> = ({
  fragrances,
  onOpenProduct,
  onAddToCart,
  onCompare,
}) => {
  const [brandFilter, setBrandFilter] = useState<'all' | 'Jean Paul Gaultier' | 'Hugo Boss'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'Masculino' | 'Femenino'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFragrances = useMemo(() => {
    return fragrances.filter((f) => {
      const matchBrand = brandFilter === 'all' || f.brand === brandFilter;
      const matchGender = genderFilter === 'all' || f.gender === genderFilter;
      const matchSearch =
        !searchQuery.trim() ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.dominantNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        f.olfactoryFamily.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchGender && matchSearch;
    });
  }, [fragrances, brandFilter, genderFilter, searchQuery]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Section Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-medium">
            Bóveda de Diseñador
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white mt-1 font-light">
            Destacados & Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg">
            Las creaciones más laureadas de Jean Paul Gaultier y Hugo Boss. Formulaciones de alta fijación y botellas icónicas.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por notas (vainilla, manzana, miel)..."
            className="w-full bg-[#131318] border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs (Interactive buttons, not pills) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
        
        {/* Brand Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#131318] rounded-lg border border-white/5">
          <button
            onClick={() => setBrandFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              brandFilter === 'all'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todas las Casas
          </button>
          <button
            onClick={() => setBrandFilter('Jean Paul Gaultier')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              brandFilter === 'Jean Paul Gaultier'
                ? 'bg-rose-900/60 text-rose-200 border border-rose-500/30'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            Jean Paul Gaultier
          </button>
          <button
            onClick={() => setBrandFilter('Hugo Boss')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
              brandFilter === 'Hugo Boss'
                ? 'bg-amber-900/60 text-amber-200 border border-amber-500/30'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            Hugo Boss
          </button>
        </div>

        {/* Gender Segmented Control */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Filtrar:</span>
          <div className="flex items-center gap-1 p-1 bg-[#131318] rounded-lg border border-white/5">
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                genderFilter === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setGenderFilter('Masculino')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                genderFilter === 'Masculino' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Para Él
            </button>
            <button
              onClick={() => setGenderFilter('Femenino')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                genderFilter === 'Femenino' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Para Ella
            </button>
          </div>
        </div>

      </div>

      {/* Grid of Fragrance Cards */}
      {filteredFragrances.length === 0 ? (
        <div className="py-16 text-center bg-[#131318] rounded-xl border border-white/5">
          <p className="text-sm text-slate-400">
            No se encontraron fragancias que coincidan con los criterios seleccionados.
          </p>
          <button
            onClick={() => {
              setBrandFilter('all');
              setGenderFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs uppercase tracking-wider text-amber-400 hover:text-amber-300 cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFragrances.map((fragrance) => {
            const isJPG = fragrance.brand === 'Jean Paul Gaultier';

            return (
              <div
                key={fragrance.id}
                className="group bg-[#131318] border border-white/10 hover:border-white/20 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-black/60 overflow-hidden cursor-pointer" onClick={() => onOpenProduct(fragrance)}>
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-transparent opacity-90"></div>

                  {/* Corner Brand Mark */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded backdrop-blur-md ${
                        isJPG
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {fragrance.brand === 'Jean Paul Gaultier' ? 'JPG' : 'Hugo Boss'}
                    </span>
                  </div>

                  {/* Rating display */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{fragrance.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1.5">
                      <span>{fragrance.concentration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{fragrance.performance.longevityHours}h fijación</span>
                      <span aria-hidden="true">·</span>
                      <span>{fragrance.timeOfDay}</span>
                    </div>

                    <h3
                      onClick={() => onOpenProduct(fragrance)}
                      className="font-serif text-lg text-white font-medium group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {fragrance.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {fragrance.description}
                    </p>

                    {/* Dominant notes tags as unboxed inline text */}
                    <div className="mt-3 text-[11px] text-slate-500 flex flex-wrap gap-1">
                      <span className="text-slate-400 font-medium">Notas:</span>
                      {fragrance.dominantNotes.slice(0, 3).map((note, idx) => (
                        <span key={note}>
                          {note}
                          {idx < 2 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action baseline */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-lg text-white font-semibold tabular-nums">
                          ${fragrance.price.toFixed(2)}
                        </span>
                        {fragrance.originalPrice && (
                          <span className="font-mono text-xs text-slate-500 line-through tabular-nums">
                            ${fragrance.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">
                        Envío Express 24h
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onCompare(fragrance)}
                        title="Comparar en el Duelo"
                        aria-label="Comparar fragancia"
                        className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onAddToCart(fragrance)}
                        title="Añadir a la bolsa"
                        aria-label="Añadir a la bolsa"
                        className={`p-2 rounded transition-colors cursor-pointer ${
                          isJPG
                            ? 'text-white bg-rose-600 hover:bg-rose-500'
                            : 'text-slate-950 bg-amber-400 hover:bg-amber-300'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
