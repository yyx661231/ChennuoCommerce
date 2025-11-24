import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductItem } from '../types';
import ProductDetailModal from './ProductDetailModal';

interface ProductCarouselProps {
  items: ProductItem[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: any;
    if (isAutoPlaying && !selectedProduct) {
      interval = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, selectedProduct]);

  const getStyles = (index: number) => {
    // Handle wrap-around logic for "previous" and "next" visuals
    const total = items.length;
    
    // Check if it's the active item
    if (index === activeIndex) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'blur(0px) brightness(1.1)',
        visibility: 'visible'
      };
    }

    // Check if it's the previous item (handling wrap)
    const isPrev = index === (activeIndex - 1 + total) % total;
    if (isPrev) {
      return {
        transform: 'translateX(-60%) scale(0.8)',
        zIndex: 20,
        opacity: 0.6,
        filter: 'blur(1px) brightness(0.7)',
        visibility: 'visible',
        cursor: 'pointer'
      };
    }

    // Check if it's the next item (handling wrap)
    const isNext = index === (activeIndex + 1) % total;
    if (isNext) {
      return {
        transform: 'translateX(60%) scale(0.8)',
        zIndex: 20,
        opacity: 0.6,
        filter: 'blur(1px) brightness(0.7)',
        visibility: 'visible',
        cursor: 'pointer'
      };
    }

    // All others hidden behind
    return {
      transform: 'scale(0.5)',
      zIndex: 10,
      opacity: 0,
      visibility: 'hidden'
    };
  };

  const handleDetailsClick = (e: React.MouseEvent, item: ProductItem) => {
    e.stopPropagation();
    setSelectedProduct(item);
    setIsAutoPlaying(false);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsAutoPlaying(true);
  };

  return (
    <>
      <div 
        className="relative w-full max-w-5xl mx-auto h-[500px] flex items-center justify-center perspective-1000"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => !selectedProduct && setIsAutoPlaying(true)}
      >
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 md:left-4 z-40 p-3 rounded-full bg-slate-900/80 border border-white/10 text-white hover:bg-purple-600 transition-colors shadow-lg backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 md:right-4 z-40 p-3 rounded-full bg-slate-900/80 border border-white/10 text-white hover:bg-purple-600 transition-colors shadow-lg backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const styles = getStyles(index);
            const isActive = index === activeIndex;
            
            // Helper to click side items to navigate
            const handleItemClick = () => {
               const total = items.length;
               if (index === (activeIndex - 1 + total) % total) prevSlide();
               if (index === (activeIndex + 1) % total) nextSlide();
            };

            return (
              <div
                key={item.id}
                onClick={handleItemClick}
                className="absolute w-[300px] sm:w-[380px] md:w-[450px] transition-all duration-700 ease-out will-change-transform"
                style={styles as any}
              >
                <div className={`relative rounded-3xl overflow-hidden bg-slate-900 border ${isActive ? 'border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.3)]' : 'border-white/10 shadow-xl'} h-full flex flex-col`}>
                  
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                       <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                          {item.icon} {item.category}
                       </span>
                    </div>
                    {isActive && (
                      <div className="absolute top-4 right-4 z-20 animate-pulse">
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white shadow-lg">
                          {item.priceTag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col relative z-20">
                    <h3 className={`text-2xl font-bold text-white mb-2 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200' : ''}`}>
                      {item.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                       <span className="text-sm text-gray-500">库存充裕</span>
                       <button 
                         onClick={(e) => handleDetailsClick(e, item)}
                         className={`text-sm font-bold transition-colors ${isActive ? 'text-purple-400 hover:text-purple-300' : 'text-gray-500'}`}
                       >
                          查看详情 &rarr;
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-[-40px] flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default ProductCarousel;
