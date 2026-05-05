import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ThroughputChartProps {
  chartType: 'throughput' | 'iterations' | 'spectral' | 'coding_gain';
  figureNumber: number;
  title: string;
}

const ThroughputChart: React.FC<ThroughputChartProps> = ({ chartType, figureNumber, title }) => {
  if (chartType === 'throughput') {
    const snr = Array.from({ length: 17 }, (_, i) => i);

    // QPSK: 2 bits/sym, R≈1/3, 20Mbaud → max ~13.3 Mbps
    const maxBpsk = 20 * 1 * (1 / 3);       // ~6.67 Mbps
    const maxQpsk = 20 * 2 * (1 / 3);       // ~13.3 Mbps
    const max16qam = 20 * 4 * (1 / 3);      // ~26.7 Mbps

    function sigmoid(x: number, c: number, k: number) {
      return 1 / (1 + Math.exp(-k * (x - c)));
    }

    const tpBpsk = snr.map(s => maxBpsk * sigmoid(s, 4.5, 1.1));
    const tpQpsk = snr.map(s => maxQpsk * sigmoid(s, 5.5, 1.0));
    const tp16qam = snr.map(s => max16qam * sigmoid(s, 10.5, 0.9));

    return (
      <figure className="my-8">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" style={{ height: 340 }}>
          <Line
            data={{
              labels: snr.map(s => `${s}`),
              datasets: [
                {
                  label: 'BPSK + 5G NR LDPC',
                  data: tpBpsk,
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59,130,246,0.08)',
                  pointRadius: 4,
                  tension: 0.4,
                  fill: true,
                },
                {
                  label: 'QPSK + 5G NR LDPC',
                  data: tpQpsk,
                  borderColor: '#22c55e',
                  backgroundColor: 'rgba(34,197,94,0.08)',
                  pointRadius: 4,
                  tension: 0.4,
                  fill: true,
                },
                {
                  label: '16-QAM + 5G NR LDPC',
                  data: tp16qam,
                  borderColor: '#a855f7',
                  backgroundColor: 'rgba(168,85,247,0.08)',
                  pointRadius: 4,
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'Eb/N0, дБ', font: { size: 13 } } },
                y: { title: { display: true, text: 'Пропускная способность, Мбит/с', font: { size: 13 } }, min: 0 },
              },
              plugins: {
                legend: { position: 'top', labels: { font: { size: 11 }, boxWidth: 28 } },
              },
            }}
          />
        </div>
        <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
          Рисунок {figureNumber} — {title}
        </figcaption>
      </figure>
    );
  }

  if (chartType === 'iterations') {
    const snrIter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16];
    // Среднее число итераций декодера NMS для 5G NR BG1
    const avgIter = [18.0, 17.8, 17.1, 16.2, 14.3, 11.8, 8.4, 5.7, 3.9, 2.8, 2.1, 1.6, 1.3, 1.1];
    const convRate = [0.1, 0.15, 0.25, 0.41, 0.62, 0.78, 0.89, 0.94, 0.97, 0.98, 0.99, 0.995, 0.998, 0.999];

    return (
      <figure className="my-8">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" style={{ height: 340 }}>
          <Line
            data={{
              labels: snrIter.map(s => `${s}`),
              datasets: [
                {
                  label: 'Среднее число итераций (ось Y₁)',
                  data: avgIter,
                  borderColor: '#3b82f6',
                  backgroundColor: 'transparent',
                  pointRadius: 5,
                  tension: 0.3,
                  yAxisID: 'y',
                },
                {
                  label: 'Доля сходящихся блоков (ось Y₂)',
                  data: convRate.map(v => v * 18),
                  borderColor: '#22c55e',
                  backgroundColor: 'transparent',
                  pointRadius: 5,
                  borderDash: [5, 3],
                  tension: 0.3,
                  yAxisID: 'y',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'Eb/N0, дБ', font: { size: 13 } } },
                y: {
                  title: { display: true, text: 'Среднее кол-во итераций / ×18 (сходимость)', font: { size: 11 } },
                  min: 0,
                  max: 20,
                },
              },
              plugins: {
                legend: { position: 'top', labels: { font: { size: 11 }, boxWidth: 28 } },
                tooltip: {
                  callbacks: {
                    label: (ctx) => {
                      if (ctx.datasetIndex === 1) {
                        return `Сходимость: ${(convRate[ctx.dataIndex] * 100).toFixed(1)}%`;
                      }
                      return `Итерации: ${(ctx.parsed.y ?? 0).toFixed(1)}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
        <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
          Рисунок {figureNumber} — {title}
        </figcaption>
      </figure>
    );
  }

  if (chartType === 'spectral') {
    const scenarios = ['BPSK\nSISO', 'QPSK\nSISO', 'QPSK\nOFDM-64', '16-QAM\nOFDM-128', '16-QAM\n2×2', '256-QAM\n2×2'];
    const seValues = [0.33, 0.64, 0.55, 1.12, 1.89, 3.21];
    const colors = ['#3b82f6', '#22c55e', '#f97316', '#a855f7', '#ef4444', '#eab308'];

    return (
      <figure className="my-8">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" style={{ height: 340 }}>
          <Bar
            data={{
              labels: scenarios,
              datasets: [
                {
                  label: 'Спектральная эффективность (бит/с/Гц)',
                  data: seValues,
                  backgroundColor: colors,
                  borderColor: colors.map(c => c),
                  borderWidth: 1,
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'Сценарий моделирования', font: { size: 12 } } },
                y: {
                  title: { display: true, text: 'η, бит/с/Гц', font: { size: 13 } },
                  min: 0,
                  max: 4,
                },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
        <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
          Рисунок {figureNumber} — {title}
        </figcaption>
      </figure>
    );
  }

  if (chartType === 'coding_gain') {
    const profiles = ['LDPC (24,12)\nR=1/2', 'QC LDPC\n(96,48)\nR=1/2', '5G NR BG1\nR≈1/3\nAWGN', '5G NR BG1\nR≈1/3\nRayleigh', '5G NR BG1\n+OFDM+\n2×2 MIMO'];
    const gains = [2.8, 4.1, 5.8, 7.3, 9.1];
    const colors = ['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ef4444'];

    return (
      <figure className="my-8">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" style={{ height: 340 }}>
          <Bar
            data={{
              labels: profiles,
              datasets: [
                {
                  label: 'Энергетический выигрыш (дБ) при BER = 10⁻³',
                  data: gains,
                  backgroundColor: colors,
                  borderColor: colors,
                  borderWidth: 1,
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'Конфигурация', font: { size: 12 } } },
                y: {
                  title: { display: true, text: 'Coding Gain, дБ', font: { size: 13 } },
                  min: 0,
                  max: 11,
                },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
        <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
          Рисунок {figureNumber} — {title}
        </figcaption>
      </figure>
    );
  }

  return null;
};

export default ThroughputChart;
