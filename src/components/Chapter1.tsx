import React from 'react';
import { Formula } from './Formula';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { bpskAwgnBer, bpskRayleighBer, snrPoints } from '../data/berData';

const rayleighVsAwgnData = snrPoints.map(snr => ({
  snr,
  "AWGN (теория)": parseFloat(Math.max(1e-7, bpskAwgnBer(snr)).toFixed(8)),
  "Rayleigh (теория)": parseFloat(Math.max(1e-7, bpskRayleighBer(snr)).toFixed(8)),
}));

const Section: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
  <section id={id} className="mb-10">
    <h3 className="text-xl font-bold text-blue-800 border-l-4 border-blue-500 pl-3 mb-4">{title}</h3>
    {children}
  </section>
);

const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-800 leading-7 mb-3 text-justify indent-8">{children}</p>
);

export const Chapter1: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-2 uppercase tracking-wide">
        ГЛАВА 1. ТЕОРЕТИЧЕСКИЕ ОСНОВЫ ПОМЕХОУСТОЙЧИВОГО КОДИРОВАНИЯ В МОБИЛЬНЫХ СЕТЯХ 5G
      </h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded" />

      {/* 1.1 */}
      <Section title="1.1. Особенности радиоканала мобильной сети пятого поколения" id="ch1-1">
        <Para>
          Сети мобильной связи пятого поколения (5G NR — New Radio) представляют собой
          качественный технологический скачок по сравнению с предшествующими стандартами LTE/LTE-A.
          Стандарт 5G NR разработан консорциумом 3GPP (серии Release 15 и выше) и
          ориентирован на достижение пиковой скорости передачи данных свыше 20 Гбит/с,
          задержки не более 1 мс в режиме URLLC и плотности подключений до 10⁶ устройств на км².
          Достижение столь высоких показателей требует применения эффективных методов помехоустойчивого
          кодирования, способных обеспечить надёжную передачу информации в условиях разнообразных
          видов помех и замираний, характерных для мобильной среды.
        </Para>
        <Para>
          Стандарт 5G NR поддерживает работу в трёх диапазонах частот: FR1 (sub-6 GHz, 450 МГц –
          6 ГГц), FR2 (mmWave, 24,25 – 52,6 ГГц) и расширенном FR2-2 (52,6 – 71 ГГц). Каждый
          диапазон характеризуется собственными условиями распространения: в FR1 доминируют
          дифракция и отражение от городских объектов, в FR2 — высокое затухание в атмосфере
          и ограниченное проникновение через препятствия. Это определяет специфику моделей
          канала и требований к помехоустойчивому кодированию.
        </Para>
        <Para>
          Радиоканал в мобильных сетях характеризуется совокупностью физических явлений:
          многолучевым распространением (multipath propagation), эффектом Доплера,
          замираниями (fading), а также аддитивным белым гауссовским шумом (AWGN).
          Многолучевое распространение возникает вследствие отражения, дифракции и рассеяния
          радиоволн от препятствий (здания, рельеф местности), что приводит к интерференции
          нескольких копий сигнала на приёмной стороне.
        </Para>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
          <p className="font-semibold text-blue-800 mb-2">Модель принятого сигнала в многолучевом канале:</p>
          <Formula
            math="r(t) = \sum_{l=0}^{L-1} h_l(t) \cdot s(t - \tau_l) + n(t)"
            block
            label="1.1"
          />
          <p className="text-sm text-gray-600 mt-2">
            где <Formula math="h_l(t)" /> — комплексный коэффициент усиления <Formula math="l" />-го луча;{' '}
            <Formula math="\tau_l" /> — задержка <Formula math="l" />-го луча;{' '}
            <Formula math="s(t)" /> — переданный сигнал;{' '}
            <Formula math="n(t)" /> — аддитивный белый гауссовский шум.
          </p>
        </div>

        <Para>
          Модель AWGN описывает канал, в котором единственным источником помех является
          тепловой шум с равномерным спектром. Спектральная плотность мощности шума определяется
          как <Formula math="N_0/2" /> Вт/Гц, а мгновенные значения шума подчиняются нормальному
          распределению с нулевым математическим ожиданием и дисперсией <Formula math="\sigma^2" />.
          Несмотря на свою идеализированность, модель AWGN широко применяется для теоретических оценок
          и сравнительного анализа схем кодирования, служа нижней границей ошибок при заданном SNR.
        </Para>

        <Para>
          Модель замираний Рэлея (Rayleigh fading) отражает статистические свойства канала при
          наличии множества лучей без доминирующей прямой видимости (NLOS — Non-Line-of-Sight).
          Амплитуда огибающей сигнала в таком канале подчиняется распределению Рэлея, а
          комплексная амплитуда — двумерному нормальному распределению:
        </Para>

        <Formula
          math="h = h_I + j \cdot h_Q, \quad h_I, h_Q \sim \mathcal{N}\left(0, \frac{1}{2}\right)"
          block
          label="1.2"
        />

        <Para>
          Среднее значение мощности канала при замираниях Рэлея нормировано к единице:
        </Para>

        <Formula
          math="\mathbb{E}[|h|^2] = \mathbb{E}[h_I^2] + \mathbb{E}[h_Q^2] = \frac{1}{2} + \frac{1}{2} = 1"
          block
          label="1.3"
        />

        <Para>
          На рисунке 1.1 представлено сравнение теоретических кривых BER (Bit Error Rate —
          вероятность ошибки на бит) для модуляции BPSK в каналах AWGN и Rayleigh fading.
          Видно, что замирания существенно ухудшают характеристики системы: для достижения
          BER = 10⁻³ в канале Рэлея требуется значительно большее отношение энергии бита к
          спектральной плотности шума <Formula math="E_b/N_0" />, что наглядно демонстрирует
          необходимость применения помехоустойчивого кодирования.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 1.1 — Теоретические кривые BER(Eb/N0) для BPSK: AWGN и Rayleigh fading
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={rayleighVsAwgnData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis
                scale="log"
                domain={[1e-7, 1]}
                tickFormatter={(v: unknown) => Number(v).toExponential(0)}
                label={{ value: 'BER', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={(v: unknown) => Number(v).toExponential(2)} />
              <Legend />
              <Line type="monotone" dataKey="AWGN (теория)" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Rayleigh (теория)" stroke="#dc2626" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Среди ключевых характеристик канала связи в 5G NR выделяют следующие параметры.
          Отношение сигнал/шум (SNR) определяет энергетическое качество канала:
        </Para>

        <Formula
          math="\text{SNR} = \frac{E_s}{N_0} = \frac{E_b}{N_0} \cdot R \cdot \log_2 M"
          block
          label="1.4"
        />

        <Para>
          где <Formula math="E_s" /> — энергия символа, <Formula math="E_b" /> — энергия бита,
          <Formula math="R" /> — скорость кода, <Formula math="M" /> — порядок модуляции.
          Данное соотношение показывает, что при фиксированном SNR увеличение скорости кода
          или порядка модуляции приводит к снижению энергии на бит.
        </Para>
      </Section>

      {/* 1.2 */}
      <Section title="1.2. Классификация методов помехоустойчивого кодирования" id="ch1-2">
        <Para>
          Помехоустойчивое (канальное) кодирование — совокупность методов добавления
          избыточности к передаваемым данным с целью обнаружения и исправления ошибок, возникающих
          в канале передачи. Основная задача кодирования — приближение к границе Шеннона, которая
          определяет максимально достижимую скорость безошибочной передачи данных при заданном SNR.
        </Para>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-amber-800 mb-1">Теорема Шеннона о пропускной способности канала:</p>
          <Formula
            math="C = B \log_2\!\left(1 + \frac{S}{N}\right)"
            block
            label="1.5"
          />
          <p className="text-sm text-gray-700">
            где <Formula math="C" /> — пропускная способность (бит/с), <Formula math="B" /> — полоса пропускания (Гц),
            <Formula math="S/N" /> — линейное отношение сигнал/шум.
          </p>
        </div>

        <Para>
          Современные методы помехоустойчивого кодирования принято классифицировать по нескольким
          критериям. По типу обнаружения и исправления ошибок различают коды с обнаружением ошибок
          (ARQ — Automatic Repeat reQuest) и коды с исправлением ошибок (FEC — Forward Error
          Correction). В системах 5G NR применяется гибридный подход HARQ (Hybrid ARQ), сочетающий
          оба метода.
        </Para>

        <Para>
          По структуре различают блочные коды и свёрточные коды. Блочные коды разделяют входной
          поток на блоки длиной <Formula math="k" /> бит и добавляют <Formula math="r = n - k" /> проверочных
          бит, формируя кодовое слово длиной <Formula math="n" /> бит. Скорость кода определяется
          как <Formula math="R = k/n" />. В стандарте 5G NR для канала данных (PDSCH/PUSCH) применяются
          коды LDPC, а для канала управления (PDCCH/PUCCH) — полярные коды.
        </Para>

        <Para>
          По методу декодирования различают коды с жёстким решением (hard-decision decoding, HD) и
          с мягким решением (soft-decision decoding, SD). Мягкое декодирование использует
          апостериорные вероятности (LLR — Log-Likelihood Ratio) и обеспечивает выигрыш до 2–3 дБ
          по сравнению с жёстким. Алгоритм BP (Belief Propagation) для LDPC-кодов относится к
          категории итеративного мягкого декодирования.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Тип кода</th>
                <th className="border border-gray-300 px-3 py-2">Применение в 5G</th>
                <th className="border border-gray-300 px-3 py-2">Декодирование</th>
                <th className="border border-gray-300 px-3 py-2">Выигрыш (дБ)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["LDPC (3GPP TS 38.212)", "PDSCH/PUSCH (данные)", "Belief Propagation / NMS", "4–6"],
                ["Полярные коды", "PDCCH/PUCCH (управление)", "SC-List, CA-Polar", "2–4"],
                ["Turbo (LTE)", "LTE PDSCH (устарел)", "MAP/BCJR", "3–5"],
                ["Свёрточные", "PBCH (5G NR)", "Витерби", "2–3"],
                ["CRC", "Обнаружение ошибок", "Алгебраическое", "—"],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 px-3 py-2 text-center first:text-left">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-1 text-center">Таблица 1.1 — Сравнение методов помехоустойчивого кодирования в 5G NR</p>
        </div>
      </Section>

      {/* 1.3 */}
      <Section title="1.3. Математические основы LDPC-кодов" id="ch1-3">
        <Para>
          Коды с малой плотностью проверок на чётность (LDPC — Low-Density Parity-Check codes)
          были предложены Р. Галлагером в 1962 году и переоткрыты в конце 1990-х. LDPC-код
          задаётся разреженной бинарной матрицей проверок на чётность
          <Formula math="\mathbf{H}" /> размерности <Formula math="(n-k) \times n" />,
          где <Formula math="n" /> — длина кодового слова, <Formula math="k" /> — число
          информационных бит. Кодовое слово <Formula math="\mathbf{c}" /> удовлетворяет условию:
        </Para>

        <Formula
          math="\mathbf{H} \cdot \mathbf{c}^T = \mathbf{0} \pmod{2}"
          block
          label="1.6"
        />

        <Para>
          Разреженность матрицы <Formula math="\mathbf{H}" /> означает, что число единиц в
          каждой строке (степень узла проверки) <Formula math="d_c" /> и в каждом столбце
          (степень переменного узла) <Formula math="d_v" /> значительно меньше <Formula math="n" />.
          Для регулярного LDPC-кода <Formula math="(d_v, d_c)" /> скорость кода:
        </Para>

        <Formula
          math="R = 1 - \frac{d_v}{d_c}"
          block
          label="1.7"
        />

        <Para>
          Граф Таннера (Tanner graph) является биpartitным графом, в котором переменные узлы
          (variable nodes, VN) соответствуют битам кодового слова, а узлы проверок (check nodes, CN)
          — строкам матрицы <Formula math="\mathbf{H}" />. Ребро соединяет VN <Formula math="j" /> с
          CN <Formula math="i" />, если <Formula math="H_{ij} = 1" />. Цикл в графе Таннера
          длиной <Formula math="g" /> (girths) ограничивает производительность BP-декодирования:
          минимальная длина цикла <Formula math="g \geq 6" /> обеспечивает нормальную сходимость.
        </Para>

        <Para>
          Квазициклические LDPC-коды (QC-LDPC) строятся из циклических сдвиговых матриц
          (circulant permutation matrices, CPM) размера <Formula math="Z \times Z" />.
          Матрица <Formula math="\mathbf{H}" /> QC-LDPC-кода представляется в виде матрицы
          сдвигов <Formula math="\mathbf{B}" /> с элементами <Formula math="b_{ij} \in \{-1, 0, 1, \ldots, Z-1\}" />:
        </Para>

        <Formula
          math="\mathbf{H} = \begin{pmatrix} \mathbf{I}^{(b_{00})} & \cdots & \mathbf{I}^{(b_{0,K-1})} \\ \vdots & \ddots & \vdots \\ \mathbf{I}^{(b_{M-1,0})} & \cdots & \mathbf{I}^{(b_{M-1,K-1})} \end{pmatrix}"
          block
          label="1.8"
        />

        <Para>
          где <Formula math="\mathbf{I}^{(s)}" /> — циклический сдвиг единичной матрицы на
          <Formula math="s" /> позиций, а <Formula math="b_{ij} = -1" /> означает нулевой блок.
          Такая структура позволяет эффективно реализовывать кодирование и декодирование на
          специализированном оборудовании за счёт параллельной обработки.
        </Para>

        <Para>
          В стандарте 3GPP TS 38.212 для 5G NR определены два базовых графа: BG1 (для блоков
          данных 3840 байт и выше) и BG2 (для коротких блоков). Базовый граф BG1 имеет
          параметры: <Formula math="m_b = 46" /> строк, <Formula math="n_b = 68" /> столбцов
          (из которых 22 — систематических столбца и 46 — проверочных).
          Набор допустимых значений подъёмного фактора: <Formula math="Z \in \{2, 4, 8, 16, 32, \ldots, 384\}" />.
        </Para>
      </Section>

      {/* 1.4 */}
      <Section title="1.4. Алгоритм Belief Propagation и Normalized Min-Sum" id="ch1-4">
        <Para>
          Алгоритм суммарного произведения (Sum-Product Algorithm, SPA), также называемый
          Belief Propagation (BP), является итеративным алгоритмом декодирования для LDPC-кодов.
          На входе декодера принимаются логарифмические отношения правдоподобия (LLR):
        </Para>

        <Formula
          math="L_j = \ln \frac{P(c_j=0 \mid r_j)}{P(c_j=1 \mid r_j)} = \frac{2 r_j}{\sigma^2}"
          block
          label="1.9"
        />

        <Para>
          для канала AWGN с дисперсией шума <Formula math="\sigma^2 = N_0/2" />.
          Алгоритм BP выполняет итеративный обмен сообщениями между переменными узлами и
          узлами проверок. На шаге горизонтального прохода (CN → VN):
        </Para>

        <Formula
          math="m_{i \to j} = 2 \tanh^{-1}\!\left(\prod_{j' \in \mathcal{N}(i) \setminus j} \tanh\!\left(\frac{L_{j' \to i}}{2}\right)\right)"
          block
          label="1.10"
        />

        <Para>
          На шаге вертикального прохода (VN → CN) суммируются канальный LLR и все входящие
          сообщения от узлов проверок, кроме текущего:
        </Para>

        <Formula
          math="L_{j \to i} = L_j + \sum_{i' \in \mathcal{M}(j) \setminus i} m_{i' \to j}"
          block
          label="1.11"
        />

        <Para>
          Алгоритм Min-Sum (MS) является аппроксимацией BP, заменяющей вычисление
          <Formula math="\tanh" /> на операцию минимума:
        </Para>

        <Formula
          math="m_{i \to j}^{MS} = \left(\prod_{j' \in \mathcal{N}(i) \setminus j} \text{sign}(L_{j' \to i})\right) \cdot \min_{j' \in \mathcal{N}(i) \setminus j} |L_{j' \to i}|"
          block
          label="1.12"
        />

        <Para>
          Нормализованный Min-Sum (NMS) вводит масштабирующий коэффициент
          <Formula math="\alpha \in (0, 1]" />, компенсирующий систематическое завышение
          сообщений в алгоритме MS:
        </Para>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
          <Formula
            math="m_{i \to j}^{NMS} = \alpha \cdot m_{i \to j}^{MS}, \quad \alpha \approx 0{,}75\text{–}0{,}85"
            block
            label="1.13"
          />
          <p className="text-sm text-gray-600 mt-1">
            Типовое значение <Formula math="\alpha = 0{,}8" /> обеспечивает оптимальный
            баланс между точностью аппроксимации и вычислительной сложностью.
          </p>
        </div>

        <Para>
          Апостериорный LLR на каждой итерации для переменного узла <Formula math="j" />:
        </Para>

        <Formula
          math="L_j^{AP} = L_j + \sum_{i \in \mathcal{M}(j)} m_{i \to j}"
          block
          label="1.14"
        />

        <Para>
          Жёсткое решение принимается как <Formula math="\hat{c}_j = 0" />, если
          <Formula math="L_j^{AP} \geq 0" />, и <Formula math="\hat{c}_j = 1" /> иначе.
          Декодирование завершается при выполнении всех проверок на чётность
          <Formula math="\mathbf{H} \hat{\mathbf{c}}^T = \mathbf{0}" /> или по достижении
          максимального числа итераций <Formula math="I_{max}" /> (типично 50 для 5G NR).
        </Para>
      </Section>

      {/* 1.5 */}
      <Section title="1.5. Схемы модуляции и технология OFDM в 5G NR" id="ch1-5">
        <Para>
          Стандарт 5G NR поддерживает схемы квадратурной амплитудной модуляции (QAM) различных
          порядков: BPSK, QPSK, 16-QAM, 64-QAM и 256-QAM. Число бит на символ составляет
          <Formula math="\log_2 M" />, где <Formula math="M" /> — порядок созвездия. Вероятность
          ошибки символа для QAM-M в канале AWGN аппроксимируется выражением:
        </Para>

        <Formula
          math="P_s \approx \frac{4(\sqrt{M}-1)}{\sqrt{M}} \cdot Q\!\left(\sqrt{\frac{3 \log_2 M \cdot E_b/N_0}{M-1}}\right)"
          block
          label="1.15"
        />

        <Para>
          Технология OFDM (Orthogonal Frequency Division Multiplexing) разделяет широкополосный
          канал на <Formula math="N" /> ортогональных поднесущих. Передаваемый сигнал формируется
          путём обратного дискретного преобразования Фурье (IDFT) над комплексными символами
          <Formula math="X_k" />:
        </Para>

        <Formula
          math="x_n = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} X_k \cdot e^{j 2\pi kn/N}, \quad n = 0, 1, \ldots, N-1"
          block
          label="1.16"
        />

        <Para>
          Ортогональность поднесущих обеспечивает отсутствие межсимвольной интерференции (ISI)
          при условии, что длина циклического префикса (CP) превышает максимальную задержку
          многолучевого распространения: <Formula math="N_{CP} \geq \tau_{max} \cdot f_s" />.
          В 5G NR используются конфигурации нумерологии с субинтервалами поднесущих
          <Formula math="\Delta f \in \{15, 30, 60, 120, 240\}" /> кГц.
        </Para>

        <Para>
          Совместное применение OFDM и LDPC-кодирования образует систему кодированной OFDM
          (COFDM — Coded OFDM). Конвейер обработки сигнала в нисходящей линии (DL) 5G NR
          включает: кодирование транспортного блока (TB) → скремблирование → модуляция →
          предварительное кодирование MIMO → отображение на ресурсные элементы → IFFT →
          добавление CP → DAC → передача.
        </Para>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-gray-700 mb-3 text-center">
            Рисунок 1.2 — Конвейер обработки сигнала физического уровня 5G NR (DL)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 text-xs">
            {["TB input", "CRC-24A", "LDPC кодирование", "Rate Matching", "Скремблирование",
              "QAM Mapper", "Layer Mapping", "MIMO Precoding", "RE Mapping", "OFDM IFFT", "CP добавление", "Передача"].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="bg-blue-600 text-white px-2 py-1 rounded text-center">{step}</div>
                {i < arr.length - 1 && <span className="text-gray-400">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
