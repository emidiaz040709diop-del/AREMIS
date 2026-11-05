import React, { useState } from 'react';
import { Fragrance } from '../types';
import {
  X,
  Star,
  Clock,
  Wind,
  Award,
  Sun,
  Moon,
  ThermometerSnowflake,
  Flame,
  ShoppingBag,
  Check,
  Scale,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';

interface ProductDetailModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, selectedSize: number, quantity: number) => void;
  onCompare: (fragrance: Fragrance) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
  onCompare,
}) => {
  if (!fragrance) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedSizeObj = fragrance.sizes[selectedSizeIndex] || fragrance.sizes[0];
  const currentPrice = selectedSizeObj.price;
  const isJPG = fragrance.brand === 'Jean Paul Gaultier';

  const handleAdd = () => {
    onAddToCart(fragrance, selectedSizeObj.ml, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  // Mock verified customer reviews
  const mockReviews = [
    {
      author: 'Carlos V. · Coleccionista Verificado',
      rating: 5,
      date: 'Hace 3 días',
      title: 'Fijación colosal y cumplidos constantes',
      comment: `Increíble desempeño. En mi piel supera fácilmente las ${fragrance.performance.longevityHours} horas. La apertura es magnífica pero el secado con ${fragrance.pyramid.base[0]} es pura magia.`,
    },
    {
      author: 'Elena R. · Perfumista Aficionada',
      rating: 5,
      date: 'Hace 1 semana',
      title: 'Frasco joya y acordes ultra refinados',
      comment: `El diseño de la botella es una obra de arte escultórica. El balance entre las notas de salida y el corazón demuestra la maestría de la casa. Totalmente recomendado.`,
    },
    {
      author: 'David M. · Cliente Frecuente',
      rating: 4,
      date: 'Hace 2 semanas',
      title: 'Elegancia pura para ocasiones especiales',
      comment: `Muy buena estela sin ser agobiante. Perfecta para ${fragrance.timeOfDay.toLowerCase()} y climas de ${fragrance.season.join(' o ')}.`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#131318] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar ficha de producto"
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Gallery & Bottle Showcase (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#181822] via-[#0E0E14] to-[#0B0B0E] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative">
            <div className="relative">
              <span
                className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded backdrop-blur-md ${
                  isJPG
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                }`}
              >
                {fragrance.brand}
              </span>

              <div className="mt-4 aspect-[4/5] rounded-xl overflow-hidden bg-black/50 border border-white/5 relative group">
                <img
                  src={fragrance.image}
                  alt={fragrance.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottle design narrative */}
              <div className="mt-4 p-3.5 bg-black/40 rounded-lg border border-white/5 text-xs text-slate-300">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-mono">
                  Concepto del Frasco:
                </span>
                <p className="italic leading-relaxed">{fragrance.bottleConcept}</p>
              </div>
            </div>

            {/* Trust markers */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Original con Batch Code verificable</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Envío asegurado en caja premium blindada</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                <span>Muestra gratis incluida para prueba antes de abrir</span>
              </div>
            </div>
          </div>

          {/* Right Column: PDP Info, Olfactory Pyramid & Purchase Module (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>{fragrance.concentration} · Lanzamiento {fragrance.year}</span>
                <div className="flex items-center gap-1 font-mono text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{fragrance.rating.toFixed(1)}</span>
                  <span className="text-slate-500">({fragrance.reviewsCount})</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                {fragrance.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 italic">
                "{fragrance.subtitle}"
              </p>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                {fragrance.description}
              </p>
            </div>

            {/* VISUAL OLFACTORY PYRAMID (Salida, Corazón, Fondo) */}
            <div className="bg-[#0B0B0E] p-4 sm:p-5 rounded-xl border border-white/5 space-y-3">
              <h3 className="text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center justify-between">
                <span>Pirámide Olfativa Tridimensional</span>
                <span className="text-[10px] text-slate-500 font-normal font-mono">Evolución en piel</span>
              </h3>

              {/* Salida */}
              <div className="p-3 bg-gradient-to-r from-white/5 to-transparent rounded border border-white/5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-rose-300">
                    1. Notas de Salida (0 a 15 min)
                  </span>
                  <span className="text-[10px] text-slate-400">Lo primero que se huele</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {fragrance.pyramid.top.map((note) => (
                    <span
                      key={note}
                      className="text-xs text-slate-200 bg-white/5 px-2 py-0.5 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corazón */}
              <div className="p-3 bg-gradient-to-r from-white/5 to-transparent rounded border border-white/5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-amber-300">
                    2. Notas de Corazón (15 min a 4 horas)
                  </span>
                  <span className="text-[10px] text-slate-400">El alma del perfume</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {fragrance.pyramid.heart.map((note) => (
                    <span
                      key={note}
                      className="text-xs text-slate-200 bg-white/5 px-2 py-0.5 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fondo */}
              <div className="p-3 bg-gradient-to-r from-white/5 to-transparent rounded border border-white/5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-emerald-300">
                    3. Notas de Fondo (4 a 12+ horas)
                  </span>
                  <span className="text-[10px] text-slate-400">Lo que perdura en piel</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {fragrance.pyramid.base.map((note) => (
                    <span
                      key={note}
                      className="text-xs text-slate-200 bg-white/5 px-2 py-0.5 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* GUÍA VISUAL DE USO & RENDIMIENTO */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              
              {/* Estación */}
              <div className="bg-[#0B0B0E] p-3 rounded-lg border border-white/5">
                <ThermometerSnowflake className="w-4 h-4 mx-auto text-blue-400 mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block">Estación</span>
                <span className="text-xs text-slate-200 font-medium block truncate">
                  {fragrance.season.join(', ')}
                </span>
              </div>

              {/* Momento */}
              <div className="bg-[#0B0B0E] p-3 rounded-lg border border-white/5">
                {fragrance.timeOfDay === 'Noche' ? (
                  <Moon className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                ) : (
                  <Sun className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                )}
                <span className="text-[10px] text-slate-500 uppercase block">Horario</span>
                <span className="text-xs text-slate-200 font-medium block">
                  {fragrance.timeOfDay}
                </span>
              </div>

              {/* Fijación */}
              <div className="bg-[#0B0B0E] p-3 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 mx-auto text-rose-400 mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block">Duración</span>
                <span className="text-xs text-slate-200 font-medium font-mono block">
                  {fragrance.performance.longevityHours} Horas
                </span>
              </div>

              {/* Estela */}
              <div className="bg-[#0B0B0E] p-3 rounded-lg border border-white/5">
                <Wind className="w-4 h-4 mx-auto text-purple-400 mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block">Proyección</span>
                <span className="text-xs text-slate-200 font-medium block truncate">
                  {fragrance.performance.sillage}
                </span>
              </div>

            </div>

            {/* Size Selector */}
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                Selecciona tamaño de frasco:
              </span>
              <div className="flex gap-3">
                {fragrance.sizes.map((s, idx) => (
                  <button
                    key={s.ml}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedSizeIndex === idx
                        ? 'bg-white/15 border-amber-400 text-white shadow-sm'
                        : 'bg-[#0B0B0E] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{s.ml} ml</span>
                    <span className="block text-[11px] font-mono text-slate-300">
                      ${s.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CONTIGUOUS PURCHASE MODULE */}
            <div className="p-4 bg-[#0B0B0E] rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/10 rounded bg-[#131318]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-mono text-xs text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Total</span>
                  <span className="font-mono text-xl text-white font-semibold tabular-nums">
                    ${(currentPrice * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onCompare(fragrance)}
                  className="py-3 px-3 text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  <span className="hidden sm:inline">Duelo</span>
                </button>
                <button
                  onClick={handleAdd}
                  className={`flex-1 sm:flex-initial py-3 px-6 text-xs uppercase tracking-wider font-semibold rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : isJPG
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Añadido a la Bolsa!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Añadir a la Bolsa</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CUSTOMER REVIEWS */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">
                Reseñas de Aficionados & Críticos ({fragrance.reviewsCount})
              </h4>
              <div className="space-y-3">
                {mockReviews.map((r, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded border border-white/5 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 font-medium">{r.author}</span>
                      <div className="flex text-amber-400">
                        {Array.from({ length: r.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="font-semibold text-white mt-1">{r.title}</p>
                    <p className="text-slate-400 mt-1 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
