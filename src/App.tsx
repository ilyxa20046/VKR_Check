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
    id: 'intro',
    label: 'Введение',
    shortLabel: 'Введение',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-300',
    activeColor: 'bg-indigo-700 text-white',
    icon: '📋'
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
    label: 'Глава 3. Проектирование',
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
  {
    id: 'conclusion',
    label: 'Заключение',
    shortLabel: 'Заключение',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-300',
    activeColor: 'bg-rose-700 text-white',
    icon: '🎓'
  },
];

const tags = [
  'LDPC BG1/BG2', 'Учебный (24,12)', 'QC-LDPC (96,48)', 'NMS Decoder',
  'AWGN Channel', 'Rayleigh Fading', 'BPSK / QPSK', '16-QAM',
  'OFDM-64/128', 'SISO / 2×2 MIMO', 'ZF Equalizer', 'CRC-16',
  'BER / BLER', 'Throughput', 'Coding Gain', 'Spectral Eff.',
  'A/B Compare', 'Batch Mode', 'CSV Export', 'Defence Mode',
];

const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-800 leading-7 mb-3 text-justify indent-8">{children}</p>
);

const Introduction: React.FC<{ onNavigate: (id: ChapterId) => void }> = ({ onNavigate }) => (
  <div>
    <h2 className="text-2xl font-bold text-center text-indigo-900 mb-2 uppercase tracking-wide">
      ВВЕДЕНИЕ
    </h2>
    <div className="w-24 h-1 bg-indigo-500 mx-auto mb-8 rounded" />

    <Para>
      Современные телекоммуникационные системы переживают период интенсивного технологического
      роста, обусловленного лавинообразным увеличением объёмов передаваемых данных, появлением
      новых классов устройств и сервисов, а также стремлением к повсеместной связи с высокими
      гарантиями надёжности и минимальными задержками. В качестве ответа отрасли на эти вызовы
      был разработан стандарт мобильной связи пятого поколения (5G NR), ориентированный на три
      принципиально различных класса применений: широкополосный мобильный интернет (eMBB),
      сверхнадёжную связь с малыми задержками (URLLC) и массовые IoT-подключения (mMTC).
    </Para>
    <Para>
      Одной из ключевых технологий, обеспечивающих надёжность передачи данных на физическом уровне
      5G NR, являются коды с малой плотностью проверок на чётность (LDPC — Low-Density Parity-Check
      codes). Стандартом 3GPP Release 15 (технический документ TS 38.212) утверждены
      квазициклические LDPC-коды с двумя базовыми графами — BG1 и BG2 — в качестве единственного
      метода прямого исправления ошибок (FEC) для каналов данных физического уровня 5G NR.
      Переход от турбо-кодов (применявшихся в LTE) к LDPC обусловлен рядом их преимуществ:
      более низкой вычислительной сложностью при длинных блоках, лучшей производительностью
      в высоком SNR, регулярной QC-структурой, допускающей эффективную аппаратную реализацию.
    </Para>
    <Para>
      Целью данной выпускной квалификационной работы является исследование и моделирование системы
      помехоустойчивого кодирования в зашумлённом канале мобильной сети 5G и разработка программного
      средства для интерактивного моделирования, анализа и сравнения эффективности помехоустойчивого
      кодирования при различных сценариях: типах канала, схемах модуляции, параметрах декодирования
      и конфигурациях антенных систем.
    </Para>
    <Para>
      Для достижения поставленной цели необходимо решить следующий ряд задач:
    </Para>

    <ul className="list-none mb-4 space-y-2 pl-4">
      {[
        'провести теоретико-аналитическое исследование особенностей передачи данных в мобильных сетях пятого поколения, включая модели каналов AWGN и Rayleigh fading;',
        'изучить и классифицировать виды помех и замирания по различным типам каналов мобильной связи;',
        'исследовать основные показатели качества передачи данных, включая метрики BER, BLER и SNR;',
        'провести анализ помехоустойчивого кодирования и применения LDPC-кодов в стандарте 5G NR;',
        'изучить ограничения современных методов кодирования при использовании систем с высокими требованиями к надёжности;',
        'провести математическое описание компонентов модели: LDPC-кодирования, алгоритма NMS, OFDM- и MIMO-систем;',
        'разработать программное средство моделирования и обеспечить его верификацию через автоматизированное тестирование.',
      ].map((task, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-800 leading-6 text-sm md:text-base">
          <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
          <span>{task}</span>
        </li>
      ))}
    </ul>

    <Para>
      Объектом исследования является процесс передачи данных в зашумлённом канале мобильной сети
      пятого поколения стандарта 5G NR.
    </Para>
    <Para>
      Предметом исследования является помехоустойчивое кодирование, методы итеративного декодирования,
      влияние параметров кодовой системы на метрики качества передачи данных в 5G-каналах.
    </Para>
    <Para>
      Методологической основой является совокупность теоретических и практических методов,
      применяемых в теории кодирования: алгебраический анализ линейных кодов, теория информации
      и граница Шеннона, имитационное моделирование на основе метода Монте-Карло, алгоритмическое
      тестирование, верификация на основе сравнения с аналитическими формулами физического уровня 5G.
    </Para>
    <Para>
      Структура работы. Работа состоит из введения, четырёх глав, заключения и списка литературы.
    </Para>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
      {[
        { id: 'ch1' as ChapterId, icon: '📡', title: 'Глава 1', desc: 'Посвящена теоретическому анализу радиоканала, классификации кодов, типам замираний и обоснованию применения LDPC в 5G NR.', color: 'border-blue-200 bg-blue-50' },
        { id: 'ch2' as ChapterId, icon: '📊', title: 'Глава 2', desc: 'Содержит математическое описание системы, формализацию задачи, детальное описание компонентов модели и результаты аналитического моделирования.', color: 'border-green-200 bg-green-50' },
        { id: 'ch3' as ChapterId, icon: '🔬', title: 'Глава 3', desc: 'Посвящена проектированию базовых графов BG1/BG2, параметрической оптимизации алгоритма NMS, моделированию MIMO 2×2 и сводному анализу результатов.', color: 'border-yellow-200 bg-yellow-50' },
        { id: 'ch4' as ChapterId, icon: '💻', title: 'Глава 4', desc: 'Описывает разработанное программное средство «LDPC Research Studio»: MVC-архитектуру, реализацию физического уровня, интерфейс и верификацию JUnit.', color: 'border-purple-200 bg-purple-50' },
      ].map(({ id, icon, title, desc, color }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`text-left border-2 ${color} rounded-xl p-4 hover:shadow-md transition-all group`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <h4 className="font-bold text-gray-800 text-sm mb-1">{title}</h4>
              <p className="text-xs text-gray-600 leading-5">{desc}</p>
            </div>
          </div>
        </button>
      ))}
    </div>

    <Para>
      В заключении сформулированы основные научные и практические результаты работы, подтверждённые
      данными моделирования.
    </Para>
  </div>
);

const Conclusion: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-center text-rose-900 mb-2 uppercase tracking-wide">
      ЗАКЛЮЧЕНИЕ
    </h2>
    <div className="w-24 h-1 bg-rose-500 mx-auto mb-8 rounded" />

    <Para>
      В результате выполнения выпускной квалификационной работы решён комплекс задач по исследованию
      и моделированию системы помехоустойчивого кодирования в зашумлённом канале мобильной сети 5G NR.
      Полученные результаты обладают теоретической новизной, практической ценностью и соответствуют
      актуальным требованиям отрасли мобильных телекоммуникаций.
    </Para>

    <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 my-6">
      <h3 className="font-bold text-rose-900 mb-4 text-sm uppercase tracking-wide">
        Основные результаты и выводы работы:
      </h3>
      <div className="space-y-3">
        {[
          {
            num: '1',
            text: 'Проведён теоретико-аналитический анализ особенностей радиоканала мобильной сети 5G NR, включая модели AWGN и Rayleigh fading. Установлено, что для достижения BER = 10⁻³ в канале Рэлея без кодирования требуется на 10–15 дБ большее значение Eb/N0 по сравнению с каналом AWGN, что количественно обосновывает необходимость применения FEC-кодирования.',
          },
          {
            num: '2',
            text: 'Выполнен анализ математических основ LDPC-кодирования и алгоритма нормализованного min-sum (NMS). Показано, что разреженность матрицы H (плотность ~2% для BG1) обеспечивает линейную сложность кодирования и декодирования O(n), что принципиально отличает LDPC от сверточных и турбо-кодов.',
          },
          {
            num: '3',
            text: 'Разработана и верифицирована математическая модель полного тракта физического уровня: источник → LDPC кодер → QAM модулятор → OFDM IFFT → канал (AWGN/Rayleigh/MIMO) → демодулятор → NMS декодер → метрики. Модель соответствует требованиям стандарта 3GPP TS 38.212.',
          },
          {
            num: '4',
            text: 'По результатам моделирования установлено, что профиль 5G NR BG1 (Z=8, QPSK, AWGN) обеспечивает максимальный Coding Gain = 5,0 дБ при BER = 10⁻³, порог декодирования 0,8 дБ и максимальную эффективную пропускную способность 9,3 Мбит/с при SNR ≥ 5 дБ.',
          },
          {
            num: '5',
            text: 'Проведена параметрическая оптимизация алгоритма NMS: установлено оптимальное значение коэффициента нормировки α = 0,80, обеспечивающее максимальный Coding Gain и наилучшую скорость сходимости. При α = 0,80 и SNR ≥ 8 дБ алгоритм сходится за 3–5 итераций в 99,9% случаев.',
          },
          {
            num: '6',
            text: 'Исследована система MIMO 2×2 с LDPC-кодированием: MRC-комбинирование обеспечивает разнесение второго порядка (снижение BER на 2–3 порядка при SNR = 5 дБ по сравнению с SISO), что подтверждает эффективность совместного применения пространственного разнесения и FEC-кодирования.',
          },
          {
            num: '7',
            text: 'Разработано программное средство «LDPC Research Studio» на Java 17 + JavaFX по паттерну MVC. Приложение поддерживает 3 LDPC-профиля, 3 схемы модуляции, 3 модели канала, 5 функциональных экранов, пакетный режим, CSV-экспорт и специальный режим защиты ВКР.',
          },
          {
            num: '8',
            text: 'Верификация программного средства подтвердила корректность реализации: 47 из 47 JUnit-тестов пройдено успешно, расхождение смоделированных BER-кривых с теоретическими значениями не превышает 0,3 дБ по оси SNR.',
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
            <div className="bg-rose-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              {item.num}
            </div>
            <p className="text-sm text-gray-700 leading-6">{item.text}</p>
          </div>
        ))}
      </div>
    </div>

    <Para>
      Практическая значимость работы определяется созданием инструментального программного средства,
      пригодного для использования в учебном процессе при изучении дисциплин «Теория помехоустойчивого
      кодирования», «Системы мобильной связи 5G» и «Моделирование телекоммуникационных систем», а
      также в качестве базового инструмента исследований при проектировании физического уровня
      5G-систем в производственных условиях.
    </Para>
    <Para>
      Направления дальнейших исследований: расширение модели на LDPC-коды с перфорацией и
      согласованием скорости (rate matching) в соответствии с полной спецификацией 3GPP TS 38.212;
      реализация MMSE-эквализатора для MIMO; добавление турбо-кода LTE для сравнительного анализа;
      интеграция реалистичных моделей канала 3GPP CDL/TDL для частотно-избирательных замираний.
    </Para>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
      {[
        { value: '5,0 дБ', label: 'Coding Gain 5G NR BG1', color: 'text-blue-700', bg: 'bg-blue-50' },
        { value: '9,3 Мбит/с', label: 'Max пропускная способность', color: 'text-green-700', bg: 'bg-green-50' },
        { value: 'α = 0,80', label: 'Оптимальный параметр NMS', color: 'text-yellow-700', bg: 'bg-yellow-50' },
        { value: '47/47', label: 'JUnit-тестов пройдено', color: 'text-purple-700', bg: 'bg-purple-50' },
      ].map((item, i) => (
        <div key={i} className={`${item.bg} rounded-xl p-4 text-center`}>
          <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
          <div className="text-xs text-gray-600 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  </div>
);

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
      <div className="flex flex-wrap justify-center gap-3 mt-6 px-4">
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
          id: 'intro' as ChapterId,
          ch: 'В', color: 'bg-indigo-600', border: 'border-indigo-200', bg: 'bg-indigo-50',
          title: 'Введение',
          desc: 'Актуальность, цель и задачи ВКР, объект и предмет исследования, методологическая основа, структура работы',
          sections: ['Цель работы', 'Задачи', 'Объект/Предмет', 'Методология', 'Структура']
        },
        {
          id: 'ch1' as ChapterId,
          ch: '1', color: 'bg-blue-600', border: 'border-blue-200', bg: 'bg-blue-50',
          title: 'Глава 1. Теоретические основы',
          desc: 'Радиоканал 5G NR, замирания AWGN/Rayleigh, метрики BER/BLER/SNR, математика LDPC-кодов, алгоритм BP/NMS',
          sections: ['1.1 Радиоканал 5G', '1.2 Виды замираний', '1.3 Метрики BER/BLER', '1.4 LDPC в 5G', '1.5 Актуальность']
        },
        {
          id: 'ch2' as ChapterId,
          ch: '2', color: 'bg-green-600', border: 'border-green-200', bg: 'bg-green-50',
          title: 'Глава 2. Анализ методов',
          desc: 'Математическое описание системы, структура канала, компоненты модели, результаты: BER, BLER, TP, SE, Coding Gain',
          sections: ['2.1 Постановка задачи', '2.2 Структурная схема', '2.3 Компоненты модели', '2.4 Результаты', '2.5 Сравнение']
        },
        {
          id: 'ch3' as ChapterId,
          ch: '3', color: 'bg-yellow-600', border: 'border-yellow-200', bg: 'bg-yellow-50',
          title: 'Глава 3. Проектирование',
          desc: 'Системная модель канала, базовые графы BG1/BG2, оптимизация NMS (α=0.80), моделирование MIMO 2×2, сводные результаты',
          sections: ['3.1 Системная модель', '3.2 BG1/BG2', '3.3 Оптимизация NMS', '3.4 MIMO 2×2', '3.5 Сводные итоги']
        },
        {
          id: 'ch4' as ChapterId,
          ch: '4', color: 'bg-purple-600', border: 'border-purple-200', bg: 'bg-purple-50',
          title: 'Глава 4. Программное средство',
          desc: 'Архитектура MVC, реализация PHY-уровня (LdpcCodec, ChannelEngine), UI-экраны, верификация JUnit 47/47, экспорт CSV',
          sections: ['4.1 Архитектура MVC', '4.2 LDPC-кодек', '4.3 ChannelEngine', '4.4 Интерфейс', '4.5 JUnit 47/47']
        },
        {
          id: 'conclusion' as ChapterId,
          ch: 'З', color: 'bg-rose-600', border: 'border-rose-200', bg: 'bg-rose-50',
          title: 'Заключение',
          desc: 'Основные результаты и выводы, практическая значимость, направления дальнейших исследований',
          sections: ['8 ключевых выводов', 'Практическая значимость', 'Дальнейшие исследования']
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
      <h3 className="font-bold text-gray-700 mb-3 text-sm">Реализованные компоненты системы</h3>
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
        { value: 'α=0,80', label: 'Оптимальный параметр NMS', color: 'text-yellow-700', bg: 'bg-yellow-50' },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNav = navItems.find(n => n.id === activeChapter)!;

  const navigate = (id: ChapterId) => {
    setActiveChapter(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(v => !v)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm font-bold text-gray-800 hidden sm:block">
              📡 ВКР: LDPC в 5G NR
            </span>
            <span className="text-sm font-bold text-gray-800 sm:hidden">📡 ВКР</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden md:block">3GPP TS 38.212 · Java 17 + JavaFX · 2026</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${activeNav.activeColor}`}>
              {activeNav.icon} {activeNav.shortLabel}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200
          z-40 transition-transform duration-300 overflow-y-auto
          w-64 shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-3 space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 py-1">Навигация</p>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2.5 text-sm
                  ${activeChapter === item.id
                    ? `${item.activeColor} shadow-sm font-semibold`
                    : `${item.color} hover:${item.bgColor} hover:shadow-sm`
                  }
                `}
              >
                <span className="text-base">{item.icon}</span>
                <span className="leading-tight">{item.label}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-gray-100 mt-4">
              <p className="text-xs text-gray-400 px-2 mb-2 font-bold uppercase tracking-wider">Ключевые результаты</p>
              {[
                { label: 'Coding Gain BG1', value: '5,0 дБ', color: 'text-blue-600' },
                { label: 'Оптимальный α', value: '0,80', color: 'text-yellow-600' },
                { label: 'Max TP', value: '9,3 Мбит/с', color: 'text-green-600' },
                { label: 'JUnit тесты', value: '47/47 ✅', color: 'text-purple-600' },
              ].map((r, i) => (
                <div key={i} className="px-2 py-1.5 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{r.label}</span>
                  <span className={`text-xs font-bold ${r.color}`}>{r.value}</span>
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {activeChapter === 'overview' && <Overview onNavigate={navigate} />}
            {activeChapter === 'intro' && <Introduction onNavigate={navigate} />}
            {activeChapter === 'ch1' && <Chapter1 />}
            {activeChapter === 'ch2' && <Chapter2 />}
            {activeChapter === 'ch3' && <Chapter3 />}
            {activeChapter === 'ch4' && <Chapter4 />}
            {activeChapter === 'conclusion' && <Conclusion />}

            {/* Bottom navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
              {(() => {
                const idx = navItems.findIndex(n => n.id === activeChapter);
                const prev = navItems[idx - 1];
                const next = navItems[idx + 1];
                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => navigate(prev.id)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
                      >
                        ← {prev.icon} {prev.shortLabel}
                      </button>
                    ) : <div />}
                    {next ? (
                      <button
                        onClick={() => navigate(next.id)}
                        className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition text-white ${next.activeColor.replace('text-white', '')} shadow-sm`}
                      >
                        {next.icon} {next.shortLabel} →
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
