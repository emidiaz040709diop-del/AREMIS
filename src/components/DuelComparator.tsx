import React, { useState } from 'react';
import { Fragrance } from '../types';
import { Scale, Clock, Wind, Award, ArrowRight, Check, Sparkles, ShoppingBag, Eye } from 'lucide-react';

interface DuelComparatorProps {
  fragrances: Fragrance[];
  onOpenProduct: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance) => void;
}

export const DuelComparator: React.FC<DuelComparatorProps> = ({
  fragrances,
  onOpenProduct,
  onAddToCart,
}) => {
  const jpgFragrances = fragrances.filter((f) => f.brand === 'Jean Paul Gaultier');
  const bossFragrances = fragrances.filter((f) => f.brand === 'Hugo Boss');

  const [selectedJpgId, setSelectedJpgId] = useState<string>(jpgFragrances[0]?.id || '');
  const [selectedBossId, setSelectedBossId] = useState<string>(bossFragrances[0]?.id || '');

  const jpg = jpgFragrances.find((f) => f.id === selectedJpgId) || jpgFragrances[0];
  const boss = bossFragrances.find((f) => f.id === selectedBossId) || bossFragrances[0];

  if (!jpg || !boss) return null;

  // Analysis highlights
  const longevityDiff = jpg.performance.longevityHours - boss.performance.longevityHours;
  const winnerBadge =
    longevityDiff > 0
      ? `Mayor longevidad: ${jpg.name} (+${longevityDiff}h)`
      : longevityDiff < 0
      ? `Mayor longevidad: ${boss.name} (+${Math.abs(longevityDiff)}h)`
      : 'Empate en fijación técnica: 12 horas ambas';

  return (
    <section id="duelo-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-medium mb-2">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Laboratorio de Comparación Olfativa</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light text-balance">
          Duelo de Titanes: Cara a Cara
        </h2>
        <p className="text-sm text-slate-400 mt-3 leading-relaxed">
          Selecciona cualquier creación de Jean Paul Gaultier y enfréntala a la sastrería olfativa de Hugo Boss. Analiza pirámides, longevidad en piel y estela sin sesgos.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Selector JPG */}
        <div className="bg-[#131318] p-4 rounded-lg border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-rose-400 font-medium mb-1">
              Rincón Jean Paul Gaultier:
            </label>
            <select
              value={selectedJpgId}
              onChange={(e) => setSelectedJpgId(e.target.value)}
              className="bg-[#0B0B0E] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-400 w-full sm:w-64 cursor-pointer"
            >
              {jpgFragrances.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.concentration})
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {jpg.gender} · {jpg.olfactoryFamily}
          </span>
        </div>

        {/* Selector Hugo Boss */}
        <div className="bg-[#131318] p-4 rounded-lg border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-amber-400 font-medium mb-1">
              Rincón Hugo Boss:
            </label>
            <select
              value={selectedBossId}
              onChange={(e) => setSelectedBossId(e.target.value)}
              className="bg-[#0B0B0E] border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 w-full sm:w-64 cursor-pointer"
            >
              {bossFragrances.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.concentration})
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {boss.gender} · {boss.olfactoryFamily}
          </span>
        </div>

      </div>

      {/* Comparison Arena (Side by Side Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Contender 1: JPG */}
        <div className="bg-gradient-to-b from-[#180D1A] via-[#131318] to-[#0E0E14] border border-rose-500/30 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-rose-400 font-medium">
                  {jpg.brand}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  {jpg.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 italic">
                  "{jpg.subtitle}"
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl text-white font-semibold tabular-nums">
                  ${jpg.price.toFixed(2)}
                </span>
                <span className="block text-[10px] uppercase text-slate-500">
                  {jpg.concentration}
                </span>
              </div>
            </div>

            {/* Product Image Showcase */}
            <div className="my-6 aspect-[16/9] sm:aspect-[21/9] rounded-lg overflow-hidden bg-black/40 border border-white/5 relative flex items-center justify-center">
              <img
                src={jpg.image}
                alt={jpg.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] text-slate-300 font-mono">
                {jpg.bottleConcept}
              </div>
            </div>

            {/* Performance KPIs */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-black/30 rounded-lg border border-white/5 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                  <Clock className="w-3 h-3 text-rose-400" />
                  <span>Fijación</span>
                </div>
                <span className="font-mono text-sm text-white font-semibold">
                  {jpg.performance.longevityHours} Horas
                </span>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                  <Wind className="w-3 h-3 text-rose-400" />
                  <span>Estela</span>
                </div>
                <span className="text-xs text-white font-medium truncate block border border-white">
                  {jpg.performance.sillage}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                  <Award className="w-3 h-3 text-rose-400" />
                  <span>Versatilidad</span>
                </div>
                <span className="font-mono text-sm text-white font-semibold">
                  {jpg.performance.versatilityScore}/10
                </span>
              </div>
            </div>

            {/* Visual Olfactory Pyramid Breakdown */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
                <span>Pirámide Olfativa Desglosada</span>
              </h4>

              {/* Salida */}
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-rose-300 font-medium">Notas de Salida (0 - 15 min)</span>
                  <span className="text-[10px] text-slate-500">Primer impacto</span>
                </div>
                <p className="text-xs text-slate-200">
                  {jpg.pyramid.top.join(' · ')}
                </p>
              </div>

              {/* Corazón */}
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-rose-300 font-medium">Notas de Corazón (15 min - 4h)</span>
                  <span className="text-[10px] text-slate-500">Personalidad & Estela</span>
                </div>
                <p className="text-xs text-slate-200">
                  {jpg.pyramid.heart.join(' · ')}
                </p>
              </div>

              {/* Fondo */}
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-rose-300 font-medium">Notas de Fondo (4h - 12h+)</span>
                  <span className="text-[10px] text-slate-500">Fijación en piel</span>
                </div>
                <p className="text-xs text-slate-200">
                  {jpg.pyramid.base.join(' · ')}
                </p>
              </div>
            </div>

            {/* Usage guidance */}
            <div className="flex items-center justify-between text-xs text-slate-400 py-3 border-t border-white/5">
              <span>Estación idónea: <strong className="text-white">{jpg.season.join(', ')}</strong></span>
              <span>Momento: <strong className="text-white">{jpg.timeOfDay}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={() => onOpenProduct(jpg)}
              className="flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Ficha 3D</span>
            </button>
            <button
              onClick={() => onAddToCart(jpg)}
              className="flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Añadir (${jpg.price})</span>
            </button>
          </div>
        </div>

        {/* Contender 2: Boss */}
        <div className="bg-gradient-to-b from-[#1C150A] via-[#131318] to-[#0E0E14] border border-amber-500/30 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                  {boss.brand}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  {boss.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 italic">
                  "{boss.subtitle}"
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl text-white font-semibold tabular-nums">
                  ${boss.price.toFixed(2)}
                </span>
                <span className="block text-[10px] uppercase text-slate-500">
                  {boss.concentration}
                </span>
              </div>
            </div>

            {/* Product Image Showcase */}
            <div className="my-6 aspect-[16/9] sm:aspect-[21/9] rounded-lg overflow-hidden bg-black/40 border border-white/5 relative flex items-center justify-center">
              <img
                src={boss.image}
                alt={boss.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] text-slate-300 font-mono">
                {boss.bottleConcept}
              </div>
            </div>

            {/* Performance KPIs */}
            <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-black/30 rounded-lg border border-white/5 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Fijación</span>
                </div>
                <span className="font-mono text-sm text-white font-semibold">
                  {boss.performance.longevityHours} Horas
                </span>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                  <Wind className="w-3 h-3 text-amber-400" />
                  <span>Estela</span>
                </div>
                <span className="text-xs text-white font-medium truncate block">
                  {boss.performance.sillage}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 mb-0.5">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>Versatilidad</span>
                </div>
                <span className="font-mono text-sm text-white font-semibold">
                  {boss.performance.versatilityScore}/10
                </span>
              </div>
            </div>

            {/* Visual Olfactory Pyramid Breakdown */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
                <span>Pirámide Olfativa Desglosada</span>
              </h4>

              {/* Salida */}
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-amber-300 font-medium">Notas de Salida (0 - 15 min)</span>
                  <span className="text-[10px] text-slate-500">Primer impacto</span>
                </div>
                <p className="text-xs text-slate-200">
                  {boss.pyramid.top.join(' · ')}
                </p>
              </div>

              {/* Corazón */}
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-amber-300 font-medium">Notas de Corazón (15 min - 4h)</span>
                  <span className="text-[10px] text-slate-500">Personalidad & Estela</span>
                </div>
                <p className="text-xs text-slate-200">
                  {boss.pyramid.heart.join(' · ')}
                </p>
              </div>

              {/* Fondo */}
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-amber-300 font-medium">Notas de Fondo (4h - 12h+)</span>
                  <span className="text-[10px] text-slate-500">Fijación en piel</span>
                </div>
                <p className="text-xs text-slate-200">
                  {boss.pyramid.base.join(' · ')}
                </p>
              </div>
            </div>

            {/* Usage guidance */}
            <div className="flex items-center justify-between text-xs text-slate-400 py-3 border-t border-white/5">
              <span>Estación idónea: <strong className="text-white">{boss.season.join(', ')}</strong></span>
              <span>Momento: <strong className="text-white">{boss.timeOfDay}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={() => onOpenProduct(boss)}
              className="flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Ficha 3D</span>
            </button>
            <button
              onClick={() => onAddToCart(boss)}
              className="flex-1 py-2.5 px-4 text-xs uppercase tracking-wider font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Añadir (${boss.price})</span>
            </button>
          </div>
        </div>

      </div>

      {/* Veredicto de Expertos Olfativos */}
      <div className="mt-10 p-6 bg-[#131318] border border-white/10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
              Veredicto del Panel de Perfumistas
            </span>
            <h4 className="font-serif text-lg text-white font-medium">
              {winnerBadge}
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Si buscas <strong className="text-rose-300">seducción teatral, notas dulces gourmand y proyección envolvente en fiestas o citas</strong>, {jpg.name} es insuperable. Si prefieres <strong className="text-amber-300">elegancia sastre, maderas nobles, pulcritud ejecutiva o misterio especiado</strong>, {boss.name} es la elección definitiva.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
