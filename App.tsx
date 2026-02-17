
import React, { useState, useEffect, useCallback } from 'react';
import FireworksCanvas from './components/FireworksCanvas';
import { Decorations } from './components/TraditionalDecoration';
import { generateNewYearWish } from './services/geminiService';
import { WishCategory } from './types';

const App: React.FC = () => {
  const [currentWish, setCurrentWish] = useState<string>("Chúc mừng năm mới 2026 - Bính Ngọ!");
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<WishCategory>(WishCategory.GENERAL);

  const updateWish = useCallback(async (cat: WishCategory) => {
    setLoading(true);
    const wish = await generateNewYearWish(cat);
    setCurrentWish(wish);
    setLoading(false);
  }, []);

  useEffect(() => {
    updateWish(WishCategory.GENERAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value as WishCategory;
    setCategory(newCat);
    updateWish(newCat);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white selection:bg-yellow-400 selection:text-red-900">
      {/* Background layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-950"></div>
      <div className="fixed inset-0 tet-pattern pointer-events-none"></div>
      
      <FireworksCanvas />
      <Decorations />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="text-center space-y-6 max-w-3xl pointer-events-auto">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-yellow-400 text-lg md:text-xl font-bold tracking-[0.3em] uppercase drop-shadow-md">
              Mừng Xuân Bính Ngọ
            </h2>
            <h1 className="text-6xl md:text-9xl font-cursive text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_5px_15px_rgba(255,215,0,0.5)]">
              Chúc Mừng Năm Mới
            </h1>
            <div className="flex items-center justify-center gap-6 text-5xl md:text-7xl font-black text-red-100">
              <span className="animate-pulse drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">2</span>
              <span className="animate-pulse delay-75 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">0</span>
              <span className="animate-pulse delay-150 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">2</span>
              <span className="animate-pulse delay-300 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">6</span>
            </div>
          </div>

          {/* Wish Card - Refined with more Tet red & gold */}
          <div className="bg-red-700/30 backdrop-blur-xl border-4 border-yellow-500/50 p-8 md:p-12 rounded-[2rem] shadow-[0_0_80px_rgba(185,28,28,0.5)] border-double transform transition-all duration-500 hover:scale-[1.01]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-yellow-300 font-bold text-lg animate-pulse">Đang xin quẻ chúc...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <p className="text-2xl md:text-4xl font-cursive leading-relaxed text-yellow-50 drop-shadow-sm italic">
                  "{currentWish}"
                </p>
                
                <div className="relative flex items-center justify-center">
                   <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-yellow-500/30"></div>
                  </div>
                  <div className="relative px-4 bg-transparent">
                    <span className="text-yellow-500">🧧</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-5">
                   <div className="relative group">
                     <select 
                      value={category}
                      onChange={handleCategoryChange}
                      className="appearance-none bg-red-800/80 text-yellow-300 border-2 border-yellow-600/50 rounded-2xl px-6 py-3 pr-10 text-base font-bold focus:outline-none focus:ring-4 focus:ring-yellow-500/40 transition-all cursor-pointer hover:bg-red-700/90 shadow-lg"
                    >
                      {Object.values(WishCategory).map(cat => (
                        <option key={cat} value={cat} className="bg-red-900">{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-yellow-500">
                      ▼
                    </div>
                   </div>
                  
                  <button 
                    onClick={() => updateWish(category)}
                    className="bg-gradient-to-b from-yellow-300 to-yellow-600 hover:from-yellow-200 hover:to-yellow-500 text-red-950 font-black px-10 py-4 rounded-2xl transition-all active:scale-95 shadow-[0_4px_20px_rgba(234,179,8,0.4)] flex items-center gap-3 text-lg group"
                  >
                    <span>Phát Lộc Lời Chúc</span>
                    <span className="group-hover:rotate-12 transition-transform">🏮</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Decorative Footer */}
          <div className="text-yellow-400/80 font-bold pt-6 space-y-2">
            <p className="flex items-center justify-center gap-3 text-lg">
              <span className="text-2xl">🐎</span>
              Bính Ngọ 2026 - Mã Đáo Thành Công
              <span className="text-2xl">🐎</span>
            </p>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60">Nhấn vào không trung để khai pháo</p>
          </div>
        </div>
      </div>

      {/* Foreground Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(45,0,0,0.4)_100%)]"></div>
    </div>
  );
};

export default App;
