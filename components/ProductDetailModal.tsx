import React, { useEffect } from 'react';
import { X, CheckCircle, Tag, Box } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-[#0f172a] border border-purple-500/30 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 transform transition-all scale-100 flex flex-col max-h-[85vh]">
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10"></div>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-all border border-white/10"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-0 left-0 p-6 z-20">
            <div className="flex items-center gap-2 mb-2">
               <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs rounded-full font-bold flex items-center gap-1 backdrop-blur-sm">
                 {product.icon} {product.category}
               </span>
               <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs rounded-full font-bold backdrop-blur-sm">
                 {product.priceTag}
               </span>
            </div>
            <h2 className="text-3xl font-bold text-white shadow-sm">{product.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
           <div className="mb-6">
             <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3 flex items-center gap-2">
               <Box size={14} /> 包含货源清单
             </h3>
             
             {product.detailedProducts && product.detailedProducts.length > 0 ? (
               <div className="grid gap-3">
                 {product.detailedProducts.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-colors group">
                     <CheckCircle className="text-green-400 w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                     <span className="text-slate-200 font-medium text-sm md:text-base">{item}</span>
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-gray-400 text-sm">暂无详细清单，请咨询客服获取最新货盘表。</p>
             )}
           </div>
           
           <div className="mb-6">
             <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3 flex items-center gap-2">
               <Tag size={14} /> 热门标签
             </h3>
             <div className="flex flex-wrap gap-2">
               {product.tags.map((tag, idx) => (
                 <span key={idx} className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-300 text-sm">
                   #{tag}
                 </span>
               ))}
             </div>
           </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all active:scale-95"
          >
            了解更多详情
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
