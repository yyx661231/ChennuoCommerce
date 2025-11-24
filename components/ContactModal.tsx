import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, QrCode, Type } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'qr' | 'id'>('qr'); // Default to QR mode
  const wechatId = "cn2618ovo";
  const avatarUrl = "https://i.postimg.cc/LsW-P0pFd/93c2b971e48bcaab61232eb4d9ac3ba2.jpg";
  const qrCodeUrl = "https://i.ibb.co/XZzdL7Bt/dcde27d3-a25d-4c35-8c01-b47194d2177a.png";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#0f172a] border border-purple-500/30 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative transform transition-all scale-100 flex flex-col">
        {/* Close Button - High Z-Index */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
        >
          <X size={24} />
        </button>
        
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none"></div>
        
        <div className="p-6 md:p-8 flex flex-col items-center text-center relative z-10">
          <div className="w-14 h-14 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-4 border border-green-500/30 shadow-lg shadow-green-900/20">
            <MessageCircle className="w-7 h-7 text-green-400" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">添加微信咨询</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            对接晨诺核心团队<br/>开启您的电商搞钱之路
          </p>

          {/* Toggle Switch */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10 mb-6 w-full">
            <button
              onClick={() => setMode('qr')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'qr' 
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <QrCode size={16} /> 扫码添加
            </button>
            <button
              onClick={() => setMode('id')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'id' 
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/10' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Type size={16} /> 搜微信号
            </button>
          </div>
          
          {/* Content Area */}
          <div className="min-h-[280px] w-full flex flex-col items-center justify-start">
            {mode === 'qr' ? (
              <div className="bg-white p-4 rounded-xl mb-2 shadow-lg w-full max-w-[240px] animate-fade-in mx-auto">
                  <div className="flex items-center gap-3 mb-3 border-b border-gray-100 pb-3">
                      <img 
                        src={avatarUrl} 
                        alt="Avatar" 
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                        decoding="async"
                      />
                      <div className="text-left">
                          <div className="text-slate-900 font-bold text-sm">晨诺电商</div>
                          <div className="text-slate-500 text-xs">晨诺本人</div>
                      </div>
                  </div>
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="w-full h-auto rounded-lg" 
                    decoding="async"
                    loading="eager"
                  />
                  <div className="text-slate-400 text-xs mt-2 font-medium">使用微信扫一扫</div>
              </div>
            ) : (
              <div className="w-full animate-fade-in mt-4">
                 <div className="bg-slate-900/80 rounded-xl p-5 border border-white/10 mb-6 relative group hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-left">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">微信号 WeChat ID</p>
                      <span className="text-lg font-mono font-bold text-white select-all tracking-wide">{wechatId}</span>
                    </div>
                    <button 
                      onClick={handleCopy}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white group-hover:bg-purple-500/20 group-hover:text-purple-300"
                      title="复制微信号"
                    >
                      {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-left">
                    <p className="text-blue-200 text-xs leading-relaxed mb-2">💡 <span className="font-bold">操作指引：</span></p>
                    <ol className="list-decimal list-inside text-gray-400 text-xs space-y-1 ml-1">
                        <li>点击右侧按钮复制微信号</li>
                        <li>打开微信，点击右上角 "+" 号</li>
                        <li>选择 "添加朋友"</li>
                        <li>粘贴微信号并搜索</li>
                    </ol>
                </div>
              </div>
            )}
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-medium mt-4 w-full justify-center">
            <span>⚠️ 添加时请备注：</span>
            <span className="font-bold text-white bg-orange-500/20 px-1 rounded">来意</span>
          </div>

          <button 
            onClick={onClose}
            className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;