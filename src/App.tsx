import React, { useState } from 'react';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { Chapter3 } from './components/Chapter3';
import { Chapter4 } from './components/Chapter4';

type ChapterId = 'overview' | 'intro' | 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'conclusion';

interface NavItem {
  id: ChapterId;
  label: string;
  shortLabel: string;
  activeColor: string;
  borderColor: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Обзор ВКР', shortLabel: 'Обзор', activeColor: 'bg-gray-700 text-white', borderColor: 'border-gray-400', icon: '🏠' },
  { id: 'intro', label: 'Введение', shortLabel: 'Введение', activeColor: 'bg-indigo-700 text-white', borderColor: 'border-indigo-300', icon: '📋' },
  { id: 'ch1', label: 'Глава 1. Теоретические основы', shortLabel: 'Глава 1', activeColor: 'bg-blue-700 text-white', borderColor: 'border-blue-400', icon: '📡' },
  { id: 'ch2', label: 'Глава 2. Постановка задачи и модель', shortLabel: 'Глава 2', activeColor: 'bg-green-700 text-white', borderColor: 'border-green-400', icon: '📊' },
  { id: 'ch3', label: 'Глава 3. Разработка ПС', shortLabel: 'Глава 3', activeColor: 'bg-yellow-600 text-white', borderColor: 'border-yellow-400', icon: '🔬' },
  { id: 'ch4', label: 'Глава 4. Анализ результатов', shortLabel: 'Глава 4', activeColor: 'bg-purple-700 text-white', borderColor: 'border-purple-400', icon: '💻' },
  { id: 'conclusion', label: 'Заключение', shortLabel: 'Заключение', activeColor: 'bg-rose-700 text-white', borderColor: 'border-rose-300', icon: '🎓' },
];

const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-800 leading-7 mb-3 text-justify indent-8">{children}</p>
);

const Overview: React.FC<{ onNavigate: (id: ChapterId) => void }> = ({ onNavigate }) => (
  <div>
    <div className="text-center mb-8">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Выпускная квалификационная работа</p>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
        Исследование и моделирование системы<br />помехоустойчивого кодирования<br />в зашумлённом канале мобильной сети 5G
      </h1>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {['LDPC BG1/BG2', 'QC-LDPC', 'NMS Decoder', 'AWGN Channel', 'Rayleigh Fading',
          'BPSK / QPSK / 16-QAM', 'OFDM-64/128', 'MIMO 2×2', 'ZF Equalizer',
          'BER / BLER', 'Кодовый выигрыш', 'CSV Export'].map(tag => (
          <span key={tag} className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded-full font-medium">{tag}</span>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
      {[
        {
          id: 'intro' as ChapterId, icon: '📋', title: 'Введение',
          desc: 'Актуальность, цель и задачи исследования. Объект и предмет, методологическая основа. Структура ВКР.',
          color: 'border-indigo-200 bg-indigo-50', btn: 'bg-indigo-700'
        },
        {
          id: 'ch1' as ChapterId, icon: '📡', title: 'Глава 1',
          desc: 'Теоретические основы 5G NR. Модели каналов AWGN и Rayleigh. Метрики BER/BLER/SNR. LDPC vs турбо-коды. Роль имитационного моделирования.',
          color: 'border-blue-200 bg-blue-50', btn: 'bg-blue-700'
        },
        {
          id: 'ch2' as ChapterId, icon: '📊', title: 'Глава 2',
          desc: 'Постановка задачи. Структурная схема системы. Математическое описание: LDPC, QAM, OFDM, MIMO, NMS-декодер. Метрики и алгоритм эксперимента.',
          color: 'border-green-200 bg-green-50', btn: 'bg-green-700'
        },
        {
          id: 'ch3' as ChapterId, icon: '🔬', title: 'Глава 3',
          desc: 'Архитектура «LDPC Research Studio». Базовые графы BG1/BG2. Оптимизация параметра α NMS. Моделирование MIMO 2×2. Сводный анализ профилей LDPC.',
          color: 'border-yellow-200 bg-yellow-50', btn: 'bg-yellow-600'
        },
        {
          id: 'ch4' as ChapterId, icon: '💻', title: 'Глава 4',
          desc: 'Реализация PHY-уровня. Верификация: 47/47 JUnit-тестов. Вычислительные эксперименты. Кодовый выигрыш 5.0–8.0 дБ. UI и CSV-экспорт.',
          color: 'border-purple-200 bg-purple-50', btn: 'bg-purple-700'
        },
        {
          id: 'conclusion' as ChapterId, icon: '🎓', title: 'Заключение',
          desc: 'Основные результаты и выводы. Достигнутые показатели BER, кодового выигрыша, верификации. Перспективы развития.',
          color: 'border-rose-200 bg-rose-50', btn: 'bg-rose-700'
        },
      ].map(({ id, icon, title, desc, color, btn }) => (
        <div key={id} className={`border rounded-xl p-5 ${color} flex flex-col`}>
          <div className="text-3xl mb-2">{icon}</div>
          <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 flex-1 mb-4">{desc}</p>
          <button
            onClick={() => onNavigate(id)}
            className={`${btn} text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition`}
          >
            Перейти →
          </button>
        </div>
      ))}
    </div>

    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 className="font-bold text-gray-900 mb-4 text-lg">📌 Ключевые результаты ВКР</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { val: '5.0 дБ', label: 'Кодовый выигрыш 5G NR BG1 (QPSK, AWGN, BER=10⁻³)', color: 'text-blue-700' },
          { val: '47/47', label: 'Юнит-тесты JUnit 5 — все пройдены без ошибок', color: 'text-green-700' },
          { val: '≤ 2%', label: 'Макс. отклонение BER симуляции от теории', color: 'text-purple-700' },
          { val: '8.0 дБ', label: 'Кодовый выигрыш MIMO 2×2 MRC (QPSK, AWGN)', color: 'text-rose-700' },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <p className={`text-3xl font-black ${item.color} mb-1`}>{item.val}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Introduction: React.FC<{ onNavigate: (id: ChapterId) => void }> = ({ onNavigate }) => (
  <div>
    <h2 className="text-2xl font-bold text-center text-indigo-900 mb-2 uppercase tracking-wide">
      ВВЕДЕНИЕ
    </h2>
    <div className="w-24 h-1 bg-indigo-500 mx-auto mb-8 rounded" />

    <Para>
      Развитие современных мобильных сетей связи сопровождается постоянным ростом требований
      к скорости передачи данных, надёжности канала, устойчивости к шумам и помехам, а также
      к эффективности использования частотного ресурса. Особую роль в этом процессе играют сети
      пятого поколения, ориентированные на поддержку широкополосной связи, массового интернета вещей
      и сервисов с повышенными требованиями к качеству передачи информации. В реальных условиях
      цифровой канал мобильной связи подвержен воздействию аддитивного шума, многолучевого
      распространения, замираний и других искажающих факторов, что приводит к возникновению ошибок
      при передаче данных. В связи с этим особую значимость приобретают методы помехоустойчивого
      кодирования, позволяющие повысить достоверность передачи информации в условиях неблагоприятного канала.
    </Para>
    <Para>
      Современные телекоммуникационные системы переживают период интенсивного технологического
      роста, обусловленного лавинообразным увеличением объёмов передаваемых данных, появлением
      новых классов устройств и сервисов, а также стремлением к повсеместной связи с высокими
      гарантиями надёжности и минимальными задержками. Стандарт мобильной связи пятого поколения
      (5G NR) ориентирован на три принципиально различных класса применений: широкополосный
      мобильный интернет (eMBB), сверхнадёжную связь с малыми задержками (URLLC) и массовые
      IoT-подключения (mMTC). Переход от LTE к 5G NR потребовал пересмотра всего стека технологий
      физического уровня, включая замену турбо-кодов на квазициклические LDPC-коды.
    </Para>
    <Para>
      Всё вышесказанное определило актуальность темы выпускной квалификационной работы —
      исследование и моделирование системы помехоустойчивого кодирования в зашумлённом цифровом
      канале мобильной сети 5G.
    </Para>
    <Para>
      <strong>Целью ВКР</strong> является исследование влияния помехоустойчивого кодирования на качество
      передачи цифровых данных в зашумлённом канале мобильной сети 5G и разработка программного средства
      для имитационного моделирования, анализа и визуализации результатов вычислительных экспериментов.
    </Para>
    <Para>
      Для достижения поставленной цели необходимо решить следующие основные задачи:
    </Para>

    <ul className="list-none mb-5 space-y-2 pl-4">
      {[
        'проанализировать особенности передачи цифровых данных в мобильных сетях пятого поколения, включая модели каналов AWGN и Rayleigh fading;',
        'рассмотреть влияние шума и замираний на качество цифрового канала связи и классифицировать их типы;',
        'исследовать основные показатели качества передачи данных, включая BER, BLER и SNR;',
        'изучить методы помехоустойчивого кодирования и особенности применения LDPC-кодов в системах 5G NR (стандарт 3GPP TS 38.212);',
        'провести математическое описание компонентов модели: LDPC-кодирования, алгоритма NMS, OFDM- и MIMO-систем;',
        'разработать имитационную модель передачи цифровых данных в зашумлённом канале и реализовать программное средство «LDPC Research Studio»;',
        'провести вычислительные эксперименты и проанализировать эффективность помехоустойчивого кодирования при различных сценариях.',
      ].map((task, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-800 leading-6 text-sm md:text-base">
          <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
          <span>{task}</span>
        </li>
      ))}
    </ul>

    <Para>
      <strong>Объектом исследования</strong> является процесс передачи цифровых данных в зашумлённом
      канале мобильной сети пятого поколения стандарта 5G NR.
    </Para>
    <Para>
      <strong>Предметом исследования</strong> является система помехоустойчивого кодирования, методы
      имитационного моделирования цифрового канала связи и программные средства анализа характеристик
      передачи данных в 5G-подобной среде. В частности, исследуются LDPC-коды с базовыми графами
      BG1 и BG2, алгоритм нормализованного min-sum декодирования, а также влияние модуляции,
      типа канала и MIMO-конфигурации на метрики BER и BLER.
    </Para>
    <Para>
      <strong>Методологической основой</strong> является совокупность теоретических и практических
      методов, применяемых в теории кодирования: алгебраический анализ линейных кодов, теория
      информации и граница Шеннона, имитационное моделирование на основе метода Монте-Карло,
      алгоритмическое тестирование, верификация на основе сравнения с аналитическими формулами
      физического уровня 5G (3GPP TS 38.214).
    </Para>
    <Para>
      Основными источниками информации для написания работы послужили учебная и научная литература
      по теории связи, цифровой обработке сигналов и помехоустойчивому кодированию, современные
      публикации по технологиям мобильных сетей 5G, а также технические спецификации 3GPP, посвящённые
      LDPC-кодированию, OFDM- и MIMO-режимам передачи данных.
    </Para>
    <Para>
      <strong>Структура работы.</strong> Работа состоит из введения, четырёх глав, заключения и
      списка литературы.
    </Para>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
      {[
        { id: 'ch1' as ChapterId, icon: '📡', title: 'Глава 1', desc: 'Раскрывает теоретические основы передачи цифровых данных и помехоустойчивого кодирования в мобильных сетях 5G, особенности влияния шума, замираний, а также обоснование применения LDPC-кодов.', color: 'border-blue-200 bg-blue-50', btn: 'bg-blue-700' },
        { id: 'ch2' as ChapterId, icon: '📊', title: 'Глава 2', desc: 'Посвящена постановке задачи исследования, разработке структурной и математической модели системы передачи данных, определению показателей качества и алгоритма проведения эксперимента.', color: 'border-green-200 bg-green-50', btn: 'bg-green-700' },
        { id: 'ch3' as ChapterId, icon: '🔬', title: 'Глава 3', desc: 'Содержит описание разработки программного средства: архитектуры MVC, базовых графов BG1/BG2, оптимизации параметра NMS и результатов моделирования MIMO 2×2.', color: 'border-yellow-200 bg-yellow-50', btn: 'bg-yellow-600' },
        { id: 'ch4' as ChapterId, icon: '💻', title: 'Глава 4', desc: 'Посвящена анализу результатов вычислительных экспериментов, верификации программного средства (47/47 тестов) и оценке кодового выигрыша в различных сценариях.', color: 'border-purple-200 bg-purple-50', btn: 'bg-purple-700' },
      ].map(({ id, icon, title, desc, color, btn }) => (
        <div key={id} className={`border rounded-lg p-4 ${color} flex flex-col`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{icon}</span>
            <span className="font-bold text-gray-900">{title}</span>
          </div>
          <p className="text-sm text-gray-600 flex-1 mb-3">{desc}</p>
          <button onClick={() => onNavigate(id)} className={`${btn} text-white text-xs px-3 py-1.5 rounded-md hover:opacity-90 w-fit`}>
            Читать →
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Conclusion: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-center text-rose-900 mb-2 uppercase tracking-wide">
      ЗАКЛЮЧЕНИЕ
    </h2>
    <div className="w-24 h-1 bg-rose-500 mx-auto mb-8 rounded" />

    <Para>
      В результате выполнения выпускной квалификационной работы проведено комплексное исследование
      системы помехоустойчивого кодирования в зашумлённом канале мобильной сети 5G NR, а также
      разработано программное средство имитационного моделирования «LDPC Research Studio».
    </Para>

    <Para>
      В первой главе выполнен теоретико-аналитический обзор особенностей передачи данных в мобильных
      сетях пятого поколения. Рассмотрены архитектура 5G NR и три класса сервисов (eMBB, URLLC, mMTC).
      Проанализированы модели радиоканала AWGN и Rayleigh fading, дано математическое описание
      распределений и их влияния на BER. Определены ключевые метрики качества передачи (BER, BLER, SNR,
      кодовый выигрыш, спектральная эффективность). Обоснован переход от турбо-кодов к LDPC-кодам
      в стандарте 5G NR (3GPP TS 38.212) и рассмотрена методологическая база имитационного
      моделирования методом Монте-Карло.
    </Para>

    <Para>
      Во второй главе сформулирована задача имитационного моделирования, разработана структурная
      схема системы передачи данных с помехоустойчивым кодированием, охватывающая полный тракт
      от источника информации до блока оценки метрик. Дано детальное математическое описание
      каждого компонента: LDPC-кодирования (формула QC-структуры матрицы H), модуляции BPSK/QPSK/16-QAM,
      OFDM-мультиплексирования с циклическим префиксом, MIMO 2×2 с ZF-эквализацией,
      NMS-декодирования (формула обновления сообщений при α=0.80). Определены семь показателей
      качества и описан алгоритм эксперимента на базе метода Монте-Карло.
    </Para>

    <Para>
      В третьей главе разработана многоуровневая архитектура программного средства «LDPC Research Studio»
      по паттерну MVC на стеке Java 17 + JavaFX 17.0.10. Описано проектирование базовых графов BG1
      (46×68) и BG2 (42×52) с матрицами циклических сдвигов согласно TS 38.212. Проведена
      параметрическая оптимизация алгоритма NMS, в результате которой установлено оптимальное
      значение коэффициента нормализации α = 0.80, обеспечивающее максимальный кодовый выигрыш 5.0 дБ.
      Выполнено сравнительное моделирование конфигураций SISO и MIMO 2×2 (MRC и ZF), показавшее
      дополнительный выигрыш MRC около 3 дБ по сравнению с SISO при BER = 10⁻⁴.
    </Para>

    <Para>
      В четвёртой главе проведён полный цикл верификации и вычислительных экспериментов.
      Автоматизированное тестирование (JUnit 5) показало 100% успешность: 47 из 47 тестов прошли
      без ошибок. Верификация BER-кривой некодированной BPSK в канале AWGN подтвердила корректность
      канального движка: максимальное отклонение от теоретических значений не превысило 2%. По
      результатам шести серий вычислительных экспериментов установлено, что профиль 5G NR BG1
      с алгоритмом NMS при α = 0.80 обеспечивает кодовый выигрыш от 5.0 дБ (QPSK, AWGN) до
      8.0 дБ (QPSK, MIMO 2×2 MRC) при целевом BER = 10⁻³.
    </Para>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {[
        { val: '5.0 дБ', label: 'Кодовый выигрыш BG1 QPSK AWGN', color: 'bg-blue-50 border-blue-200 text-blue-800' },
        { val: '6.7 дБ', label: 'Кодовый выигрыш BG1 16-QAM Rayleigh', color: 'bg-green-50 border-green-200 text-green-800' },
        { val: '8.0 дБ', label: 'Кодовый выигрыш BG1 MIMO 2×2 MRC', color: 'bg-purple-50 border-purple-200 text-purple-800' },
        { val: '47/47', label: 'Юнит-тестов пройдено (100%)', color: 'bg-rose-50 border-rose-200 text-rose-800' },
      ].map((item, i) => (
        <div key={i} className={`border rounded-xl p-4 text-center ${item.color}`}>
          <p className="text-3xl font-black mb-1">{item.val}</p>
          <p className="text-xs font-medium">{item.label}</p>
        </div>
      ))}
    </div>

    <Para>
      Таким образом, все поставленные задачи ВКР успешно выполнены. Разработанное программное
      средство «LDPC Research Studio» позволяет проводить гибкие имитационные эксперименты с
      LDPC-кодированием в каналах мобильных сетей 5G, сравнивать сценарии в режиме A/B, выполнять
      пакетные расчёты и экспортировать результаты в CSV. Полученные результаты подтверждают
      высокую эффективность LDPC-кодов стандарта 5G NR и перспективность их применения в
      современных и перспективных системах мобильной связи.
    </Para>

    <Para>
      Перспективами дальнейшего развития являются: расширение поддержки профилей LDPC (BG2, увеличенные
      Z), реализация алгоритма Belief Propagation (SPA) для сравнения с NMS, моделирование
      частотно-избирательных замираний (многолучевые профили каналов 3GPP CDL), добавление схем
      Polar-кодирования (применяемых для управляющих каналов 5G NR), а также интеграция с Python/NumPy
      для расширенного статистического анализа.
    </Para>
  </div>
);

export default function App() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (id: ChapterId) => {
    setActiveChapter(id);
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const activeNav = navItems.find(n => n.id === activeChapter);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-blue-700 font-black text-lg">5G NR</span>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="hidden sm:block text-gray-600 text-sm font-medium">Помехоустойчивое кодирование</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`hidden lg:flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition font-medium
                  ${activeChapter === item.id
                    ? `${item.activeColor} border-transparent`
                    : 'text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-2 text-sm px-3 py-2.5 rounded-lg transition font-medium
                  ${activeChapter === item.id ? `${item.activeColor}` : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <p className="text-xs text-gray-500">
            ВКР / {activeNav?.label}
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {activeChapter === 'overview' && <Overview onNavigate={navigate} />}
          {activeChapter === 'intro' && <Introduction onNavigate={navigate} />}
          {activeChapter === 'ch1' && <Chapter1 />}
          {activeChapter === 'ch2' && <Chapter2 />}
          {activeChapter === 'ch3' && <Chapter3 />}
          {activeChapter === 'ch4' && <Chapter4 />}
          {activeChapter === 'conclusion' && <Conclusion />}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between items-center mt-6">
          {(() => {
            const idx = navItems.findIndex(n => n.id === activeChapter);
            const prev = navItems[idx - 1];
            const next = navItems[idx + 1];
            return (
              <>
                {prev ? (
                  <button
                    onClick={() => navigate(prev.id)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-lg transition"
                  >
                    ← {prev.shortLabel}
                  </button>
                ) : <div />}
                {next ? (
                  <button
                    onClick={() => navigate(next.id)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-lg transition"
                  >
                    {next.shortLabel} →
                  </button>
                ) : <div />}
              </>
            );
          })()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-8">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
          ВКР: «Исследование и моделирование системы помехоустойчивого кодирования в зашумлённом канале мобильной сети 5G» · 5G NR LDPC Research Studio
        </div>
      </footer>
    </div>
  );
}
