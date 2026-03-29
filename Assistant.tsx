import React, { useState } from 'react';
import Museum from './components/Museum';
import Education from './components/Education';
import Game from './components/Game';
import Assistant from './components/Assistant';
import { Waves, BookOpen, Gamepad2, Anchor, Maximize } from 'lucide-react';

type Tab = 'museum' | 'education' | 'game';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('museum');

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-800 via-blue-900 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
          <Anchor size={64} className="text-teal-400 mb-8 animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            Каждый год Белое море загрязняется.
          </h1>
          <p className="text-2xl md:text-4xl text-sky-200 mb-12 font-display tracking-wide">
            Узнай почему.
          </p>
          <button
            onClick={() => setHasStarted(true)}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-5 px-16 rounded-full text-2xl transition-all hover:scale-110 shadow-[0_0_30px_rgba(20,184,166,0.6)] font-display tracking-wider"
          >
            Начать
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 text-teal-700">
          <Anchor size={28} className="text-teal-600" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight hidden sm:block font-display">
            Спаси Белое море
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1 md:gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('museum')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'museum' 
                  ? 'bg-white text-teal-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Waves size={18} />
              <span className="hidden md:inline">Галерея мусора</span>
            </button>
            
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'education' 
                  ? 'bg-white text-teal-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen size={18} />
              <span className="hidden md:inline">Причины и следствия</span>
            </button>

            <button
              onClick={() => setActiveTab('game')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'game' 
                  ? 'bg-white text-teal-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Gamepad2 size={18} />
              <span className="hidden md:inline">Очисти море</span>
            </button>
          </nav>

          <button 
            onClick={toggleFullscreen}
            className="hidden md:flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
            title="Во весь экран (Режим игры)"
          >
            <Maximize size={18} />
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'museum' && <Museum />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'game' && <Game />}
      </main>

      <Assistant />
    </div>
  );
}
