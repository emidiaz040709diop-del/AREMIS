import React, { useState } from 'react';
import { Fragrance, OlfactoryFamily } from '../types';
import { Compass, Sparkles, ArrowRight, Eye, ShoppingBag } from 'lucide-react';

interface OlfactoryFamilyExplorerProps {
  fragrances: Fragrance[];
  onOpenProduct: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
}

interface FamilyMeta {
  family: OlfactoryFamily;
  headline: string;
  description: string;
  keyIngredients: string[];
  accentBorder: string;
  accentBg: string;
}

const FAMILIES_META: FamilyMeta[] = [
  {
    family: 'Oriental Gourmand',
    headline: 'Dulzura Hipnótica & Magnetismo Nocturno',
    description: 'Composiciones pródigas en vainilla Bourbon, miel silvestre, caramelo salado y haba tonka tostada. Ideales para la conquista, climas fríos y citas de alta intensidad.',
    keyIngredients: ['Vainilla Bourbon', 'Miel dorada', 'Caramelo tostado', 'Haba Tonka'],
    accentBorder: 'border-rose-500/30',
    accentBg: 'bg-rose-950/20',
  },
  {
    family: 'Amaderado Especiado',
    headline: 'Estructura Sastre, Maderas Nobles & Misterio',
    description: 'La esencia de la presencia ejecutiva y el porte aristocrático. Resinas sagradas de incienso, canela dulce, madera de cedro y cardamomo.',
    keyIngredients: ['Incienso místico', 'Madera de cedro', 'Cardamomo', 'Canela'],
    accentBorder: 'border-amber-500/30',
    accentBg: 'bg-amber-950/20',
  },
  {
    family: 'Aromático Fougère',
    headline: 'Herencia Barberil, Frescura Limpia & Lavanda',
    description: 'La armonía atemporal entre lavanda de Provenza, menta silvestre, salvia y maderas de fondo. El clásico seductor reinterpretado.',
    keyIngredients: ['Lavanda limpia', 'Menta fresca', 'Salvia romana', 'Coco solar'],
    accentBorder: 'border-blue-500/30',
    accentBg: 'bg-blue-950/20',
  },
  {
    family: 'Cítrico Verde',
    headline: 'Brisa Alpina, Manzana Crujiente & Vitalidad',
    description: 'Un estallido vigorizante de frutas frescas verdes, coníferas de montaña y cítricos chispeantes. Diseñados para la energía matutina y el uso diario.',
    keyIngredients: ['Manzana verde crujiente', 'Agujas de pino', 'Bergamota', 'Toronja'],
    accentBorder: 'border-emerald-500/30',
    accentBg: 'bg-emerald-950/20',
  },
  {
    family: 'Floral Sensual',
    headline: 'Flores Blancas de Lujo & Acordes Afrodisíacos',
    description: 'Jazmín sambac, flor de azahar radiante y gardenia opulenta fundidos con fondos de cacao puro y ámbar licoroso.',
    keyIngredients: ['Flor de azahar', 'Gardenia', 'Jazmín', 'Cacao tostado'],
    accentBorder: 'border-purple-500/30',
    accentBg: 'bg-purple-950/20',
  },
];

export const OlfactoryFamilyExplorer: React.FC<OlfactoryFamilyExplorerProps> = ({
  fragrances,
  onOpenProduct,
  onAddToCart,
}) => {
  const [selectedFamily, setSelectedFamily] = useState<OlfactoryFamily>('Oriental Gourmand');

  const activeMeta = FAMILIES_META.find((m) => m.family === selectedFamily) || FAMILIES_META[0];
  const matchingFragrances = fragrances.filter((f) => f.olfactoryFamily === selectedFamily);

  return (
    <section id="familias-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400 font-medium mb-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Brújula Olfativa</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
          Explora por Familia Olfativa
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Identifica las notas de salida y fijación que mejor vibran con tu química corporal y tu estilo de vida.
        </p>
      </div>

      {/* Family Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {FAMILIES_META.map((meta) => {
          const isActive = selectedFamily === meta.family;
          const count = fragrances.filter((f) => f.olfactoryFamily === meta.family).length;

          return (
            <button
              key={meta.family}
              onClick={() => setSelectedFamily(meta.family)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                isActive
                  ? `bg-[#181822] ${meta.accentBorder} shadow-lg ring-1 ring-white/10`
                  : 'bg-[#131318] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-mono">{count} perfumes</span>
                {isActive && <Sparkles className="w-3 h-3 text-amber-400" />}
              </div>
              <h3 className={`text-sm font-semibold tracking-wide ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {meta.family}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {meta.keyIngredients.join(', ')}
              </p>
            </button>
          );
        })}
      </div>

      {/* Family Showcase Banner */}
      <div className={`p-6 sm:p-8 rounded-xl border ${activeMeta.accentBorder} ${activeMeta.accentBg} mb-10`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-slate-400 font-mono">
              Perfil Aromático Seleccionado
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              {activeMeta.headline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {activeMeta.description}
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2 font-mono">
              Notas Predominantes:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeMeta.keyIngredients.map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 bg-white/5 rounded text-xs text-slate-200 border border-white/10"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fragrances Matching the Selected Family */}
      <div>
        <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
          Creaciones en la familia {selectedFamily}:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchingFragrances.map((fragrance) => {
            const isJPG = fragrance.brand === 'Jean Paul Gaultier';

            return (
              <div
                key={fragrance.id}
                className="bg-[#131318] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span
                        className={`text-[10px] uppercase tracking-widest font-semibold ${
                          isJPG ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        {fragrance.brand}
                      </span>
                      <h5 className="font-serif text-lg text-white font-medium">
                        {fragrance.name}
                      </h5>
                      <p className="text-xs text-slate-400">{fragrance.concentration}</p>
                    </div>
                    <span className="font-mono text-sm text-white tabular-nums font-semibold">
                      ${fragrance.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {fragrance.description}
                  </p>

                  <div className="mt-4 p-3 bg-black/30 rounded border border-white/5 text-xs text-slate-400 space-y-1">
                    <div>
                      <strong className="text-slate-300">Notas clave:</strong>{' '}
                      {fragrance.dominantNotes.join(' · ')}
                    </div>
                    <div>
                      <strong className="text-slate-300">Fijación:</strong>{' '}
                      {fragrance.performance.longevityHours}h ({fragrance.performance.sillage})
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => onOpenProduct(fragrance)}
                    className="flex-1 py-2 text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Pirámide</span>
                  </button>
                  <button
                    onClick={() => onAddToCart(fragrance)}
                    className={`py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isJPG
                        ? 'text-white bg-rose-600 hover:bg-rose-500'
                        : 'text-slate-950 bg-amber-400 hover:bg-amber-300'
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
