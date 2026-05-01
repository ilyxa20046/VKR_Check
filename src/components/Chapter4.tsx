import React from 'react';
import { Formula } from './Formula';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { generateBerChartData } from '../data/berData';

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

const formatBer = (v: unknown) => {
  const n = Number(v);
  return isNaN(n) ? '' : n.toExponential(1);
};

const COLORS = ['#7c3aed', '#2563eb', '#16a34a', '#dc2626', '#f59e0b'];



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
          логических уровней: модели данных (<code className="bg-gray-100 px-1 rounded">model/</code>),
          сервисы физического уровня (<code className="bg-gray-100 px-1 rounded">service/phy/</code>),
          контроллеры экранов (<code className="bg-gray-100 px-1 rounded">controller/</code>) и
          представления FXML (<code className="bg-gray-100 px-1 rounded">resources/view/</code>).
          Архитектура обеспечивает слабую связанность компонентов и позволяет независимо
          расширять каждый уровень.
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
          Точкой входа приложения является класс <code className="bg-gray-100 px-1 rounded">Launcher.java</code>,
          обеспечивающий корректную инициализацию JavaFX-рантайма без прямого наследования от{' '}
          <code className="bg-gray-100 px-1 rounded">Application</code>. Это позволяет избежать проблем
          с classpath при запуске из среды разработки IntelliJ IDEA. Основной класс{' '}
          <code className="bg-gray-100 px-1 rounded">MainApplication</code>
          инициализирует первичный Stage и делегирует управление навигацией сервису{' '}
          <code className="bg-gray-100 px-1 rounded">ViewManagerService</code>.
        </Para>
      </Section>

      {/* 4.2 */}
      <Section title="4.2. Реализация физического уровня: LDPC-кодек" id="ch4-2">
        <Para>
          Ядро системы — класс <code className="bg-gray-100 px-1 rounded">LdpcCodec.java</code> —
          реализует три LDPC-профиля: учебный (24,12), QC-inspired (96,48) и 5G NR BG1 (на основе файла{' '}
          <code className="bg-gray-100 px-1 rounded">NR_1_0_8.txt</code>). Кодек организован вокруг
          записи <code className="bg-gray-100 px-1 rounded">LdpcCodec.Spec</code>, хранящей
          предвычисленные структуры матрицы <Formula math="\mathbf{H}" />:{' '}
          <code className="bg-gray-100 px-1 rounded">checkToVars</code> (строки матрицы как списки
          переменных) и <code className="bg-gray-100 px-1 rounded">varToChecks</code> (списки
          проверок для каждой переменной).
        </Para>

        <Para>
          Для профиля 5G NR BG1 матрица <Formula math="\mathbf{H}" /> формируется методом
          квазициклического подъёма: метод <code className="bg-gray-100 px-1 rounded">buildSpec()</code>
          вызывает <code className="bg-gray-100 px-1 rounded">NrBaseGraphLoader.loadBg1FullShifts(z=8, 46, 68)</code>,
          после чего матрица сдвигов расширяется в полную матрицу <Formula math="\mathbf{H}" />
          размерности <Formula math="(46 \times 8) \times (68 \times 8) = 368 \times 544" />
          методом <code className="bg-gray-100 px-1 rounded">expandQcToH()</code>.
        </Para>

        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 my-5 font-mono text-sm overflow-x-auto">
          <p className="text-purple-700 font-bold mb-2">// Фрагмент LdpcCodec.java — NMS-декодирование</p>
          <pre className="text-gray-800 text-xs leading-5">{`public boolean[] decode(double[] llr, int maxIter) {
    int n = spec.n;
    double[] v2c = Arrays.copyOf(llr, n);  // VN → CN messages
    double[] c2v = new double[n];           // CN → VN messages
    
    for (int iter = 0; iter < maxIter; iter++) {
        // Horizontal pass (CN update) — NMS
        for (int[] row : spec.checkToVars) {
            double minAbs = Double.MAX_VALUE, secondMin = Double.MAX_VALUE;
            int signProd = 1;
            for (int j : row) {
                double val = v2c[j];
                double abs = Math.abs(val);
                if (abs < minAbs) { secondMin = minAbs; minAbs = abs; }
                else if (abs < secondMin) { secondMin = abs; }
                if (val < 0) signProd ^= 1;
            }
            for (int j : row) {
                double abs = Math.abs(v2c[j]);
                double minVal = (abs == minAbs) ? secondMin : minAbs;
                int sign = (v2c[j] < 0) ? signProd ^ 1 : signProd;
                c2v[j] += (sign == 0 ? 1 : -1) * ALPHA * minVal;
            }
        }
        // Vertical pass (VN update)
        for (int j = 0; j < n; j++) {
            v2c[j] = llr[j] + c2v[j];
            c2v[j] = 0; // reset for next iteration
        }
        // Early termination check
        if (checkAllParities(v2c)) return hardDecision(v2c);
    }
    return hardDecision(v2c);
}`}</pre>
        </div>

        <Para>
          Кодирование LDPC выполняется методом гауссова исключения над GF(2). Для профилей
          (24,12) и (96,48) матрица <Formula math="\mathbf{H}" /> предварительно приводится
          к систематической форме: <Formula math="\mathbf{H} = [\mathbf{P}^T \mid \mathbf{I}_{n-k}]" />,
          после чего порождающая матрица вычисляется как
          <Formula math="\mathbf{G} = [\mathbf{I}_k \mid \mathbf{P}]" />. Кодовое слово
          формируется умножением: <Formula math="\mathbf{c} = \mathbf{u} \cdot \mathbf{G} \pmod{2}" />.
        </Para>

        <Para>
          Для 5G NR BG1 используется более эффективный алгоритм кодирования, эксплуатирующий
          двойную диагональную структуру проверочной части матрицы. Проверочные биты вычисляются
          последовательно: для двойной диагональной части BG1 первые <Formula math="4Z" /> проверочных
          бит определяются из линейной системы, а остальные — рекурсивно через back-substitution.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 4.2 — Статистика модулей физического уровня (строк кода)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={archStats} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="module" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'Строк кода', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="lines" name="Строк кода" radius={[4,4,0,0]}>
                {archStats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* 4.3 */}
      <Section title="4.3. Реализация модели канала и модулятора" id="ch4-3">
        <Para>
          Класс <code className="bg-gray-100 px-1 rounded">ChannelEngine.java</code> реализует
          четыре модели канала: AWGN, Rayleigh flat fading, OFDM-64 и OFDM-128. Архитектура
          класса построена на паттерне Strategy: интерфейс{' '}
          <code className="bg-gray-100 px-1 rounded">ChannelModel</code> определяет метод
          <code className="bg-gray-100 px-1 rounded">propagate(double[] signal, double snr)</code>,
          конкретные реализации — вложенные классы{' '}
          <code className="bg-gray-100 px-1 rounded">AwgnChannel</code>,{' '}
          <code className="bg-gray-100 px-1 rounded">RayleighChannel</code>,{' '}
          <code className="bg-gray-100 px-1 rounded">OfdmChannel</code>.
        </Para>

        <Para>
          Генерация AWGN реализована через стандартный генератор нормально распределённых
          чисел Java (<code className="bg-gray-100 px-1 rounded">Random.nextGaussian()</code>) с
          масштабированием дисперсии согласно формуле (3.2). Канал Рэлея моделирует комплексный
          коэффициент как сумму двух независимых нормальных составляющих с последующим
          применением ZF-эквализации при идеальном знании канала.
        </Para>

        <Para>
          Класс <code className="bg-gray-100 px-1 rounded">ModulationEngine.java</code> реализует
          созвездия BPSK, QPSK и 16-QAM с серым кодированием (Gray coding). Для каждой схемы
          модуляции реализованы методы: <code className="bg-gray-100 px-1 rounded">modulate(boolean[] bits)</code>
          — отображение бит в комплексные символы, и{' '}
          <code className="bg-gray-100 px-1 rounded">demodulateToLLR(double[] received, double sigma2)</code>
          — вычисление мягких значений LLR. Для BPSK:
        </Para>

        <Formula
          math="\text{LLR}_j = \frac{2 r_j}{\sigma^2}"
          block
          label="4.1"
        />

        <Para>
          Для 16-QAM используется приближённое вычисление LLR методом Max-Log:
        </Para>

        <Formula
          math="\text{LLR}_{b_k} \approx \frac{1}{\sigma^2} \left[\min_{c: b_k=1} |r - c|^2 - \min_{c: b_k=0} |r - c|^2\right]"
          block
          label="4.2"
        />

        <Para>
          OFDM-модулятор реализует дискретное преобразование Фурье (DFT) над блоком символов
          длиной N (64 или 128) с добавлением циклического префикса длиной N/4. При OFDM-128
          с CP=32 накладные расходы составляют 25%, а коэффициент использования ресурса
          <Formula math="\eta_{OFDM} = 128/(128+32) = 0{,}8" />.
          С учётом пилотных поднесущих (6,25%) итоговая эффективность:
          <Formula math="\eta_{eff} = 0{,}8 \times 0{,}9375 = 0{,}75" />.
        </Para>
      </Section>

      {/* 4.4 */}
      <Section title="4.4. Пользовательский интерфейс и экраны приложения" id="ch4-4">
        <Para>
          Пользовательский интерфейс LDPC Research Studio организован по принципу
          вкладочной навигации (Tab-based navigation) и включает пять основных экранов.
          Главный экран (MainLayout) предоставляет навигационную панель и область отображения
          контента. Все FXML-макеты разработаны в инструменте Scene Builder 21 и соответствуют
          требованиям Material Design для desktop-приложений.
        </Para>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {[
            {
              title: "SimulationView",
              icon: "⚙️",
              desc: "Настройка параметров: выбор профиля LDPC, модуляции, канала, диапазона SNR, числа итераций. Запуск симуляции с прогресс-баром.",
              color: "border-purple-400"
            },
            {
              title: "ResultsView",
              icon: "📊",
              desc: "Интерактивные графики BER/BLER/Throughput/SE с логарифмической осью Y. Таблица результатов с сортировкой, экспорт в CSV.",
              color: "border-blue-400"
            },
            {
              title: "CompareView",
              icon: "⚖️",
              desc: "A/B-сравнение двух конфигураций на одном графике. Автоматический расчёт Coding Gain и разницы BLER при заданном SNR.",
              color: "border-green-400"
            },
            {
              title: "BatchView",
              icon: "🔄",
              desc: "Пакетный режим: автоматический перебор комбинаций профилей, модуляций и каналов. Результаты накапливаются в таблице.",
              color: "border-yellow-400"
            },
            {
              title: "DefenceMode",
              icon: "🎓",
              desc: "Режим защиты: пошаговая анимация итераций NMS, визуализация графа Таннера (упрощённого), интерактивные Q&A-карточки.",
              color: "border-red-400"
            },
          ].map((screen, i) => (
            <div key={i} className={`border-l-4 ${screen.color} bg-white rounded-lg p-4 shadow-sm`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{screen.icon}</span>
                <h4 className="font-bold text-gray-800 font-mono text-sm">{screen.title}</h4>
              </div>
              <p className="text-sm text-gray-600 leading-5">{screen.desc}</p>
            </div>
          ))}
        </div>

        <Para>
          Цветовая схема приложения соответствует корпоративному стилю: основной цвет —
          синий (#1565C0), акцентный — зелёный (#2E7D32), предупреждения — оранжевый (#E65100).
          Шрифт интерфейса — Roboto 12px (системный), шрифт для кода и формул — Courier New 11px.
          Все надписи выполнены на русском языке согласно ГОСТ Р 7.0.97-2016.
        </Para>
      </Section>

      {/* 4.5 */}
      <Section title="4.5. Верификация и тестирование программного средства" id="ch4-5">
        <Para>
          Верификация программного средства выполнена на трёх уровнях. На уровне модульного
          тестирования (JUnit 5) проверены 47 тестовых случаев, охватывающих: корректность
          кодирования (проверка <Formula math="\mathbf{H}\mathbf{c}^T = \mathbf{0}" />),
          симметрию созвездий, нормировку LLR, работу генераторов шума (χ²-тест),
          монотонность BER по SNR.
        </Para>

        <Para>
          На уровне интеграционного тестирования проведено сравнение теоретических кривых BER
          с результатами симуляции. Результаты моделирования (рисунок 4.3) совпадают с
          теоретическими значениями с погрешностью не более 5% при числе бит
          <Formula math="N_{bits} \geq 10^6" /> для каждой точки SNR.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 4.3 — Верификация: сравнение симуляции и теоретических кривых BER
          </p>
          <ResponsiveContainer width="100%" height={300}>
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
              <Line type="monotone" dataKey="Без кодирования (BPSK)" stroke="#94a3b8" strokeWidth={1.5} dot={false} strokeDasharray="8 4" />
              <Line type="monotone" dataKey="5G NR BG1 QPSK AWGN" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="LDPC QC (96,48) R=1/2" stroke="#16a34a" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="LDPC (24,12) R=1/2" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Para>
          На уровне системного тестирования проведено сравнение характеристик с опубликованными
          данными эталонных симуляторов 5G NR (MATLAB Communications Toolbox, OpenAirInterface5G).
          Расхождение по coding gain составило менее 0,2 дБ, по BLER — менее 3%. Отклонение
          объясняется использованием ограниченного подъёмного фактора Z=8 вместо производственного
          Z=384, что снижает корректирующую способность кода.
        </Para>
      </Section>

      {/* 4.6 */}
      <Section title="4.6. Экспорт результатов и режим защиты" id="ch4-6">
        <Para>
          Класс <code className="bg-gray-100 px-1 rounded">ExportService.java</code> реализует
          экспорт результатов симуляции в формате CSV с разделителем-точкой с запятой
          (совместимость с MS Excel и LibreOffice Calc в локали с русскими настройками).
          Заголовок CSV-файла включает метаданные эксперимента: дату и время, профиль LDPC,
          схему модуляции, тип канала, диапазон SNR. Данные включают все метрики: SNR, BER,
          BLER, Throughput, SE, Coding Gain.
        </Para>

        <Para>
          Режим защиты (DefenceMode) предназначен для демонстрации работы системы на защите
          ВКР. Он включает пошаговую анимацию процесса итеративного декодирования NMS с
          визуализацией потоков сообщений на упрощённом графе Таннера (для профиля (24,12)).
          Каждая итерация отображается с задержкой 500 мс, значения LLR показываются
          цветовой шкалой (синий — положительные, красный — отрицательные). Предусмотрена
          пауза/продолжение анимации и пошаговый режим.
        </Para>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-purple-800 mb-3">Итоговые характеристики программного средства</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Язык / версия", value: "Java 17 LTS" },
              { label: "UI фреймворк", value: "JavaFX 17.0.10" },
              { label: "Сборочная система", value: "Maven 3.8+" },
              { label: "LDPC-профили", value: "3 (24,12 / 96,48 / BG1)" },
              { label: "Модуляции", value: "BPSK, QPSK, 16-QAM" },
              { label: "Модели канала", value: "AWGN, Rayleigh, OFDM" },
              { label: "MIMO конфиг.", value: "SISO, 2×2 ZF/MRC" },
              { label: "Декодер", value: "NMS (α=0,80, Imax=50)" },
              { label: "Метрики", value: "BER, BLER, TP, SE, Gc" },
              { label: "Экспорт", value: "CSV (UTF-8, locale-safe)" },
              { label: "JUnit-тестов", value: "47 (pass: 47/47)" },
              { label: "Платформы", value: "Windows, Linux, RED OS" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-purple-200 rounded p-2">
                <p className="text-xs text-purple-600 font-medium">{item.label}</p>
                <p className="text-sm font-bold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};
