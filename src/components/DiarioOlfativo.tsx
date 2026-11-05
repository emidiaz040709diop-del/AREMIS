import React, { useState } from 'react';
import { Article } from '../types';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';

interface DiarioOlfativoProps {
  articles: Article[];
}

export const DiarioOlfativo: React.FC<DiarioOlfativoProps> = ({ articles }) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section id="editorial-section" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400 font-medium mb-1">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Enciclopedia & Crítica de Autor</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            El Diario Olfativo
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md">
            Ensayos sobre química aromática, historia del diseño de moda y guías de uso maestro para coleccionistas.
          </p>
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-[#131318] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              {/* Category & Read Time */}
              <div className="flex items-center justify-between text-[11px] mb-3">
                <span className={`font-semibold uppercase tracking-wider ${art.badgeColor}`}>
                  {art.category}
                </span>
                <span className="text-slate-500 font-mono">{art.readingTime}</span>
              </div>

              <h3
                onClick={() => setActiveArticle(art)}
                className="font-serif text-lg text-white font-medium group-hover:text-amber-400 transition-colors leading-snug cursor-pointer line-clamp-2"
              >
                {art.title}
              </h3>

              <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {art.author.split('·')[0]}
              </span>
              <button
                onClick={() => setActiveArticle(art)}
                className="text-xs uppercase tracking-wider text-slate-300 group-hover:text-amber-400 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Leer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#131318] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl my-6">
            
            <button
              onClick={() => setActiveArticle(null)}
              aria-label="Cerrar artículo"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-black/40 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
                <span>{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activeArticle.readingTime}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-tight">
                {activeArticle.title}
              </h3>

              <div className="mt-3 text-xs text-slate-400 flex items-center gap-2 font-mono pb-4 border-b border-white/10">
                <User className="w-3.5 h-3.5" />
                <span>{activeArticle.author}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
              </div>

              <div className="mt-6 space-y-4 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer transition-colors"
                >
                  Cerrar Artículo
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
