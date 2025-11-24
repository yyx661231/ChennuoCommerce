import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Target, 
  Box, 
  Cpu, 
  Gift, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Menu,
  X,
  Bot,
  CheckCircle,
  Sparkles,
  Briefcase,
  GraduationCap,
  Baby,
  Laptop,
  MapPin,
  Factory,
  Truck,
  Zap,
  Smartphone,
  Tv,
  Snowflake,
  Monitor
} from 'lucide-react';
import FeatureCard from './components/FeatureCard';
import AiChatModal from './components/AiChatModal';
import ContactModal from './components/ContactModal';
import ProductCarousel from './components/ProductCarousel';
import { Feature, ProductItem } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Custom smooth scroll handler to account for fixed header
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90; // Height of the fixed header + buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  // Full content from poster
  const features: Feature[] = [
    {
      id: 'mentorship',
      title: '一对一运营陪跑',
      subtitle: '时长8个月 · 深度赋能',
      priceValue: '价值 998元',
      description: '不仅仅是课程，而是从自然流到付费流打法的全套专业化运营思路。',
      icon: <Users size={28} />,
      details: [
        {
          label: '一条龙陪跑',
          text: '从选品 → 养号 → 起号 → 运营 → 销转 → 爆单，手把手带你跑通全流程。'
        },
        {
          label: '保驾护航',
          text: '定期审查店铺，调整账号大方向，全方位优化闲鱼店铺，拒绝盲目操作。'
        },
        {
          label: '一对一指导答疑',
          text: '运营老师全程陪跑，在线指导答疑，每天量身定制规划任务。'
        },
        {
          label: '大力扶持',
          text: '可扶持有能力的学员做店群矩阵、精品账号、私域团队工作室搭建。'
        }
      ]
    },
    {
      id: 'supply',
      title: '厂家货源 + 爆款选品',
      subtitle: '全网供应链头部 · 团队底价',
      priceValue: '价值 900元',
      description: '背靠闲鱼头部供应链，解决电商最核心的货源问题。',
      icon: <Box size={28} />,
      details: [
        {
          label: '货源优势',
          text: '全网家电供应链头部，团队学员直接享受全网最低拿货价。'
        },
        {
          label: '源头工厂直发',
          text: '浙江慈溪、江苏宿迁、河南商丘三地工厂直发，无中间商赚差价。'
        },
        {
          label: '售后保障',
          text: '全网供应链最优质售后服务，给学员做强有力的后盾保驾护航。'
        },
        {
           label: '爆款数据共享',
           text: '直接复刻团队验证过的爆款产品，无需囤货，轻资产创业。'
        }
      ]
    },
    {
      id: 'ai',
      title: '自研闲鱼 AI 大模型',
      subtitle: '全网首发 · 智能托管',
      priceValue: '价值 500元',
      description: '全网首发晨诺团队自主研发AI大模型——小橙子，你的24小时智能运营官。',
      icon: <Cpu size={28} />,
      details: [
        {
          label: 'AI 运营老师',
          text: '全天24小时在线，解决销售过程中一切疑难杂症，秒级响应。'
        },
        {
          label: '销售无忧',
          text: '根据团队后端货源，解决销售遇到的所有产品问题，并给出最优解。'
        },
        {
          label: '托管机制',
          text: '实现一对一托管机制，最高效率帮助学员从0-1上手实操。'
        },
        {
           label: '智能系统完善中',
           text: 'AI运营/智能托管系统持续迭代，引领行业技术前沿。'
        }
      ]
    },
    {
      id: 'welfare',
      title: '晨诺团队内部福利',
      subtitle: '超值赠送 · 独家资源',
      priceValue: '价值 1000元',
      description: '加入即可享受的额外权益，让你的起步比别人更快一步。',
      icon: <Gift size={28} />,
      details: [
        {
          label: '官方合作代理商',
          text: '想做付费流的学员可免费授权代理闲鱼平台超级擦亮，享10%返点。'
        },
        {
          label: '直播答疑',
          text: '定期开播讲解平台底层逻辑和前沿玩法，做到更细、更精、更深。'
        },
        {
          label: '店群扶持',
          text: '享受市场价7折购买矩阵软件，附赠闲鱼个人无限多开店铺资料。'
        },
        {
           label: '玩透闲鱼电商',
           text: '让兄弟们可以比同行更专业，掌握核心竞争力。'
        }
      ]
    }
  ];

  const targetAudiences = [
    { label: "全职创业者", sub: "想全职的创业人员", icon: <Briefcase className="w-5 h-5 text-blue-400" /> },
    { label: "副业打工人", sub: "想做副业的打工人", icon: <Laptop className="w-5 h-5 text-purple-400" /> },
    { label: "在校大学生", sub: "想赚外快的大学生", icon: <GraduationCap className="w-5 h-5 text-pink-400" /> },
    { label: "宝妈宝爸", sub: "补贴家用的家长", icon: <Baby className="w-5 h-5 text-green-400" /> },
    { label: "轻资产创业", sub: "自由职业者", icon: <Target className="w-5 h-5 text-orange-400" /> }
  ];

  // Carousel Data
  const carouselItems: ProductItem[] = [
    {
      id: 1,
      title: "冰吧系列",
      category: "家电系列",
      priceTag: "高利润爆款",
      icon: <Snowflake size={14} />,
      tags: ["全新复古志高", "荣事达运损", "先科运损", "优诺复古"],
      image: "https://am.zdmimg.com/202303/23/641c4229a91615392.png_e1080.jpg",
      detailedProducts: [
        "全新复古志高冰吧",
        "荣事达运损冰吧",
        "先科运损冰吧",
        "新款随机运损冰吧",
        "优诺复古运损冰吧",
        "容声复古运损冰吧"
      ]
    },
    {
      id: 2,
      title: "全新志高洗衣机",
      category: "家电系列",
      priceTag: "刚需热卖",
      icon: <Box size={14} />,
      tags: ["全新志高全自动", "全新志高半自动", "品牌保障"],
      image: "https://cbu01.alicdn.com/img/ibank/O1CN01BemDGA1oGjRm9SucM_!!2212157235198-0-cib.jpg",
      detailedProducts: [
        "全新志高全自动洗衣机",
        "全新志高半自动洗衣机"
      ]
    },
    {
      id: 3,
      title: "品牌数码系列",
      category: "数码系列",
      priceTag: "极速流转",
      icon: <Smartphone size={14} />,
      tags: ["华为手机", "苹果笔", "显示器", "小米电视"],
      image: "https://th.bing.com/th/id/OIP.Jkmjt4dq15__97kKKCrrGAHaFu?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      detailedProducts: [
        "华为手机",
        "苹果笔（一代/二代）",
        "显示器",
        "小米电视机"
      ]
    },
    {
      id: 4,
      title: "大容量冰柜",
      category: "家电系列",
      priceTag: "商用首选",
      icon: <Snowflake size={14} />,
      tags: ["随机运损冰柜", "荣事达立式", "全尺寸"],
      image: "https://imgservice.suning.cn/uimg1/b2c/image/K9msJVJGlIvHi32ad_BkYA.jpg_800w_800h_4e",
      detailedProducts: [
        "新款随机运损冰柜",
        "运损荣事达冰柜",
        "全尺寸运损冰柜",
        "荣事达运损立式冰柜"
      ]
    },
    {
      id: 5,
      title: "家用/租房冰箱",
      category: "家电系列",
      priceTag: "性价比之王",
      icon: <Snowflake size={14} />,
      tags: ["全新志高", "全尺寸复古", "运损机源头价"],
      image: "https://imgservice.suning.cn/uimg1/b2c/image/OpDHv_eYZ4uaSD-LWjLCeA.jpg_800w_800h_4e",
      detailedProducts: [
        "全新志高冰箱",
        "全尺寸运损冰箱",
        "荣事达运损冰箱",
        "全尺寸复古运损冰箱"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#050b14]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={(e: any) => scrollToSection(e, 'home')}>
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-wider text-white">晨诺电商</span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-purple-400 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group">
                  首页
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-purple-400 text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5">核心权益</a>
                <a href="#supply-chain" onClick={(e) => scrollToSection(e, 'supply-chain')} className="hover:text-purple-400 text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5">团队货盘</a>
                <a href="#ai-model" onClick={(e) => scrollToSection(e, 'ai-model')} className="hover:text-purple-400 text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5">AI 模型</a>
                <button 
                  onClick={() => setIsContactOpen(true)} 
                  className="bg-white text-purple-900 hover:bg-purple-50 px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-md shadow-purple-900/20"
                >
                  立即加入 ¥998
                </button>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a1120] border-b border-white/10 animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-2 sm:px-3">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-white block px-3 py-3 rounded-lg text-base font-medium hover:bg-white/5">首页</a>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-300 block px-3 py-3 rounded-lg text-base font-medium hover:bg-white/5">核心权益</a>
              <a href="#supply-chain" onClick={(e) => scrollToSection(e, 'supply-chain')} className="text-gray-300 block px-3 py-3 rounded-lg text-base font-medium hover:bg-white/5">团队货盘</a>
              <a href="#ai-model" onClick={(e) => scrollToSection(e, 'ai-model')} className="text-gray-300 block px-3 py-3 rounded-lg text-base font-medium hover:bg-white/5">AI 模型</a>
              <button 
                onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }} 
                className="text-white bg-purple-600 w-full block px-3 py-3 rounded-lg text-base font-bold text-center mt-4"
              >
                立即加入
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 -z-10 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="relative mb-12 group">
            {/* Glow effect - Updated to White/Silver */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-white/10 blur-[80px] rounded-full group-hover:bg-white/15 transition-all duration-700"></div>
            
            {/* Main Title with Effects */}
            <h1 className="relative">
               <span className="block text-7xl md:text-9xl lg:text-[11rem] font-black text-transparent bg-clip-text text-shimmer leading-none pb-4 select-none title-glow transform group-hover:scale-[1.02] transition-transform duration-700">
                 晨诺电商
               </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 mt-2 opacity-80">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-400"></div>
              <p className="text-sm md:text-xl font-light text-slate-300 uppercase tracking-[0.8em] text-center">
                Ce Nuo Commerce
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-400"></div>
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-200 tracking-tight mb-8 leading-tight max-w-4xl mx-auto">
            给你的不只是<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-extrabold">承诺</span>
            <br className="hidden md:block"/>
            而是实实在在的<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-extrabold">收获</span>
          </h2>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
            <span className="text-white font-medium">闲鱼头部供应链</span> <span className="text-purple-500 mx-2">•</span> 
            <span className="text-white font-medium">4年实战经验</span> <span className="text-purple-500 mx-2">•</span> 
            <span className="text-white font-medium">GMV超100W+</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 origin-left"></div>
              <span className="relative flex items-center gap-2 justify-center">
                开始赚钱之旅 <ArrowRight size={20} />
              </span>
            </a>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full text-white font-medium text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group"
            >
               <Sparkles size={20} className="text-orange-400 group-hover:rotate-12 transition-transform" />
               试用 AI 小橙子
            </button>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            {[
              { label: '月销 GMV', value: '100W+', icon: <TrendingUp className="text-green-400 w-6 h-6" /> },
              { label: '实战经验', value: '4年+', icon: <ShieldCheck className="text-blue-400 w-6 h-6" /> },
              { label: '爆款工厂', value: '10+', icon: <Box className="text-purple-400 w-6 h-6" /> },
              { label: '成功学员', value: '300+', icon: <Users className="text-orange-400 w-6 h-6" /> },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center group cursor-default">
                <div className="mb-3 p-4 bg-white/5 rounded-2xl group-hover:bg-purple-500/20 transition-colors duration-300 ring-1 ring-white/5 group-hover:ring-purple-500/30">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 bg-[#0a0f1c] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col items-center justify-center text-center mb-10">
              <span className="text-purple-400 font-bold tracking-wider text-sm uppercase mb-2">TARGET AUDIENCE</span>
              <h3 className="text-2xl font-bold text-white">适合人群</h3>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {targetAudiences.map((item, idx) => (
                <div key={idx} className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex flex-col items-center text-center transition-all cursor-default border border-white/5 hover:border-purple-500/30">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                      {item.icon}
                   </div>
                   <div className="font-bold text-white mb-1">{item.label}</div>
                   <div className="text-xs text-gray-500">{item.sub}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Features Grid - ENRICHED */}
      <section id="features" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">全方位陪跑权益</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              不仅仅是课程，更是从供应链到销售的全套解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW Supply Chain Section with Carousel */}
      <section id="supply-chain" className="py-24 bg-[#050b14] relative border-t border-white/5 overflow-hidden">
         {/* Decorative map-like background */}
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           {/* Top part: Map and Advantages */}
           <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
             <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-bold mb-4">
                  核心优势
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  晨诺<span className="text-blue-500">团队货盘</span><br/>
                  全网供应链头部
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  背靠闲鱼家电类目头部供应链，拥有4年闲鱼电商运营经验。我们不仅仅提供货源，更提供经过市场验证的爆款数据。
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                   <div className="bg-slate-900 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                         <Factory size={20} />
                      </div>
                      <div>
                         <div className="text-white font-bold">10+</div>
                         <div className="text-xs text-gray-400">爆款货源工厂</div>
                      </div>
                   </div>
                   <div className="bg-slate-900 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400">
                         <TrendingUp size={20} />
                      </div>
                      <div>
                         <div className="text-white font-bold">100W+</div>
                         <div className="text-xs text-gray-400">月销 GMV</div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex-1 w-full">
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-white/10 p-8 overflow-hidden group">
                   <div className="absolute top-0 right-0 p-32 bg-blue-600/10 rounded-full blur-[80px]"></div>
                   
                   <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Truck className="text-blue-400" /> 源头工厂直发
                   </h3>
                   
                   <div className="space-y-4">
                      {['浙江慈溪 · 家电产业带', '江苏宿迁 · 电商物流中心', '河南商丘 · 综合产业基地'].map((loc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors cursor-default">
                           <div className="flex items-center gap-3">
                              <MapPin className="text-red-400 w-5 h-5" />
                              <span className="text-slate-200 font-medium">{loc}</span>
                           </div>
                           <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">直发</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           </div>

           {/* Carousel Section */}
           <div className="relative pt-10 pb-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                   <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                   <span className="text-xs text-gray-300 font-mono">货盘实时更新 (LIVE)</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  独家爆款货盘 · <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">市面最顶</span>
                </h3>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  无论是产品质量还是拿货价格，我们都拥有绝对的市面统治力。种类丰富，涵盖热门赛道。
                </p>
              </div>
              
              {/* The new Carousel Component */}
              <ProductCarousel items={carouselItems} />
           </div>
         </div>
      </section>

      {/* AI Showcase Section */}
      <section id="ai-model" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b14] via-purple-900/10 to-[#050b14]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-xs font-bold mb-4">
                全网首发黑科技
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                遇见 <span className="text-orange-500">AI 小橙子</span> <br />
                你的 24 小时智能运营官
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                晨诺团队自主研发的闲鱼垂类大模型。它不仅懂规则，更懂销售。无论你是遇到奇葩客户，还是不知道如何优化标题，小橙子都能即时给出最优解。
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  '智能生成高转化文案',
                  '自动处理售后纠纷话术',
                  '实时分析店铺数据异常',
                  '全天候在线，秒级响应'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 rounded-full bg-orange-600/30 flex items-center justify-center border border-orange-500/50">
                      <Check size={14} className="text-orange-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setIsChatOpen(true)}
                className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                立即体验 AI 对话
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Chat Simulation Card */}
              <div className="glass-card rounded-2xl p-6 relative transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-orange-900/20">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg animate-pulse">
                    <Bot className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">小橙子助理</h4>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      Online
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5 text-gray-300">
                    这件商品客户嫌贵怎么办？
                  </div>
                  <div className="bg-orange-500/20 p-3 rounded-xl rounded-tr-none border border-orange-500/30 text-white">
                    亲，可以这样回复： "亲，咱们这款是源头工厂直发的，品质和售后都有保障。现在下单我这边还能帮您申请一个老客户回购券，性价比真的很高了~"
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5 text-gray-300">
                    太棒了！帮我写一个数码产品的标题。
                  </div>
                  <div className="bg-orange-500/20 p-3 rounded-xl rounded-tr-none border border-orange-500/30 text-white">
                    <div className="flex gap-1 mb-1">
                      <span className="w-1 h-1 bg-orange-400 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-orange-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1 h-1 bg-orange-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 border border-white/20 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-20">
               <Target size={200} className="text-white" />
            </div>
            
            <div className="p-10 md:p-16 text-center relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">晨诺电商 · 核心合伙人计划</h2>
              <p className="text-indigo-200 mb-8">一次付费，终身受益。给你的不只是课程，而是整套赚钱系统。</p>
              
              <div className="flex justify-center items-end gap-2 mb-8">
                 <span className="text-gray-400 line-through text-xl mb-2 font-medium">原价 ¥3398</span>
                 <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-2xl filter">
                   ¥998
                 </span>
                 <span className="text-orange-200 text-2xl mb-3 font-bold">/ 永久</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-10">
                {[
                  '货源最低拿货价', 
                  '0-1 运营陪跑 8个月', 
                  'AI 大模型无限使用',
                  '店群软件 7折优惠'
                ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                      <CheckCircle className="text-green-400 w-5 h-5" />
                      <span className="text-white font-medium">{item}</span>
                   </div>
                ))}
              </div>

              <button 
                onClick={() => setIsContactOpen(true)}
                className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-xl shadow-lg shadow-orange-900/50 hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto"
              >
                立即咨询
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <ShoppingBag className="text-white w-4 h-4" />
            </div>
            <span className="text-white font-bold tracking-wider">晨诺电商</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2024 Ce Nuo Commerce. All rights reserved.
          </div>
        </div>
      </footer>

      {/* AI Chat Modal */}
      <AiChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;