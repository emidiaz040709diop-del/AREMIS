import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Check, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (fragranceId: string, selectedSize: number, delta: number) => void;
  onRemoveItem: (fragranceId: string, selectedSize: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');

  // Checkout form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * promoDiscountRate : 0;
  const shipping = subtotal >= 120 || items.length === 0 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  const freeShippingThreshold = 120;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'TITANES10' || code === 'DUELO10' || code === 'WELCOME10') {
      setPromoApplied(true);
      setPromoDiscountRate(0.1);
    } else {
      alert('Código no válido. Prueba usando TITANES10 para tu 10% de bienvenida.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) return;
    setCheckoutStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-[#0F0F14] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl relative">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg text-white font-medium">
              Bolsa de Perfumería
            </h3>
            <span className="text-xs font-mono text-slate-400">
              ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar bolsa"
            className="p-1.5 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="px-6 py-3 bg-[#14141C] border-b border-white/5 text-xs">
          {subtotal >= freeShippingThreshold ? (
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>¡Calificas para Envío Express Asegurado Gratis!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Agrega ${(freeShippingThreshold - subtotal).toFixed(2)} más para envío gratis</span>
                <span className="font-mono">{freeShippingProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
                  <p className="text-sm">Tu bolsa de alta perfumería está vacía.</p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 text-xs uppercase tracking-wider text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    Explorar Colecciones →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const isJPG = item.fragrance.brand === 'Jean Paul Gaultier';

                    return (
                      <div
                        key={`${item.fragrance.id}-${item.selectedSize}`}
                        className="bg-[#14141C] p-3.5 rounded-xl border border-white/5 flex gap-4 items-center"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-white/5">
                          <img
                            src={item.fragrance.image}
                            alt={item.fragrance.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-[9px] uppercase tracking-wider font-semibold ${
                              isJPG ? 'text-rose-400' : 'text-amber-400'
                            }`}
                          >
                            {item.fragrance.brand}
                          </span>
                          <h4 className="font-serif text-sm text-white truncate font-medium">
                            {item.fragrance.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 block font-mono">
                            {item.selectedSize} ml · ${item.price.toFixed(2)} c/u
                          </span>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border border-white/10 rounded bg-black/40 text-xs">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.fragrance.id, item.selectedSize, -1)
                                }
                                className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2.5 py-0.5 text-white font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.fragrance.id, item.selectedSize, 1)
                                }
                                className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                onRemoveItem(item.fragrance.id, item.selectedSize)
                              }
                              className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                              title="Eliminar de la bolsa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'shipping' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="text-xs text-amber-400 uppercase tracking-widest font-mono">
                Datos de Envío & Facturación
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Nombre completo</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. Gabriel Moreau"
                  className="w-full bg-[#14141C] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Correo electrónico</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-[#14141C] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Dirección de entrega</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Calle, número, piso"
                  className="w-full bg-[#14141C] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Ciudad y Código Postal</label>
                <input
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ciudad, C.P."
                  className="w-full bg-[#14141C] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors shadow-lg cursor-pointer"
              >
                Confirmar y Finalizar Pedido (${total.toFixed(2)})
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 pt-2 cursor-pointer"
              >
                ← Volver a la bolsa
              </button>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-12 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-white font-medium">
                ¡Pedido #TITAN-2026 Confirmado!
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Hemos recibido tu solicitud para <strong className="text-white">{formData.name || 'Cliente Distinguido'}</strong>. Tu frasco de autor está siendo preparado con estuche blindado y muestras de cortesía.
              </p>
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
              >
                Seguir Explorando
              </button>
            </div>
          )}

        </div>

        {/* Footer calculation & Voucher */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0B0B0E] space-y-4">
            
            {/* Promo code bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Cupón (ej. TITANES10)"
                  className="w-full bg-[#14141C] border border-white/10 rounded pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono uppercase"
                />
              </div>
              <button
                onClick={handleApplyPromo}
                className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded transition-colors cursor-pointer"
              >
                Aplicar
              </button>
            </div>

            {promoApplied && (
              <div className="text-[11px] text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>10% de descuento aplicado con éxito</span>
              </div>
            )}

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-amber-400">
                  <span>Descuento de Bienvenida (10%)</span>
                  <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-mono text-white tabular-nums">
                  {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between text-sm font-semibold text-white">
                <span>Total Estimado</span>
                <span className="font-mono text-lg text-amber-400 tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep('shipping')}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tramitar Pedido</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Garantía de Devolución & Autenticidad Certificada</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
