import React from 'react';
import { Formula } from './Formula';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, Cell
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

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#f59e0b'];

export const Chapter2: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-green-900 mb-2 uppercase tracking-wide">
        ГЛАВА 2. АНАЛИЗ МЕТОДОВ ПОМЕХОУСТОЙЧИВОГО КОДИРОВАНИЯ В КАНАЛЕ 5G NR
      </h2>
      <div className="w-24 h-1 bg-green-500 mx-auto mb-8 rounded" />

      {/* 2.1 */}
      <Section title="2.1. Метрики качества передачи: BER, BLER, throughput и спектральная эффективность" id="ch2-1">
        <Para>
          Для количественной оценки эффективности системы помехоустойчивого кодирования
          используется набор ключевых метрик физического уровня. Вероятность ошибки на бит
          (BER — Bit Error Rate) определяется как отношение числа ошибочно принятых битов
          к общему числу переданных битов:
        </Para>

        <Formula
          math="\text{BER} = \frac{N_{\text{err}}}{N_{\text{total}}}"
          block
          label="2.1"
        />

        <Para>
          Вероятность ошибки на блок (BLER — Block Error Rate) характеризует долю блоков,
          декодированных с ошибкой. При использовании CRC-проверки блок считается ошибочным,
          если CRC-проверка провалена. При отсутствии CRC (в реализованной системе — при
          критерии bit mismatch) блок считается ошибочным при наличии хотя бы одного
          ошибочного бита:
        </Para>

        <Formula
          math="\text{BLER} = \frac{N_{\text{block errors}}}{N_{\text{blocks}}}"
          block
          label="2.2"
        />

        <Para>
          Эффективная пропускная способность (throughput) в системе моделирования
          вычисляется с учётом скорости символов, числа бит на символ, скорости кода
          и коэффициента успешной доставки блоков:
        </Para>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-5">
          <Formula
            math="\text{Throughput} = R_s \cdot \log_2 M \cdot R_c \cdot \eta_{\text{wf}} \cdot (1 - \text{BLER})"
            block
            label="2.3"
          />
          <p className="text-sm text-gray-700 mt-1">
            где <Formula math="R_s = 20" /> Мбод — символьная скорость; <Formula math="\log_2 M" /> — бит/символ;{' '}
            <Formula math="R_c" /> — скорость кода; <Formula math="\eta_{\text{wf}}" /> — КПД волновой формы.
          </p>
        </div>

        <Para>
          Спектральная эффективность (SE — Spectral Efficiency) выражает число информационных
          бит, передаваемых в единицу полосы частот за единицу времени (бит/с/Гц):
        </Para>

        <Formula
          math="\text{SE} = \log_2 M \cdot R_c \cdot \eta_{\text{wf}} \cdot (1 - \text{BLER})"
          block
          label="2.4"
        />

        <Para>
          Для OFDM-128 коэффициент полезного использования ресурса с учётом циклического
          префикса <Formula math="N_{CP}" /> и эквализатора:
        </Para>

        <Formula
          math="\eta_{\text{OFDM-128}} = 0.93 \cdot \frac{128}{128 + N_{CP}} \cdot \eta_{\text{eq}}"
          block
          label="2.5"
        />

        <Para>
          где <Formula math="\eta_{\text{eq}} = 0.95" /> для ZF-эквализатора и{' '}
          <Formula math="\eta_{\text{eq}} = 0.85" /> без эквализации.
        </Para>

        <Para>
          Энергетический выигрыш от кодирования (Coding Gain) <Formula math="G_c" />
          определяется как разность требуемых значений <Formula math="E_b/N_0" /> при заданном
          уровне BER (обычно <Formula math="10^{-3}" />) для некодированной и кодированной
          систем:
        </Para>

        <Formula
          math="G_c = \left.\frac{E_b}{N_0}\right|_{\text{uncoded, BER}=10^{-3}} - \left.\frac{E_b}{N_0}\right|_{\text{coded, BER}=10^{-3}} \quad [\text{дБ}]"
          block
          label="2.6"
        />

        <Para>
          Требуемое <Formula math="E_b/N_0" /> для LDPC-кода с параметрами (<Formula math="n,k" />)
          при BER = <Formula math="p_0" /> вычисляется методом интерполяции по результатам
          симуляции или по теоретической кривой.
        </Para>
      </Section>

      {/* 2.2 */}
      <Section title="2.2. Сравнительный анализ BER-характеристик LDPC-профилей" id="ch2-2">
        <Para>
          На рисунке 2.1 представлены кривые BER(Eb/N0) для трёх реализованных LDPC-профилей
          (учебный (24,12), QC-LDPC (96,48), 5G NR BG1 Z=8) по сравнению с некодированной
          передачей BPSK в канале AWGN. Все профили имеют скорость кода R = 1/2, что
          обеспечивает корректное сопоставление энергетических выигрышей.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.1 — Кривые BER(Eb/N0) для LDPC-профилей в канале AWGN (модуляция BPSK/QPSK)
          </p>
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={berData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="snr"
                label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }}
              />
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
          Анализ рисунка 2.1 показывает характерную для LDPC-кодов «ватерфольную» форму кривых
          BER: при значениях Eb/N0 ниже порогового (threshold) BER практически не отличается
          от некодированного, однако выше порога наблюдается резкое снижение BER на несколько
          порядков при незначительном увеличении SNR. Это свойство обусловлено итеративным
          характером декодирования — при достаточном SNR алгоритм BP сходится за несколько
          итераций.
        </Para>

        <Para>
          Порог декодирования определяется плотностью эволюции (density evolution) и
          зависит от структуры матрицы <Formula math="\mathbf{H}" />. Для гауссовского
          канала порог <Formula math="E_b/N_0^{*}" /> приближённо оценивается через
          предел Шеннона при заданной скорости кода:
        </Para>

        <Formula
          math="\left.\frac{E_b}{N_0}\right|_{\text{Shannon}} = \frac{2^R - 1}{R} \quad \text{(линейное)}"
          block
          label="2.7"
        />

        <Para>
          При <Formula math="R = 1/2" />, предел Шеннона составляет{' '}
          <Formula math="E_b/N_0 = (2^{1/2} - 1) / (1/2) \approx 0.83" /> (линейное) или{' '}
          <Formula math="-0.8" /> дБ. Реализованный профиль 5G NR BG1 достигает порога
          декодирования около <Formula math="0.8" /> дБ, что находится в пределах{' '}
          <Formula math="1.6" /> дБ от предела Шеннона.
        </Para>

        <Para>
          Таблица 2.1 обобщает ключевые характеристики BER-кривых для всех профилей.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="border px-4 py-2">Профиль</th>
                <th className="border px-4 py-2">Порог, дБ</th>
                <th className="border px-4 py-2">Eb/N0 при BER=10⁻³</th>
                <th className="border px-4 py-2">Eb/N0 при BER=10⁻⁵</th>
                <th className="border px-4 py-2">Coding Gain, дБ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border px-4 py-2">Без кодирования (BPSK)</td>
                <td className="border px-4 py-2 text-center">—</td>
                <td className="border px-4 py-2 text-center">6.8</td>
                <td className="border px-4 py-2 text-center">9.6</td>
                <td className="border px-4 py-2 text-center">—</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2">LDPC (24,12) R=1/2</td>
                <td className="border px-4 py-2 text-center">1.5</td>
                <td className="border px-4 py-2 text-center">2.8</td>
                <td className="border px-4 py-2 text-center">4.2</td>
                <td className="border px-4 py-2 text-center font-bold text-green-700">4.0</td>
              </tr>
              <tr className="bg-white">
                <td className="border px-4 py-2">QC-LDPC (96,48) R=1/2</td>
                <td className="border px-4 py-2 text-center">1.0</td>
                <td className="border px-4 py-2 text-center">2.1</td>
                <td className="border px-4 py-2 text-center">3.5</td>
                <td className="border px-4 py-2 text-center font-bold text-green-700">4.7</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2">5G NR BG1 Z=8 QPSK</td>
                <td className="border px-4 py-2 text-center">0.8</td>
                <td className="border px-4 py-2 text-center">1.8</td>
                <td className="border px-4 py-2 text-center">2.9</td>
                <td className="border px-4 py-2 text-center font-bold text-green-700">5.0</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 2.1 — Сравнение BER-характеристик LDPC-профилей (AWGN)</p>
        </div>
      </Section>

      {/* 2.3 */}
      <Section title="2.3. Анализ вероятности ошибки на блок (BLER)" id="ch2-3">
        <Para>
          Вероятность ошибки на блок является критической метрикой для оценки надёжности
          передачи транспортных блоков в системе 5G NR. Стандарт 3GPP определяет
          требование BLER ≤ 10⁻¹ для номинальной работы канала (первичная передача) и
          BLER ≤ 10⁻⁵ при использовании HARQ-механизма повторной передачи.
        </Para>

        <Para>
          BLER и BER связаны соотношением, справедливым при независимых ошибках в битах:
        </Para>

        <Formula
          math="\text{BLER} = 1 - (1 - \text{BER})^{n}"
          block
          label="2.8"
        />

        <Para>
          где <Formula math="n" /> — длина кодового слова. Для длинных кодов BLER
          практически равен единице уже при умеренных значениях BER, поэтому
          помехоустойчивое кодирование критически важно для обеспечения надёжной блоковой
          передачи.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.2 — Кривые BLER(Eb/N0) для LDPC-профилей в канале AWGN
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={blerData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="snr"
                label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                scale="log"
                domain={[1e-5, 1]}
                tickFormatter={formatBer}
                label={{ value: 'BLER', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <Tooltip formatter={formatBer} />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="LDPC (24,12)" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="LDPC QC (96,48)" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="5G NR BG1 (Z=8)" stroke="#dc2626" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Кривые BLER на рисунке 2.2 демонстрируют более резкое изменение по сравнению с BER
          ввиду блокового характера метрики. Профиль 5G NR BG1 обеспечивает BLER = 10⁻¹ при
          Eb/N0 ≈ 3.5 дБ, тогда как для некодированной передачи такой же BLER достигается
          лишь при Eb/N0 ≈ 8.5 дБ — выигрыш составляет 5 дБ.
        </Para>
      </Section>

      {/* 2.4 */}
      <Section title="2.4. Анализ пропускной способности и спектральной эффективности" id="ch2-4">
        <Para>
          Пропускная способность и спектральная эффективность зависят не только от BER/BLER,
          но и от схемы модуляции и волновой формы. На рисунке 2.3 показана зависимость
          пропускной способности от Eb/N0 для трёх конфигураций системы.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.3 — Зависимость пропускной способности от Eb/N0 (символьная скорость 20 Мбод)
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={throughputData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="snr"
                label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }}
              />
              <YAxis label={{ value: 'Мбит/с', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="5G NR BG1 QPSK OFDM" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Учебный LDPC BPSK" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Конфигурация «5G NR BG1 + QPSK + OFDM-128» обеспечивает максимальную пропускную
          способность: при Eb/N0 = 8 дБ она достигает около 9 Мбит/с (при символьной скорости
          20 Мбод). Это объясняется преимуществом 2 бит/символ QPSK по сравнению с 1 бит/символ
          BPSK при сопоставимых BER-характеристиках.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.4 — Спектральная эффективность (бит/с/Гц) от Eb/N0
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="snr"
                label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }}
              />
              <YAxis label={{ value: 'бит/с/Гц', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="5G NR BG1 QPSK" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Без кодирования BPSK" stroke="#94a3b8" strokeWidth={2} strokeDasharray="8 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* 2.5 */}
      <Section title="2.5. Анализ энергетического выигрыша от кодирования (Coding Gain)" id="ch2-5">
        <Para>
          Энергетический выигрыш от кодирования является ключевым показателем эффективности
          схемы помехоустойчивого кодирования. На рисунке 2.5 приведено сравнение
          Coding Gain для всех реализованных сценариев. Видно, что применение LDPC BG1
          в канале Rayleigh с 16-QAM обеспечивает максимальный выигрыш 6.7 дБ.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.5 — Энергетический выигрыш LDPC-кодирования (при BER = 10⁻³)
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={codingGainTable}
              margin={{ top: 10, right: 30, left: 10, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="profile"
                tick={{ fontSize: 11 }}
                angle={-15}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                label={{ value: 'Coding Gain, дБ', angle: -90, position: 'insideLeft' }}
                domain={[0, 8]}
              />
              <Tooltip />
              <Bar dataKey="codingGain" name="Coding Gain, дБ" radius={[4, 4, 0, 0]}>
                {codingGainTable.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="border px-4 py-2">Профиль</th>
                <th className="border px-4 py-2">Модуляция</th>
                <th className="border px-4 py-2">Канал</th>
                <th className="border px-4 py-2">Eb/N0 (код.) дБ</th>
                <th className="border px-4 py-2">Eb/N0 (некод.) дБ</th>
                <th className="border px-4 py-2">Coding Gain дБ</th>
              </tr>
            </thead>
            <tbody>
              {codingGainTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-4 py-2 text-sm">{row.profile}</td>
                  <td className="border px-4 py-2 text-center font-mono">{row.modulation}</td>
                  <td className="border px-4 py-2 text-center">{row.channel}</td>
                  <td className="border px-4 py-2 text-center">{row.requiredSnrCoded}</td>
                  <td className="border px-4 py-2 text-center">{row.requiredSnrUncoded}</td>
                  <td className="border px-4 py-2 text-center font-bold text-green-700">{row.codingGain}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 2.2 — Coding Gain для реализованных LDPC-профилей</p>
        </div>
      </Section>

      {/* 2.6 */}
      <Section title="2.6. Анализ сходимости декодера и среднего числа итераций" id="ch2-6">
        <Para>
          Сходимость итеративного декодирования является важной характеристикой практической
          реализации. При низком SNR (ниже порога) алгоритм NMS использует все{' '}
          <Formula math="I_{\max} = 50" /> итераций без достижения нулевого синдрома, тогда
          как при высоком SNR сходимость наступает за 2–5 итераций.
        </Para>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-center text-sm font-semibold text-gray-600 mb-3">
              Рисунок 2.6а — Среднее число итераций декодера vs SNR
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={iterationData} margin={{ top: 5, right: 20, left: 5, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -8 }} />
                <YAxis label={{ value: 'Ср. итерации', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="avgIter" name="Сред. итераций" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-center text-sm font-semibold text-gray-600 mb-3">
              Рисунок 2.6б — Доля сходящихся блоков (%) vs SNR
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={iterationData} margin={{ top: 5, right: 20, left: 5, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -8 }} />
                <YAxis domain={[0, 100]} label={{ value: '% сходимость', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="convergence" name="% сходимость" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Para>
          Адаптивная остановка декодирования (реализованная в системе) позволяет
          сократить среднее число итераций при высоком SNR, что критически важно для
          аппаратных реализаций в реальном времени. При Eb/N0 = 8 дБ среднее число
          итераций составляет около 3, тогда как без адаптивной остановки использовались
          бы все 50 итераций. Экономия вычислительных ресурсов достигает{' '}
          <Formula math="\approx 94\%" />.
        </Para>

        <Para>
          Нормировочный коэффициент алгоритма NMS <Formula math="\alpha = 0.75" />
          подобран эмпирически. Его влияние на BER описывается следующей зависимостью:
          при <Formula math="\alpha \to 1" /> алгоритм приближается к sum-product (оптимален,
          но требователен к вычислениям), при <Formula math="\alpha \to 0" /> система деградирует.
          Оптимальное значение <Formula math="\alpha_{\text{opt}} \in [0.7, 0.85]" /> для
          рассматриваемых LDPC-профилей.
        </Para>
      </Section>

      {/* 2.7 */}
      <Section title="2.7. Влияние MIMO и OFDM на характеристики системы" id="ch2-7">
        <Para>
          Режим пространственного разнесения 2×2 Diversity реализует обработку сигнала от
          двух независимых пар приёмник-передатчик. При замираниях Рэлея с разнесением
          мощность принятого сигнала определяется суммой квадратов модулей двух независимых
          гауссовских случайных величин, что соответствует распределению хи-квадрат степеней
          свободы 2× (число ветвей):
        </Para>

        <Formula
          math="\gamma_{\text{div}} = \sum_{b=1}^{B} |h_b|^2 \cdot \frac{E_s}{N_0}"
          block
          label="2.9"
        />

        <Para>
          где <Formula math="B" /> — число ветвей разнесения. Для 2×2 Diversity
          используется <Formula math="B = 4" /> (2 передатчика × 2 приёмника). Это позволяет
          значительно сгладить «провалы» замирания, существенно улучшая BER-характеристику.
        </Para>

        <Para>
          OFDM-мультиплексирование позволяет использовать ZF-эквализацию (Zero-Forcing)
          на каждой поднесущей независимо. Оценка канала на <Formula math="k" />-й
          поднесущей и компенсация:
        </Para>

        <Formula
          math="\hat{X}[k] = \frac{Y[k]}{H[k]}"
          block
          label="2.10"
        />

        <Para>
          где <Formula math="Y[k]" /> — принятый символ, <Formula math="H[k]" /> — оценка
          частотной характеристики канала на <Formula math="k" />-й поднесущей. В реализованной
          системе используется одноотводный ZF-эквализатор.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="border px-4 py-2">Сценарий</th>
                <th className="border px-4 py-2">Канал</th>
                <th className="border px-4 py-2">MIMO</th>
                <th className="border px-4 py-2">Волновая форма</th>
                <th className="border px-4 py-2">Эквализатор</th>
                <th className="border px-4 py-2">Ожидаемый эффект</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["BPSK AWGN SISO SC", "AWGN", "SISO", "SC", "Нет", "Базовый"],
                ["QPSK AWGN SISO OFDM-128", "AWGN", "SISO", "OFDM-128", "ZF", "+2× пропускная способность"],
                ["QPSK Rayleigh 2×2 OFDM-128", "Rayleigh", "2×2", "OFDM-128", "ZF", "Разнесение + OFDM"],
                ["16-QAM Rayleigh SISO SC", "Rayleigh", "SISO", "SC", "Нет", "Высокая спект. эфф."],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 2.3 — Анализируемые сценарии передачи</p>
        </div>
      </Section>

      {/* 2.8 */}
      <Section title="2.8. Сравнение LDPC с турбо-кодами и полярными кодами" id="ch2-8">
        <Para>
          Выбор LDPC-кодов для стандарта 5G NR был обусловлен их превосходством над
          альтернативами при сравнении ряда ключевых критериев. Турбо-коды (применявшиеся
          в LTE) обеспечивают близкий к LDPC энергетический выигрыш, однако уступают по
          пропускной способности декодирования из-за последовательной природы алгоритма BCJR.
          Полярные коды превосходят LDPC при коротких блоках, что определило их выбор для
          канала управления 5G NR.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border px-4 py-2">Критерий</th>
                <th className="border px-4 py-2">LDPC (5G NR)</th>
                <th className="border px-4 py-2">Турбо (LTE)</th>
                <th className="border px-4 py-2">Полярные (5G NR)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Алгоритм декодирования", "BP / NMS (параллельный)", "BCJR (последовательный)", "SC / SCL"],
                ["Производительность декодера", "Очень высокая", "Умеренная", "Высокая"],
                ["Близость к пределу Шеннона", "Высокая (< 1 дБ)", "Высокая (~1 дБ)", "Оптимальная при N→∞"],
                ["Оптимальная длина блока", "Длинные (> 1000 бит)", "Средние (100-6000 бит)", "Короткие (< 512 бит)"],
                ["Применение в 5G NR", "PDSCH, PUSCH", "Не используется", "PDCCH, PUCCH"],
                ["Параллелизм реализации", "Высокий (QC-структура)", "Низкий", "Умеренный"],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-4 py-2 font-medium">{row[0]}</td>
                  <td className="border px-4 py-2 text-green-700 font-medium">{row[1]}</td>
                  <td className="border px-4 py-2">{row[2]}</td>
                  <td className="border px-4 py-2">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 2.4 — Сравнение методов помехоустойчивого кодирования</p>
        </div>
      </Section>

      {/* Выводы */}
      <div className="mt-8 bg-green-900 text-white rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">Выводы по главе 2</h3>
        <ul className="list-disc list-inside space-y-2 text-sm leading-6">
          <li>Анализ BER-характеристик показывает, что профиль 5G NR BG1 обеспечивает наибольший энергетический выигрыш 5.0 дБ при AWGN и до 6.7 дБ в канале Rayleigh с 16-QAM.</li>
          <li>«Ватерфольная» форма кривых BER подтверждает эффективность итеративного декодирования: выше порога (~0.8–1.5 дБ) BER снижается на 3–5 порядков за 1–2 дБ прироста SNR.</li>
          <li>Нормировочный коэффициент NMS α = 0.75 обеспечивает близкий к оптимальному результат при снижении вычислительных затрат по сравнению с полным sum-product.</li>
          <li>Адаптивная остановка декодирования сокращает среднее число итераций до 2–3 при высоком SNR, уменьшая вычислительную нагрузку на ~94%.</li>
          <li>OFDM-128 с ZF-эквализацией и режим 2×2 Diversity существенно улучшают характеристики в канале Rayleigh за счёт устранения ISI и пространственного разнесения.</li>
          <li>Выбор LDPC для канала данных 5G NR обоснован высокой производительностью декодирования (параллелизм QC-структуры) и близостью к пределу Шеннона.</li>
        </ul>
      </div>
    </div>
  );
};
