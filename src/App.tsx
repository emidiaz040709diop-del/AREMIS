/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FRAGRANCES, ARTICLES } from './data/fragrances';
import { Fragrance, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroDuel } from './components/HeroDuel';
import { DuelComparator } from './components/DuelComparator';
import { BestSellersGrid } from './components/BestSellersGrid';
import { OlfactoryFamilyExplorer } from './components/OlfactoryFamilyExplorer';
import { BrandCollectionJPG } from './components/BrandCollectionJPG';
import { BrandCollectionBoss } from './components/BrandCollectionBoss';
import { DiarioOlfativo } from './components/DiarioOlfativo';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PerfumeQuizModal } from './components/PerfumeQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('duelo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Fragrance | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('duelo_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart operations
  const handleAddToCart = (fragrance: Fragrance, selectedSize?: number, quantity: number = 1) => {
    const size = selectedSize || fragrance.sizes[0].ml;
    const price = fragrance.sizes.find((s) => s.ml === size)?.price || fragrance.price;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.fragrance.id === fragrance.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { fragrance, selectedSize: size, price, quantity }];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (fragranceId: string, selectedSize: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.fragrance.id === fragranceId && item.selectedSize === selectedSize) {
            const nextQuantity = item.quantity + delta;
            return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (fragranceId: string, selectedSize: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.fragrance.id === fragranceId && item.selectedSize === selectedSize)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Comparator jump
  const handleCompare = (fragrance: Fragrance) => {
    setCurrentView('duelo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-slate-100 flex flex-col font-sans">
      
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroDuel
              onSelectBrand={(brand) => {
                setCurrentView(brand);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartDuel={() => {
                const duelElem = document.getElementById('duelo-section');
                if (duelElem) {
                  duelElem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setCurrentView('duelo');
                }
              }}
              onExploreNotes={() => {
                const famElem = document.getElementById('familias-section');
                if (famElem) {
                  famElem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setCurrentView('familias');
                }
              }}
            />

            <DuelComparator
              fragrances={FRAGRANCES}
              onOpenProduct={(f) => setSelectedProduct(f)}
              onAddToCart={(f) => handleAddToCart(f)}
            />

            <BestSellersGrid
              fragrances={FRAGRANCES}
              onOpenProduct={(f) => setSelectedProduct(f)}
              onAddToCart={(f) => handleAddToCart(f)}
              onCompare={handleCompare}
            />

            <OlfactoryFamilyExplorer
              fragrances={FRAGRANCES}
              onOpenProduct={(f) => setSelectedProduct(f)}
              onAddToCart={(f) => handleAddToCart(f)}
            />

            <DiarioOlfativo articles={ARTICLES} />
          </>
        )}

        {currentView === 'duelo' && (
          <div className="pt-6">
            <DuelComparator
              fragrances={FRAGRANCES}
              onOpenProduct={(f) => setSelectedProduct(f)}
              onAddToCart={(f) => handleAddToCart(f)}
            />
            <div className="border-t border-white/10">
              <BestSellersGrid
                fragrances={FRAGRANCES}
                onOpenProduct={(f) => setSelectedProduct(f)}
                onAddToCart={(f) => handleAddToCart(f)}
                onCompare={handleCompare}
              />
            </div>
          </div>
        )}

        {currentView === 'jpg' && (
          <BrandCollectionJPG
            fragrances={FRAGRANCES}
            onOpenProduct={(f) => setSelectedProduct(f)}
            onAddToCart={(f) => handleAddToCart(f)}
            onCompare={handleCompare}
          />
        )}

        {currentView === 'boss' && (
          <BrandCollectionBoss
            fragrances={FRAGRANCES}
            onOpenProduct={(f) => setSelectedProduct(f)}
            onAddToCart={(f) => handleAddToCart(f)}
            onCompare={handleCompare}
          />
        )}

        {currentView === 'familias' && (
          <div className="pt-6">
            <OlfactoryFamilyExplorer
              fragrances={FRAGRANCES}
              onOpenProduct={(f) => setSelectedProduct(f)}
              onAddToCart={(f) => handleAddToCart(f)}
            />
          </div>
        )}

        {currentView === 'editorial' && (
          <div className="pt-6">
            <DiarioOlfativo articles={ARTICLES} />
          </div>
        )}
      </main>

      {/* Luxury Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Product Detail Modal (PDP) with 3-tier Olfactory Pyramid */}
      <ProductDetailModal
        fragrance={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(fragrance, selectedSize, quantity) =>
          handleAddToCart(fragrance, selectedSize, quantity)
        }
        onCompare={(fragrance) => {
          setSelectedProduct(null);
          handleCompare(fragrance);
        }}
      />

      {/* Interactive 3-Step Recommendation Quiz Modal */}
      <PerfumeQuizModal
        fragrances={FRAGRANCES}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onOpenProduct={(fragrance) => setSelectedProduct(fragrance)}
        onAddToCart={(fragrance) => handleAddToCart(fragrance)}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
