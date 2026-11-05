import React, { useState } from 'react';
import { Fragrance } from '../types';
import { Sparkles, X, ArrowRight, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';

interface PerfumeQuizModalProps {
  fragrances: Fragrance[];
  isOpen: boolean;
  onClose: () => void;
  onOpenProduct: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
}

export const PerfumeQuizModal: React.FC<PerfumeQuizModalProps> = ({
  fragrances,
  isOpen,
  onClose,
  onOpenProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<string>('');
  const [season, setSeason] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');

  const handleReset = () => {
    setStep(1);
    setOccasion('');
    setSeason('');
    setVibe('');
  };

  // Calculate recommendation based on answers
  const calculateResult = (): { fragrance: Fragrance; matchScore: number; reason: string } => {
    let bestMatch = fragrances[0];
    let highestScore = 0;
    let matchReason = '';

    for (const f of fragrances) {
      let score = 70; // baseline

      if (occasion === 'citas' && f.timeOfDay === 'Noche') score += 15;
      if (occasion === 'oficina' && (f.name.includes('Bottled') || f.name.includes('Alive'))) score += 20;
      if (occasion === 'fiesta' && (f.name.includes('Ultra Male') || f.name.includes('Elixir'))) score += 25;
      if (occasion === 'diario' && (f.name.includes('Hugo Man') || f.name.includes('Le Beau'))) score += 20;

      if (season === 'frio' && f.season.includes('Invierno')) score += 10;
      if (season === 'calor' && f.season.includes('Verano')) score += 10;
      if (season === 'templado' && f.season.includes('Primavera')) score += 10;

      if (vibe === 'dulce' && f.olfactoryFamily === 'Oriental Gourmand') score += 15;
      if (vibe === 'elegante' && f.olfactoryFamily === 'Amaderado Especiado') score += 15;
      if (vibe === 'fresco' && (f.olfactoryFamily === 'Aromático Fougère' || f.olfactoryFamily === 'Cítrico Verde')) score += 15;
      if (vibe === 'sensual' && f.olfactoryFamily === 'Floral Sensual') score += 15;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = f;
      }
    }

    // Compose reason
    if (vibe === 'dulce') {
      matchReason = `Su fondo gourmand enriquecido con ${bestMatch.dominantNotes[0]} y ${bestMatch.dominantNotes[1]} ofrece la proyección dulce y envolvente que buscas.`;
    } else if (vibe === 'elegante') {
      matchReason = `La sobria arquitectura de maderas nobles y especias cálidas proyecta la distinción sastre ideal para tu perfil.`;
    } else if (vibe === 'fresco') {
      matchReason = `El vigor limpio y la frescura de sus notas de salida aportan vitalidad durante todo el día sin saturar.`;
    } else {
      matchReason = `Un equilibrio extraordinario entre longevidad (${bestMatch.performance.longevityHours} horas) y magnetismo olfativo.`;
    }

    const cappedScore = Math.min(99, highestScore);
    return { fragrance: bestMatch, matchScore: cappedScore, reason: matchReason };
  };

  const result = step === 4 ? calculateResult() : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#131318] border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar recomendador"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono">
              Recomendador Olfativo Inteligente
            </span>
            <h3 className="font-serif text-lg text-white font-medium">
              Encuentra tu Perfume Firma
            </h3>
          </div>
        </div>

        {/* STEP 1: Ocasión */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">Paso 1 de 3</div>
            <h4 className="text-sm font-semibold text-white">
              ¿Cuál será la ocasión primordial para usar este perfume?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'citas', label: 'Citas & Noches Íntimas', desc: 'Seducción, calidez y cercanía' },
                { id: 'oficina', label: 'Oficina & Negocios', desc: 'Presencia sastre y confianza' },
                { id: 'fiesta', label: 'Fiestas & Eventos Nocturnos', desc: 'Proyección colosal y cumplidos' },
                { id: 'diario', label: 'Uso Diario & Casual', desc: 'Comodidad, dinamismo y frescura' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setOccasion(item.id);
                    setStep(2);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    occasion === item.id
                      ? 'bg-amber-950/40 border-amber-400 text-white'
                      : 'bg-[#0B0B0E] border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <span className="block text-xs font-semibold text-white">{item.label}</span>
                  <span className="block text-[11px] text-slate-400 mt-1">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Clima / Estación */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">Paso 2 de 3</div>
            <h4 className="text-sm font-semibold text-white">
              ¿En qué clima o temporada planeas lucirlo con mayor frecuencia?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'frio', label: 'Frío / Invierno', desc: 'Notas densas, maderas y resinas' },
                { id: 'templado', label: 'Templado / Primavera', desc: 'Equilibrio de flores y especias' },
                { id: 'calor', label: 'Cálido / Verano', desc: 'Cítricos, coco y menta vibrante' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSeason(item.id);
                    setStep(3);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    season === item.id
                      ? 'bg-amber-950/40 border-amber-400 text-white'
                      : 'bg-[#0B0B0E] border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <span className="block text-xs font-semibold text-white">{item.label}</span>
                  <span className="block text-[11px] text-slate-400 mt-1">{item.desc}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* STEP 3: Sensación y Vibra */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">Paso 3 de 3</div>
            <h4 className="text-sm font-semibold text-white">
              ¿Qué personalidad o estela deseas proyectar en quienes te rodean?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'dulce', label: 'Gourmand & Dulce', desc: 'Vainilla, miel dorada y tonka' },
                { id: 'elegante', label: 'Sastre & Aristocrático', desc: 'Incienso, maderas y cardamomo' },
                { id: 'fresco', label: 'Limpio & Energético', desc: 'Manzana verde crujiente y lavanda' },
                { id: 'sensual', label: 'Afrodisíaco & Magnético', desc: 'Flor de azahar y fruta Maninka' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setVibe(item.id);
                    setStep(4);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    vibe === item.id
                      ? 'bg-amber-950/40 border-amber-400 text-white'
                      : 'bg-[#0B0B0E] border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <span className="block text-xs font-semibold text-white">{item.label}</span>
                  <span className="block text-[11px] text-slate-400 mt-1">{item.desc}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* STEP 4: RESULTADO */}
        {step === 4 && result && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent rounded-xl border border-amber-500/20 text-center">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono">
                Coincidencia Olfativa del {result.matchScore}%
              </span>
              <h4 className="font-serif text-2xl text-white mt-1">
                {result.fragrance.name}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {result.fragrance.brand} · {result.fragrance.concentration}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 bg-[#0B0B0E] p-4 rounded-xl border border-white/5">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                <img
                  src={result.fragrance.image}
                  alt={result.fragrance.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-xs space-y-1.5 text-slate-300">
                <p className="leading-relaxed">
                  <strong className="text-amber-300">¿Por qué es para ti?</strong> {result.reason}
                </p>
                <p className="text-slate-400">
                  <strong className="text-slate-200">Notas clave:</strong> {result.fragrance.dominantNotes.join(' · ')}
                </p>
                <p className="text-slate-400">
                  <strong className="text-slate-200">Fijación estimada:</strong> {result.fragrance.performance.longevityHours} horas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="py-2.5 px-3 text-xs uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenProduct(result.fragrance);
                }}
                className="flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Pirámide 3D</span>
              </button>
              <button
                onClick={() => {
                  onAddToCart(result.fragrance);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Añadir (${result.fragrance.price})</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
