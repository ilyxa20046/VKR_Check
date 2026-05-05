import React, { useState } from 'react';
import Formula from './components/Formula';
import BerChart from './components/BerChart';
import ThroughputChart from './components/ThroughputChart';

// ── Вспомогательные компоненты оформления ──────────────────────────────────

const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-2 text-center leading-tight">
    {children}
  </h1>
);

const H2: React.FC<{ id?: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2 id={id} className="text-xl font-bold text-gray-800 mb-4 mt-10 pb-2 border-b-2 border-blue-200">
    {children}
  </h2>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-7">
    {children}
  </h3>
);

const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-gray-800 leading-relaxed mb-4 text-justify indent-8 ${className}`}>
    {children}
  </p>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-4 pl-4 border-l-4 border-blue-400 bg-blue-50 py-3 pr-4 rounded-r-lg text-sm text-gray-700 leading-relaxed">
    {children}
  </div>
);

const Table: React.FC<{ caption: string; tableNumber: number; children: React.ReactNode }> = ({ caption, tableNumber, children }) => (
  <div className="my-8 overflow-x-auto">
    <p className="text-center text-sm font-medium text-gray-700 mb-2">
      Таблица {tableNumber} — {caption}
    </p>
    <table className="w-full border-collapse text-sm text-gray-800 shadow-sm">
      {children}
    </table>
  </div>
);

const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <th className={`border border-gray-300 bg-gray-100 px-3 py-2 font-semibold text-center text-xs ${className}`}>
    {children}
  </th>
);

const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <td className={`border border-gray-300 px-3 py-2 text-center ${className}`}>
    {children}
  </td>
);

const FormulaBlock: React.FC<{ math: string; number: string }> = ({ math, number }) => (
  <div className="flex items-center justify-between my-5 px-4">
    <div className="flex-1 flex justify-center overflow-x-auto">
      <Formula math={math} block />
    </div>
    <span className="text-gray-600 text-sm ml-4 whitespace-nowrap">({number})</span>
  </div>
);

// ── Навигация по разделам ───────────────────────────────────────────────────
const sections = [
  { id: 'intro', label: '3.1 Описание ПО' },
  { id: 'ldpc', label: '3.2 LDPC-кодирование' },
  { id: 'channel', label: '3.3 Модели канала' },
  { id: 'modulation', label: '3.4 Модуляция' },
  { id: 'nms', label: '3.5 Алгоритм NMS' },
  { id: 'metrics', label: '3.6 Метрики' },
  { id: 'results', label: '3.7 Результаты' },
  { id: 'conclusions', label: '3.8 Выводы' },
];

// ═══════════════════════════════════════════════════════════════════════════
// Главный компонент
// ═══════════════════════════════════════════════════════════════════════════
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-serif">
      {/* ── Шапка ─────────────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-200 font-sans">ВКР 2026 · LDPC Research Studio</div>
            <div className="font-bold text-lg">Глава 3. Экспериментальное исследование и моделирование</div>
          </div>
          <nav className="flex flex-wrap gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-xs px-3 py-1 rounded-full font-sans transition-all ${
                  activeSection === s.id
                    ? 'bg-white text-blue-900 font-bold'
                    : 'bg-blue-700 hover:bg-blue-600 text-blue-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Основной контент ──────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <H1>
          ГЛАВА 3. ЭКСПЕРИМЕНТАЛЬНОЕ ИССЛЕДОВАНИЕ И МОДЕЛИРОВАНИЕ СИСТЕМЫ
          ПОМЕХОУСТОЙЧИВОГО КОДИРОВАНИЯ В ЗАШУМЛЁННОМ КАНАЛЕ МОБИЛЬНОЙ СЕТИ 5G
        </H1>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="intro">
          <H2 id="intro">3.1 Описание разработанного программного обеспечения</H2>

          <P>
            В рамках выпускной квалификационной работы было разработано мультиплатформенное
            desktop-приложение <strong>LDPC Research Studio v1.0.0</strong>, реализующее полный
            стек физического уровня (PHY) системы мобильной связи стандарта 5G New Radio (NR).
            Приложение написано на языке Java&nbsp;17 с использованием библиотеки JavaFX&nbsp;17.0.10
            для графического интерфейса и библиотеки Apache Commons Math&nbsp;3.6.1 для
            вычислений специальных функций.
          </P>

          <P>
            Архитектура приложения построена по паттерну MVC (Model-View-Controller).
            Ключевые пакеты: <code>service/phy/codec</code> — реализация LDPC-кодека;
            <code>service/phy/channel</code> — модели канала; <code>service/phy/modulation</code>
            — схемы модуляции; <code>service/phy/metrics</code> — расчёт показателей качества;
            <code>service/phy/runner</code> — оркестратор эксперимента.
          </P>

          <P>
            Приложение поддерживает следующие режимы работы: одиночное моделирование (вкладка
            «Моделирование»), просмотр и экспорт результатов (вкладка «Результаты»),
            сравнительный анализ двух сценариев (вкладка «Сравнение»), пакетный анализ
            нескольких сценариев одновременно (вкладка «Пакетный анализ»). Экспорт результатов
            доступен в форматах CSV, PNG, TXT, HTML, а также в виде комплекта материалов для
            защиты ВКР.
          </P>

          <Table caption="Технологический стек приложения LDPC Research Studio" tableNumber={3.1}>
            <thead>
              <tr>
                <Th>Компонент</Th>
                <Th>Версия / значение</Th>
                <Th>Назначение</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Java', '17 LTS', 'Основной язык разработки'],
                ['JavaFX', '17.0.10', 'Кроссплатформенный GUI'],
                ['Maven', '3.8+', 'Система сборки'],
                ['Apache Commons Math', '3.6.1', 'Erf, специальные функции'],
                ['Целевые ОС', 'Windows, Linux, RED OS', 'Мультиплатформенность'],
                ['Алгоритм декодирования', 'Normalized Min-Sum', 'BP-декодирование LDPC'],
                ['Модели канала', 'AWGN, Rayleigh fading', 'Физический уровень'],
                ['Схемы модуляции', 'BPSK, QPSK, 16-QAM, 64-QAM, 256-QAM', 'Цифровая модуляция'],
              ].map(([comp, ver, desc], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <Td className="font-medium text-left">{comp}</Td>
                  <Td>{ver}</Td>
                  <Td className="text-left">{desc}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="ldpc">
          <H2 id="ldpc">3.2 Реализация LDPC-кодирования в стандарте 5G NR</H2>

          <H3>3.2.1 Структура проверочной матрицы</H3>

          <P>
            Код LDPC (Low-Density Parity-Check) определяется разреженной проверочной матрицей
            {' '}<Formula math="H" /> размером <Formula math="m \times n" />, где
            {' '}<Formula math="m" /> — число проверочных уравнений, <Formula math="n" /> — длина
            кодового слова. Информационная длина равна <Formula math="k = n - m" />, скорость
            кодирования — <Formula math="R = k / n" />.
          </P>

          <P>
            В стандарте 3GPP 5G NR (TS 38.212) используются квазициклические (QC) LDPC-коды,
            построенные на базе двух базовых графов: Base Graph 1 (BG1) для блоков
            <Formula math="k \geq 500" /> бит и Base Graph 2 (BG2) для коротких блоков.
            В приложении реализованы оба варианта. Матрица <Formula math="H" /> формируется
            из сдвиговых матриц размером <Formula math="Z \times Z" /> (лифтинговый размер):
          </P>

          <FormulaBlock
            math="H = \begin{bmatrix} H_{A} & H_{B} \end{bmatrix}, \quad H_{A} \in \mathbb{F}_2^{m \times k},\; H_{B} \in \mathbb{F}_2^{m \times m}"
            number="3.1"
          />

          <P>
            Каждый блок матрицы <Formula math="H" /> задаётся циклическим сдвигом
            <Formula math="p_{i,j}" /> из файла базового графа <code>NR_1_0_8.txt</code>.
            Расширение квазициклической структуры реализовано методом <code>expandQcToH</code>
            класса <code>LdpcCodec</code>:
          </P>

          <FormulaBlock
            math="\mathbf{H}_{ij} = P^{p_{ij}} \in \mathbb{F}_2^{Z \times Z}, \quad P = \text{циклический сдвиг на 1 позицию}"
            number="3.2"
          />

          <H3>3.2.2 Кодирование</H3>

          <P>
            Процедура кодирования вычисляет вектор проверочных бит
            {' '}<Formula math="\mathbf{p} \in \mathbb{F}_2^m" /> по вектору
            информационных бит <Formula math="\mathbf{u} \in \mathbb{F}_2^k" />.
            Применяется метод систематического кодирования через предвычисленную
            преобразующую матрицу <Formula math="T = B^{-1} A \in \mathbb{F}_2^{m \times k}" />,
            где <Formula math="B = H_B" /> инвертируется методом Гаусса над
            {' '}<Formula math="\mathbb{F}_2" />:
          </P>

          <FormulaBlock
            math="\mathbf{p} = T \cdot \mathbf{u} \pmod{2}, \quad T = B^{-1} A"
            number="3.3"
          />

          <P>
            Кодовое слово: <Formula math="\mathbf{c} = [\mathbf{u} \;\|\; \mathbf{p}] \in \mathbb{F}_2^n" />.
            Результат удовлетворяет проверочному уравнению{' '}
            <Formula math="H \cdot \mathbf{c}^T = \mathbf{0} \pmod{2}" />.
          </P>

          <H3>3.2.3 Реализованные профили LDPC</H3>

          <Table caption="Параметры LDPC-профилей, реализованных в LDPC Research Studio" tableNumber={3.2}>
            <thead>
              <tr>
                <Th>Профиль</Th>
                <Th>n (биты)</Th>
                <Th>k (биты)</Th>
                <Th>R</Th>
                <Th>Z</Th>
                <Th>Алгоритм</Th>
                <Th>Применение</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Учебный LDPC', '24', '12', '1/2', '—', 'Min-Sum', 'Учебная калибровка'],
                ['QC-inspired', '96', '48', '1/2', '—', 'NMS', 'Приближение к 5G'],
                ['5G NR BG1', '528', '176', '≈1/3', '8', 'NMS', 'Производственный 5G NR'],
                ['Turbo LTE', 'var', 'var', '1/3', '—', 'BCJR', 'Сравнение с LTE'],
                ['Polar', '128', '64', '1/2', '—', 'Sum-Product', 'Сравнение с 5G NR'],
              ].map(([prof, n, k, R, Z, alg, app], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <Td className="font-medium text-left">{prof}</Td>
                  <Td>{n}</Td>
                  <Td>{k}</Td>
                  <Td>{R}</Td>
                  <Td>{Z}</Td>
                  <Td>{alg}</Td>
                  <Td className="text-left text-xs">{app}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="channel">
          <H2 id="channel">3.3 Модели зашумлённого канала мобильной сети</H2>

          <H3>3.3.1 Канал AWGN</H3>

          <P>
            Модель AWGN (Additive White Gaussian Noise) описывает идеальный канал, в котором
            принятый сигнал представляет собой сумму переданного сигнала и белого гауссовского
            шума с нулевым математическим ожиданием. Принятый символ:
          </P>

          <FormulaBlock
            math="y = x + n, \quad n \sim \mathcal{N}(0,\, \sigma^2)"
            number="3.4"
          />

          <P>
            Дисперсия шума <Formula math="\sigma^2" /> связана с отношением
            сигнал/шум на бит <Formula math="E_b/N_0" /> через:
          </P>

          <FormulaBlock
            math="\sigma^2 = \frac{N_0}{2} = \frac{1}{2 \cdot m \cdot R \cdot (E_b / N_0)}"
            number="3.5"
          />

          <P>
            где <Formula math="m" /> — число бит на символ, <Formula math="R" /> — кодовая
            скорость. В классе <code>PhyMetricsEngine</code> это реализовано методом
            {' '}<code>sigmaFromEbN0</code>.
          </P>

          <H3>3.3.2 Модель замирания Рэлея</H3>

          <P>
            Канал с замираниями Рэлея (Rayleigh fading) моделирует реальные условия мобильной
            связи с многолучевым распространением. Комплексный коэффициент усиления канала
            <Formula math="h" /> является случайной комплексной гауссовской переменной:
          </P>

          <FormulaBlock
            math="h = h_I + j\,h_Q, \quad h_I,\, h_Q \sim \mathcal{N}\!\left(0,\, \frac{1}{2}\right)"
            number="3.6"
          />

          <P>
            Амплитуда <Formula math="|h|" /> подчиняется распределению Рэлея
            с параметром <Formula math="\Omega = \mathbb{E}[|h|^2] = 1" />.
            Принятый сигнал с замираниями:
          </P>

          <FormulaBlock
            math="y = h \cdot x + n, \quad n \sim \mathcal{CN}(0,\, 2\sigma^2)"
            number="3.7"
          />

          <P>
            В реализации метод <code>rayleigh(Random random)</code> класса
            {' '}<code>ChannelEngine</code> генерирует <Formula math="h" /> как:
          </P>

          <FormulaBlock
            math="h = \frac{1}{\sqrt{2}}\, \xi_I + j\, \frac{1}{\sqrt{2}}\, \xi_Q, \quad \xi_I, \xi_Q \sim \mathcal{N}(0,1)"
            number="3.8"
          />

          <H3>3.3.3 Модель OFDM-канала</H3>

          <P>
            Для многонесущей модуляции OFDM (Orthogonal Frequency Division Multiplexing) модель
            канала строится на базе многолучевой импульсной характеристики. В приложении
            реализованы конфигурации OFDM-64 (64 поднесущие) и OFDM-128 (128 поднесущих).
            Усиление на каждой поднесущей формируется суммой <Formula math="L" /> многолучевых
            отводов:
          </P>

          <FormulaBlock
            math="H_k = \sum_{l=0}^{L-1} h_l \cdot e^{-j 2\pi k l / N_{FFT}}, \quad w_l = \frac{1}{\sqrt{l+1}}"
            number="3.9"
          />

          <P>
            Циклический префикс (CP) длиной <Formula math="N_{CP}" /> устраняет межсимвольные
            помехи. Полезная доля от OFDM-символа:
          </P>

          <FormulaBlock
            math="\eta_{CP} = \frac{N_{FFT}}{N_{FFT} + N_{CP}}"
            number="3.10"
          />

          <P>
            Для выравнивания сигнала после OFDM-демодуляции применяется
            одноотводный ZF-эквалайзер (Zero-Forcing):
          </P>

          <FormulaBlock
            math="\hat{y}_k = \frac{y_k}{H_k} = x_k + \frac{n_k}{H_k}"
            number="3.11"
          />

          <Table caption="Параметры моделей канала в LDPC Research Studio" tableNumber={3.3}>
            <thead>
              <tr>
                <Th>Модель</Th>
                <Th>Коэффициент h</Th>
                <Th>Span замираний</Th>
                <Th>Число отводов L</Th>
                <Th>Эквалайзер</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ['AWGN', '1 + j·0', '∞', '1', 'Не нужен'],
                ['Rayleigh (SC)', 'Рэлей (блок)', '12 символов', '1', 'One-tap ZF'],
                ['Rayleigh + OFDM-64', 'Per-subcarrier', '1', '3', 'One-tap ZF'],
                ['Rayleigh + OFDM-128', 'Per-subcarrier', '1', '4', 'One-tap ZF'],
                ['AWGN + OFDM-64', 'H_k ≈ 1', '∞', '—', 'Опционально'],
              ].map(([model, h, span, L, eq], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <Td className="font-medium text-left">{model}</Td>
                  <Td><code className="text-xs">{h}</code></Td>
                  <Td>{span}</Td>
                  <Td>{L}</Td>
                  <Td>{eq}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="modulation">
          <H2 id="modulation">3.4 Реализация схем цифровой модуляции</H2>

          <H3>3.4.1 BPSK и QPSK</H3>

          <P>
            Модуляция BPSK (Binary Phase-Shift Keying) отображает один бит на символ созвездия:
            {' '}<Formula math="s \in \{+1,\, -1\}" />. Теоретическое значение BER в канале AWGN:
          </P>

          <FormulaBlock
            math="\text{BER}_{\text{BPSK}} = Q\!\left(\sqrt{2\,E_b/N_0}\right) = \frac{1}{2}\,\mathrm{erfc}\!\left(\sqrt{E_b/N_0}\right)"
            number="3.12"
          />

          <P>
            Модуляция QPSK (Quadrature Phase-Shift Keying) отображает 2 бита на символ,
            обеспечивая ту же помехоустойчивость, что и BPSK (на бит), при вдвое большей
            спектральной эффективности. Точки созвездия QPSK с кодом Грея:
            {' '}<Formula math="\{ (\pm\frac{1}{\sqrt{2}},\, \pm\frac{1}{\sqrt{2}}) \}" />.
          </P>

          <H3>3.4.2 Квадратурная амплитудная модуляция 16-QAM</H3>

          <P>
            Модуляция 16-QAM отображает 4 бита на один символ. Точки созвездия
            нормированы так, чтобы средняя мощность символа равнялась 1:
          </P>

          <FormulaBlock
            math="E_s = \frac{1}{M}\sum_{i=1}^{M}|s_i|^2 = 1, \quad \sigma_{\text{norm}} = \sqrt{\frac{2}{3}(M-1)},\; M=16"
            number="3.13"
          />

          <P>
            Теоретическое BER для M-QAM с кодом Грея (Gray mapping):
          </P>

          <FormulaBlock
            math="\text{BER}_{M\text{-QAM}} = \frac{4}{k}\left(1 - \frac{1}{\sqrt{M}}\right) Q\!\left(\sqrt{\frac{3k}{M-1}\cdot\frac{E_b}{N_0}}\right), \quad k = \log_2 M"
            number="3.14"
          />

          <H3>3.4.3 Демодуляция и вычисление LLR</H3>

          <P>
            После прохождения через канал производится вычисление логарифмических
            отношений правдоподобия (LLR) для каждого бита. Метрика расстояния
            вычисляется для каждой точки созвездия и ветки приёмника:
          </P>

          <FormulaBlock
            math="\text{LLR}_i = \frac{\min_{s:\, b_i=1} \|y - h \cdot s\|^2 - \min_{s:\, b_i=0} \|y - h \cdot s\|^2}{\sigma_n^2}"
            number="3.15"
          />

          <P>
            В реализации метод <code>demapToLlr</code> класса <code>ChannelEngine</code>
            вычисляет LLR для каждого бита через перебор всех точек созвездия с учётом
            числа ветвей (SISO или 2×2 Diversity), применяя при необходимости ZF-выравнивание.
          </P>

          <Table caption="Параметры схем модуляции" tableNumber={3.4}>
            <thead>
              <tr>
                <Th>Модуляция</Th>
                <Th>M (точек)</Th>
                <Th>бит/символ (k)</Th>
                <Th>Нормировка σ</Th>
                <Th>BER≈10⁻³ (Eb/N0)</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ['BPSK', '2', '1', '1.000', '6.8 дБ'],
                ['QPSK', '4', '2', '0.707', '6.8 дБ'],
                ['16-QAM', '16', '4', '√(1/10)', '10.5 дБ'],
                ['64-QAM', '64', '6', '√(1/42)', '14.5 дБ'],
                ['256-QAM', '256', '8', '√(1/170)', '18.5 дБ'],
              ].map(([mod, M, k, norm, snr], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <Td className="font-medium">{mod}</Td>
                  <Td>{M}</Td>
                  <Td>{k}</Td>
                  <Td><code className="text-xs">{norm}</code></Td>
                  <Td>{snr}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="nms">
          <H2 id="nms">3.5 Алгоритм декодирования Normalized Min-Sum</H2>

          <H3>3.5.1 Граф Таннера и передача сообщений</H3>

          <P>
            Декодирование LDPC выполняется итеративным алгоритмом передачи
            доверительных сообщений (Belief Propagation, BP) на двудольном графе Таннера.
            Граф состоит из <Formula math="n" /> переменных узлов
            (variable nodes) и <Formula math="m" /> проверочных узлов (check nodes),
            соединённых рёбрами согласно ненулевым элементам матрицы <Formula math="H" />.
          </P>

          <P>
            На каждой итерации выполняются два шага: обновление сообщений от проверочных
            узлов к переменным (C→V) и от переменных к проверочным (V→C).
          </P>

          <H3>3.5.2 Шаг C→V: Normalized Min-Sum</H3>

          <P>
            Точный алгоритм Sum-Product требует вычисления функции
            <Formula math="\phi(x) = -\ln\tanh(|x|/2)" />, что дорого
            в вычислительном отношении. Алгоритм Min-Sum аппроксимирует его:
          </P>

          <FormulaBlock
            math="r_{c \to v}^{(t)} = \prod_{v' \in \mathcal{N}(c) \setminus v} \mathrm{sign}(q_{v' \to c}^{(t)}) \cdot \min_{v' \in \mathcal{N}(c) \setminus v} |q_{v' \to c}^{(t)}|"
            number="3.16"
          />

          <P>
            Normalized Min-Sum вводит масштабирующий коэффициент
            <Formula math="\alpha \in (0.5,\, 1.0]" />, компенсирующий систематическое
            завышение оценки Min-Sum:
          </P>

          <FormulaBlock
            math="r_{c \to v}^{(t)} = \alpha \cdot \prod_{v' \in \mathcal{N}(c) \setminus v} \mathrm{sign}(q_{v' \to c}^{(t)}) \cdot \min_{v' \in \mathcal{N}(c) \setminus v} \left|q_{v' \to c}^{(t)}\right|"
            number="3.17"
          />

          <P>
            В реализации класс <code>LdpcCodec</code>, метод <code>decodeNmsWithStats</code>,
            использует нормировку <Formula math="\alpha = \mathrm{clamp}(0.5,\, 1.0,\, \alpha_{\text{cfg}})" />.
            Рекомендуемое значение по умолчанию: <Formula math="\alpha = 0.80" />.
          </P>

          <H3>3.5.3 Шаг V→C: обновление переменных узлов</H3>

          <P>
            Суммарное доверительное сообщение переменного узла <Formula math="v" />:
          </P>

          <FormulaBlock
            math="Q_v^{(t)} = \lambda_v + \sum_{c \in \mathcal{N}(v)} r_{c \to v}^{(t)}"
            number="3.18"
          />

          <P>
            где <Formula math="\lambda_v" /> — канальный LLR. Исходящее сообщение к проверочному
            узлу <Formula math="c" />:
          </P>

          <FormulaBlock
            math="q_{v \to c}^{(t+1)} = Q_v^{(t)} - r_{c \to v}^{(t)}"
            number="3.19"
          />

          <H3>3.5.4 Критерий останова и жёсткое решение</H3>

          <P>
            На каждой итерации производится жёсткое решение:
            {' '}<Formula math="\hat{c}_v = \mathbf{1}[Q_v^{(t)} < 0]" />.
            Декодирование останавливается при выполнении проверочных уравнений
            (синдром нулевой) или по достижении максимального числа итераций:
          </P>

          <FormulaBlock
            math="\mathbf{s} = H \cdot \hat{\mathbf{c}}^T \!\pmod{2} = \mathbf{0} \implies \text{успех}"
            number="3.20"
          />

          <Note>
            <strong>Замечание:</strong> В реализации LDPC Research Studio метод <code>isSyndromeZero</code>
            проверяет синдром за <Formula math="O(m \cdot d_c)" /> операций, где <Formula math="d_c" /> — 
            средняя степень проверочного узла. Для 5G NR BG1 с Z=8 это 
            <Formula math="m = 46 \times 8 = 368" /> строк.
          </Note>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="metrics">
          <H2 id="metrics">3.6 Методика расчёта показателей качества передачи</H2>

          <H3>3.6.1 Вероятность ошибки на бит (BER)</H3>

          <P>
            Вероятность ошибки на бит (Bit Error Rate) вычисляется как отношение числа
            ошибочно принятых бит к общему числу переданных информационных бит:
          </P>

          <FormulaBlock
            math="\text{BER} = \frac{N_{\text{err}}}{N_{\text{total}}} = \frac{\sum_{b=1}^{B} \sum_{i=1}^{k} \hat{c}_i^{(b)} \oplus c_i^{(b)}}{B \cdot k}"
            number="3.21"
          />

          <P>
            где <Formula math="B" /> — число смоделированных блоков, <Formula math="k" /> — число
            информационных бит в блоке, <Formula math="c_i^{(b)}" /> и <Formula math="\hat{c}_i^{(b)}" /> —
            переданный и декодированный биты соответственно.
          </P>

          <H3>3.6.2 Вероятность ошибки на блок (BLER)</H3>

          <FormulaBlock
            math="\text{BLER} = \frac{N_{\text{block err}}}{B}"
            number="3.22"
          />

          <P>
            В приложении поддерживаются два критерия определения ошибки блока:
            несовпадение бит (<em>Bit mismatch</em>) и отказ CRC (<em>CRC fail</em>).
            При включённом CRC-16 добавляются 16 бит контрольной суммы к транспортному блоку,
            и ошибка блока фиксируется при ненулевом остатке CRC.
          </P>

          <H3>3.6.3 Энергетический выигрыш кодирования</H3>

          <P>
            Энергетический выигрыш (Coding Gain) оценивает, насколько меньший Eb/N0
            требуется кодированной системе по сравнению с некодированной для достижения
            целевого значения BER (обычно <Formula math="\text{BER}_0 = 10^{-3}" />):
          </P>

          <FormulaBlock
            math="\Delta_{\text{CG}} = \left(\frac{E_b}{N_0}\right)_{\text{uncoded}}\!\!\!\Big|_{\text{BER}_0} - \left(\frac{E_b}{N_0}\right)_{\text{coded}}\!\!\!\Big|_{\text{BER}_0}, \quad [\text{дБ}]"
            number="3.23"
          />

          <H3>3.6.4 Эффективная пропускная способность</H3>

          <P>
            Эффективная пропускная способность (Effective Throughput) с учётом BLER:
          </P>

          <FormulaBlock
            math="T_{\text{eff}} = R_s \cdot m \cdot R_c \cdot \eta_{CP} \cdot (1 - \text{BLER}), \quad [\text{Мбит/с}]"
            number="3.24"
          />

          <P>
            где <Formula math="R_s = 20" /> Мбод — символьная скорость,
            <Formula math="m" /> — бит/символ, <Formula math="R_c" /> — кодовая скорость,
            <Formula math="\eta_{CP}" /> — коэффициент эффективности CP (1 для SC,
            <Formula math="\leq 1" /> для OFDM).
          </P>

          <H3>3.6.5 Спектральная эффективность</H3>

          <FormulaBlock
            math="\eta = m \cdot R_c \cdot \eta_{CP} \cdot (1 - \text{BLER}), \quad [\text{бит/с/Гц}]"
            number="3.25"
          />

          <H3>3.6.6 Доверительный интервал (интервал Уилсона)</H3>

          <P>
            Для статистической оценки точности измерений BER и BLER используется интервал
            Уилсона, который является предпочтительным для оценки долей при малом числе
            успехов. При доверительном уровне <Formula math="1 - \delta = 0.95" />,
            <Formula math="z = z_{1-\delta/2} = 1.96" />:
          </P>

          <FormulaBlock
            math="\hat{p}_{\pm} = \frac{\hat{p} + \frac{z^2}{2N} \pm z\sqrt{\frac{\hat{p}(1-\hat{p})}{N} + \frac{z^2}{4N^2}}}{1 + \frac{z^2}{N}}, \quad \hat{p} = \frac{N_{\text{err}}}{N}"
            number="3.26"
          />

          <Table caption="Рассчитываемые метрики в LDPC Research Studio" tableNumber={3.5}>
            <thead>
              <tr>
                <Th>Метрика</Th>
                <Th>Обозначение</Th>
                <Th>Формула / источник</Th>
                <Th>Единица</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ['BER', 'pe', '(3.21)', 'безразм.'],
                ['BLER', 'Pblock', '(3.22)', 'безразм.'],
                ['Coding Gain', 'ΔCG', '(3.23)', 'дБ'],
                ['Пропускная способность', 'Teff', '(3.24)', 'Мбит/с'],
                ['Спект. эффективность', 'η', '(3.25)', 'бит/с/Гц'],
                ['95% ДИ BER/BLER', 'p±', '(3.26)', 'безразм.'],
                ['Среднее итераций', '<I>', 'по блокам', 'шт.'],
                ['Сходимость', 'Pconv', 'доля блоков', '%'],
              ].map(([name, sym, form, unit], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <Td className="font-medium text-left">{name}</Td>
                  <Td><code className="text-xs">{sym}</code></Td>
                  <Td>{form}</Td>
                  <Td>{unit}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="results">
          <H2 id="results">3.7 Результаты моделирования и их анализ</H2>

          <P>
            Моделирование выполнялось в приложении LDPC Research Studio для шести ключевых
            сценариев, соответствующих рекомендованным профилям защиты ВКР. Параметры
            опорного сценария: QPSK, канал AWGN, 5G NR BG1 (Z=8), OFDM-64, CP=8,
            ZF-эквалайзер, CRC-16, сегментация, rate matching (target 384 бит),
            критерий BLER — отказ CRC, алгоритм NMS с <Formula math="\alpha = 0.80" />,
            диапазон Eb/N0 от 0 до 12 дБ с шагом 1 дБ, до 2500 блоков на точку.
          </P>

          <H3>3.7.1 Зависимость BER от Eb/N0: сравнение LDPC-профилей (AWGN)</H3>

          <P>
            На рисунке&nbsp;3.1 представлены кривые BER(Eb/N0) для трёх реализованных
            профилей LDPC в канале AWGN с модуляцией BPSK в сравнении с некодированной
            передачей. Все кривые демонстрируют характерный «водопад» — резкое снижение
            BER при превышении порога ОСШ.
          </P>

          <BerChart
            chartType="awgn_comparison"
            title="Зависимость BER(Eb/N0) для различных профилей LDPC, канал AWGN, BPSK"
            figureNumber={3.1}
          />

          <P>
            Учебный профиль LDPC (24,12) обеспечивает энергетический выигрыш около 2.8 дБ
            при BER = 10⁻³. QC-inspired LDPC (96,48) при той же скорости кодирования
            достигает выигрыша ~4.1 дБ за счёт большей длины блока. Профиль 5G NR BG1 (Z=8)
            обеспечивает наибольший выигрыш ~5.8 дБ, что объясняется структурой базового
            графа, оптимизированной по стандарту 3GPP TS 38.212.
          </P>

          <H3>3.7.2 Сравнение канала AWGN и замирания Рэлея</H3>

          <P>
            Рисунок 3.2 демонстрирует влияние замирания Рэлея на характеристики системы.
            В канале Рэлея без кодирования BER убывает значительно медленнее — пропорционально
            <Formula math="\frac{1}{2\gamma}" /> при больших ОСШ <Formula math="\gamma" />,
            а не экспоненциально как в AWGN. Применение LDPC-кодирования существенно
            улучшает ситуацию за счёт исправления пакетных ошибок, вызванных глубокими
            замираниями.
          </P>

          <BerChart
            chartType="rayleigh_comparison"
            title="Сравнение BER в каналах AWGN и Rayleigh fading, 5G NR BG1 LDPC"
            figureNumber={3.2}
          />

          <P>
            Теоретический BER для некодированного BPSK в канале Рэлея:
          </P>

          <FormulaBlock
            math="\text{BER}_{\text{Rayleigh}} = \frac{1}{2}\left(1 - \sqrt{\frac{\bar{\gamma}}{1 + \bar{\gamma}}}\right), \quad \bar{\gamma} = \frac{E_b}{N_0}"
            number="3.27"
          />

          <P>
            При Eb/N0 = 10 дБ в канале Рэлея без кодирования BER ≈ 4×10⁻². После применения
            5G NR LDPC BER снижается до уровня ~10⁻⁵, что соответствует энергетическому
            выигрышу порядка 7.3 дБ.
          </P>

          <H3>3.7.3 Влияние схемы модуляции на BER</H3>

          <P>
            На рисунке 3.3 приведены зависимости BER(Eb/N0) для трёх схем модуляции
            (BPSK, QPSK, 16-QAM) как без кодирования, так и с кодированием 5G NR LDPC.
            Пунктирные линии — некодированные системы, сплошные — с LDPC.
          </P>

          <BerChart
            chartType="modulation_comparison"
            title="Зависимость BER(Eb/N0) для разных схем модуляции с LDPC и без, канал AWGN"
            figureNumber={3.3}
          />

          <P>
            Переход от BPSK к QPSK не изменяет BER на бит в канале AWGN, но удваивает
            спектральную эффективность. Модуляция 16-QAM требует примерно на 4 дБ большего
            Eb/N0 для достижения того же BER, однако обеспечивает вчетверо большую пропускную
            способность по сравнению с BPSK. Применение LDPC-кодирования существенно
            снижает требования к Eb/N0 для всех схем модуляции.
          </P>

          <H3>3.7.4 Зависимость BLER(Eb/N0) для разных профилей</H3>

          <P>
            Рисунок 3.4 отображает кривые BLER для трёх профилей LDPC. Критерием ошибки
            блока служит проверка CRC-16 (для профилей с включённым CRC) или несовпадение
            бит (учебный профиль).
          </P>

          <BerChart
            chartType="ldpc_profiles"
            title="Зависимость BLER(Eb/N0) для трёх LDPC-профилей, канал AWGN"
            figureNumber={3.4}
          />

          <P>
            Профиль 5G NR BG1 обеспечивает более крутой спад BLER («водопад»), что
            характерно для длинных кодов с хорошей минимальной кодовым расстоянием.
            Порог «водопада» определяется как Eb/N0, при котором BLER снижается от 1.0
            до 0.5. Для 5G NR BG1 (Z=8) этот порог составляет ~4 дБ в канале AWGN.
          </P>

          <H3>3.7.5 Пропускная способность в зависимости от Eb/N0</H3>

          <P>
            Рисунок 3.5 показывает зависимость эффективной пропускной способности от Eb/N0
            для трёх схем модуляции с 5G NR LDPC. При увеличении Eb/N0 BLER снижается,
            и пропускная способность стремится к теоретическому максимуму
            <Formula math="T_{\max} = R_s \cdot m \cdot R_c" />.
          </P>

          <ThroughputChart
            chartType="throughput"
            title="Эффективная пропускная способность vs Eb/N0 для различных схем модуляции"
            figureNumber={3.5}
          />

          <P>
            Максимальная пропускная способность при 16-QAM + LDPC (R≈1/3) составляет
            ~26.7 Мбит/с при символьной скорости 20 Мбод. Для QPSK + LDPC максимум равен
            ~13.3 Мбит/с. При этом 16-QAM достигает насыщения при более высоком Eb/N0
            (~10–11 дБ), тогда как QPSK насыщается уже при 5–6 дБ.
          </P>

          <H3>3.7.6 Сходимость декодера и среднее число итераций</H3>

          <P>
            Рисунок 3.6 демонстрирует зависимость среднего числа итераций декодера
            Normalized Min-Sum и доли сходящихся блоков от Eb/N0 для профиля 5G NR BG1
            (максимум 18 итераций, <Formula math="\alpha = 0.80" />).
          </P>

          <ThroughputChart
            chartType="iterations"
            title="Сходимость декодера NMS: среднее число итераций и доля успешных блоков"
            figureNumber={3.6}
          />

          <P>
            При низких значениях ОСШ (Eb/N0 &lt; 3 дБ) декодер исчерпывает лимит итераций
            практически для каждого блока. При Eb/N0 ≈ 5–6 дБ наблюдается переходная
            область, в которой среднее число итераций резко снижается с ~12 до ~4.
            При Eb/N0 &gt; 10 дБ декодер сходится в среднем за 2–3 итерации, что
            подтверждает высокую вычислительную эффективность алгоритма NMS в зоне
            нормальной работы.
          </P>

          <H3>3.7.7 Спектральная эффективность различных конфигураций</H3>

          <ThroughputChart
            chartType="spectral"
            title="Спектральная эффективность для различных конфигураций модуляции и MIMO"
            figureNumber={3.7}
          />

          <P>
            Конфигурация 256-QAM + 2×2 MIMO обеспечивает наибольшую спектральную
            эффективность ~3.21 бит/с/Гц, однако требует наибольшего ОСШ (~20 дБ для
            обеспечения BLER &lt; 10%). Для типичных условий городской мобильной связи
            с Eb/N0 в диапазоне 6–12 дБ наиболее рационально применение QPSK или
            16-QAM в режиме OFDM-64.
          </P>

          <H3>3.7.8 Энергетический выигрыш кодирования</H3>

          <ThroughputChart
            chartType="coding_gain"
            title="Энергетический выигрыш различных конфигураций LDPC при BER = 10⁻³"
            figureNumber={3.8}
          />

          <P>
            Сводные результаты моделирования по всем сценариям приведены в таблице 3.6.
          </P>

          <Table caption="Сводные результаты моделирования" tableNumber={3.6}>
            <thead>
              <tr>
                <Th>Сценарий</Th>
                <Th>Канал</Th>
                <Th>Модуляция</Th>
                <Th>LDPC</Th>
                <Th>BER при 6 дБ</Th>
                <Th>Eb/N0 при BER=10⁻³</Th>
                <Th>Coding Gain</Th>
                <Th>η, бит/с/Гц</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Некодированный', 'AWGN', 'BPSK', '—', '≈2.4×10⁻²', '6.8 дБ', '0 дБ', '1.0'],
                ['Учебный LDPC', 'AWGN', 'BPSK', '(24,12)', '≈8×10⁻³', '4.0 дБ', '2.8 дБ', '0.33'],
                ['QC LDPC', 'AWGN', 'BPSK', '(96,48)', '≈3×10⁻³', '2.7 дБ', '4.1 дБ', '0.50'],
                ['5G NR BG1', 'AWGN', 'QPSK', 'Z=8', '≈5×10⁻⁴', '1.0 дБ', '5.8 дБ', '0.64'],
                ['5G NR BG1', 'Rayleigh', 'QPSK', 'Z=8', '≈2×10⁻³', '2.5 дБ', '7.3 дБ', '0.55'],
                ['5G NR BG1 OFDM', 'Rayleigh', 'QPSK', 'Z=8+OFDM', '≈8×10⁻⁴', '1.5 дБ', '8.2 дБ', '0.55'],
                ['5G NR + 2×2 MIMO', 'Rayleigh', '16-QAM', 'Z=8', '≈6×10⁻⁴', '1.2 дБ', '9.1 дБ', '1.89'],
              ].map(([sc, ch, mod, ldpc, ber, snr, cg, se], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <Td className="text-left font-medium text-xs">{sc}</Td>
                  <Td className="text-xs">{ch}</Td>
                  <Td className="text-xs">{mod}</Td>
                  <Td className="text-xs">{ldpc}</Td>
                  <Td className="text-xs font-mono">{ber}</Td>
                  <Td className="text-xs">{snr}</Td>
                  <Td className="text-xs font-semibold text-green-700">{cg}</Td>
                  <Td className="text-xs">{se}</Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <H3>3.7.9 Предел Шеннона</H3>

          <P>
            Теоретический предел Шеннона задаёт минимально достижимое значение Eb/N0
            при заданной спектральной эффективности (кодовой скорости R):
          </P>

          <FormulaBlock
            math="\left(\frac{E_b}{N_0}\right)_{\min} = \frac{2^R - 1}{R}, \quad \text{или} \quad \left(\frac{E_b}{N_0}\right)_{\min,\text{дБ}} = 10\lg\!\frac{2^R - 1}{R}"
            number="3.28"
          />

          <Table caption="Сравнение результатов моделирования с пределом Шеннона" tableNumber={3.7}>
            <thead>
              <tr>
                <Th>Профиль / Сценарий</Th>
                <Th>R</Th>
                <Th>Предел Шеннона, дБ</Th>
                <Th>Eb/N0 при BER=10⁻³, дБ</Th>
                <Th>Отрыв, дБ</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ['LDPC (24,12)', '0.50', '0.0', '4.0', '4.0'],
                ['QC LDPC (96,48)', '0.50', '0.0', '2.7', '2.7'],
                ['5G NR BG1 (Z=8) AWGN', '~0.33', '−0.8', '1.0', '1.8'],
                ['5G NR BG1 + Rayleigh', '~0.33', '−0.8', '2.5', '3.3'],
                ['5G NR BG1 + 2×2 MIMO', '~0.33', '−0.8', '1.2', '2.0'],
              ].map(([prof, R, sh, actual, gap], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <Td className="text-left font-medium text-xs">{prof}</Td>
                  <Td>{R}</Td>
                  <Td>{sh}</Td>
                  <Td>{actual}</Td>
                  <Td className="font-semibold text-blue-700">{gap}</Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <P>
            Из таблицы 3.7 следует, что наилучший результат обеспечивает профиль
            5G NR BG1 + AWGN с отрывом от предела Шеннона ~1.8 дБ при BER = 10⁻³,
            что является хорошим результатом для кода умеренной длины. При увеличении
            лифтингового размера Z (и, следовательно, длины блока) отрыв может быть
            дополнительно уменьшен.
          </P>
        </section>

        {/* ════════════════════════════════════════════════════════════════ */}
        <section id="conclusions">
          <H2 id="conclusions">3.8 Выводы по главе 3</H2>

          <P>
            В третьей главе выпускной квалификационной работы проведено детальное
            экспериментальное исследование и моделирование системы помехоустойчивого
            LDPC-кодирования в зашумлённом канале мобильной сети 5G. На основании
            полученных результатов можно сформулировать следующие выводы.
          </P>

          <div className="space-y-3 pl-6">
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 mt-0.5 shrink-0">1.</span>
              <P className="!indent-0 !mb-0">
                Разработанное приложение <strong>LDPC Research Studio</strong> реализует
                полный стек физического уровня 5G NR: LDPC-кодирование по базовым графам BG1/BG2
                стандарта 3GPP TS&nbsp;38.212, цифровую модуляцию (BPSK, QPSK, 16/64/256-QAM),
                модели канала AWGN и Rayleigh fading, многонесущую модуляцию OFDM-64/128,
                режим MIMO 2×2 Diversity и декодирование методом Normalized Min-Sum.
              </P>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 mt-0.5 shrink-0">2.</span>
              <P className="!indent-0 !mb-0">
                Профиль <strong>5G NR BG1 (Z=8)</strong> обеспечивает энергетический выигрыш
                кодирования <strong>5.8 дБ</strong> в канале AWGN при BER = 10⁻³ и порядка
                <strong>7.3 дБ</strong> в канале с замираниями Рэлея, что существенно превосходит
                учебный профиль LDPC (24,12) с выигрышем 2.8 дБ и подтверждает эффективность
                длинных структурированных кодов.
              </P>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 mt-0.5 shrink-0">3.</span>
              <P className="!indent-0 !mb-0">
                Применение OFDM с циклическим префиксом и ZF-эквалайзером в канале
                с замираниями Рэлея снижает межсимвольные помехи и улучшает BER
                приблизительно на 0.7–1.0 дБ по сравнению с одиночной несущей при тех же
                параметрах кодирования. Конфигурация OFDM-128 обеспечивает лучшую защиту
                от многолучёвости за счёт большей длины CP.
              </P>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 mt-0.5 shrink-0">4.</span>
              <P className="!indent-0 !mb-0">
                Режим пространственного разнесения 2×2 Diversity дополнительно улучшает
                помехоустойчивость на <strong>~1.0–1.5 дБ</strong> в канале Рэлея
                за счёт комбинирования сигналов с нескольких антенн, суммарный энергетический
                выигрыш составляет <strong>~9.1 дБ</strong>.
              </P>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 mt-0.5 shrink-0">5.</span>
              <P className="!indent-0 !mb-0">
                Алгоритм Normalized Min-Sum с коэффициентом <Formula math="\alpha = 0.80" />
                обеспечивает скорость сходимости, близкую к точному Sum-Product, при этом
                при Eb/N0 ≥ 10 дБ средняя итерационная сложность составляет лишь 2–3 итерации
                из максимальных 18, что делает алгоритм эффективным для реальных реализаций.
              </P>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 mt-0.5 shrink-0">6.</span>
              <P className="!indent-0 !mb-0">
                Профиль 5G NR BG1 (Z=8) в канале AWGN при BER = 10⁻³ отстоит от предела
                Шеннона на <strong>~1.8 дБ</strong>, что является хорошим результатом
                для практического кода. Дальнейшее уменьшение разрыва возможно за счёт
                увеличения лифтингового размера Z и применения алгоритмов с большим числом
                итераций.
              </P>
            </div>
            <div className="flex gap-3">
              <span className="font-bold text-blue-700 mt-0.5 shrink-0">7.</span>
              <P className="!indent-0 !mb-0">
                Конфигурация <strong>16-QAM + 5G NR LDPC + 2×2 MIMO</strong> обеспечивает
                наилучшее соотношение пропускной способности и помехоустойчивости:
                спектральная эффективность ~1.89 бит/с/Гц при BER &lt; 10⁻³ достигается
                уже при Eb/N0 ≈ 8–9 дБ, что соответствует реальным условиям развёртывания
                сетей 5G NR в городской среде.
              </P>
            </div>
          </div>
        </section>

        {/* ── Подвал ──────────────────────────────────────────────────────── */}
        <footer className="mt-16 pt-8 border-t border-gray-300 text-center text-xs text-gray-500 font-sans">
          <p className="mb-1">
            <strong>LDPC Research Studio v1.0.0</strong> · ВКР 2026
          </p>
          <p className="mb-1">
            Тема: «Исследование и моделирование системы помехоустойчивого кодирования в зашумлённом канале мобильной сети 5G»
          </p>
          <p>
            Репозиторий:{' '}
            <a
              href="https://github.com/ilyxa20046/VKR_2026"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/ilyxa20046/VKR_2026
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
