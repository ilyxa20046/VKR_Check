import React, { useState } from 'react';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { Chapter4 } from './components/Chapter4';

type ChapterKey = 'ch1' | 'ch2' | 'ch4' | 'home';

const NAV_ITEMS: { key: ChapterKey; label: string; short: string; color: string }[] = [
  { key: 'home', label: 'О работе', short: '~', color: 'gray' },
  { key: 'ch1', label: 'Глава 1', short: '1', color: 'blue' },
  { key: 'ch2', label: 'Глава 2', short: '2', color: 'green' },
  { key: 'ch4', label: 'Глава 4', short: '4', color: 'purple' },
];

const TOC: Record<ChapterKey, { title: string; sections: { id: string; title: string }[] }> = {
  home: { title: 'О работе', sections: [] },
  ch1: {
    title: 'Глава 1. Теоретические основы',
    sections: [
      { id: 'ch1-1', title: '1.1. Радиоканал 5G NR' },
      { id: 'ch1-2', title: '1.2. Классификация методов' },
      { id: 'ch1-3', title: '1.3. LDPC-коды: математика' },
      { id: 'ch1-4', title: '1.4. Алгоритм Belief Propagation' },
      { id: 'ch1-5', title: '1.5. Схемы модуляции' },
      { id: 'ch1-6', title: '1.6. OFDM и физический уровень' },
    ]
  },
  ch2: {
    title: 'Глава 2. Анализ методов',
    sections: [
      { id: 'ch2-1', title: '2.1. Метрики BER, BLER, throughput' },
      { id: 'ch2-2', title: '2.2. Сравнение BER-характеристик' },
      { id: 'ch2-3', title: '2.3. Анализ BLER' },
      { id: 'ch2-4', title: '2.4. Пропускная способность' },
      { id: 'ch2-5', title: '2.5. Coding Gain' },
      { id: 'ch2-6', title: '2.6. Сходимость декодера' },
      { id: 'ch2-7', title: '2.7. MIMO и OFDM' },
      { id: 'ch2-8', title: '2.8. LDPC vs Turbo vs Polar' },
    ]
  },
  ch4: {
    title: 'Глава 4. Программное средство',
    sections: [
      { id: 'ch4-1', title: '4.1. Архитектура системы' },
      { id: 'ch4-2', title: '4.2. LDPC-кодек' },
      { id: 'ch4-3', title: '4.3. Канал и модулятор' },
      { id: 'ch4-4', title: '4.4. Организация эксперимента' },
      { id: 'ch4-5', title: '4.5. Экраны UI' },
      { id: 'ch4-6', title: '4.6. Результаты моделирования' },
      { id: 'ch4-7', title: '4.7. Радарный анализ' },
      { id: 'ch4-8', title: '4.8. Экспорт и отчёты' },
      { id: 'ch4-9', title: '4.9. Метрика кодовой базы' },
      { id: 'ch4-10', title: '4.10. Верификация' },
    ]
  },
};

const HomePage: React.FC = () => (
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-10">
      <div className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white text-xs font-bold px-4 py-1 rounded-full mb-4 tracking-widest uppercase">
        Выпускная квалификационная работа · 2026
      </div>
      <h1 className="text-3xl font-black text-gray-900 leading-tight mb-3">
        Исследование и моделирование системы<br />
        <span className="text-blue-700">помехоустойчивого кодирования</span><br />
        в зашумлённом канале мобильной сети 5G
      </h1>
      <p className="text-gray-500 text-sm">
        Приложение: <span className="font-mono font-bold text-purple-700">LDPC Research Studio v1.0.0</span> · Java 17 + JavaFX
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[
        { emoji: '📡', title: 'Стандарт', text: '5G NR (3GPP TS 38.212), Base Graph BG1/BG2' },
        { emoji: '🔢', title: 'Код', text: 'LDPC + Normalized Min-Sum, R=1/2, Z=8/16/32' },
        { emoji: '📊', title: 'Метрики', text: 'BER, BLER, Throughput, SE, Coding Gain' },
      ].map(({ emoji, title, text }) => (
        <div key={title} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
          <div className="text-3xl mb-2">{emoji}</div>
          <div className="font-bold text-gray-800 mb-1">{title}</div>
          <div className="text-gray-500 text-xs">{text}</div>
        </div>
      ))}
    </div>

    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <h2 className="font-bold text-gray-800 text-lg mb-4">Структура диплома</h2>
      <div className="space-y-3">
        {[
          {
            ch: '1', color: 'bg-blue-600', title: 'Глава 1. Теоретические основы',
            desc: 'Радиоканал 5G, классификация кодов, математика LDPC, алгоритм BP/NMS, модуляция, OFDM'
          },
          {
            ch: '2', color: 'bg-green-600', title: 'Глава 2. Анализ методов',
            desc: 'BER/BLER/throughput метрики, сравнение профилей, coding gain, сходимость, MIMO, LDPC vs Turbo'
          },
          {
            ch: '3', color: 'bg-yellow-600', title: 'Глава 3. Проектирование системы',
            desc: '(представлена отдельно — генерируется сервисом ChapterThreeMaterialsService)'
          },
          {
            ch: '4', color: 'bg-purple-600', title: 'Глава 4. Программное средство',
            desc: 'Архитектура MVC, реализация кодека, ChannelEngine, UI-экраны, экспорт, верификация'
          },
        ].map(({ ch, color, title, desc }) => (
          <div key={ch} className="flex gap-3 items-start">
            <div className={`${color} text-white font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm`}>
              {ch}
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{title}</div>
              <div className="text-gray-500 text-xs">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5">
      <h2 className="font-bold text-gray-800 mb-3">Реализованные компоненты системы</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {[
          'LDPC BG1/BG2', 'Учебный (24,12)', 'QC-LDPC (96,48)', 'NMS Decoder',
          'AWGN Channel', 'Rayleigh Fading', 'BPSK / QPSK', '16-QAM',
          'OFDM-64/128', 'SISO / 2×2', 'ZF Equalizer', 'CRC-16',
          'BER / BLER', 'Throughput', 'Coding Gain', 'Spectral Eff.',
          'A/B Compare', 'Batch Mode', 'CSV Export', 'Defence Mode',
        ].map(tag => (
          <span key={tag} className="bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded font-mono text-center">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-6 text-center text-xs text-gray-400">
      Используйте навигацию сверху для перехода между главами · 
      <a href="https://github.com/ilyxa20046/VKR_2026" target="_blank" rel="noopener noreferrer"
        className="text-blue-500 hover:underline ml-1">
        GitHub: ilyxa20046/VKR_2026
      </a>
    </div>
  </div>
);

export default function App() {
  const [active, setActive] = useState<ChapterKey>('home');

  const scrollTo = (id: string) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const colorMap: Record<string, string> = {
    gray: 'bg-gray-600 hover:bg-gray-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
  };

  const activeColorMap: Record<string, string> = {
    gray: 'bg-gray-800',
    blue: 'bg-blue-800',
    green: 'bg-green-800',
    purple: 'bg-purple-800',
  };

  const currentToc = TOC[active];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 flex-wrap">
          <div className="mr-3 font-black text-gray-900 text-sm whitespace-nowrap">
            ВКР 5G LDPC
          </div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => { setActive(item.key); window.scrollTo(0, 0); }}
              className={`px-4 py-1.5 rounded-lg text-white text-sm font-semibold transition-colors ${
                active === item.key ? activeColorMap[item.color] : colorMap[item.color]
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="ml-auto text-xs text-gray-400 hidden md:block">
            Java 17 + JavaFX · LDPC Research Studio
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar TOC */}
        {active !== 'home' && currentToc.sections.length > 0 && (
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-20 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Содержание
              </p>
              <ul className="space-y-0.5">
                {currentToc.sections.map(sec => (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollTo(sec.id)}
                      className="text-left w-full text-xs text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors leading-tight"
                    >
                      {sec.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
            {active === 'home' && <HomePage />}
            {active === 'ch1' && <Chapter1 />}
            {active === 'ch2' && <Chapter2 />}
            {active === 'ch4' && <Chapter4 />}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        ВКР 2026 · Исследование и моделирование LDPC-кодирования в 5G NR ·{' '}
        <a href="https://github.com/ilyxa20046/VKR_2026" target="_blank" rel="noopener noreferrer"
          className="text-blue-500 hover:underline">
          github.com/ilyxa20046/VKR_2026
        </a>
      </footer>
    </div>
  );
}
