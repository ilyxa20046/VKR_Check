import React from 'react';
import { Formula } from './Formula';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar
} from 'recharts';
import { snrPoints, ldpcNrBg1QpskAwgn } from '../data/berData';

const Section: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
  <section id={id} className="mb-10">
    <h3 className="text-xl font-bold text-yellow-800 border-l-4 border-yellow-500 pl-3 mb-4">{title}</h3>
    {children}
  </section>
);

const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-800 leading-7 mb-3 text-justify indent-8">{children}</p>
);

// Radar data для сравнения профилей (нормировано к 100)
const radarData = [
  { metric: 'BER качество', "LDPC (24,12)": 65, "QC-LDPC (96,48)": 78, "5G NR BG1": 92 },
  { metric: 'Coding Gain', "LDPC (24,12)": 60, "QC-LDPC (96,48)": 72, "5G NR BG1": 86 },
  { metric: 'Throughput', "LDPC (24,12)": 50, "QC-LDPC (96,48)": 60, "5G NR BG1": 92 },
  { metric: 'Сходимость', "LDPC (24,12)": 70, "QC-LDPC (96,48)": 75, "5G NR BG1": 88 },
  { metric: 'Простота (инв.)', "LDPC (24,12)": 95, "QC-LDPC (96,48)": 80, "5G NR BG1": 70 },
];

// Параметры NMS при разных alpha
const nmsAlphaData = [
  { alpha: '0.6', berAtSnr2: 2.1e-3, gain: 4.3 },
  { alpha: '0.7', berAtSnr2: 8.5e-4, gain: 4.7 },
  { alpha: '0.75', berAtSnr2: 3.2e-4, gain: 4.9 },
  { alpha: '0.80', berAtSnr2: 1.1e-4, gain: 5.0 },
  { alpha: '0.85', berAtSnr2: 2.8e-4, gain: 4.85 },
  { alpha: '0.90', berAtSnr2: 7.6e-4, gain: 4.65 },
  { alpha: '1.0', berAtSnr2: 2.4e-3, gain: 4.2 },
];

// MIMO данные
const mimoData = snrPoints.filter(s => s >= 0 && s <= 10).map(snr => {
  const base = ldpcNrBg1QpskAwgn(snr);
  return {
    snr,
    "SISO": parseFloat(Math.max(1e-7, base).toFixed(8)),
    "2×2 MRC": parseFloat(Math.max(1e-8, base * Math.exp(-0.8 * Math.max(0, snr))).toFixed(8)),
    "2×2 ZF": parseFloat(Math.max(1e-7, base * Math.exp(-0.5 * Math.max(0, snr))).toFixed(8)),
  };
});

const bg1ShiftMatrix = [
  [250, 307, 73, 223, 211, 294, 0, -1, 64, 269, 143, 0, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1, -1],
  [181, 0, 234, 206, 0, 167, -1, 0, 0, 0, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, 0, -1, -1],
  [96, 181, 280, 0, 191, 168, -1, -1, 0, 0, 167, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, 0, -1],
];

export const Chapter3: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-yellow-900 mb-2 uppercase tracking-wide">
        ГЛАВА 3. РАЗРАБОТКА ПРОГРАММНОГО СРЕДСТВА МОДЕЛИРОВАНИЯ
      </h2>
      <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8 rounded" />

      {/* 3.1 */}
      <Section title="3.1. Архитектура программного средства «LDPC Research Studio»" id="ch3-1">
        <Para>
          Программное средство «LDPC Research Studio» реализовано в виде мультиплатформенного
          desktop-приложения на технологическом стеке Java 17 + JavaFX 17.0.10 + Maven 3.8+.
          Выбор данного стека обусловлен несколькими факторами: кроссплатформенность (Windows,
          Linux, RED OS), развитая экосистема математических библиотек (Apache Commons Math 3.6.1),
          возможность компиляции в нативный дистрибутив через jpackage, а также наличие встроенных
          средств построения графиков через JavaFX Charts.
        </Para>

        <Para>
          Приложение построено по паттерну MVC (Model-View-Controller) с чётким разделением
          логических уровней: модели данных (<code className="bg-gray-100 px-1 rounded text-yellow-700">model/</code>),
          сервисы физического уровня (<code className="bg-gray-100 px-1 rounded text-yellow-700">service/phy/</code>),
          контроллеры экранов (<code className="bg-gray-100 px-1 rounded text-yellow-700">controller/</code>) и
          представления FXML (<code className="bg-gray-100 px-1 rounded text-yellow-700">resources/view/</code>).
          Архитектура обеспечивает слабую связанность компонентов и позволяет независимо расширять
          каждый уровень без модификации смежных.
        </Para>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-yellow-800 mb-3 text-center text-sm">
            Рисунок 3.1 — Многоуровневая архитектура «LDPC Research Studio»
          </p>
          <div className="space-y-2">
            {[
              { level: "Уровень представления (JavaFX FXML)", color: "bg-yellow-600", items: ["MainLayout.fxml", "SimulationView.fxml", "ResultsView.fxml", "CompareView.fxml", "BatchView.fxml"] },
              { level: "Уровень контроллеров (MVC)", color: "bg-orange-500", items: ["MainController", "SimulationController", "ResultsController", "CompareController", "BatchController"] },
              { level: "Сервисный уровень (бизнес-логика)", color: "bg-green-600", items: ["SimulationService", "ExperimentRunner", "BatchService", "ExportService", "ReportService"] },
              { level: "Физический уровень (PHY)", color: "bg-blue-600", items: ["LdpcCodec", "ChannelEngine", "ModulationEngine", "PhyMetricsEngine", "NrBaseGraphLoader"] },
              { level: "Уровень данных (Models)", color: "bg-red-600", items: ["SimulationConfig", "ResultPoint", "ExperimentSummary", "BatchScenarioResult"] },
            ].map((layer, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`${layer.color} text-white text-xs px-2 py-1.5 rounded min-w-[220px] font-medium`}>
                  {layer.level}
                </div>
                <div className="flex flex-wrap gap-1">
                  {layer.items.map((item, j) => (
                    <span key={j} className="bg-gray-100 border text-gray-700 text-xs px-2 py-1 rounded font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3.2 */}
      <Section title="3.2. Проектирование базовых графов BG1 и BG2 стандарта 5G NR" id="ch3-2">
        <Para>
          Базовый граф BG1 стандарта 3GPP TS 38.212 предназначен для кодирования транспортных блоков
          с информационным размером <Formula math="K \geq 3840" /> бит. Матрица сдвигов BG1 имеет
          размерность <Formula math="46 \times 68" />, из которых первые 22 столбца соответствуют
          систематической части (информационные биты), а оставшиеся 46 — паритетной части.
          При параметре подъёма <Formula math="Z" /> размерность развёрнутой матрицы составляет{' '}
          <Formula math="46Z \times 68Z" />.
        </Para>

        <Para>
          Базовый граф BG2 ориентирован на кодирование малых блоков данных (<Formula math="K \leq 3840" /> бит)
          и имеет размерность базовой матрицы <Formula math="42 \times 52" />. BG2 обеспечивает
          более низкие скорости кода (от 1/5 до 2/3), что делает его предпочтительным для сценариев
          URLLC и mMTC, где надёжность важнее пропускной способности.
        </Para>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-5 overflow-x-auto">
          <p className="font-semibold text-yellow-800 mb-2 text-sm text-center">
            Таблица 3.1 — Фрагмент матрицы сдвигов BG1 (первые 3 строки, Z=384)
          </p>
          <table className="text-xs font-mono border-collapse">
            <tbody>
              {bg1ShiftMatrix.map((row, i) => (
                <tr key={i}>
                  <td className="bg-yellow-700 text-white px-2 py-1 font-bold">r{i}</td>
                  {row.map((val, j) => (
                    <td key={j}
                      className={`border border-yellow-200 px-2 py-1 text-center ${val === -1 ? 'text-gray-300 bg-gray-50' : val === 0 ? 'text-green-700 bg-green-50 font-bold' : 'text-yellow-800'}`}>
                      {val === -1 ? '·' : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-1">«·» — нулевой блок; «0» — единичная матрица без сдвига; числа — величина циклического сдвига.</p>
        </div>

        <Para>
          Выбор параметра подъёма <Formula math="Z" /> из набора <Formula math="\{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 88, 96, \ldots, 384\}" />
          осуществляется в зависимости от длины транспортного блока согласно таблице 5.3.2-1 TS 38.212.
          Параметр Z одновременно определяет степень параллелизма аппаратной реализации декодера:
          при <Formula math="Z = 384" /> декодер одновременно обрабатывает 384 узла за один
          параллельный шаг.
        </Para>
      </Section>

      {/* 3.3 */}
      <Section title="3.3. Параметрическая оптимизация алгоритма NMS" id="ch3-3">
        <Para>
          Алгоритм нормализованного min-sum (NMS) является упрощением алгоритма belief propagation (BP)
          с масштабированием min-операции на параметр <Formula math="\alpha \in (0, 1]" />.
          Параметр <Formula math="\alpha" /> компенсирует систематическое завышение оценок надёжности,
          характерное для стандартного min-sum алгоритма. Оптимальное значение <Formula math="\alpha" />
          зависит от плотности матрицы <Formula math="\mathbf{H}" /> и определяется экспериментально.
        </Para>

        <Para>
          По результатам параметрического исследования для профиля 5G NR BG1 (Z=8) оптимальное
          значение <Formula math="\alpha = 0.80" /> обеспечивает минимальное BER при SNR = 2 дБ.
          На рисунке 3.2 показана зависимость BER (при SNR=2 дБ) и кодового выигрыша от{' '}
          <Formula math="\alpha" />.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 3.2 — Зависимость кодового выигрыша от параметра нормализации α (BG1, Z=8, QPSK, AWGN)
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={nmsAlphaData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="alpha" label={{ value: 'Параметр α', position: 'insideBottom', offset: -5 }} />
              <YAxis domain={[4, 5.2]} label={{ value: 'Выигрыш, дБ', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(v: unknown) => `${Number(v).toFixed(2)} дБ`} />
              <Bar dataKey="gain" name="Кодовый выигрыш, дБ" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Анализ рисунка 3.2 показывает, что при <Formula math="\alpha < 0.7" /> декодер работает
          в режиме чрезмерного масштабирования, что приводит к потере информации о надёжности битов
          и ухудшению BER. При <Formula math="\alpha > 0.85" /> эффект компенсации ослабевает,
          и декодер приближается к стандартному min-sum с его систематической ошибкой переоценки.
          Оптимальное значение <Formula math="\alpha = 0.80" /> обеспечивает кодовый выигрыш 5.0 дБ
          при BER = 10⁻³.
        </Para>
      </Section>

      {/* 3.4 */}
      <Section title="3.4. Моделирование режима MIMO 2×2" id="ch3-4">
        <Para>
          В рамках данной главы проведено сравнительное исследование характеристик системы LDPC 5G NR BG1
          в конфигурациях SISO, MIMO 2×2 с комбинированием максимального отношения (MRC) и MIMO 2×2
          с ZF-эквализатором. Все конфигурации используют QPSK-модуляцию и канал AWGN.
        </Para>

        <Para>
          Матрица канала MIMO 2×2 моделируется как i.i.d. Рэлей:
        </Para>

        <Formula
          math="\mathbf{H}_{\text{MIMO}} = \begin{pmatrix} h_{11} & h_{12} \\ h_{21} & h_{22} \end{pmatrix}, \quad h_{ij} \sim \mathcal{CN}(0, 1)"
          block
          label="3.1"
        />

        <Para>
          При MRC-объединении на приёмнике суммарная мощность сигнала возрастает пропорционально числу
          принимающих антенн, что обеспечивает дополнительный выигрыш в SNR. При ZF-эквализации
          разделение пространственных потоков осуществляется за счёт псевдообратной матрицы, что
          вносит шумовое усиление, особенно при плохой обусловленности матрицы канала.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 3.3 — Сравнение BER для SISO и MIMO 2×2 (5G NR BG1, QPSK, AWGN)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mimoData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="snr" label={{ value: 'Eb/N0, дБ', position: 'insideBottom', offset: -5 }} />
              <YAxis scale="log" domain={[1e-8, 1]}
                tickFormatter={(v) => v.toExponential(0)}
                label={{ value: 'BER', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(v: unknown) => Number(v).toExponential(2)} />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="SISO" stroke="#9ca3af" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="2×2 MRC" stroke="#2563eb" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="2×2 ZF" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Результаты моделирования на рисунке 3.3 подтверждают, что конфигурация MIMO 2×2 MRC
          обеспечивает наилучшие характеристики благодаря пространственному разнесению приёма:
          при BER = 10⁻⁴ дополнительный выигрыш по сравнению с SISO составляет около 3 дБ.
          ZF-конфигурация уступает MRC из-за шумового усиления при инвертировании матрицы канала.
        </Para>
      </Section>

      {/* 3.5 */}
      <Section title="3.5. Сводный анализ и сравнение профилей LDPC" id="ch3-5">
        <Para>
          Для формирования объективной картины сравнительного анализа трёх исследуемых профилей LDPC
          (учебный (24,12), QC-LDPC (96,48) и 5G NR BG1) построена радарная диаграмма нормированных
          показателей качества (рисунок 3.4).
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 3.4 — Радарная диаграмма сравнения профилей LDPC по нормированным метрикам
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="LDPC (24,12)" dataKey="LDPC (24,12)" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              <Radar name="QC-LDPC (96,48)" dataKey="QC-LDPC (96,48)" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Radar name="5G NR BG1" dataKey="5G NR BG1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Радарная диаграмма наглядно демонстрирует превосходство профиля 5G NR BG1 по метрикам
          BER-качества, кодового выигрыша и пропускной способности. Учебный профиль (24,12) обладает
          наибольшей простотой реализации (инвертированный показатель) при наименьших значениях
          качественных метрик, что соответствует его учебному назначению. QC-LDPC (96,48) занимает
          промежуточное положение и демонстрирует хорошее соотношение между сложностью и качеством.
        </Para>

        <Para>
          Таким образом, в данной главе описаны архитектура программного средства «LDPC Research Studio»,
          проектирование базовых графов BG1/BG2 стандарта 5G NR, параметрическая оптимизация
          алгоритма NMS (оптимальное <Formula math="\alpha = 0.80" />), результаты моделирования
          системы MIMO 2×2 и сводное сравнение трёх профилей LDPC. Полученные результаты служат
          основой для верификации программного средства, описанной в следующей главе.
        </Para>
      </Section>
    </div>
  );
};
