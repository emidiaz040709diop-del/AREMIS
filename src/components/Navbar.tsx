import React from 'react';
import { ShoppingBag, Sparkles, Scale, Compass, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenQuiz,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0B0B0E]/95 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-medium text-white uppercase whitespace-nowrap shrink-0 group-hover:text-amber-400 transition-colors">
            Duelo de Titanes
          </span>
          <span className="block text-[10px] tracking-[0.3em] uppercase text-slate-500 font-sans">
            JPG · Hugo Boss
          </span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-widest font-medium">
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'home'
                ? 'text-white border-b border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('duelo')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentView === 'duelo'
                ? 'text-white border-b border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            El Duelo
          </button>
          <button
            onClick={() => onNavigate('jpg')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'jpg'
                ? 'text-rose-400 border-b border-rose-400'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            Jean Paul Gaultier
          </button>
          <button
            onClick={() => onNavigate('boss')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'boss'
                ? 'text-amber-400 border-b border-amber-400'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            Hugo Boss
          </button>
          <button
            onClick={() => onNavigate('familias')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentView === 'familias'
                ? 'text-white border-b border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            Familias Olfativas
          </button>
          <button
            onClick={() => onNavigate('editorial')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              currentView === 'editorial'
                ? 'text-white border-b border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Diario Olfativo
          </button>
        </nav>

        {/* Zone 3: Primary Action (Recomendador) & Shopping Bag */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="px-3.5 sm:px-4 py-2 text-xs font-semibold tracking-wider uppercase text-slate-900 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all rounded shadow-md whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span className="hidden sm:inline">Recomendador</span>
            <span className="sm:hidden">Quiz</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Abrir bolsa de compras"
            className="relative p-2.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Sub-bar for mobile navigation */}
      <div className="lg:hidden border-t border-white/5 bg-[#0E0E14] px-4 py-2 flex items-center justify-between text-[11px] uppercase tracking-wider overflow-x-auto gap-4">
        <button
          onClick={() => onNavigate('home')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'home' ? 'text-amber-400' : 'text-slate-400'}`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate('duelo')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'duelo' ? 'text-amber-400' : 'text-slate-400'}`}
        >
          Duelo
        </button>
        <button
          onClick={() => onNavigate('jpg')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'jpg' ? 'text-rose-400' : 'text-slate-400'}`}
        >
          Gaultier
        </button>
        <button
          onClick={() => onNavigate('boss')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'boss' ? 'text-amber-400' : 'text-slate-400'}`}
        >
          Hugo Boss
        </button>
        <button
          onClick={() => onNavigate('familias')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'familias' ? 'text-white' : 'text-slate-400'}`}
        >
          Familias
        </button>
        <button
          onClick={() => onNavigate('editorial')}
          className={`whitespace-nowrap shrink-0 ${currentView === 'editorial' ? 'text-white' : 'text-slate-400'}`}
        >
          Diario
        </button>
      </div>
    </header>
  );
};
