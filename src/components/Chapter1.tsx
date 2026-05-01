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
        ГЛАВА 1. ТЕОРЕТИКО-АНАЛИТИЧЕСКИЕ ОСНОВЫ ПЕРЕДАЧИ ДАННЫХ И ПОМЕХОУСТОЙЧИВОГО КОДИРОВАНИЯ В СИСТЕМАХ МОБИЛЬНОЙ СЕТИ 5G
      </h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded" />

      {/* 1.1 */}
      <Section title="1.1. Особенности передачи данных в мобильных сетях пятого поколения" id="ch1-1">
        <Para>
          Развитие мобильных телекоммуникационных технологий обусловлено непрерывным ростом потребности
          в передаче данных с высокой скоростью, минимальными задержками, надёжностью и гибкостью
          масштабирования в условиях разнообразных сценариев применения. Сети пятого поколения (5G NR —
          New Radio) представляют собой качественный технологический скачок по сравнению с предшествующими
          стандартами LTE/LTE-A и охватывают три принципиально различных класса услуг: eMBB (Enhanced
          Mobile Broadband) с пиковой скоростью свыше 20 Гбит/с, URLLC (Ultra-Reliable Low-Latency
          Communications) с задержкой не более 1 мс и MMTC (Massive Machine-Type Communications) с
          плотностью подключений до 10⁶ устройств/км².
        </Para>
        <Para>
          Стандарт 5G NR разработан консорциумом 3GPP (серии Release 15 и выше) и поддерживает работу
          в трёх диапазонах частот: FR1 (sub-6 GHz, 450 МГц – 6 ГГц), FR2 (mmWave, 24,25 – 52,6 ГГц) и
          расширенном FR2-2 (52,6 – 71 ГГц). Каждый диапазон характеризуется собственными условиями
          распространения: в FR1 доминируют дифракция и отражение от городских объектов, в FR2 —
          высокое затухание в атмосфере и ограниченное проникновение через препятствия. Это определяет
          специфику моделей канала и требований к помехоустойчивому кодированию.
        </Para>
        <Para>
          Радиоканал в мобильных сетях характеризуется совокупностью физических явлений: многолучевым
          распространением (multipath propagation), эффектом Доплера, быстрыми и медленными замираниями
          (fading), а также аддитивным белым гауссовским шумом (AWGN). Многолучевое распространение
          возникает вследствие отражения, дифракции и рассеяния радиоволн от препятствий (здания, рельеф
          местности), что приводит к интерференции нескольких копий сигнала на приёмной стороне.
          Суперпозиция этих копий порождает межсимвольную интерференцию (ISI) и частотно-избирательные
          замирания, для борьбы с которыми в 5G применяется многоносительная модуляция OFDM.
        </Para>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
          <p className="font-semibold text-blue-800 mb-2">Модель принятого сигнала в многолучевом канале (формула 1.1):</p>
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
          Отношение сигнал/шум (SNR) является ключевым параметром, определяющим качество передачи.
          В системах с кодированием оно связано с энергетическими параметрами через скорость кода и
          порядок модуляции:
        </Para>

        <Formula
          math="\text{SNR} = \frac{E_s}{N_0} = \frac{E_b}{N_0} \cdot R \cdot \log_2 M"
          block
          label="1.2"
        />

        <Para>
          где <Formula math="E_s" /> — энергия символа, <Formula math="E_b" /> — энергия бита,
          <Formula math="R" /> — скорость кода, <Formula math="M" /> — порядок модуляции.
          Данное соотношение показывает, что при фиксированном SNR увеличение скорости кода или порядка
          модуляции приводит к снижению энергии на бит, что непосредственно влияет на вероятность ошибки.
        </Para>
      </Section>

      {/* 1.2 */}
      <Section title="1.2. Возникновение помех и замирания по различным типам каналов" id="ch1-2">
        <Para>
          Модель AWGN описывает канал, в котором единственным источником помех является тепловой шум с
          равномерным спектром. Спектральная плотность мощности шума определяется как{' '}
          <Formula math="N_0/2" /> Вт/Гц, а мгновенные значения шума подчиняются нормальному
          распределению с нулевым математическим ожиданием и дисперсией <Formula math="\sigma^2" />.
          Несмотря на свою идеализированность, модель AWGN широко применяется для теоретических оценок
          и сравнительного анализа схем кодирования, служа нижней границей ошибок при заданном SNR.
        </Para>

        <Para>
          Модель замираний Рэлея (Rayleigh fading) отражает статистические свойства канала при наличии
          множества лучей без доминирующей прямой видимости (NLOS — Non-Line-of-Sight). Амплитуда
          огибающей сигнала подчиняется распределению Рэлея, а комплексная амплитуда — двумерному
          нормальному распределению:
        </Para>

        <Formula
          math="h = h_I + j \cdot h_Q, \quad h_I, h_Q \sim \mathcal{N}\left(0, \frac{1}{2}\right)"
          block
          label="1.3"
        />

        <Para>
          Среднее значение мощности канала при замираниях Рэлея нормировано к единице, что обеспечивает
          корректность энергетических сравнений с каналом AWGN:
        </Para>

        <Formula
          math="\mathbb{E}[|h|^2] = \mathbb{E}[h_I^2] + \mathbb{E}[h_Q^2] = \frac{1}{2} + \frac{1}{2} = 1"
          block
          label="1.4"
        />

        <Para>
          Для достижения уровня BER = 10⁻³ в канале Рэлея без применения помехоустойчивого кодирования
          требуется значительно большее значение <Formula math="E_b/N_0" /> по сравнению с каналом AWGN.
          Это обусловлено вероятностью глубоких провалов (deep fades), при которых мощность принятого
          сигнала резко снижается. На рисунке 1.1 представлено сравнение теоретических кривых BER для
          модуляции BPSK в каналах AWGN и Rayleigh fading.
        </Para>

        <div className="my-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-center text-sm font-semibold text-gray-600 mb-3">
            Рисунок 1.1 — Теоретические кривые BER(E_b/N_0) для BPSK в каналах AWGN и Rayleigh fading
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
          Анализ рисунка 1.1 наглядно демонстрирует, что при <Formula math="E_b/N_0" /> = 8 дБ в канале
          AWGN BER составляет около 10⁻⁵, тогда как в канале Рэлея — лишь около 10⁻³. Разница в
          требуемом SNR для достижения одинакового BER может достигать 10–15 дБ. Это убедительно
          подтверждает необходимость применения мощного помехоустойчивого кодирования в реальных
          мобильных сетях.
        </Para>
      </Section>

      {/* 1.3 */}
      <Section title="1.3. Основные показатели качества передачи данных: BER, BLER и SNR" id="ch1-3">
        <Para>
          Вероятность ошибки на бит (BER — Bit Error Rate) является фундаментальным критерием оценки
          качества системы цифровой связи и определяется как отношение числа ошибочно принятых битов к
          общему числу переданных битов за достаточно большой интервал наблюдения. Для теоретической
          оценки BER в канале AWGN при модуляции BPSK используется формула:
        </Para>

        <Formula
          math="\text{BER}_{\text{BPSK}} = Q\!\left(\sqrt{\frac{2E_b}{N_0}}\right) = \frac{1}{2}\,\text{erfc}\!\left(\sqrt{\frac{E_b}{N_0}}\right)"
          block
          label="1.5"
        />

        <Para>
          где функция Q — интеграл хвоста нормального распределения, erfc — дополнительная функция
          ошибок. Для модуляции QPSK BER идентичен BPSK при одинаковом <Formula math="E_b/N_0" />,
          поскольку каждый символ передаёт два независимых бита по двум ортогональным квадратурам.
          Для модуляции 16-QAM формула принимает вид:
        </Para>

        <Formula
          math="\text{BER}_{16\text{-QAM}} \approx \frac{3}{8}\,\text{erfc}\!\left(\sqrt{\frac{2E_b}{5N_0}}\right)"
          block
          label="1.6"
        />

        <Para>
          Вероятность ошибки на блок (BLER — Block Error Rate) характеризует долю транспортных блоков,
          принятых с ошибкой. В системе 5G NR блок считается ошибочным, если не прошла CRC-проверка.
          Целевой показатель BLER для первоначальной передачи в 5G составляет 10% (0,1), что
          обеспечивает оптимальный баланс между надёжностью и пропускной способностью. Метрика BLER
          связана с BER через длину кодового слова <Formula math="n" />:
        </Para>

        <Formula
          math="\text{BLER} \approx 1 - (1 - \text{BER})^n"
          block
          label="1.7"
        />

        <Para>
          Данное соотношение показывает, что при увеличении длины блока <Formula math="n" />
          требования к BER ужесточаются экспоненциально. Для длинных кодовых слов 5G NR BG1 (n = 68 × Z,
          Z = 8...384) достижение BLER ниже 10% требует BER порядка 10⁻⁴ – 10⁻⁵.
        </Para>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-5">
          <p className="font-semibold text-blue-800 mb-2 text-sm">Сводная таблица порогов качества 5G NR (3GPP TS 38.133):</p>
          <div className="overflow-x-auto">
            <table className="text-xs w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-200 px-3 py-2 text-left">Класс услуг</th>
                  <th className="border border-blue-200 px-3 py-2">Целевой BER</th>
                  <th className="border border-blue-200 px-3 py-2">Целевой BLER</th>
                  <th className="border border-blue-200 px-3 py-2">Задержка</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: 'eMBB (передача данных)', ber: '≤ 10⁻⁵', bler: '≤ 10%', delay: '≤ 4 мс' },
                  { service: 'URLLC (критические системы)', ber: '≤ 10⁻⁵', bler: '≤ 0,01%', delay: '≤ 1 мс' },
                  { service: 'mMTC (IoT устройства)', ber: '≤ 10⁻³', bler: '≤ 1%', delay: '≤ 100 мс' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    <td className="border border-blue-200 px-3 py-2 font-medium">{row.service}</td>
                    <td className="border border-blue-200 px-3 py-2 text-center">{row.ber}</td>
                    <td className="border border-blue-200 px-3 py-2 text-center">{row.bler}</td>
                    <td className="border border-blue-200 px-3 py-2 text-center">{row.delay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* 1.4 */}
      <Section title="1.4. Помехоустойчивое кодирование и применение LDPC-кодов в системах 5G" id="ch1-4">
        <Para>
          Помехоустойчивое кодирование (Forward Error Correction, FEC) является одним из ключевых
          инструментов обеспечения надёжности передачи данных в условиях зашумлённого канала. Идея
          метода состоит в добавлении к информационным битам избыточных проверочных битов, которые
          позволяют приёмнику не только обнаруживать, но и исправлять ошибки без повторной передачи
          пакетов. Скорость кода <Formula math="R = k/n" /> определяет долю информационных битов в
          кодовом слове: при R = 1/2 половина битов является проверочными.
        </Para>
        <Para>
          Коды с малой плотностью проверок на чётность (LDPC — Low-Density Parity-Check codes)
          впервые предложены Р. Галлагером в 1962 году, однако практическое применение нашли лишь
          в конце 1990-х годов благодаря работам Д. Маккея и Р. Нила. Ключевое свойство LDPC-кодов —
          разреженность матрицы проверок на чётность <Formula math="\mathbf{H}" />: число единиц в
          матрице порядка <Formula math="O(n)" /> вместо <Formula math="O(n^2)" />, что позволяет
          реализовать эффективное итеративное декодирование за время <Formula math="O(n)" />.
        </Para>
        <Para>
          В стандарте 3GPP Release 15 (TS 38.212) для каналов данных физического уровня 5G NR в
          качестве основного метода FEC утверждены квазициклические LDPC-коды (QC-LDPC) с двумя
          базовыми графами: BG1 (для больших транспортных блоков, K ≥ 3840 бит, матрица 46×68) и
          BG2 (для малых блоков и управляющей информации, матрица 42×52). Скорость кода R варьируется
          от 1/3 до 8/9 через механизм согласования скорости (rate matching) и перфорации.
        </Para>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
          <p className="font-semibold text-blue-800 mb-3">Матрица проверок на чётность QC-LDPC:</p>
          <Formula
            math="\mathbf{H} = \begin{pmatrix} \mathbf{I}^{(s_{0,0})} & \mathbf{I}^{(s_{0,1})} & \cdots & \mathbf{I}^{(s_{0,n_b-1})} \\ \mathbf{I}^{(s_{1,0})} & \mathbf{I}^{(s_{1,1})} & \cdots & \mathbf{I}^{(s_{1,n_b-1})} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{I}^{(s_{m_b-1,0})} & \cdots & \cdots & \mathbf{I}^{(s_{m_b-1,n_b-1})} \end{pmatrix}"
            block
            label="1.8"
          />
          <p className="text-sm text-gray-600 mt-2">
            где <Formula math="\mathbf{I}^{(s)}" /> — циклически сдвинутая на <Formula math="s" /> позиций
            единичная матрица размера <Formula math="Z \times Z" />, <Formula math="Z" /> — подъёмный фактор
            (lifting size), принимающий значения 2–384 в соответствии с таблицами 3GPP.
          </p>
        </div>

        <Para>
          Декодирование LDPC выполняется итеративным алгоритмом распространения доверия (Belief
          Propagation, BP) на графе Таннера. Практически значимой его аппроксимацией является алгоритм
          нормализованного min-sum (NMS), который заменяет операции суммирования произведений в CN-узлах
          на поиск минимума с коэффициентом нормировки <Formula math="\alpha \in (0, 1)" />:
        </Para>

        <Formula
          math="\mu_{c \to v}^{(i)} = \alpha \cdot \prod_{v' \in \mathcal{N}(c) \setminus v} \text{sgn}\!\left(\mu_{v' \to c}^{(i-1)}\right) \cdot \min_{v' \in \mathcal{N}(c) \setminus v}\!\left|\mu_{v' \to c}^{(i-1)}\right|"
          block
          label="1.9"
        />

        <Para>
          где <Formula math="\mu_{c \to v}^{(i)}" /> — сообщение от проверочного узла c к переменному
          узлу v на итерации i; <Formula math="\mathcal{N}(c)" /> — множество переменных узлов,
          подключённых к проверочному узлу c. Оптимальное значение коэффициента нормировки
          <Formula math="\alpha = 0{,}80" /> для 5G NR BG1 установлено экспериментально в ходе
          моделирования (Глава 3).
        </Para>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {[
            {
              title: 'LDPC (24,12) — учебный', color: 'bg-gray-50 border-gray-200',
              items: ['k=12 инф. бит, n=24', 'R = 1/2, Z = 1', 'Плотность H: ~25%', 'Порог декодирования: 1.5 дБ', 'Coding Gain: 4.0 дБ']
            },
            {
              title: 'QC-LDPC (96,48)', color: 'bg-green-50 border-green-200',
              items: ['k=48 инф. бит, n=96', 'R = 1/2, Z = 4', 'Плотность H: ~8%', 'Порог декодирования: 1.0 дБ', 'Coding Gain: 4.7 дБ']
            },
            {
              title: '5G NR BG1 Z=8', color: 'bg-blue-50 border-blue-200',
              items: ['k=22·8=176 бит, n=68·8=544', 'R = 1/2, Z = 8...384', 'Плотность H: ~2%', 'Порог декодирования: 0.8 дБ', 'Coding Gain: 5.0 дБ']
            },
          ].map((card, i) => (
            <div key={i} className={`border rounded-lg p-4 ${card.color}`}>
              <h4 className="font-bold text-gray-800 text-sm mb-2">{card.title}</h4>
              <ul className="space-y-1">
                {card.items.map((item, j) => (
                  <li key={j} className="text-xs text-gray-700 flex items-start gap-1">
                    <span className="text-blue-500 mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 1.5 */}
      <Section title="1.5. Роль помехоустойчивого кодирования и актуальность исследования системы передачи данных" id="ch1-5">
        <Para>
          Предельная теорема Шеннона (1948) устанавливает теоретически достижимую скорость безошибочной
          передачи информации в канале с аддитивным белым гауссовским шумом — пропускную способность
          Шеннона. Для канала AWGN она определяется формулой:
        </Para>

        <Formula
          math="C = B \cdot \log_2\!\left(1 + \frac{S}{N}\right) \quad [\text{бит/с}]"
          block
          label="1.10"
        />

        <Para>
          где B — полоса пропускания канала [Гц], S/N — отношение мощности сигнала к мощности шума.
          Фундаментальный вывод теоремы Шеннона: существуют коды, способные обеспечить сколь угодно
          малую вероятность ошибки при скорости передачи, не превышающей C. Разница между требуемым
          <Formula math="E_b/N_0" /> для достижения заданного BER при конкретном коде и теоретическим
          пределом Шеннона называется разрывом от предела Шеннона (Shannon gap).
        </Para>

        <Para>
          Для 5G NR BG1 при скорости R = 1/2 теоретический предел Шеннона (граница Шеннона) составляет
          <Formula math="E_b/N_0 = 0{,}187" /> дБ (при BPSK), что соответствует минимально
          необходимому отношению энергии бита к спектральной плотности шума. Реальные LDPC-коды 5G
          работают с разрывом около 1–2 дБ от этого предела, что является выдающимся результатом
          по сравнению с кодами Хэмминга (разрыв 5–8 дБ) и турбо-кодами (разрыв 2–3 дБ).
        </Para>

        <Para>
          В диапазоне частот FR2 (mmWave) дополнительную роль играет высокое атмосферное затухание
          (до 15 дБ/км при 60 ГГц) и чувствительность к осадкам, что делает мощное FEC-кодирование
          критически необходимым элементом физического уровня. Технологии MIMO (Multiple-Input
          Multiple-Output), применяемые в 5G NR с числом антенных портов до 256 (Massive MIMO),
          в сочетании с LDPC-кодированием обеспечивают как пространственное разнесение (diversity),
          так и пространственное мультиплексирование (multiplexing), что позволяет одновременно
          повышать надёжность и пропускную способность системы.
        </Para>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 my-6">
          <h4 className="font-bold text-blue-900 mb-3 text-sm uppercase tracking-wide">
            Актуальность исследования и практическая значимость работы
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: '🎯', text: 'Стандарт 3GPP TS 38.212 требует реализации LDPC BG1/BG2 на уровне физического уровня 5G NR для всех устройств категории FR1/FR2' },
              { icon: '📊', text: 'Отсутствие открытых программных средств для комплексного моделирования и визуализации характеристик LDPC в контексте 5G NR' },
              { icon: '🔬', text: 'Необходимость экспериментального подтверждения теоретических результатов для конкретных параметров (BG1/BG2, Z, α, MCS)' },
              { icon: '🚀', text: 'Практическая значимость для проектирования и оптимизации 5G-систем в условиях реальных каналов (AWGN, Rayleigh, OFDM/MIMO)' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                <span className="text-xl">{item.icon}</span>
                <p className="text-xs text-gray-700 leading-5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Para>
          Таким образом, исследование и моделирование системы помехоустойчивого кодирования в зашумлённом
          канале мобильной сети 5G представляет собой актуальную научно-техническую задачу, решение
          которой позволяет получить количественные характеристики эффективности LDPC-кодирования,
          необходимые для проектирования и оптимизации 5G-систем в условиях реальных каналов связи.
        </Para>
      </Section>
    </div>
  );
};
