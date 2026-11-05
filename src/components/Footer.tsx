import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuiz }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#070709] border-t border-white/10 text-slate-400">
      
      {/* Newsletter VIP Banner */}
      <div className="border-b border-white/5 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400 font-semibold block mb-1">
              Círculo Privado de Coleccionistas
            </span>
            <h4 className="font-serif text-2xl text-white font-medium">
              Recibe 10% de Descuento en tu Primer Frasco
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Accede a lanzamientos anticipados de Elixires, análisis de lotes de reformulación y muestras exclusivas.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Suscrito con éxito! Tu código es: <strong className="font-mono text-white text-sm">TITANES10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-80">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico..."
                    className="w-full bg-[#131318] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Suscribir
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <span className="font-serif text-2xl tracking-[0.2em] font-medium text-white uppercase block">
            Duelo de Titanes
          </span>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Plataforma editorial independiente consagrada al análisis, comparación y adquisición de fragancias insignia de Jean Paul Gaultier y Hugo Boss.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
            <span>París · Metzingen · Madrid</span>
          </div>
        </div>

        {/* Column 2: Jean Paul Gaultier (2 cols) */}
        <div className="md:col-span-2 space-y-3 text-xs">
          <h5 className="uppercase tracking-widest text-rose-400 font-semibold font-mono text-[11px]">
            Jean Paul Gaultier
          </h5>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('jpg')} className="hover:text-white transition-colors cursor-pointer">
                Le Male Elixir
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('jpg')} className="hover:text-white transition-colors cursor-pointer">
                Ultra Male Intense
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('jpg')} className="hover:text-white transition-colors cursor-pointer">
                Scandal Pour Homme
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('jpg')} className="hover:text-white transition-colors cursor-pointer">
                La Belle Le Parfum
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Hugo Boss (2 cols) */}
        <div className="md:col-span-2 space-y-3 text-xs">
          <h5 className="uppercase tracking-widest text-amber-400 font-semibold font-mono text-[11px]">
            Hugo Boss
          </h5>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('boss')} className="hover:text-white transition-colors cursor-pointer">
                Boss Bottled Elixir
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('boss')} className="hover:text-white transition-colors cursor-pointer">
                Boss Bottled EDP
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('boss')} className="hover:text-white transition-colors cursor-pointer">
                The Scent Magnetic
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('boss')} className="hover:text-white transition-colors cursor-pointer">
                Hugo Man Cantimplora
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Navegación & Ayuda (3 cols) */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <h5 className="uppercase tracking-widest text-white font-semibold font-mono text-[11px]">
            Experiencia & Guías
          </h5>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('duelo')} className="hover:text-white transition-colors cursor-pointer">
                El Duelo Lado a Lado
              </button>
            </li>
            <li>
              <button onClick={onOpenQuiz} className="hover:text-white transition-colors cursor-pointer text-amber-300 font-medium">
                Test del Perfume Firma
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('familias')} className="hover:text-white transition-colors cursor-pointer">
                Buscador de Familias Olfativas
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('editorial')} className="hover:text-white transition-colors cursor-pointer">
                Diario Olfativo & Reseñas
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="py-6 px-4 sm:px-6 border-t border-white/5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Duelo de Titanes · Perfumería de Autor. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Aviso de Privacidad</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Garantía de Origen</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Envíos Internacionales</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
