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
          качественный технологический скачок по сравнению с предшествующими стандартами.
          Стандарт 5G NR разработан консорциумом 3GPP (серии Release 15 и выше) и
          ориентирован на достижение пиковой скорости передачи данных свыше 20 Гбит/с,
          задержки не более 1 мс и плотности подключений до 10⁶ устройств на км². Достижение
          столь высоких показателей требует применения эффективных методов помехоустойчивого
          кодирования, способных обеспечить надёжную передачу информации в условиях
          разнообразных видов помех и замираний.
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
            <Formula math="n(t)" /> — аддитивный шум.
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
          комплексная амплитуда — распределению Гаусса:
        </Para>

        <Formula
          math="h = h_I + j \cdot h_Q, \quad h_I, h_Q \sim \mathcal{N}\left(0, \frac{1}{2}\right)"
          block
          label="1.2"
        />

        <Para>
          Среднее значение мощности канала при замираниях Рэлея:
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
          спектральной плотности шума <Formula math="E_b/N_0" />.
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
            где <Formula math="C" /> — пропускная способность (бит/с);{' '}
            <Formula math="B" /> — полоса частот (Гц);{' '}
            <Formula math="S/N" /> — отношение сигнал/шум (линейное).
          </p>
        </div>

        <Para>
          Методы помехоустойчивого кодирования принято разделять на несколько основных классов
          по алгебраической структуре и способу построения:
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="border border-blue-500 px-4 py-2 text-left">Класс кода</th>
                <th className="border border-blue-500 px-4 py-2 text-left">Примеры</th>
                <th className="border border-blue-500 px-4 py-2 text-left">Применение в 5G</th>
                <th className="border border-blue-500 px-4 py-2 text-left">Алгоритм декодирования</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Блоковые коды", "Хэмминга, BCH, Reed-Solomon", "Нет (использовались в LTE/WiMAX)", "Алгебраическое декодирование"],
                ["Свёрточные коды", "CC (7,1/2)", "PUSCH в LTE (заменены в 5G)", "Алгоритм Витерби"],
                ["Турбо-коды", "LTE Turbo (3GPP TS 36.212)", "LTE (заменены на LDPC в 5G NR)", "BCJR (MAP)"],
                ["LDPC-коды", "5G NR BG1/BG2 (TS 38.212)", "PDSCH, PUSCH — канальные данные", "Belief Propagation (BP)"],
                ["Полярные коды", "5G NR Polar", "PDCCH — управляющие каналы", "Successive Cancellation"],
              ].map(([cls, ex, app, dec], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-4 py-2 font-medium">{cls}</td>
                  <td className="border border-gray-300 px-4 py-2">{ex}</td>
                  <td className="border border-gray-300 px-4 py-2">{app}</td>
                  <td className="border border-gray-300 px-4 py-2">{dec}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 1.1 — Классификация методов помехоустойчивого кодирования</p>
        </div>

        <Para>
          Скорость кода <Formula math="R" /> является фундаментальным параметром, определяющим
          долю информационных символов в общей кодовой последовательности:
        </Para>

        <Formula
          math="R = \frac{k}{n}"
          block
          label="1.6"
        />

        <Para>
          где <Formula math="k" /> — число информационных битов, <Formula math="n" /> — полная длина кодового слова.
          При скорости <Formula math="R = 1/2" /> (используемой в исследуемых LDPC-профилях) каждый
          информационный бит дополняется одним избыточным битом чётности.
        </Para>

        <Para>
          В стандарте 5G NR для канала данных (PDSCH/PUSCH) приняты LDPC-коды в качестве основного
          метода канального кодирования. Для канала управления (PDCCH) — полярные коды. Это решение
          3GPP обусловлено следующими преимуществами LDPC: высокая пропускная способность при аппаратном
          декодировании, параллелизм вычислений, близость к пределу Шеннона и гибкость масштабирования
          через подъёмный размер (lifting factor) <Formula math="Z" />.
        </Para>
      </Section>

      {/* 1.3 */}
      <Section title="1.3. LDPC-коды: математические основы" id="ch1-3">
        <Para>
          LDPC-коды (Low-Density Parity-Check codes — коды проверки чётности с малой плотностью)
          были впервые предложены Р. Галлагером в 1962 году и «переоткрыты» Маккей и Нилом в
          1996 году. В стандарте 3GPP Release 15 для 5G NR они приняты как основной метод
          кодирования канала данных.
        </Para>

        <Para>
          LDPC-код задаётся разреженной матрицей проверки чётности{' '}
          <Formula math="\mathbf{H}" /> размерности <Formula math="m \times n" />, где{' '}
          <Formula math="m = n - k" /> — число проверочных уравнений, а отношение{' '}
          <Formula math="k/n = R" /> — скорость кода. Условием принадлежности вектора{' '}
          <Formula math="\mathbf{c}" /> кодовому пространству является:
        </Para>

        <Formula
          math="\mathbf{H} \cdot \mathbf{c}^T = \mathbf{0} \pmod{2}"
          block
          label="1.7"
        />

        <Para>
          Разреженность матрицы <Formula math="\mathbf{H}" /> обеспечивает эффективность
          итеративного декодирования. Структуру LDPC-кода удобно представить через двудольный
          граф Таннера <Formula math="G = (V \cup C, E)" />, где{' '}
          <Formula math="V = \{v_1, \ldots, v_n\}" /> — вершины переменных (bits),{' '}
          <Formula math="C = \{c_1, \ldots, c_m\}" /> — проверочные вершины (checks),
          а ребро <Formula math="(v_j, c_i) \in E" /> существует тогда и только тогда,
          когда <Formula math="H_{ij} = 1" />.
        </Para>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-green-800 mb-2">Параметры LDPC-профилей, реализованных в системе моделирования:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="border px-3 py-1">Профиль</th>
                  <th className="border px-3 py-1">n</th>
                  <th className="border px-3 py-1">k</th>
                  <th className="border px-3 py-1">m</th>
                  <th className="border px-3 py-1">R</th>
                  <th className="border px-3 py-1">Z</th>
                  <th className="border px-3 py-1">Тип</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white"><td className="border px-3 py-1">Учебный (edu-24-12)</td><td className="border px-3 py-1">24</td><td className="border px-3 py-1">12</td><td className="border px-3 py-1">12</td><td className="border px-3 py-1">1/2</td><td className="border px-3 py-1">—</td><td className="border px-3 py-1">Случайный</td></tr>
                <tr className="bg-gray-50"><td className="border px-3 py-1">QC-inspired (96,48)</td><td className="border px-3 py-1">96</td><td className="border px-3 py-1">48</td><td className="border px-3 py-1">48</td><td className="border px-3 py-1">1/2</td><td className="border px-3 py-1">—</td><td className="border px-3 py-1">QC-LDPC</td></tr>
                <tr className="bg-white"><td className="border px-3 py-1">5G NR BG1 Z=8</td><td className="border px-3 py-1">544</td><td className="border px-3 py-1">176</td><td className="border px-3 py-1">368</td><td className="border px-3 py-1">~0.32</td><td className="border px-3 py-1">8</td><td className="border px-3 py-1">QC (3GPP BG1)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-1">Таблица 1.2 — LDPC-профили системы моделирования</p>
        </div>

        <Para>
          Квазициклические LDPC-коды (QC-LDPC) задаются посредством матрицы сдвигов{' '}
          <Formula math="\mathbf{B}" /> размерности{' '}
          <Formula math="m_b \times n_b" /> (базовый граф), где каждый элемент{' '}
          <Formula math="b_{ij}" /> задаёт циклический сдвиг единичной матрицы{' '}
          <Formula math="\mathbf{I}_Z" /> размерности{' '}
          <Formula math="Z \times Z" /> (подъёмный размер):
        </Para>

        <Formula
          math="\mathbf{H} = \begin{bmatrix} \mathbf{P}^{b_{00}} & \mathbf{P}^{b_{01}} & \cdots \\ \mathbf{P}^{b_{10}} & \mathbf{P}^{b_{11}} & \cdots \\ \vdots & \vdots & \ddots \end{bmatrix}"
          block
          label="1.8"
        />

        <Para>
          где <Formula math="\mathbf{P}" /> — матрица циклического сдвига порядка{' '}
          <Formula math="Z" />, <Formula math="\mathbf{P}^{-1} = \mathbf{0}" /> (нулевая матрица).
          В стандарте 5G NR Base Graph 1 содержит{' '}
          <Formula math="46 \times 68" /> блоков, а Base Graph 2 —{' '}
          <Formula math="42 \times 52" /> блоков. Подъёмный размер{' '}
          <Formula math="Z" /> может принимать значения из множества{' '}
          <Formula math="\{2, 4, 8, 16, \ldots, 384\}" /> в соответствии с таблицей 3GPP TS 38.212.
        </Para>
      </Section>

      {/* 1.4 */}
      <Section title="1.4. Алгоритм декодирования Belief Propagation (алгоритм распространения убеждений)" id="ch1-4">
        <Para>
          Декодирование LDPC-кодов осуществляется итеративным алгоритмом передачи сообщений
          по графу Таннера — Belief Propagation (BP), также называемым алгоритмом sum-product
          или Message Passing Decoding (MPD). Вход декодера — вектор логарифмических отношений
          правдоподобия (LLR — Log-Likelihood Ratio):
        </Para>

        <Formula
          math="L_j = \ln \frac{P(c_j = 0 \mid y_j)}{P(c_j = 1 \mid y_j)} = \frac{2 y_j}{\sigma^2}"
          block
          label="1.9"
        />

        <Para>
          где <Formula math="y_j" /> — принятый символ, <Formula math="\sigma^2" /> — дисперсия
          аддитивного шума. Положительное значение LLR соответствует склонности к нулю,
          отрицательное — к единице.
        </Para>

        <Para>
          На каждой итерации алгоритм BP выполняет два шага: горизонтальный (check-to-variable)
          и вертикальный (variable-to-check). Сообщение от проверочного узла{' '}
          <Formula math="c_i" /> к переменному узлу <Formula math="v_j" />:
        </Para>

        <Formula
          math="R_{ij} = 2 \tanh^{-1}\!\left(\prod_{j' \in \mathcal{N}(i) \setminus j} \tanh\!\left(\frac{Q_{j'i}}{2}\right)\right)"
          block
          label="1.10"
        />

        <Para>
          Сообщение от переменного узла <Formula math="v_j" /> к проверочному узлу{' '}
          <Formula math="c_i" />:
        </Para>

        <Formula
          math="Q_{ji} = L_j + \sum_{i' \in \mathcal{M}(j) \setminus i} R_{i'j}"
          block
          label="1.11"
        />

        <Para>
          где <Formula math="\mathcal{N}(i)" /> — множество переменных узлов, смежных с{' '}
          <Formula math="c_i" />, а <Formula math="\mathcal{M}(j)" /> — множество проверочных
          узлов, смежных с <Formula math="v_j" />.
        </Para>

        <Para>
          Алгоритм Normalized Min-Sum (NMS) является вычислительно упрощённой версией BP,
          реализованной в системе моделирования. Формула передачи от проверочного узла:
        </Para>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-5">
          <Formula
            math="R_{ij}^{\text{NMS}} = \alpha \cdot \left(\prod_{j' \in \mathcal{N}(i)\setminus j} \text{sign}(Q_{j'i})\right) \cdot \min_{j' \in \mathcal{N}(i)\setminus j} |Q_{j'i}|"
            block
            label="1.12"
          />
          <p className="text-sm text-gray-700 mt-2">
            где <Formula math="\alpha \in (0, 1]" /> — нормировочный коэффициент (в системе по умолчанию{' '}
            <Formula math="\alpha = 0.75" />), компенсирующий завышение оценки min-sum
            по сравнению с sum-product.
          </p>
        </div>

        <Para>
          Апостериорное LLR в переменном узле после каждой итерации:
        </Para>

        <Formula
          math="Q_j^{\text{total}} = L_j + \sum_{i \in \mathcal{M}(j)} R_{ij}"
          block
          label="1.13"
        />

        <Para>
          Решение о значении бита принимается по знаку апостериорного LLR:
        </Para>

        <Formula
          math="\hat{c}_j = \begin{cases} 0, & Q_j^{\text{total}} > 0 \\ 1, & Q_j^{\text{total}} \leq 0 \end{cases}"
          block
          label="1.14"
        />

        <Para>
          Декодирование завершается успешно, если выполнено условие{' '}
          <Formula math="\mathbf{H}\hat{\mathbf{c}}^T = \mathbf{0}" />, или по достижении
          максимального числа итераций. В реализованной системе по умолчанию{' '}
          <Formula math="I_{\max} = 50" /> итераций с адаптивной остановкой при сходимости
          синдрома до нуля.
        </Para>
      </Section>

      {/* 1.5 */}
      <Section title="1.5. Схемы модуляции в стандарте 5G NR" id="ch1-5">
        <Para>
          Стандарт 5G NR поддерживает схемы цифровой модуляции BPSK, QPSK, 16-QAM, 64-QAM и
          256-QAM. В разработанной системе моделирования реализованы BPSK, QPSK и 16-QAM.
          Каждая схема определяется отображением битовых комбинаций на точки сигнального
          созвездия в комплексной плоскости с кодом Грея.
        </Para>

        <Para>
          Для модуляции BPSK (Binary Phase Shift Keying, 1 бит/символ) символы:
        </Para>
        <Formula
          math="s_{\text{BPSK}} \in \{+1, -1\}"
          block
          label="1.15"
        />

        <Para>
          Для модуляции QPSK (Quadrature PSK, 2 бит/символ) с нормировкой по мощности:
        </Para>
        <Formula
          math="s_{\text{QPSK}} \in \left\{\frac{1}{\sqrt{2}}({\pm 1 \pm j})\right\}"
          block
          label="1.16"
        />

        <Para>
          Для модуляции 16-QAM (4 бит/символ) точки созвездия задаются через
          серый код по каждой оси (PAM-4):
        </Para>
        <Formula
          math="s_{\text{16-QAM}} = \frac{1}{\sqrt{10}}\left(a_I + j \cdot a_Q\right), \quad a_I, a_Q \in \{-3, -1, +1, +3\}"
          block
          label="1.17"
        />

        <Para>
          Вероятность ошибки на символ для QAM-сигнализации в канале AWGN:
        </Para>
        <Formula
          math="P_s^{\text{QAM}} \approx \frac{4(\sqrt{M}-1)}{\sqrt{M}} Q\!\left(\sqrt{\frac{6 \log_2 M}{M-1} \cdot \frac{E_s}{N_0}}\right)"
          block
          label="1.18"
        />

        <Para>
          где <Formula math="M" /> — число точек созвездия. Вероятность ошибки на бит при
          применении кода Грея:
        </Para>
        <Formula
          math="P_b \approx \frac{P_s}{\log_2 M}"
          block
          label="1.19"
        />

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-indigo-700 text-white">
                <th className="border px-4 py-2">Модуляция</th>
                <th className="border px-4 py-2">Бит/символ</th>
                <th className="border px-4 py-2">Спектр. эфф. (бит/с/Гц)</th>
                <th className="border px-4 py-2">Требуемый Eb/N0 при BER=10⁻³</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["BPSK", "1", "1 × R", "6.8 дБ (некод.), ~2.8 дБ (LDPC R=1/2)"],
                ["QPSK", "2", "2 × R", "6.8 дБ (некод.), ~1.8 дБ (NR BG1)"],
                ["16-QAM", "4", "4 × R", "10.5 дБ (некод.), ~5.0 дБ (LDPC)"],
              ].map(([m, b, se, snr], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-4 py-2 font-mono font-bold">{m}</td>
                  <td className="border px-4 py-2 text-center">{b}</td>
                  <td className="border px-4 py-2 text-center">{se}</td>
                  <td className="border px-4 py-2">{snr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 1.3 — Схемы модуляции и их характеристики</p>
        </div>
      </Section>

      {/* 1.6 */}
      <Section title="1.6. OFDM-мультиплексирование и организация физического уровня 5G NR" id="ch1-6">
        <Para>
          OFDM (Orthogonal Frequency Division Multiplexing) является базовой волновой формой
          физического уровня 5G NR как для нисходящей (PDSCH), так и для восходящей (PUSCH)
          линии связи. Суть метода — разделение широкополосного канала на{' '}
          <Formula math="N" /> ортогональных поднесущих, каждая из которых используется для
          независимой передачи данных.
        </Para>

        <Para>
          Временно́й сигнал OFDM для одного символа формируется посредством обратного
          дискретного преобразования Фурье (IDFT):
        </Para>

        <Formula
          math="x[n] = \frac{1}{\sqrt{N}} \sum_{k=0}^{N-1} X[k] \cdot e^{j 2\pi k n / N}, \quad n = 0, 1, \ldots, N-1"
          block
          label="1.20"
        />

        <Para>
          где <Formula math="X[k]" /> — модулированный символ на <Formula math="k" />-й
          поднесущей, <Formula math="N" /> — число поднесущих (в системе: 64 или 128).
          Для устранения межсимвольной интерференции (ISI), обусловленной задержками
          многолучевого канала, к каждому OFDM-символу добавляется циклический префикс (CP)
          длиной <Formula math="N_{CP}" />:
        </Para>

        <Formula
          math="\eta_{CP} = \frac{N}{N + N_{CP}}"
          block
          label="1.21"
        />

        <Para>
          где <Formula math="\eta_{CP}" /> — коэффициент полезного использования ресурса
          (CP-penalty). В системе моделирования реализованы три волновые формы: одиночная
          несущая (SC), OFDM-64 и OFDM-128, с настраиваемым циклическим префиксом.
        </Para>

        <Para>
          Общий алгоритм работы физического уровня при передаче транспортного блока (TB) в
          системе моделирования включает следующие этапы: генерация информационных битов →
          добавление CRC → LDPC-кодирование → модуляция (BPSK/QPSK/16-QAM) → формирование
          волновой формы (SC/OFDM) → воздействие канала (AWGN/Rayleigh) → эквализация →
          демодуляция (LLR) → LDPC-декодирование (NMS) → проверка CRC/ошибок → вычисление метрик.
        </Para>

        <div className="bg-gray-100 border border-gray-300 rounded-lg p-5 my-5">
          <p className="font-semibold text-gray-700 mb-3 text-center">
            Рисунок 1.2 — Структурная схема физического уровня системы моделирования
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 text-xs font-mono">
            {[
              "Генератор битов", "→", "CRC", "→", "LDPC кодер", "→",
              "Модулятор", "→", "OFDM/SC", "→", "Канал\n(AWGN/Rayleigh)",
              "→", "Эквалайзер", "→", "Демодулятор\n(LLR)", "→", "LDPC декодер", "→", "BER/BLER"
            ].map((item, i) => (
              item === "→" ? (
                <span key={i} className="text-blue-600 font-bold text-base">→</span>
              ) : (
                <span key={i} className="bg-blue-600 text-white px-2 py-1 rounded text-center whitespace-pre-line leading-4">
                  {item}
                </span>
              )
            ))}
          </div>
        </div>
      </Section>

      {/* Выводы */}
      <div className="mt-8 bg-blue-900 text-white rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">Выводы по главе 1</h3>
        <ul className="list-disc list-inside space-y-2 text-sm leading-6">
          <li>Радиоканал мобильной сети 5G характеризуется AWGN и замираниями Рэлея, что требует эффективного помехоустойчивого кодирования.</li>
          <li>Стандарт 5G NR принял LDPC-коды для канала данных и полярные коды для канала управления — в соответствии с решением 3GPP Release 15.</li>
          <li>LDPC-коды задаются разреженной матрицей проверок чётности и декодируются итеративным алгоритмом BP; в 5G NR используется квазициклическая структура QC-LDPC с базовыми графами BG1 и BG2.</li>
          <li>Алгоритм Normalized Min-Sum обеспечивает близкий к оптимальному результат при существенно меньших вычислительных затратах по сравнению с sum-product, что важно для реализации в реальном времени.</li>
          <li>OFDM-мультиплексирование с циклическим префиксом устраняет межсимвольную интерференцию в многолучевом канале, обеспечивая эффективное разделение спектра.</li>
        </ul>
      </div>
    </div>
  );
};
