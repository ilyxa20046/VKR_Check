import React, { useState } from 'react';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { Chapter3 } from './components/Chapter3';
import { Chapter4 } from './components/Chapter4';

type ChapterId = 'overview' | 'ch1' | 'ch2' | 'ch3' | 'ch4';

interface NavItem {
  id: ChapterId;
  label: string;
  shortLabel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  activeColor: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    label: 'Обзор ВКР',
    shortLabel: 'Обзор',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-400',
    activeColor: 'bg-gray-700 text-white',
    icon: '🏠'
  },
  {
    id: 'ch1',
    label: 'Глава 1. Теоретические основы',
    shortLabel: 'Глава 1',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-400',
    activeColor: 'bg-blue-700 text-white',
    icon: '📡'
  },
  {
    id: 'ch2',
    label: 'Глава 2. Анализ методов',
    shortLabel: 'Глава 2',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-400',
    activeColor: 'bg-green-700 text-white',
    icon: '📊'
  },
  {
    id: 'ch3',
    label: 'Глава 3. Проектирование и моделирование',
    shortLabel: 'Глава 3',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-400',
    activeColor: 'bg-yellow-600 text-white',
    icon: '🔬'
  },
  {
    id: 'ch4',
    label: 'Глава 4. Программное средство',
    shortLabel: 'Глава 4',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-400',
    activeColor: 'bg-purple-700 text-white',
    icon: '💻'
  },
];

const tags = [
  'LDPC BG1/BG2', 'Учебный (24,12)', 'QC-LDPC (96,48)', 'NMS Decoder',
  'AWGN Channel', 'Rayleigh Fading', 'BPSK / QPSK', '16-QAM',
  'OFDM-64/128', 'SISO / 2×2 MIMO', 'ZF Equalizer', 'CRC-16',
  'BER / BLER', 'Throughput', 'Coding Gain', 'Spectral Eff.',
  'A/B Compare', 'Batch Mode', 'CSV Export', 'Defence Mode',
];

const Overview: React.FC<{ onNavigate: (id: ChapterId) => void }> = ({ onNavigate }) => (
  <div>
    {/* Hero */}
    <div className="text-center py-10 mb-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-2xl text-white shadow-xl">
      <div className="text-5xl mb-4">📡</div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight px-4">
        Исследование и моделирование системы<br/>
        помехоустойчивого кодирования<br/>
        в зашумлённом канале мобильной сети 5G
      </h1>
      <p className="text-blue-200 mb-1 text-sm">Выпускная квалификационная работа · 2026</p>
      <p className="text-blue-300 text-xs">LDPC Research Studio v1.0.0 · Java 17 + JavaFX · 3GPP TS 38.212</p>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {[
          { icon: '📐', label: 'Стандарт', value: '5G NR (3GPP TS 38.212), Base Graph BG1/BG2' },
          { icon: '🔢', label: 'Код', value: 'LDPC + Normalized Min-Sum, R=1/2, Z=8/16/32' },
          { icon: '📈', label: 'Метрики', value: 'BER, BLER, Throughput, SE, Coding Gain' },
        ].map(({ icon, label, value }) => (
          <div key={label} className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-left max-w-xs">
            <div className="text-xl mb-1">{icon}</div>
            <div className="text-xs font-bold text-blue-200 uppercase">{label}</div>
            <div className="text-sm text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Chapters nav */}
    <h2 className="text-xl font-bold text-gray-800 mb-4">Структура выпускной работы</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {[
        {
          id: 'ch1' as ChapterId,
          ch: '1', color: 'bg-blue-600', border: 'border-blue-200', bg: 'bg-blue-50',
          title: 'Глава 1. Теоретические основы',
          desc: 'Радиоканал 5G NR, замирания AWGN/Rayleigh, классификация кодов, математика LDPC-кодов, алгоритм BP/NMS, OFDM, схемы модуляции',
          sections: ['1.1 Радиоканал 5G', '1.2 Классификация', '1.3 Математика LDPC', '1.4 Алгоритм BP/NMS', '1.5 OFDM']
        },
        {
          id: 'ch2' as ChapterId,
          ch: '2', color: 'bg-green-600', border: 'border-green-200', bg: 'bg-green-50',
          title: 'Глава 2. Анализ методов',
          desc: 'BER/BLER/throughput метрики, сравнительный анализ профилей LDPC, coding gain, сходимость NMS, спектральная эффективность, LDPC vs Turbo',
          sections: ['2.1 Метрики BER/BLER', '2.2 Сравнение BER', '2.3 BLER и TP', '2.4 Сходимость NMS', '2.5 LDPC vs Turbo']
        },
        {
          id: 'ch3' as ChapterId,
          ch: '3', color: 'bg-yellow-600', border: 'border-yellow-200', bg: 'bg-yellow-50',
          title: 'Глава 3. Проектирование и моделирование',
          desc: 'Системная модель канала, проектирование BG1/BG2, параметрическая оптимизация NMS (α), моделирование MIMO 2×2, сводные результаты',
          sections: ['3.1 Системная модель', '3.2 Базовые графы BG1/BG2', '3.3 Оптимизация NMS', '3.4 MIMO', '3.5 Сводные результаты']
        },
        {
          id: 'ch4' as ChapterId,
          ch: '4', color: 'bg-purple-600', border: 'border-purple-200', bg: 'bg-purple-50',
          title: 'Глава 4. Программное средство',
          desc: 'Архитектура MVC, реализация LDPC-кодека и ChannelEngine, UI-экраны приложения, верификация JUnit, экспорт CSV, режим защиты',
          sections: ['4.1 Архитектура MVC', '4.2 LDPC-кодек', '4.3 ChannelEngine', '4.4 Интерфейс', '4.5 Верификация']
        },
      ].map(({ id, ch, color, border, bg, title, desc, sections }) => (
        <button
          key={ch}
          onClick={() => onNavigate(id)}
          className={`text-left border-2 ${border} ${bg} rounded-xl p-5 hover:shadow-md transition-all group`}
        >
          <div className="flex items-start gap-3">
            <div className={`${color} text-white text-xl font-bold w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
              {ch}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{title}</h3>
              <p className="text-gray-600 text-xs leading-5 mb-3">{desc}</p>
              <div className="flex flex-wrap gap-1">
                {sections.map(s => (
                  <span key={s} className="text-xs bg-white border rounded px-2 py-0.5 text-gray-600">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>

    {/* Tags */}
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
      <h3 className="font-bold text-gray-700 mb-3">Реализованные компоненты системы</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* Key results */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { value: '5,0 дБ', label: 'Coding Gain 5G NR BG1', color: 'text-blue-700', bg: 'bg-blue-50' },
        { value: '9,3 Мбит/с', label: 'Max пропускная способность', color: 'text-green-700', bg: 'bg-green-50' },
        { value: '0,80', label: 'Оптимальный α для NMS', color: 'text-yellow-700', bg: 'bg-yellow-50' },
        { value: '47/47', label: 'JUnit-тестов пройдено', color: 'text-purple-700', bg: 'bg-purple-50' },
      ].map((item, i) => (
        <div key={i} className={`${item.bg} rounded-xl p-4 text-center`}>
          <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
          <div className="text-xs text-gray-600 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('overview');

  const activeNav = navItems.find(n => n.id === activeChapter)!;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl">📡</span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">Помехоустойчивое кодирование в 5G NR</p>
                <p className="text-xs text-gray-500 hidden sm:block">ВКР 2026 · LDPC Research Studio</p>
              </div>
            </div>
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveChapter(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeChapter === item.id
                      ? item.activeColor + ' shadow-sm'
                      : item.color + ' hover:' + item.bgColor
                  }`}
                >
                  {item.icon} {item.shortLabel}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex px-2 py-2 gap-1 min-w-max">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveChapter(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeChapter === item.id
                  ? item.activeColor + ' shadow-sm'
                  : item.color + ' border border-gray-200'
              }`}
            >
              {item.icon} {item.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-500">
          ВКР → {activeNav.label}
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          {activeChapter === 'overview' && <Overview onNavigate={setActiveChapter} />}
          {activeChapter === 'ch1' && <Chapter1 />}
          {activeChapter === 'ch2' && <Chapter2 />}
          {activeChapter === 'ch3' && <Chapter3 />}
          {activeChapter === 'ch4' && <Chapter4 />}
        </div>

        {/* Bottom navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              const idx = navItems.findIndex(n => n.id === activeChapter);
              if (idx > 0) setActiveChapter(navItems[idx - 1].id);
            }}
            disabled={activeChapter === 'overview'}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            ← Назад
          </button>
          <button
            onClick={() => {
              const idx = navItems.findIndex(n => n.id === activeChapter);
              if (idx < navItems.length - 1) setActiveChapter(navItems[idx + 1].id);
            }}
            disabled={activeChapter === 'ch4'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            Вперёд →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-200 mt-4 bg-white">
        <p>ВКР «Исследование и моделирование системы помехоустойчивого кодирования в зашумлённом канале мобильной сети 5G» · 2026</p>
        <p className="mt-1">LDPC Research Studio v1.0.0 · Java 17 + JavaFX · 3GPP TS 38.212</p>
      </footer>
    </div>
  );
}
