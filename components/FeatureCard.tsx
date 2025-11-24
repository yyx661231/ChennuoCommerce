import React from 'react';
import { Feature } from '../types';
import { CheckCircle, Gem } from 'lucide-react';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <div className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-purple-500/50 hover:via-indigo-500/50 hover:to-purple-900/50 transition-all duration-500 h-full">
      <div className="h-full bg-[#0a0f1c] backdrop-blur-xl rounded-[23px] p-6 sm:p-8 flex flex-col relative overflow-hidden">
        
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/10 transition-colors duration-500"></div>

        {/* Header Section */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-300">
            <div className="text-purple-400 group-hover:text-white transition-colors">
              {feature.icon}
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center gap-1">
            <Gem size={12} />
            {feature.priceValue}
          </div>
        </div>
        
        <div className="mb-8 relative z-10">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all">
            {feature.title}
          </h3>
          <p className="text-purple-400 font-medium text-sm mb-3 tracking-wide uppercase">
            {feature.subtitle}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-purple-500/30 pl-3">
            {feature.description}
          </p>
        </div>
        
        {/* Details List */}
        <div className="space-y-5 mt-auto relative z-10">
          {feature.details.map((detail, idx) => (
            <div key={idx} className="group/item">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5 group-hover/item:text-green-400 transition-colors" />
                <div>
                  <span className="block text-white font-semibold text-sm mb-1">
                    {detail.label}
                  </span>
                  <span className="block text-slate-400 text-xs leading-relaxed">
                    {detail.text}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;