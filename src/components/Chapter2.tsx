import React from 'react';
import { Formula } from './Formula';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  generateBerChartData, generateBlerChartData, generateThroughputData,
  generateSpectralEffData, iterationData, codingGainTable
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
const seData = generateSpectralEffData();

const formatBer = (v: unknown) => {
  const n = Number(v);
  return isNaN(n) ? '' : n.toExponential(1);
};



export const Chapter2: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-green-900 mb-2 uppercase tracking-wide">
        ГЛАВА 2. АНАЛИЗ МЕТОДОВ И МАТЕМАТИЧЕСКИХ ОСНОВ СИСТЕМЫ ПОМЕХОУСТОЙЧИВОГО КОДИРОВАНИЯ
      </h2>
      <div className="w-24 h-1 bg-green-500 mx-auto mb-8 rounded" />

      {/* 2.1 */}
      <Section title="2.1. Постановка задачи моделирования" id="ch2-1">
        <Para>
          Математическое описание задачи помехоустойчивого кодирования формулируется следующим образом.
          Дан источник информации, генерирующий последовательность двоичных символов
          <Formula math="u = (u_1, u_2, \ldots, u_k)" />, где <Formula math="k" /> — длина
          информационного блока. Кодер отображает вектор <Formula math="u" /> в кодовое слово
          <Formula math="x = (x_1, x_2, \ldots, x_n)" /> длины <Formula math="n > k" />, называемое
          кодовым словом линейного блокового кода <Formula math="\mathcal{C}(n, k)" />.
        </Para>
        <Para>
          Кодовое слово <Formula math="x" /> принадлежит пространству нулей матрицы проверок на чётность
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
          — вектор проверочных битов, вычисляемый по систематическому порождающему матрице
          <Formula math="G_{\text{sys}}" />. В стандарте 3GPP для BG1 применяется двухшаговое
          кодирование с использованием структурированной части матрицы <Formula math="\mathbf{H}" />,
          что обеспечивает линейную сложность кодирования <Formula math="O(n)" />.
        </Para>
      </Section>

      {/* 2.2 */}
      <Section title="2.2. Структурная схема исследуемого канала" id="ch2-2">
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
          math="L_i = \ln \frac{P(y_i | x_i = 0)}{P(y_i | x_i = 1)} = \frac{2}{\sigma^2} \cdot y_i = \frac{4 R_c \log_2 M \cdot (E_b/N_0)}{1} \cdot y_i"
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
      <Section title="2.3. Математическое описание компонентов модели" id="ch2-3">
        <Para>
          Рассмотрим детально математическое описание ключевых компонентов системы моделирования
          в соответствии со стандартом 3GPP TS 38.212 и реализованным программным средством
          «LDPC Research Studio».
        </Para>

        <div className="space-y-5">
          {/* 2.3.1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.1. Формирование исходной последовательности</h4>
            <Para>
              Источник генерирует псевдослучайную двоичную последовательность (PRBS) длиной k бит с
              равновероятным появлением 0 и 1. К информационному блоку добавляется 16-битный циклический
              код CRC-16-CCITT с порождающим полиномом:
            </Para>
            <Formula
              math="g(x) = x^{16} + x^{12} + x^5 + 1"
              block
              label="2.3"
            />
            <p className="text-sm text-gray-600 text-justify indent-4">
              Результирующий блок из k + 16 бит поступает на вход LDPC-кодера. После декодирования
              CRC-проверка позволяет однозначно определить наличие необнаруженных ошибок в блоке.
            </p>
          </div>

          {/* 2.3.2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.2. LDPC-кодирование</h4>
            <Para>
              Кодирование LDPC выполняется путём умножения информационного вектора u на систематическую
              порождающую матрицу G. Для QC-LDPC-кодов кодирование реализуется эффективно через
              структурированную обратную матрицу задней части матрицы H. Кодовое слово c = (u, p),
              где вектор проверочных символов p определяется из:
            </Para>
            <Formula
              math="\mathbf{H} \cdot [u \; p]^T = 0 \quad \Rightarrow \quad p = -\mathbf{H}_p^{-1} \cdot \mathbf{H}_s \cdot u^T"
              block
              label="2.4"
            />
            <p className="text-sm text-gray-600 text-justify indent-4">
              где <Formula math="\mathbf{H}_s" /> — часть матрицы H, соответствующая систематическим
              битам, <Formula math="\mathbf{H}_p" /> — часть, соответствующая проверочным битам.
              Для BG1 матрица <Formula math="\mathbf{H}_p" /> имеет двойную диагональную структуру,
              что позволяет вычислять p за линейное время.
            </p>
          </div>

          {/* 2.3.3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.3. Модуляция (QAM Mapper)</h4>
            <Para>
              Битовые группы кодового слова отображаются в созвездия сигналов по схеме Gray-кодирования.
              При QPSK каждые 2 бита отображаются в один символ <Formula math="s \in \{\pm 1 \pm j\}/\sqrt{2}" />.
              При 16-QAM каждые 4 бита — в один символ из 16 точек созвездия. Нормировочная константа
              обеспечивает среднюю мощность символа:
            </Para>
            <Formula
              math="\mathbb{E}[|s|^2] = 1, \quad s_{\text{QPSK}} = \frac{1}{\sqrt{2}}(\pm 1 \pm j), \quad s_{16\text{-QAM}} = \frac{1}{\sqrt{10}}(\pm 1, \pm 3)^2"
              block
              label="2.5"
            />
          </div>

          {/* 2.3.4 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.4. OFDM-модуляция и циклический префикс</h4>
            <Para>
              Для формирования OFDM-сигнала комплексные символы <Formula math="S_k" /> распределяются
              по N поднесущим и преобразуются обратным быстрым преобразованием Фурье (IFFT):
            </Para>
            <Formula
              math="s_n = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} S_k \cdot e^{j 2\pi k n / N}, \quad n = 0, 1, \ldots, N-1"
              block
              label="2.6"
            />
            <p className="text-sm text-gray-600 text-justify indent-4">
              Добавление циклического префикса длиной <Formula math="N_{CP}" /> устраняет межсимвольную
              интерференцию при длине импульсного отклика канала, не превышающей <Formula math="N_{CP}" />.
              КПД OFDM: <Formula math="\eta_{\text{OFDM}} = N / (N + N_{CP})" />.
            </p>
          </div>

          {/* 2.3.5 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.5. Согласование скорости передачи</h4>
            <Para>
              Rate matching — механизм адаптации длины кодового слова к доступным ресурсным элементам
              системы. Включает перемежение битов, сокращение (shortening) и перфорацию (puncturing)
              в соответствии с таблицами 3GPP TS 38.212. Результирующая скорость кода:
            </Para>
            <Formula
              math="R_{\text{eff}} = \frac{k}{E}, \quad E = N_{RE} \cdot Q_m \cdot R_{\text{target}}"
              block
              label="2.7"
            />
            <p className="text-sm text-gray-600 text-justify indent-4">
              где <Formula math="N_{RE}" /> — число ресурсных элементов, <Formula math="Q_m" /> — порядок
              модуляции (бит/символ), <Formula math="R_{\text{target}}" /> — целевая скорость кода.
            </p>
          </div>

          {/* 2.3.6 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.6. Модель канала связи</h4>
            <Para>
              В AWGN-канале к каждому комплексному отсчёту <Formula math="s_k" /> добавляется
              комплексный гауссовский шум:
            </Para>
            <Formula
              math="r_k = \sqrt{E_s} \cdot s_k + n_k, \quad n_k \sim \mathcal{CN}(0, \sigma^2)"
              block
              label="2.8"
            />
            <p className="text-sm text-gray-600 text-justify indent-4">
              В канале Рэлея с плоскими замираниями (flat fading) каждый символ умножается на
              комплексный коэффициент замираний:
            </p>
            <Formula
              math="r_k = h_k \cdot \sqrt{E_s} \cdot s_k + n_k, \quad h_k \sim \mathcal{CN}(0, 1)"
              block
              label="2.9"
            />
          </div>

          {/* 2.3.7 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.7. Эквализация и soft-demodulation</h4>
            <Para>
              В канале с замираниями применяется ZF-эквализация (Zero-Forcing) при условии идеального
              знания канала (perfect CSI) на приёмнике:
            </Para>
            <Formula
              math="\hat{s}_k = \frac{r_k}{h_k} = \sqrt{E_s} \cdot s_k + \frac{n_k}{h_k}"
              block
              label="2.10"
            />
            <p className="text-sm text-gray-600 text-justify indent-4">
              ZF-эквализатор устраняет межсимвольную интерференцию, но усиливает шум в глубоких провалах
              замираний, что является его известным недостатком. Эффективный SNR после ZF-эквализации:
            </p>
            <Formula
              math="\text{SNR}_{\text{eff}} = \frac{E_s / \sigma^2}{|h_k|^{-2}} = |h_k|^2 \cdot \text{SNR}"
              block
              label="2.11"
            />
          </div>

          {/* 2.3.8 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 text-sm">2.3.8. LDPC-декодирование (алгоритм NMS)</h4>
            <Para>
              Обновление переменных узлов (VN update) на каждой итерации декодирования:
            </Para>
            <Formula
              math="\mu_{v \to c}^{(i)} = L_v + \sum_{c' \in \mathcal{N}(v) \setminus c} \mu_{c' \to v}^{(i-1)}"
              block
              label="2.12"
            />
            <Para>
              Обновление проверочных узлов (CN update) по алгоритму NMS:
            </Para>
            <Formula
              math="\mu_{c \to v}^{(i)} = \alpha \cdot \prod_{v' \in \mathcal{N}(c) \setminus v} \text{sgn}(\mu_{v' \to c}^{(i-1)}) \cdot \min_{v' \in \mathcal{N}(c) \setminus v} |\mu_{v' \to c}^{(i-1)}|"
              block
              label="2.13"
            />
            <p className="text-sm text-gray-600 text-justify indent-4">
              Декодирование завершается при выполнении синдромного условия{' '}
              <Formula math="\mathbf{H} \hat{x}^T = 0" /> или по достижении максимального числа
              итераций <Formula math="I_{\max} = 50" />.
            </p>
          </div>
        </div>
      </Section>

      {/* 2.4 */}
      <Section title="2.4. Показатели качества и результаты моделирования" id="ch2-4">
        <Para>
          В данном разделе представлены основные результаты аналитического моделирования системы
          помехоустойчивого кодирования, включая кривые BER, BLER, пропускной способности и
          спектральной эффективности для исследуемых LDPC-профилей.
        </Para>

        {/* 2.4.1 - BER */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-1">
            Рисунок 2.2 — Кривые BER(Eb/N0) для LDPC-профилей в канале AWGN
          </p>
          <p className="text-center text-xs text-gray-500 mb-3">(BPSK/QPSK, R=1/2)</p>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={berData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }} />
              <YAxis
                scale="log"
                domain={[1e-7, 1]}
                tickFormatter={formatBer}
                label={{ value: 'BER', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <Tooltip formatter={formatBer} />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="Без кодирования (BPSK)" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="8 4" />
              <Line type="monotone" dataKey="LDPC (24,12) R=1/2" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="LDPC QC (96,48) R=1/2" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="5G NR BG1 QPSK AWGN" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="BPSK Rayleigh (некод.)" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Анализ рисунка 2.2 показывает характерную для LDPC-кодов «водопадную» (waterfall) форму кривых
          BER: при значениях <Formula math="E_b/N_0" /> ниже порогового BER практически не отличается от
          некодированного, однако выше порога наблюдается резкое снижение BER на несколько порядков при
          незначительном увеличении SNR. Профиль 5G NR BG1 (Z=8, QPSK) демонстрирует наилучшие
          характеристики: порог декодирования составляет около 0,8 дБ, а при Eb/N0 = 3 дБ BER
          опускается ниже 10⁻⁷.
        </Para>

        {/* 2.4.2 - BLER */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.3 — Кривые BLER(Eb/N0) для трёх LDPC-профилей
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={blerData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }} />
              <YAxis
                scale="log"
                domain={[1e-5, 1]}
                tickFormatter={formatBer}
                label={{ value: 'BLER', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={formatBer} />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="LDPC (24,12)" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="LDPC QC (96,48)" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="5G NR BG1 (Z=8)" stroke="#dc2626" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 2.4.3 - Throughput */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.4 — Эффективная пропускная способность (Мбит/с) vs Eb/N0
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={throughputData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'Мбит/с', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="5G NR BG1 QPSK OFDM" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Учебный LDPC BPSK" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 2.4.4 - Coding Gain table */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-5">
          <h4 className="font-bold text-green-800 mb-3 text-sm">Таблица 2.1 — Энергетический выигрыш от кодирования (Coding Gain) при BER = 10⁻³</h4>
          <div className="overflow-x-auto">
            <table className="text-xs w-full border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-green-200 px-3 py-2 text-left">Профиль LDPC</th>
                  <th className="border border-green-200 px-3 py-2">Модуляция</th>
                  <th className="border border-green-200 px-3 py-2">Канал</th>
                  <th className="border border-green-200 px-3 py-2">SNR код. (дБ)</th>
                  <th className="border border-green-200 px-3 py-2">SNR некод. (дБ)</th>
                  <th className="border border-green-200 px-3 py-2 font-bold">Gain (дБ)</th>
                </tr>
              </thead>
              <tbody>
                {codingGainTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                    <td className="border border-green-200 px-3 py-2 font-medium">{row.profile}</td>
                    <td className="border border-green-200 px-3 py-2 text-center">{row.modulation}</td>
                    <td className="border border-green-200 px-3 py-2 text-center">{row.channel}</td>
                    <td className="border border-green-200 px-3 py-2 text-center">{row.requiredSnrCoded}</td>
                    <td className="border border-green-200 px-3 py-2 text-center">{row.requiredSnrUncoded}</td>
                    <td className="border border-green-200 px-3 py-2 text-center font-bold text-green-700">{row.codingGain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2.4.5 - Iterations */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.5 — Среднее число итераций NMS и процент сходимости (5G NR BG1, AWGN)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={iterationData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis yAxisId="left" label={{ value: 'Ср. итерации', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Сходимость %', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="avgIter" name="Ср. число итераций" fill="#2563eb" />
              <Bar yAxisId="right" dataKey="convergence" name="Сходимость %" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2.4.6 */}
        <Para>
          Как видно из рисунка 2.5, при SNR ниже порогового (около 0 дБ) алгоритм NMS в большинстве
          случаев не сходится за <Formula math="I_{\max} = 50" /> итераций (процент сходимости менее 40%).
          При SNR = 4 дБ среднее число итераций снижается до 14,2, а сходимость составляет 89%.
          При SNR ≥ 8 дБ алгоритм сходится за 3–5 итераций практически в 100% случаев.
        </Para>

        {/* 2.4.7 - SE */}
        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.6 — Спектральная эффективность (бит/с/Гц) vs Eb/N0
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={seData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'SE (бит/с/Гц)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="5G NR BG1 QPSK" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Без кодирования BPSK" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="8 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* 2.5 */}
      <Section title="2.5. Алгоритм проведения и результаты сравнительного моделирования" id="ch2-5">
        <Para>
          Сравнительный анализ LDPC-профилей по совокупности метрик позволяет сформулировать следующие
          выводы. Профиль 5G NR BG1 (Z=8) обеспечивает наилучшие характеристики BER и BLER в канале
          AWGN при QPSK-модуляции: coding gain 5,0 дБ при BER = 10⁻³. Максимальная пропускная
          способность при SNR ≥ 5 дБ составляет 9,3 Мбит/с (QPSK, OFDM-128, R=1/2).
        </Para>
        <Para>
          Профиль QC-LDPC (96,48) демонстрирует хорошее соотношение «сложность / производительность»:
          coding gain 4,7 дБ при умеренной вычислительной нагрузке. Учебный профиль (24,12) при всей
          своей простоте обеспечивает лишь 4,0 дБ выигрыша, что объясняется малой длиной блока и
          слабыми расстояниями в коде.
        </Para>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 my-5">
          <h4 className="font-bold text-green-800 mb-3 text-sm">Сводные результаты моделирования</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: '5,0 дБ', label: 'Coding Gain (BG1, QPSK)', color: 'text-green-700', bg: 'bg-green-100' },
              { value: '9,3 Мбит/с', label: 'Пик пропускной способности', color: 'text-blue-700', bg: 'bg-blue-100' },
              { value: '0,93', label: 'КПД OFDM-128', color: 'text-yellow-700', bg: 'bg-yellow-100' },
              { value: '10⁻⁷', label: 'Мин. BER при SNR=3 дБ', color: 'text-red-700', bg: 'bg-red-100' },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} rounded-lg p-3 text-center`}>
                <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-xs text-gray-600 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
