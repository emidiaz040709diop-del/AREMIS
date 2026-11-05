import React, { useState, useMemo } from 'react';
import { Fragrance } from '../types';
import { Flame, Sparkles, Filter, ShoppingBag, Eye, Scale } from 'lucide-react';

interface BrandCollectionJPGProps {
  fragrances: Fragrance[];
  onOpenProduct: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
  onCompare: (fragrance: Fragrance) => void;
}

export const BrandCollectionJPG: React.FC<BrandCollectionJPGProps> = ({
  fragrances,
  onOpenProduct,
  onAddToCart,
  onCompare,
}) => {
  const jpgFragrances = useMemo(() => {
    return fragrances.filter((f) => f.brand === 'Jean Paul Gaultier');
  }, [fragrances]);

  const [genderFilter, setGenderFilter] = useState<'all' | 'Masculino' | 'Femenino'>('all');
  const [concentrationFilter, setConcentrationFilter] = useState<string>('all');
  const [selectedNote, setSelectedNote] = useState<string>('all');

  const availableNotes = ['Vainilla', 'Miel', 'Menta', 'Pera', 'Lavanda', 'Caramelo', 'Haba Tonka'];

  const filtered = useMemo(() => {
    return jpgFragrances.filter((f) => {
      const matchGender = genderFilter === 'all' || f.gender === genderFilter;
      const matchConcentration =
        concentrationFilter === 'all' || f.concentration.toLowerCase().includes(concentrationFilter.toLowerCase());
      const matchNote =
        selectedNote === 'all' ||
        f.dominantNotes.some((n) => n.toLowerCase().includes(selectedNote.toLowerCase()));
      return matchGender && matchConcentration && matchNote;
    });
  }, [jpgFragrances, genderFilter, concentrationFilter, selectedNote]);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Editorial Narrative Header: Jean Paul Gaultier */}
      <section className="relative rounded-2xl overflow-hidden border border-rose-500/20 bg-gradient-to-br from-[#1A0A16] via-[#100712] to-[#0B0B0E] p-8 sm:p-12 mb-16 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 z-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose-400 font-semibold mb-3">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>L’Enfant Terrible de la Mode</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight">
              Jean Paul <br />
              <span className="font-normal italic text-rose-200">Gaultier</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Desde 1976, Jean Paul Gaultier ha desafiado cualquier noción convencional de belleza y género. En la perfumería, esta rebeldía se tradujo en una revolución escultórica: el cuerpo humano desnudo y descarado transformado en frascos de culto.
            </p>

            {/* Bottle Sculptures Storytelling Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-rose-500/20 pt-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-rose-300 font-semibold">El Corsé (Classique & La Belle)</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Inspirado en los corsés de su abuela y el icónico sujetador de conos de Madonna en 1990.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-rose-300 font-semibold">El Torso Marinero (Le Male)</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Un homenaje al marinero viril y rebelde con franjas marinière esmaltadas en vidrio macizo.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider text-rose-300 font-semibold">Las Piernas al Aire (Scandal)</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  La transgresión parisina: piernas doradas desafiando el protocolo con sensualidad descarada.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/src/assets/images/showcase_jpg_silhouette_1793893023325.jpg"
                alt="Esculturas icónicas de frascos Jean Paul Gaultier"
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
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros:</span>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded border border-white/5 text-xs">
            <button
              onClick={() => setGenderFilter('all')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                genderFilter === 'all' ? 'bg-rose-900/60 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setGenderFilter('Masculino')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                genderFilter === 'Masculino' ? 'bg-rose-900/60 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Él
            </button>
            <button
              onClick={() => setGenderFilter('Femenino')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                genderFilter === 'Femenino' ? 'bg-rose-900/60 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ella
            </button>
          </div>

          {/* Concentration */}
          <select
            value={concentrationFilter}
            onChange={(e) => setConcentrationFilter(e.target.value)}
            className="bg-black/40 border border-white/10 text-xs text-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-rose-400 cursor-pointer"
          >
            <option value="all">Todas las concentraciones</option>
            <option value="toilette">Eau de Toilette</option>
            <option value="parfum">Eau de Parfum & Parfum</option>
          </select>
        </div>

        {/* Dominant note quick filter */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 shrink-0">Notas dominantes:</span>
          <button
            onClick={() => setSelectedNote('all')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer shrink-0 ${
              selectedNote === 'all' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          {availableNotes.map((note) => (
            <button
              key={note}
              onClick={() => setSelectedNote(note)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer shrink-0 ${
                selectedNote === note ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {note}
            </button>
          ))}
        </div>

      </section>

      {/* Catalog Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((fragrance) => (
            <div
              key={fragrance.id}
              className="group bg-[#131318] border border-rose-500/20 hover:border-rose-500/40 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] bg-black/60 overflow-hidden cursor-pointer" onClick={() => onOpenProduct(fragrance)}>
                <img
                  src={fragrance.image}
                  alt={fragrance.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-rose-300 font-mono">
                  {fragrance.concentration}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-slate-300 font-mono">
                  {fragrance.performance.longevityHours}h fijación
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-rose-400 font-medium">
                    {fragrance.bottleConcept.split(',')[0]}
                  </span>
                  <h3
                    onClick={() => onOpenProduct(fragrance)}
                    className="font-serif text-xl text-white font-medium mt-1 group-hover:text-rose-300 transition-colors cursor-pointer"
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
                      75ml / 125ml
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCompare(fragrance)}
                      title="Comparar contra Hugo Boss"
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
                      className="py-2 px-3 text-xs uppercase tracking-wider font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
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
