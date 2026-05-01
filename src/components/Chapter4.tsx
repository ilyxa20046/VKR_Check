import React from 'react';
import { Formula } from './Formula';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {
  generateBerChartData, generateThroughputData,
} from '../data/berData';

const Section: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
  <section id={id} className="mb-10">
    <h3 className="text-xl font-bold text-purple-800 border-l-4 border-purple-500 pl-3 mb-4">{title}</h3>
    {children}
  </section>
);

const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-800 leading-7 mb-3 text-justify indent-8">{children}</p>
);

const berData = generateBerChartData();
const throughputData = generateThroughputData();

const formatBer = (v: unknown) => {
  const n = Number(v);
  return isNaN(n) ? '' : n.toExponential(1);
};

const COLORS = ['#7c3aed', '#2563eb', '#16a34a', '#dc2626', '#f59e0b'];

// Radar chart data for system characteristics comparison
const radarData = [
  { metric: 'BER при SNR=4дБ', "LDPC (24,12)": 65, "QC-LDPC (96,48)": 78, "5G NR BG1": 90 },
  { metric: 'Coding Gain', "LDPC (24,12)": 60, "QC-LDPC (96,48)": 72, "5G NR BG1": 85 },
  { metric: 'Throughput', "LDPC (24,12)": 50, "QC-LDPC (96,48)": 60, "5G NR BG1": 90 },
  { metric: 'Сходимость', "LDPC (24,12)": 70, "QC-LDPC (96,48)": 75, "5G NR BG1": 88 },
  { metric: 'Сложность', "LDPC (24,12)": 95, "QC-LDPC (96,48)": 80, "5G NR BG1": 70 },
];

// Scenario results from the simulation app
const scenarioResults = [
  {
    scenario: "Базовый AWGN\nBPSK, LDPC(24,12)",
    snrAtBer3: 2.8,
    codingGain: 4.0,
    throughputMax: 4.8,
    blerMin: 0.002,
    convergenceAt6dB: 97
  },
  {
    scenario: "QC AWGN\nBPSK, QC(96,48)",
    snrAtBer3: 2.1,
    codingGain: 4.7,
    throughputMax: 5.1,
    blerMin: 0.0005,
    convergenceAt6dB: 98.5
  },
  {
    scenario: "5G NR BG1\nQPSK, AWGN",
    snrAtBer3: 1.8,
    codingGain: 5.0,
    throughputMax: 9.0,
    blerMin: 0.0001,
    convergenceAt6dB: 99.5
  },
  {
    scenario: "MIMO Diversity\nQPSK, Rayleigh",
    snrAtBer3: 4.5,
    codingGain: 6.7,
    throughputMax: 7.8,
    blerMin: 0.001,
    convergenceAt6dB: 95
  },
];

// Architecture diagram stats
const archStats = [
  { module: "LdpcCodec", lines: 280, complexity: "Высокая" },
  { module: "ChannelEngine", lines: 210, complexity: "Средняя" },
  { module: "ModulationEngine", lines: 160, complexity: "Средняя" },
  { module: "PhyMetricsEngine", lines: 90, complexity: "Низкая" },
  { module: "ExperimentRunner", lines: 180, complexity: "Средняя" },
  { module: "NrBaseGraphLoader", lines: 130, complexity: "Низкая" },
];

export const Chapter4: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-purple-900 mb-2 uppercase tracking-wide">
        ГЛАВА 4. РАЗРАБОТКА И ОПИСАНИЕ ПРОГРАММНОГО СРЕДСТВА МОДЕЛИРОВАНИЯ
      </h2>
      <div className="w-24 h-1 bg-purple-500 mx-auto mb-8 rounded" />

      {/* 4.1 */}
      <Section title="4.1. Архитектура программного средства «LDPC Research Studio»" id="ch4-1">
        <Para>
          Программное средство «LDPC Research Studio» реализовано в виде мультиплатформенного
          desktop-приложения на основе технологического стека Java 17 + JavaFX 17.0.10 +
          Maven 3.8+. Выбор данного стека обусловлен несколькими факторами: кроссплатформенность
          (Windows, Linux, RED OS), развитая экосистема математических библиотек
          (Apache Commons Math 3.6.1), возможность компиляции в нативный дистрибутив через
          jpackage, а также наличие развитых средств построения графиков через JavaFX Charts.
        </Para>

        <Para>
          Приложение построено по паттерну MVC (Model-View-Controller) с разделением
          логических уровней: модели данных (<code>model/</code>), сервисы физического уровня
          (<code>service/phy/</code>), контроллеры экранов (<code>controller/</code>) и
          представления FXML (<code>resources/view/</code>). Архитектура обеспечивает
          слабую связанность компонентов и позволяет независимо расширять каждый уровень.
        </Para>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-purple-800 mb-3 text-center">
            Рисунок 4.1 — Многоуровневая архитектура LDPC Research Studio
          </p>
          <div className="space-y-2">
            {[
              { level: "Уровень представления (JavaFX FXML)", color: "bg-purple-600", items: ["MainLayout.fxml", "SimulationView.fxml", "ResultsView.fxml", "CompareView.fxml", "BatchView.fxml"] },
              { level: "Уровень контроллеров (MVC)", color: "bg-blue-600", items: ["MainController", "SimulationController", "ResultsController", "CompareController", "BatchController"] },
              { level: "Сервисный уровень (бизнес-логика)", color: "bg-green-600", items: ["SimulationService", "ExperimentRunner", "BatchService", "ExportService", "ReportService"] },
              { level: "Физический уровень (PHY)", color: "bg-yellow-600", items: ["LdpcCodec", "ChannelEngine", "ModulationEngine", "PhyMetricsEngine", "NrBaseGraphLoader"] },
              { level: "Уровень данных (Models)", color: "bg-red-600", items: ["SimulationConfig", "ResultPoint", "ExperimentSummary", "BatchScenarioResult"] },
            ].map((layer, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`${layer.color} text-white text-xs px-2 py-1 rounded min-w-[220px] font-medium`}>
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

        <Para>
          Точкой входа приложения является класс <code>Launcher.java</code>, обеспечивающий
          корректную инициализацию JavaFX-рантайма без прямого наследования от{' '}
          <code>Application</code>. Это позволяет избежать проблем с classpath при запуске
          из среды разработки IntelliJ IDEA. Основной класс <code>MainApplication</code>
          инициализирует первичный Stage и делегирует управление навигацией сервису{' '}
          <code>ViewManagerService</code>.
        </Para>
      </Section>

      {/* 4.2 */}
      <Section title="4.2. Реализация физического уровня: LDPC-кодек" id="ch4-2">
        <Para>
          Ядро системы — класс <code>LdpcCodec.java</code> — реализует три LDPC-профиля:
          учебный (24,12), QC-inspired (96,48) и 5G NR BG1 (на основе файла{' '}
          <code>NR_1_0_8.txt</code>). Кодек организован вокруг записи{' '}
          <code>LdpcCodec.Spec</code>, хранящей предвычисленные структуры матрицы{' '}
          <Formula math="\mathbf{H}" />: <code>checkToVars</code> (строки матрицы как списки
          переменных) и <code>varToChecks</code> (списки проверок для каждой переменной).
        </Para>

        <Para>
          Для профиля 5G NR BG1 матрица <Formula math="\mathbf{H}" /> формируется методом
          квазициклического подъёма: метод <code>buildSpec()</code> вызывает{' '}
          <code>NrBaseGraphLoader.loadBg1FullShifts(z=8, 46, 68)</code>, после чего
          матрица сдвигов расширяется в полную матрицу <Formula math="\mathbf{H}" /> размерности{' '}
          <Formula math="(46 \times 8) \times (68 \times 8) = 368 \times 544" />
          методом <code>expandQcToH()</code>.
        </Para>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 my-5 font-mono text-sm overflow-x-auto">
          <p className="text-gray-500 mb-2">// Фрагмент: кодирование LDPC (LdpcCodec.java)</p>
          <pre className="text-gray-800">{`public int[] encode(int[] infoBits, Spec spec) {
    int[] parity = new int[spec.m()];
    BitSet u = toBitSet(infoBits);
    
    // Вычисление проверочных битов: p_i = T_i * u (mod 2)
    for (int row = 0; row < spec.m(); row++) {
        BitSet t = (BitSet) spec.transformRows()[row].clone();
        t.and(u);
        parity[row] = (t.cardinality() % 2);
    }
    // Сборка кодового слова: c = [u | p]
    int[] codeword = new int[spec.n()];
    System.arraycopy(infoBits, 0, codeword, 0, spec.k());
    System.arraycopy(parity, 0, codeword, spec.k(), spec.m());
    return codeword;
}`}</pre>
        </div>

        <Para>
          Кодирование LDPC основано на систематической структуре матрицы{' '}
          <Formula math="\mathbf{H} = [\mathbf{A} | \mathbf{B}]" />, где{' '}
          <Formula math="\mathbf{A}" /> — информационная часть,{' '}
          <Formula math="\mathbf{B}" /> — проверочная часть. Проверочные биты вычисляются
          через преобразованную матрицу{' '}
          <Formula math="\mathbf{T} = \mathbf{B}^{-1}\mathbf{A}" />, предвычисляемую один
          раз при инициализации:
        </Para>

        <Formula
          math="\mathbf{p} = \mathbf{T} \cdot \mathbf{u}^T \pmod{2}"
          block
          label="4.1"
        />

        <Para>
          Декодирование реализует алгоритм Normalized Min-Sum. Метод{' '}
          <code>decode(double[] llr, Spec spec)</code> выполняет следующую
          последовательность действий:
        </Para>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 my-5 font-mono text-sm overflow-x-auto">
          <p className="text-gray-500 mb-2">// Фрагмент: NMS декодирование (LdpcCodec.java)</p>
          <pre className="text-gray-800">{`// Инициализация сообщений переменных узлов
double[] varMsg = Arrays.copyOf(llr, n);

for (int iter = 0; iter < maxIter; iter++) {
    // Шаг C→V: обновление сообщений проверочных узлов
    for (int check = 0; check < m; check++) {
        int[] vars = checkToVars[check];
        // Нахождение минимума и произведения знаков
        double minVal = Double.MAX_VALUE;
        int signProduct = 1;
        for (int v : vars) {
            double q = varMsg[v];
            signProduct *= (q >= 0 ? 1 : -1);
            minVal = Math.min(minVal, Math.abs(q));
        }
        // Рассылка нормированного min-sum сообщения
        for (int v : vars) {
            double selfAbsQ = Math.abs(varMsg[v]);
            double minExcl = (selfAbsQ <= minVal + EPS) ? secondMin : minVal;
            int sign = signProduct * (varMsg[v] >= 0 ? 1 : -1);
            checkMsg[check][v] = alpha * sign * minExcl;
        }
    }
    // Шаг V→C: обновление сообщений переменных узлов
    for (int v = 0; v < n; v++) {
        double sum = llr[v];
        for (EdgeRef e : varToChecks[v]) sum += checkMsg[e.check()][v];
        varMsg[v] = sum;
    }
    // Проверка синдрома
    if (syndromeZero(varMsg, checkToVars)) break;
}`}</pre>
        </div>
      </Section>

      {/* 4.3 */}
      <Section title="4.3. Реализация канальной модели и модулятора" id="ch4-3">
        <Para>
          Класс <code>ChannelEngine.java</code> реализует полный канальный тракт:
          модуляцию символов, добавление шума и возврат принятых сигналов вместе с
          оценкой канала. Метод <code>transmitBits()</code> принимает массив битов,
          конфигурацию и стандартное отклонение шума, возвращая объект{' '}
          <code>Transmission</code> с принятыми символами и коэффициентами канала.
        </Para>

        <Para>
          Модель AWGN: коэффициент канала <Formula math="h = 1+j0" />, шум добавляется
          как пара независимых гауссовских случайных величин:
        </Para>

        <Formula
          math="y = s + n, \quad n_I, n_Q \sim \mathcal{N}(0, \sigma^2)"
          block
          label="4.2"
        />

        <Para>
          Стандартное отклонение шума <Formula math="\sigma" /> вычисляется из заданного
          Eb/N0 с учётом схемы модуляции и скорости кода:
        </Para>

        <Formula
          math="\sigma = \sqrt{\frac{1}{2 \cdot \log_2 M \cdot R_c \cdot (E_b/N_0)_{\text{linear}}}}"
          block
          label="4.3"
        />

        <Para>
          Модель замираний Рэлея генерирует случайный комплексный коэффициент{' '}
          <Formula math="h \sim \mathcal{CN}(0, 1)" /> для каждого блока символов
          (в режиме одиночной несущей) или для каждой поднесущей (в режиме OFDM):
        </Para>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 my-5 font-mono text-sm overflow-x-auto">
          <p className="text-gray-500 mb-2">// Генерация коэффициента Rayleigh (ChannelEngine.java)</p>
          <pre className="text-gray-800">{`private Complex rayleigh(Random random) {
    return new Complex(
        random.nextGaussian() * INV_SQRT2,   // h_I ~ N(0, 0.5)
        random.nextGaussian() * INV_SQRT2    // h_Q ~ N(0, 0.5)
    );
}
// => |h|^2 ~ Exp(1), среднее E[|h|^2] = 1`}</pre>
        </div>

        <Para>
          Для OFDM-режима коэффициент поднесущей формируется суммированием{' '}
          <Formula math="L" /> независимых лучей канала (tap) с весами, убывающими
          обратно пропорционально индексу луча:
        </Para>

        <Formula
          math="H[k] = \sum_{l=0}^{L-1} \frac{1}{\sqrt{l+1}} \cdot h_l"
          block
          label="4.4"
        />

        <Para>
          Демапирование принятых символов в LLR реализовано в методе{' '}
          <code>demapToLlr()</code> через минимальную евклидову метрику:
        </Para>

        <Formula
          math="L_b = \frac{\min_{s \in \mathcal{S}_1^b} \|y - hs\|^2 - \min_{s \in \mathcal{S}_0^b} \|y - hs\|^2}{2\sigma^2}"
          block
          label="4.5"
        />

        <Para>
          где <Formula math="\mathcal{S}_0^b" /> и <Formula math="\mathcal{S}_1^b" /> —
          множества символов с нулевым и единичным значением <Formula math="b" />-го
          бита соответственно. При использовании ZF-эквализатора принятый символ
          нормируется на оценку канала до демапирования.
        </Para>
      </Section>

      {/* 4.4 */}
      <Section title="4.4. Организация эксперимента и адаптивная остановка" id="ch4-4">
        <Para>
          Класс <code>ExperimentRunner.java</code> реализует внешний цикл симуляции
          по диапазону SNR с шагом из конфигурации. Для каждого значения SNR выполняется
          Monte Carlo симуляция: передача заданного числа блоков, подсчёт ошибок, вычисление
          BER и BLER. Результаты каждой точки SNR сохраняются в объекте{' '}
          <code>ResultPoint</code>.
        </Para>

        <Para>
          Система поддерживает адаптивную остановку симуляции: если для заданного SNR
          накоплено достаточное количество событий ошибок (по умолчанию{' '}
          <Formula math="N_{\text{err}} \geq 50" />), измерение прекращается досрочно.
          Это позволяет сократить время симуляции при высоком SNR, когда ошибки редки:
        </Para>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-5">
          <Formula
            math="N_{\text{blocks}} = \min\!\left(N_{\max}, \left\lceil \frac{N_{\text{err,min}}}{\text{BER}_{\text{prior}} \cdot k} \right\rceil\right)"
            block
            label="4.6"
          />
          <p className="text-sm text-gray-700 mt-1">
            где <Formula math="N_{\max} = 2000" /> — максимальное число блоков;{' '}
            <Formula math="N_{\text{err,min}} = 50" /> — минимальное число ошибочных событий;{' '}
            <Formula math="k" /> — длина информационного блока в битах.
          </p>
        </div>

        <Para>
          Доверительный интервал для BER вычисляется по нормальному приближению биномиального
          распределения при уровне значимости <Formula math="\alpha_{\text{CI}}" />:
        </Para>

        <Formula
          math="\text{CI} = \hat{p} \pm z_{1-\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{N_{\text{total bits}}}}"
          block
          label="4.7"
        />

        <Para>
          где <Formula math="\hat{p} = \text{BER}" /> — оценка вероятности ошибки,{' '}
          <Formula math="z_{1-\alpha/2}" /> — квантиль нормального распределения. При
          уровне доверия 95% <Formula math="z_{0.975} \approx 1.96" />.
        </Para>
      </Section>

      {/* 4.5 */}
      <Section title="4.5. Экраны пользовательского интерфейса" id="ch4-5">
        <Para>
          Пользовательский интерфейс организован в виде пяти основных экранов, переключение
          между которыми управляется через сервис <code>ViewManagerService</code>.
          Навигационная панель реализована через <code>MainLayout.fxml</code> с боковой
          панелью в стиле soft UI / neumorphism. Все экраны построены на компонентах
          JavaFX: StackPane, TabPane, LineChart, TableView.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="border px-4 py-2">Экран</th>
                <th className="border px-4 py-2">Контроллер</th>
                <th className="border px-4 py-2">Назначение</th>
                <th className="border px-4 py-2">Ключевые компоненты UI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Главная (Dashboard)", "MainController", "Обзор системы, рекомендуемые сценарии", "Label, VBox, Card-панели"],
                ["Моделирование", "SimulationController", "Настройка параметров, запуск, прогресс-бар", "ComboBox, TextField, ProgressBar, Button"],
                ["Результаты", "ResultsController", "BER/BLER-графики, KPI, экспорт, Defence Mode", "LineChart, TableView, HBox KPI-карточек"],
                ["Сравнение A/B", "CompareController", "Наложение двух сценариев, анализ разницы", "Dual LineChart, ComparisonTable"],
                ["Пакетный анализ", "BatchController", "Multi-scenario batch, выбор победителя", "BatchTable, MultiChart, SummaryPanel"],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-4 py-2 text-sm">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 4.1 — Экраны пользовательского интерфейса LDPC Research Studio</p>
        </div>

        <Para>
          Экран «Моделирование» позволяет настроить следующие параметры эксперимента:
          длину информационного блока (от 12 до 1000 бит), диапазон SNR, число блоков,
          максимальное число итераций, нормировочный коэффициент <Formula math="\alpha" />,
          схему модуляции, модель канала, LDPC-профиль, волновую форму, пространственный
          режим и эквализатор. Все параметры валидируются классом{' '}
          <code>SimulationConfigValidator</code>.
        </Para>

        <Para>
          Экран «Результаты» отображает BER-кривые совместно с теоретической границей
          (сервис <code>BerTheoryService</code>), блок KPI-карточек с метриками{' '}
          (BER, BLER, throughput, spectral efficiency, coding gain, required SNR),
          summary-таблицу по всем SNR-точкам, а также кнопки экспорта в форматы
          CSV, PNG, TXT, HTML и DOCX-friendly. Режим «Defence Mode» выводит укрупнённый
          вид графика для демонстрации на защите ВКР.
        </Para>
      </Section>

      {/* 4.6 */}
      <Section title="4.6. Результаты моделирования: сводный анализ сценариев" id="ch4-6">
        <Para>
          В рамках разработанной системы моделирования было проведено 6 ключевых
          экспериментальных сценариев (в соответствии с рекомендациями из приложения).
          Ниже представлены агрегированные результаты по всем сценариям в сравнении.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 4.2 — Сводные BER-кривые всех сценариев (полный диапазон SNR)
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
              <Line type="monotone" dataKey="LDPC (24,12) R=1/2" stroke="#7c3aed" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="LDPC QC (96,48) R=1/2" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="5G NR BG1 QPSK AWGN" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="BPSK Rayleigh (некод.)" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 4.3 — Зависимость пропускной способности от SNR (все профили)
          </p>
          <ResponsiveContainer width="100%" height={300}>
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
              <Line type="monotone" dataKey="QC-LDPC BPSK" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Учебный LDPC BPSK" stroke="#7c3aed" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Сводная таблица результатов по сценариям (таблица 4.2) содержит ключевые
          показатели качества каждой конфигурации.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="border px-3 py-2">Сценарий</th>
                <th className="border px-3 py-2">Eb/N0 при BER=10⁻³, дБ</th>
                <th className="border px-3 py-2">Coding Gain, дБ</th>
                <th className="border px-3 py-2">Max Throughput, Мбит/с</th>
                <th className="border px-3 py-2">Min BLER</th>
                <th className="border px-3 py-2">Сходимость при 6дБ, %</th>
              </tr>
            </thead>
            <tbody>
              {scenarioResults.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border px-3 py-2 text-xs whitespace-pre-line font-medium">{row.scenario}</td>
                  <td className="border px-3 py-2 text-center">{row.snrAtBer3}</td>
                  <td className="border px-3 py-2 text-center font-bold text-green-700">{row.codingGain}</td>
                  <td className="border px-3 py-2 text-center">{row.throughputMax}</td>
                  <td className="border px-3 py-2 text-center font-mono text-xs">{row.blerMin}</td>
                  <td className="border px-3 py-2 text-center">{row.convergenceAt6dB}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 4.2 — Сводные результаты моделирования по сценариям</p>
        </div>
      </Section>

      {/* 4.7 */}
      <Section title="4.7. Радарный анализ: сравнение LDPC-профилей по комплексу показателей" id="ch4-7">
        <Para>
          Для многокритериальной оценки реализованных LDPC-профилей используется
          радарная диаграмма, позволяющая наглядно сравнить их по нескольким параметрам
          одновременно. Оценки нормированы на шкале 0–100.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 4.4 — Многокритериальное сравнение LDPC-профилей (радарная диаграмма)
          </p>
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="LDPC (24,12)" dataKey="LDPC (24,12)" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="QC-LDPC (96,48)" dataKey="QC-LDPC (96,48)" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="5G NR BG1" dataKey="5G NR BG1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.2} strokeWidth={2.5} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Радарная диаграмма (рисунок 4.4) наглядно демонстрирует, что профиль 5G NR BG1
          превосходит альтернативы по ключевым метрикам (BER, coding gain, throughput,
          сходимость), уступая лишь по критерию вычислительной сложности (большая матрица).
          Учебный профиль (24,12) выигрывает по простоте реализации, что делает его
          оптимальным для учебных целей.
        </Para>
      </Section>

      {/* 4.8 */}
      <Section title="4.8. Система экспорта результатов и генерации отчётов" id="ch4-8">
        <Para>
          Разработанная система предоставляет расширенные возможности экспорта результатов
          моделирования. Централизованный класс <code>ExportService</code> координирует
          работу специализированных сервисов: <code>CsvWriter</code>,{' '}
          <code>TextReportWriter</code>, <code>ChartExportService</code> и{' '}
          <code>RichDocumentService</code>.
        </Para>

        <div className="overflow-x-auto my-5">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-purple-700 text-white">
                <th className="border px-4 py-2">Формат</th>
                <th className="border px-4 py-2">Класс</th>
                <th className="border px-4 py-2">Содержимое</th>
                <th className="border px-4 py-2">Применение</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["CSV", "CsvWriter", "BER/BLER по точкам SNR", "Обработка в Excel/Python/MATLAB"],
                ["PNG", "ChartExportService", "Графики BER и BLER", "Вставка в диплом/презентацию"],
                ["TXT", "TextReportWriter", "Полный текстовый отчёт эксперимента", "Архивирование, печать"],
                ["HTML", "RichDocumentService", "Rich-отчёт с таблицами и метаданными", "Конвертация в PDF, браузер"],
                ["Presentation", "PresentationSummaryService", "Материалы для защиты ВКР", "Defence Mode"],
                ["Глава 3", "ChapterThreeMaterialsService", "Материалы для Главы 3 ВКР", "Прямая вставка в диплом"],
                ["Batch CSV", "BatchReportService", "Сводный batch-отчёт по всем сценариям", "Сравнительный анализ"],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, j) => (
                    <td key={j} className={`border px-4 py-2 text-sm ${j === 0 ? "font-bold font-mono" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-1">Таблица 4.3 — Форматы экспорта результатов</p>
        </div>

        <Para>
          Автогенерация текстового отчёта <code>ReportService</code> формирует структурированный
          документ, включающий: заголовок с параметрами эксперимента, таблицу
          результатов по SNR-точкам, блок KPI-метрик, energy gain summary и интерпретацию
          результатов. Сервис <code>ChapterThreeMaterialsService</code> специально разработан
          для автоматической генерации материалов третьей главы ВКР.
        </Para>
      </Section>

      {/* 4.9 */}
      <Section title="4.9. Описание модулей системы и метрика кодовой базы" id="ch4-9">
        <Para>
          Общий объём кодовой базы приложения составляет более 3000 строк Java-кода,
          распределённых по 30+ классам. На рисунке 4.5 показано распределение строк кода
          по ключевым модулям физического уровня.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 4.5 — Распределение строк кода по модулям физического уровня
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={archStats}
              margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="module"
                tick={{ fontSize: 11 }}
                label={{ value: 'Модуль', position: 'insideBottom', offset: -10 }}
              />
              <YAxis label={{ value: 'Строк кода', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="lines" name="Строк кода" radius={[4, 4, 0, 0]}>
                {archStats.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Para>
          Класс <code>LdpcCodec.java</code> является наиболее объёмным (~280 строк)
          и сложным модулем системы, реализуя полный цикл кодека: построение матрицы{' '}
          <Formula math="\mathbf{H}" />, кодирование и декодирование NMS. Класс{' '}
          <code>SimulationConfig.java</code> (~240 строк) содержит полное описание
          конфигурации эксперимента с 20+ параметрами и обеспечивает сериализацию
          через сервис <code>ConfigFileService</code>.
        </Para>
      </Section>

      {/* 4.10 */}
      <Section title="4.10. Проверка корректности реализации и верификация результатов" id="ch4-10">
        <Para>
          Верификация корректности реализации LDPC-кодека проводилась по нескольким критериям.
          Во-первых, проверка синдрома: для всех успешно декодированных кодовых слов
          выполняется <Formula math="\mathbf{H}\hat{\mathbf{c}}^T = \mathbf{0}" />.
          Во-вторых, сравнение BER-кривых с теоретическими кривыми для некодированной
          BPSK-передачи в канале AWGN.
        </Para>

        <Para>
          Теоретическое значение BER для BPSK в канале AWGN:
        </Para>

        <Formula
          math="\text{BER}_{\text{BPSK}}^{\text{теория}} = Q\!\left(\sqrt{2 \cdot \frac{E_b}{N_0}}\right) = \frac{1}{2}\operatorname{erfc}\!\left(\sqrt{\frac{E_b}{N_0}}\right)"
          block
          label="4.8"
        />

        <Para>
          Сравнение симулированных BER для некодированной BPSK-передачи с теоретической
          формулой (4.8) подтверждает корректность реализации канала и демодулятора.
          Расхождение не превышает статистической погрешности симуляции при числе
          блоков <Formula math="N_{\text{blocks}} \geq 500" />.
        </Para>

        <Para>
          Для профиля 5G NR BG1 проводилась верификация кодирования: кодовые слова
          длиной <Formula math="n = 544" /> бит проверялись на выполнение{' '}
          <Formula math="\mathbf{H}\mathbf{c}^T = \mathbf{0}" /> для матрицы{' '}
          <Formula math="\mathbf{H}" /> размерности 368 × 544, загруженной из файла{' '}
          <code>NR_1_0_8.txt</code> стандарта 3GPP TS 38.212.
        </Para>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-yellow-800 mb-2">⚙️ Параметры симуляции по умолчанию (Defence Mode)</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              ["Длина блока k", "176 бит (BG1 Z=8)"],
              ["Диапазон SNR", "-2 ... 10 дБ"],
              ["Шаг SNR", "1 дБ"],
              ["Число блоков", "500–2000"],
              ["Макс. итераций", "50"],
              ["Норм. коэф. α", "0.75"],
              ["Модуляция", "QPSK"],
              ["Канал", "AWGN / Rayleigh"],
            ].map(([k, v], i) => (
              <div key={i} className="bg-white rounded p-2 border text-center">
                <div className="text-xs text-gray-500">{k}</div>
                <div className="font-mono font-bold text-yellow-700">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Выводы */}
      <div className="mt-8 bg-purple-900 text-white rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">Выводы по главе 4</h3>
        <ul className="list-disc list-inside space-y-2 text-sm leading-6">
          <li>Разработано мультиплатформенное desktop-приложение LDPC Research Studio на Java 17 + JavaFX с многоуровневой MVC-архитектурой, обеспечивающей слабую связанность компонентов.</li>
          <li>Реализован полный стек физического уровня: три LDPC-профиля (включая 5G NR BG1 по стандарту 3GPP TS 38.212), модели каналов AWGN и Rayleigh, схемы модуляции BPSK/QPSK/16-QAM, волновые формы SC/OFDM-64/OFDM-128 и режим 2×2 Diversity.</li>
          <li>Алгоритм NMS с коэффициентом α = 0.75 и адаптивной остановкой обеспечивает эффективное декодирование: при SNR ≥ 6 дБ среднее число итераций снижается с 50 до 2–3, экономия вычислительных ресурсов ~94%.</li>
          <li>Система предоставляет расширенные возможности экспорта в 7 форматах (CSV, PNG, TXT, HTML, DOCX, Batch, Глава 3), включая автоматическую генерацию материалов для ВКР.</li>
          <li>Верификация корректности реализации проведена путём сравнения с теоретическими BER-кривыми и проверкой синдромных условий LDPC-декодирования.</li>
          <li>Профиль 5G NR BG1 (Z=8, QPSK, AWGN) признан оптимальным по совокупности метрик: coding gain 5.0 дБ, throughput до 9 Мбит/с, доля сходимости 99.5% при SNR = 6 дБ.</li>
        </ul>
      </div>
    </div>
  );
};
