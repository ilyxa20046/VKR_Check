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
          если CRC-проверка не пройдена. В системе 5G NR целевой показатель BLER для начального
          приёма составляет 10%, что обеспечивает баланс между надёжностью и пропускной способностью:
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
          бит, передаваемых в единицу полосы частот за единицу времени (бит/с/Гц). Предел
          Шеннона определяет теоретическую верхнюю границу спектральной эффективности для
          заданного SNR:
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
          math="\eta_{\text{OFDM-128}} = 0{,}93 \cdot \frac{128}{128 + N_{CP}} \cdot \eta_{\text{eq}}"
          block
          label="2.5"
        />

        <Para>
          где <Formula math="\eta_{\text{eq}} = 0{,}95" /> для ZF-эквализатора и{' '}
          <Formula math="\eta_{\text{eq}} = 0{,}85" /> без эквализации.
        </Para>

        <Para>
          Энергетический выигрыш от кодирования (Coding Gain) <Formula math="G_c" />
          определяется как разность требуемых значений <Formula math="E_b/N_0" /> при заданном
          уровне BER (обычно <Formula math="10^{-3}" />) для некодированной и кодированной систем:
        </Para>

        <Formula
          math="G_c = \left.\frac{E_b}{N_0}\right|_{\text{uncoded, BER}=10^{-3}} - \left.\frac{E_b}{N_0}\right|_{\text{coded, BER}=10^{-3}} \quad [\text{дБ}]"
          block
          label="2.6"
        />
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
          Анализ рисунка 2.1 показывает характерную для LDPC-кодов «водопадную» (waterfall)
          форму кривых BER: при значениях Eb/N0 ниже порогового (threshold SNR) BER практически
          не отличается от некодированного, однако выше порога наблюдается резкое снижение BER
          на несколько порядков при незначительном увеличении SNR. Это свойство обусловлено
          итеративным характером декодирования — при достаточном SNR алгоритм NMS сходится
          за 5–15 итераций.
        </Para>

        <Para>
          Профиль 5G NR BG1 (Z=8, QPSK) демонстрирует наилучшие характеристики: порог
          декодирования составляет около 0,8 дБ, а при Eb/N0 = 3 дБ BER опускается ниже 10⁻⁷.
          Учебный профиль (24,12) с малым блоком имеет более высокий порог (~1,5 дБ) и
          более пологую водопадную характеристику, что объясняется наличием коротких циклов
          в графе Таннера малой размерности. QC-LDPC (96,48) занимает промежуточное положение
          с порогом ~1,0 дБ.
        </Para>

        <Para>
          В таблице 2.1 приведены результаты расчёта энергетического выигрыша от кодирования
          для всех исследуемых профилей при уровне BER = 10⁻³.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Профиль LDPC</th>
                <th className="border border-gray-300 px-3 py-2">Модуляция</th>
                <th className="border border-gray-300 px-3 py-2">Канал</th>
                <th className="border border-gray-300 px-3 py-2">SNR некод., дБ</th>
                <th className="border border-gray-300 px-3 py-2">SNR кодир., дБ</th>
                <th className="border border-gray-300 px-3 py-2">Gc, дБ</th>
              </tr>
            </thead>
            <tbody>
              {codingGainTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-3 py-2">{row.profile}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.modulation}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.channel}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.requiredSnrUncoded}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{row.requiredSnrCoded}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold text-green-700">{row.codingGain}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Таблица 2.1 — Coding Gain LDPC-профилей при BER = 10⁻³
          </p>
        </div>
      </Section>

      {/* 2.3 */}
      <Section title="2.3. Анализ BLER-характеристик и пропускной способности" id="ch2-3">
        <Para>
          На рисунке 2.2 представлены кривые BLER(Eb/N0) для трёх LDPC-профилей. BLER
          характеризует вероятность ошибки на уровне транспортного блока, что непосредственно
          связано с эффективностью протокола HARQ в 5G NR. При BLER &lt; 0,1 система считается
          работающей в «нормальном» режиме, при BLER → 1 — в «отказном» режиме.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.2 — Кривые BLER(Eb/N0) для LDPC-профилей в канале AWGN
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={blerData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }} />
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
          На рисунке 2.3 показана зависимость эффективной пропускной способности от Eb/N0.
          Профиль 5G NR BG1 с модуляцией QPSK и OFDM достигает максимальной пропускной
          способности около 9,3 Мбит/с при Eb/N0 ≥ 4 дБ, что на 84% превышает пропускную
          способность учебного профиля (24,12) при той же условиях.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.3 — Пропускная способность (Мбит/с) vs Eb/N0 для LDPC-профилей
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={throughputData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'Мбит/с', angle: -90, position: 'insideLeft', offset: 10 }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="5G NR BG1 QPSK OFDM" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Учебный LDPC BPSK" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* 2.4 */}
      <Section title="2.4. Анализ сходимости NMS-декодера и влияние числа итераций" id="ch2-4">
        <Para>
          Скорость сходимости алгоритма NMS зависит от значения SNR: при высоком SNR декодер
          сходится за 2–5 итераций, при низком (вблизи порога декодирования) требуется
          до 50 итераций. На рисунке 2.4 представлена зависимость среднего числа итераций
          и процента успешной сходимости от Eb/N0 для профиля 5G NR BG1.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.4 — Сходимость NMS-декодера: среднее число итераций и % успеха
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={iterationData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis yAxisId="left" label={{ value: 'Итераций', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: '% сходимости', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="avgIter" name="Среднее итераций" fill="#2563eb">
                {iterationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="convergence" name="% сходимости" stroke="#dc2626" strokeWidth={2} dot />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Анализ данных показывает, что при Eb/N0 = 6 дБ алгоритм NMS сходится в 97% случаев
          за среднее число итераций 6,8. При Eb/N0 ≥ 8 дБ процент сходимости превышает 99,5%,
          а среднее число итераций снижается до 3,1. Это подтверждает высокую вычислительную
          эффективность NMS по сравнению с полным алгоритмом BP, который при схожих показателях
          сходимости требует в 4–6 раз больше арифметических операций.
        </Para>
      </Section>

      {/* 2.5 */}
      <Section title="2.5. Спектральная эффективность и сравнение с LDPC vs Turbo" id="ch2-5">
        <Para>
          Спектральная эффективность (SE) является ключевым показателем эффективности
          использования частотного ресурса. На рисунке 2.5 представлено сравнение SE
          для различных конфигураций системы.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 2.5 — Спектральная эффективность (бит/с/Гц) vs Eb/N0
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={seData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'бит/с/Гц', angle: -90, position: 'insideLeft', offset: 10 }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="5G NR BG1 QPSK" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Без кодирования BPSK" stroke="#94a3b8" strokeWidth={1.5} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Сравнение LDPC и Turbo-кодов при схожих параметрах (R = 1/2, блок ~1000 бит) показывает,
          что LDPC обеспечивает на 0,3–0,5 дБ лучший энергетический выигрыш при длинных блоках
          (≥ 1000 бит). Преимущество LDPC возрастает с увеличением длины блока: при блоке
          8192 бит разрыв достигает 0,8–1,0 дБ. Именно по этой причине 3GPP принял решение
          заменить Turbo-коды на LDPC в канале данных 5G NR, начиная с Release 15 (2018).
        </Para>

        <Para>
          Ключевые преимущества LDPC перед Turbo применительно к 5G NR: более высокая
          пропускная способность декодера (до 10 Гбит/с против 1–2 Гбит/с у Turbo благодаря
          параллелизму QC-структуры), лучшая масштабируемость при больших блоках данных,
          меньший «эффект пола» (error floor) в области высокого SNR.
        </Para>
      </Section>
    </div>
  );
};
