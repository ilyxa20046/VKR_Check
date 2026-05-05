import React from 'react';
import { Formula } from './Formula';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import {
  generateBerChartData, generateBlerChartData, generateThroughputData,
  iterationData, codingGainTable
} from '../data/berData';

const Section: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
  <section id={id} className="mb-10">
    <h3 className="text-xl font-bold text-green-800 border-l-4 border-green-500 pl-3 mb-4">{title}</h3>
    {children}
  </section>
);

const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-800 leading-7 mb-3 text-justify indent-8">{children}</p>
);

const berData = generateBerChartData();
const blerData = generateBlerChartData();
const throughputData = generateThroughputData();


const formatBer = (v: unknown) => {
  const n = Number(v);
  return isNaN(n) ? '' : n.toExponential(1);
};

export const Chapter2: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-green-900 mb-2 uppercase tracking-wide">
        ГЛАВА 2. ПОСТАНОВКА ЗАДАЧИ И ИМИТАЦИОННАЯ МОДЕЛЬ СИСТЕМЫ ПОМЕХОУСТОЙЧИВОЙ ПЕРЕДАЧИ ДАННЫХ
      </h2>
      <div className="w-24 h-1 bg-green-500 mx-auto mb-8 rounded" />

      {/* 2.1 */}
      <Section title="2.1. Постановка задачи исследования" id="ch2-1">
        <Para>
          Математическое описание задачи помехоустойчивого кодирования формулируется следующим образом.
          Дан источник информации, генерирующий последовательность двоичных символов{' '}
          <Formula math="u = (u_1, u_2, \ldots, u_k)" />, где <Formula math="k" /> — длина
          информационного блока. Кодер отображает вектор <Formula math="u" /> в кодовое слово{' '}
          <Formula math="x = (x_1, x_2, \ldots, x_n)" /> длины <Formula math="n > k" />, называемое
          кодовым словом линейного блокового кода <Formula math="\mathcal{C}(n, k)" />.
        </Para>
        <Para>
          Кодовое слово <Formula math="x" /> принадлежит пространству нулей матрицы проверок на чётность{' '}
          <Formula math="\mathbf{H}" />:
        </Para>

        <Formula
          math="\mathbf{H} \cdot \mathbf{x}^T = \mathbf{0} \pmod{2}"
          block
          label="2.1"
        />

        <Para>
          где <Formula math="\mathbf{H}" /> — матрица проверок размерности <Formula math="(n-k) \times n" />.
          При декодировании принятый вектор <Formula math="y" /> подаётся на вход декодера, который
          вычисляет синдром <Formula math="s = \mathbf{H} \cdot y^T" />. Если <Formula math="s = 0" />,
          переданное кодовое слово принято без ошибок (или с необнаруженной ошибкой); в противном
          случае выполняется итеративная коррекция.
        </Para>

        <Para>
          Для LDPC-кодов кодирование выполняется через систематическую форму матрицы паритета:
          вектор <Formula math="x = (u, p)" />, где <Formula math="p = u \cdot G_{\text{sys}}" />
          — вектор проверочных битов, вычисляемый по систематическому порождающему матрице{' '}
          <Formula math="G_{\text{sys}}" />. В стандарте 3GPP для BG1 применяется двухшаговое
          кодирование с использованием структурированной части матрицы <Formula math="\mathbf{H}" />,
          что обеспечивает линейную сложность кодирования <Formula math="O(n)" />.
        </Para>

        <Para>
          Цель имитационного эксперимента состоит в определении зависимостей BER и BLER от отношения
          <Formula math="E_b/N_0" /> для различных конфигураций системы: профилей LDPC (учебный (24,12),
          QC-LDPC (96,48), 5G NR BG1), схем модуляции (BPSK, QPSK, 16-QAM), типов канала (AWGN,
          Rayleigh, OFDM+AWGN) и режимов MIMO (SISO, 2×2 MRC, 2×2 ZF). Сравнение с некодированной
          передачей позволяет определить кодовый выигрыш для каждого сценария.
        </Para>
      </Section>

      {/* 2.2 */}
      <Section title="2.2. Структурная схема исследуемой системы" id="ch2-2">
        <Para>
          Исследуемая система моделирования охватывает полный тракт физического уровня от источника
          информационных битов до вынесения окончательного решения на приёмнике. Математическая модель
          системы включает следующие взаимосвязанные блоки, каждый из которых описывается
          соответствующими математическими операторами.
        </Para>

        <div className="bg-green-50 border border-green-200 rounded-lg p-5 my-6">
          <p className="font-semibold text-green-800 mb-4 text-center text-sm">
            Рисунок 2.1 — Обобщённая структурная схема системы помехоустойчивого кодирования
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-green-700 mb-1 uppercase tracking-wider">Передающая сторона (TX)</p>
              <div className="flex flex-wrap items-center gap-1">
                {[
                  "Источник бит\n(u, k бит)",
                  "CRC-16\nдобавление",
                  "LDPC кодер\n(BG1/BG2, H)",
                  "Rate Matching\n& Puncturing",
                  "QAM Mapper\n(BPSK/QPSK/16QAM)",
                  "OFDM IFFT\n(N=64/128)"
                ].map((b, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="bg-green-600 text-white text-xs px-2 py-2 rounded text-center leading-tight whitespace-pre-line min-w-[80px]">{b}</div>
                    {i < arr.length - 1 && <span className="text-green-500 font-bold">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
              <div className="bg-red-100 border border-red-300 text-red-700 text-xs px-3 py-2 rounded font-semibold">
                📡 Канал: AWGN / Rayleigh / MIMO 2×2
              </div>
              <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
            </div>
            <div>
              <p className="text-xs font-bold text-green-700 mb-1 uppercase tracking-wider">Приёмная сторона (RX)</p>
              <div className="flex flex-wrap items-center gap-1">
                {[
                  "OFDM FFT\n& CP удаление",
                  "ZF Эквализатор",
                  "LLR вычисление\n(soft-input)",
                  "LDPC декодер\nNMS (Imax=50)",
                  "CRC проверка\n& hard decision",
                  "Метрики\nBER/BLER/TP"
                ].map((b, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="bg-blue-600 text-white text-xs px-2 py-2 rounded text-center leading-tight whitespace-pre-line min-w-[80px]">{b}</div>
                    {i < arr.length - 1 && <span className="text-blue-500 font-bold">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Para>
          Формирование логарифмических отношений правдоподобия (LLR — Log-Likelihood Ratio) является
          ключевым этапом мягкого декодирования. Для канала AWGN LLR i-го бита вычисляется как:
        </Para>

        <Formula
          math="L_i = \ln \frac{P(y_i | x_i = 0)}{P(y_i | x_i = 1)} = \frac{2}{\sigma^2} \cdot y_i"
          block
          label="2.2"
        />

        <Para>
          Знак LLR определяет жёсткое решение по биту: <Formula math="\hat{x}_i = 0" /> при{' '}
          <Formula math="L_i > 0" /> и <Formula math="\hat{x}_i = 1" /> при{' '}
          <Formula math="L_i < 0" />. Величина <Formula math="|L_i|" /> отражает достоверность
          принятого решения — чем больше модуль LLR, тем выше уверенность декодера.
        </Para>
      </Section>

      {/* 2.3 */}
      <Section title="2.3. Математическое описание имитационной модели" id="ch2-3">
        <Para>
          Рассмотрим детально математическое описание ключевых компонентов системы моделирования
          в соответствии со стандартом 3GPP TS 38.212.
        </Para>

        <div className="space-y-5">
          {/* 2.3.1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.1. Формирование исходной двоичной последовательности</h4>
            <Para>
              Источник информации генерирует равновероятные независимые двоичные символы{' '}
              <Formula math="u_i \in \{0, 1\}" />, <Formula math="i = 1, \ldots, k" />.
              Перед кодированием к блоку добавляются биты циклического избыточного кода CRC-16
              (полином <Formula math="x^{16} + x^{12} + x^5 + 1" />) для верификации успешного
              декодирования. После добавления CRC информационный блок имеет длину{' '}
              <Formula math="k' = k + 16" /> бит.
            </Para>
          </div>

          {/* 2.3.2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.2. LDPC-кодирование</h4>
            <Para>
              Для QC-LDPC кодов матрица <Formula math="\mathbf{H}" /> формируется из{' '}
              <Formula math="a \times b" /> блоков размерности <Formula math="Z \times Z" />,
              каждый из которых является либо нулевой матрицей, либо циклическим сдвигом единичной
              матрицы на величину, заданную матрицей сдвигов базового графа:
            </Para>
            <Formula
              math="\mathbf{H} = \begin{pmatrix} \mathbf{I}(h_{0,0}) & \cdots & \mathbf{I}(h_{0,b-1}) \\ \vdots & \ddots & \vdots \\ \mathbf{I}(h_{a-1,0}) & \cdots & \mathbf{I}(h_{a-1,b-1}) \end{pmatrix}"
              block
              label="2.3"
            />
            <Para>
              где <Formula math="\mathbf{I}(p)" /> — единичная матрица, циклически сдвинутая на{' '}
              <Formula math="p" /> позиций (<Formula math="\mathbf{I}(-1) = \mathbf{0}" />).
              Кодирование осуществляется в систематической форме: <Formula math="x = [u \,|\, p]" />,
              где вектор проверочных бит определяется из условия{' '}
              <Formula math="\mathbf{H} x^T = 0" />.
            </Para>
          </div>

          {/* 2.3.3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.3. Модуляция</h4>
            <Para>
              Биты кодового слова отображаются на комплексные символы согласно схеме модуляции.
              Для QPSK группы из 2 бит отображаются в точки созвездия:
            </Para>
            <Formula
              math="s = \frac{1}{\sqrt{2}} \left[ (1 - 2b_0) + j(1 - 2b_1) \right]"
              block
              label="2.4"
            />
            <Para>
              Для 16-QAM группы из 4 бит отображаются в 16-точечное созвездие с нормировкой на
              единичную среднюю мощность символа: <Formula math="\mathbb{E}[|s|^2] = 1" />.
            </Para>
          </div>

          {/* 2.3.4 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.4. OFDM-подобный waveform и циклический префикс</h4>
            <Para>
              В режиме OFDM символы отображаются на <Formula math="N" /> поднесущих через обратное
              дискретное преобразование Фурье (IDFT):
            </Para>
            <Formula
              math="x_n = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} X_k e^{j2\pi kn/N}, \quad n = 0, 1, \ldots, N-1"
              block
              label="2.5"
            />
            <Para>
              После IDFT добавляется циклический префикс длиной <Formula math="N_{CP}" /> отсчётов,
              что устраняет межсимвольную интерференцию при длине канала, не превышающей{' '}
              <Formula math="N_{CP}" />. На приёмнике CP удаляется, после чего применяется DFT.
            </Para>
          </div>

          {/* 2.3.5 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.5. Пространственный режим передачи (MIMO)</h4>
            <Para>
              В режиме MIMO 2×2 система описывается матричной моделью канала:
            </Para>
            <Formula
              math="\mathbf{y} = \mathbf{H}_{\text{MIMO}} \cdot \mathbf{s} + \mathbf{n}"
              block
              label="2.6"
            />
            <Para>
              где <Formula math="\mathbf{H}_{\text{MIMO}} \in \mathbb{C}^{2 \times 2}" /> — матрица
              канала MIMO, <Formula math="\mathbf{s} \in \mathbb{C}^{2 \times 1}" /> — вектор
              переданных символов, <Formula math="\mathbf{n}" /> — вектор шумов. При ZF-эквализации
              восстановление сигнала выполняется как:{' '}
              <Formula math="\hat{\mathbf{s}} = (\mathbf{H}^H \mathbf{H})^{-1} \mathbf{H}^H \mathbf{y}" />.
            </Para>
          </div>

          {/* 2.3.6 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.6. Модель канала связи</h4>
            <Para>
              Модель канала AWGN: <Formula math="r_k = \sqrt{E_s} \cdot s_k + n_k" />, где{' '}
              <Formula math="n_k \sim \mathcal{N}(0, \sigma^2)" />,{' '}
              <Formula math="\sigma^2 = 1/(2 R_c \log_2 M \cdot E_b/N_0)" />.
              Модель канала Рэлея с плоскими замираниями:{' '}
              <Formula math="r_k = h_k \cdot \sqrt{E_s} \cdot s_k + n_k" />, где{' '}
              <Formula math="h_k \sim \mathcal{CN}(0, 1)" /> — комплексный коэффициент замираний.
              Все коэффициенты каналов генерируются независимо для каждого блока (блочные замирания).
            </Para>
          </div>

          {/* 2.3.7 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.7. Эквализация и soft-demodulation</h4>
            <Para>
              При ZF-эквализации в канале Рэлея компенсация замираний выполняется как{' '}
              <Formula math="\hat{s}_k = r_k / h_k" />. Для AWGN-канала эквализация тривиальна
              (единичный коэффициент усиления). Мягкое демодулирование вычисляет LLR для каждого бита
              символа через разность логарифмов правдоподобия между точками созвездия, содержащими
              данный бит в состоянии 0 и 1 соответственно.
            </Para>
          </div>

          {/* 2.3.8 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2">2.3.8. LDPC-декодирование (алгоритм NMS)</h4>
            <Para>
              Декодирование LDPC реализуется алгоритмом нормализованного min-sum (NMS) с параметром
              нормализации <Formula math="\alpha" />. Обновление сообщений от узлов проверок
              к переменным узлам выполняется как:
            </Para>
            <Formula
              math="\mu_{c \to v}^{(i)} = \alpha \cdot \left(\prod_{v' \in \mathcal{N}(c) \setminus v} \text{sign}(\mu_{v' \to c}^{(i-1)})\right) \cdot \min_{v' \in \mathcal{N}(c) \setminus v} |\mu_{v' \to c}^{(i-1)}|"
              block
              label="2.7"
            />
            <Para>
              где <Formula math="\alpha = 0.80" /> — оптимальный параметр нормализации,{' '}
              <Formula math="\mathcal{N}(c)" /> — множество переменных узлов, смежных с узлом проверки{' '}
              <Formula math="c" />, <Formula math="I_{\max} = 50" /> — максимальное число итераций.
              Итерации продолжаются до выполнения всех проверок на чётность или достижения{' '}
              <Formula math="I_{\max}" />.
            </Para>
          </div>
        </div>
      </Section>

      {/* 2.4 */}
      <Section title="2.4. Показатели качества и эффективности модели" id="ch2-4">
        <Para>
          Для анализа эффективности системы помехоустойчивого кодирования в модели вычисляются следующие
          показатели качества.
        </Para>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {[
            {
              num: '2.4.1', title: 'Вероятность битовой ошибки',
              formula: '\\text{BER} = N_{\\text{err}} / N_{\\text{total}}',
              desc: 'Накопленная статистика ошибочных бит информации после декодирования. Вычисляется только по информационным битам (k бит), не включая проверочные.'
            },
            {
              num: '2.4.2', title: 'Вероятность блочной ошибки',
              formula: '\\text{BLER} = N_{\\text{block err}} / N_{\\text{blocks}}',
              desc: 'Доля блоков данных, в которых CRC-проверка не прошла после декодирования. BLER ≠ 0 даже при малом BER для длинных блоков.'
            },
            {
              num: '2.4.3', title: 'Среднее число итераций',
              formula: '\\bar{I} = \\frac{1}{N_{\\text{frames}}} \\sum_{m=1}^{N_{\\text{frames}}} I_m',
              desc: 'Среднее число итераций декодера NMS до схождения. При высоком SNR — мало (2–5), при низком — приближается к I_max.'
            },
            {
              num: '2.4.4', title: 'Спектральная эффективность',
              formula: '\\eta = R_c \\cdot \\log_2 M \\cdot (1 - \\text{BLER}), \\text{ бит/с/Гц}',
              desc: 'Эффективное число бит на Гц полосы с учётом кодовой скорости, порядка модуляции и вероятности блочной ошибки.'
            },
            {
              num: '2.4.5', title: 'Эффективная пропускная способность',
              formula: 'T = \\eta \\cdot B_W \\cdot \\eta_{\\text{OFDM}}, \\text{ Мбит/с}',
              desc: 'Пропускная способность с учётом потерь на OFDM (CP-overhead ≈7%) и BLER. Используется для сравнения конфигураций.'
            },
            {
              num: '2.4.6', title: 'Кодовый выигрыш',
              formula: '\\text{CG} = (E_b/N_0)_{\\text{некод.}} - (E_b/N_0)_{\\text{код.}}, \\text{ дБ}',
              desc: 'Разность требуемых SNR (в дБ) для достижения BER=10⁻³ без кодирования и с кодированием. Основная метрика сравнения схем FEC.'
            },
          ].map((item) => (
            <div key={item.num} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <p className="text-xs font-bold text-green-700 mb-1">{item.num}. {item.title}</p>
              <div className="text-sm overflow-x-auto mb-2">
                <Formula math={item.formula} block />
              </div>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* BER chart */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.2 — Сравнение кривых BER для различных профилей LDPC (канал AWGN, BPSK/QPSK)
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={berData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis scale="log" domain={[1e-8, 1]} tickFormatter={formatBer}
                label={{ value: 'BER', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(v: unknown) => Number(v).toExponential(2)} />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Без кодирования (BPSK)" stroke="#9ca3af" strokeWidth={2} dot={false} strokeDasharray="4 2" />
              <Line type="monotone" dataKey="BPSK Rayleigh (некод.)" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="3 2" />
              <Line type="monotone" dataKey="LDPC (24,12) R=1/2" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="LDPC QC (96,48) R=1/2" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="5G NR BG1 QPSK AWGN" stroke="#2563eb" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BLER chart */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.3 — Кривые BLER для трёх профилей LDPC (канал AWGN)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={blerData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis scale="log" domain={[1e-5, 1]} tickFormatter={formatBer}
                label={{ value: 'BLER', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(v: unknown) => Number(v).toExponential(2)} />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="LDPC (24,12)" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="LDPC QC (96,48)" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="5G NR BG1 (Z=8)" stroke="#2563eb" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Coding gain table */}
        <div className="my-6">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Таблица 2.1 — Кодовый выигрыш при целевом BER = 10⁻³
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="border border-green-600 px-3 py-2">Профиль LDPC</th>
                  <th className="border border-green-600 px-3 py-2">Модуляция</th>
                  <th className="border border-green-600 px-3 py-2">Канал</th>
                  <th className="border border-green-600 px-3 py-2">SNR код. (дБ)</th>
                  <th className="border border-green-600 px-3 py-2">SNR некод. (дБ)</th>
                  <th className="border border-green-600 px-3 py-2">Выигрыш (дБ)</th>
                </tr>
              </thead>
              <tbody>
                {codingGainTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                    <td className="border border-gray-200 px-3 py-2">{row.profile}</td>
                    <td className="border border-gray-200 px-3 py-2">{row.modulation}</td>
                    <td className="border border-gray-200 px-3 py-2">{row.channel}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">{row.requiredSnrCoded}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">{row.requiredSnrUncoded}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center font-bold text-green-700">{row.codingGain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* 2.5 */}
      <Section title="2.5. Алгоритм проведения имитационного эксперимента" id="ch2-5">
        <Para>
          Алгоритм проведения имитационного эксперимента построен на основе метода Монте-Карло
          и включает следующую последовательность шагов для каждой точки SNR:
        </Para>

        <div className="bg-green-50 border border-green-200 rounded-lg p-5 my-4">
          <ol className="space-y-2 text-sm text-gray-800">
            {[
              'Инициализация: задать параметры эксперимента (профиль LDPC, модуляция, тип канала, диапазон SNR, число фреймов, начальный seed).',
              'Для каждого значения Eb/N0 из заданного диапазона:',
              '   а) Сгенерировать информационный блок u длиной k бит (равномерное распределение).',
              '   б) Добавить CRC-16 → блок длиной k\' = k+16 бит.',
              '   в) Закодировать LDPC-кодером (BG1/BG2) → кодовое слово x длиной n бит.',
              '   г) Выполнить rate matching (перемежение, пробивание) согласно TS 38.212.',
              '   д) Отобразить биты на символы QAM (BPSK/QPSK/16-QAM).',
              '   е) Применить OFDM IFFT + добавить CP (если режим OFDM).',
              '   ж) Пропустить через модель канала (AWGN/Rayleigh/MIMO).',
              '   з) На приёмнике: удалить CP, применить FFT, ZF-эквализацию.',
              '   и) Вычислить LLR для каждого бита символа.',
              '   к) Декодировать алгоритмом NMS (α=0.80, Imax=50), зафиксировать число итераций.',
              '   л) Проверить CRC, накопить статистику (BER, BLER, итерации).',
              '3. После завершения всех фреймов: вычислить финальные метрики BER, BLER, SE, TP, CG.',
              '4. Сохранить результаты в структуру ResultPoint для отображения на графиках.',
            ].map((step, i) => (
              <li key={i} className={`flex items-start gap-2 ${step.startsWith('   ') ? 'pl-6' : ''}`}>
                {!step.startsWith('   ') && (
                  <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                )}
                <span>{step.replace(/^   /, '')}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Throughput chart */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.4 — Эффективная пропускная способность (Мбит/с) от Eb/N0
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={throughputData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Мбит/с', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="5G NR BG1 QPSK OFDM" stroke="#2563eb" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Учебный LDPC BPSK" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Iteration chart */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.5 — Зависимость среднего числа итераций NMS и доли успешного декодирования от SNR
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={iterationData} margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis yAxisId="iter" label={{ value: 'Итерации', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="conv" orientation="right" domain={[0, 100]}
                label={{ value: 'Сходимость, %', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
              <Line yAxisId="iter" type="monotone" dataKey="avgIter" name="Среднее итераций" stroke="#7c3aed" strokeWidth={2} />
              <Line yAxisId="conv" type="monotone" dataKey="convergence" name="Сходимость, %" stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Таким образом, в данной главе формализована постановка задачи моделирования, разработана
          структурная схема исследуемой системы передачи данных, дано математическое описание каждого
          компонента модели (от генерации бит до NMS-декодирования), определены показатели качества
          и описан алгоритм проведения имитационного эксперимента. Представленные графики BER, BLER
          и пропускной способности демонстрируют ожидаемые характеристики системы для последующей
          верификации результатов в главе 3.
        </Para>
      </Section>
    </div>
  );
};
