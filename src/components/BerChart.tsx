import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Q-функция
function qFunc(x: number): number {
  return 0.5 * erfc(x / Math.sqrt(2));
}

function erfc(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    t *
    (0.254829592 +
      t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const result = y * Math.exp(-x * x);
  return x >= 0 ? result : 2 - result;
}

// Теоретический BER BPSK AWGN
function berBpskAwgn(ebN0dB: number): number {
  const ebN0 = Math.pow(10, ebN0dB / 10);
  return qFunc(Math.sqrt(2 * ebN0));
}

// Теоретический BER QPSK AWGN (совпадает с BPSK на бит)
function berQpskAwgn(ebN0dB: number): number {
  return berBpskAwgn(ebN0dB);
}

// Теоретический BER 16-QAM AWGN
function ber16QamAwgn(ebN0dB: number): number {
  const ebN0 = Math.pow(10, ebN0dB / 10);
  const k = 4;
  const M = 16;
  const arg = Math.sqrt((3 * k / (M - 1)) * ebN0);
  const val = (4 / k) * (1 - 1 / Math.sqrt(M)) * qFunc(arg);
  return Math.max(1e-12, Math.min(0.5, val));
}

// Упрощённая модель LDPC BER (смещение ~4-5 dB от некодированного)
function berLdpcAwgn(ebN0dB: number, offset = 4.5): number {
  const shifted = ebN0dB - offset;
  const val = berBpskAwgn(shifted) * 0.6;
  return Math.max(1e-9, val);
}

// Rayleigh BER BPSK
function berBpskRayleigh(ebN0dB: number): number {
  const g = Math.pow(10, ebN0dB / 10);
  const val = 0.5 * (1 - Math.sqrt(g / (1 + g)));
  return Math.max(1e-9, val);
}

// LDPC Rayleigh (улучшенный относительно некодированного)
function berLdpcRayleigh(ebN0dB: number): number {
  const shifted = ebN0dB - 3.5;
  const g = Math.pow(10, shifted / 10);
  const val = 0.5 * (1 - Math.sqrt(g / (1 + g))) * 0.5;
  return Math.max(1e-9, val);
}

interface BerChartProps {
  title: string;
  chartType: 'awgn_comparison' | 'rayleigh_comparison' | 'modulation_comparison' | 'ldpc_profiles';
  figureNumber: number;
}

const BerChart: React.FC<BerChartProps> = ({ title, chartType, figureNumber }) => {
  const snrRange = Array.from({ length: 21 }, (_, i) => i);

  let datasets: any[] = [];
  let xLabel = 'Eb/N0, дБ';

  if (chartType === 'awgn_comparison') {
    const uncoded = snrRange.map(s => berBpskAwgn(s));
    const ldpc52 = snrRange.map(s => berLdpcAwgn(s, 4.2));
    const ldpc96 = snrRange.map(s => berLdpcAwgn(s, 5.1));
    const ldpc5gnr = snrRange.map(s => berLdpcAwgn(s, 5.8));

    datasets = [
      {
        label: 'Некодированный BPSK',
        data: uncoded,
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        borderDash: [6, 3],
        pointRadius: 4,
        pointStyle: 'circle',
        tension: 0.3,
      },
      {
        label: 'LDPC (24,12) учебный',
        data: ldpc52,
        borderColor: '#f97316',
        backgroundColor: 'transparent',
        pointRadius: 4,
        pointStyle: 'triangle',
        tension: 0.3,
      },
      {
        label: 'LDPC QC-inspired (96,48)',
        data: ldpc96,
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        pointRadius: 4,
        pointStyle: 'rect',
        tension: 0.3,
      },
      {
        label: '5G NR BG1 (Z=8)',
        data: ldpc5gnr,
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        pointRadius: 5,
        pointStyle: 'star',
        tension: 0.3,
        borderWidth: 2.5,
      },
    ];
  } else if (chartType === 'rayleigh_comparison') {
    const uncodedRayleigh = snrRange.map(s => berBpskRayleigh(s));
    const ldpcRayleigh = snrRange.map(s => berLdpcRayleigh(s));
    const uncodedAwgn = snrRange.map(s => berBpskAwgn(s));
    const ldpcAwgn = snrRange.map(s => berLdpcAwgn(s, 5.8));

    datasets = [
      {
        label: 'BPSK Rayleigh (некодированный)',
        data: uncodedRayleigh,
        borderColor: '#ef4444',
        backgroundColor: 'transparent',
        borderDash: [6, 3],
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: '5G NR LDPC + Rayleigh fading',
        data: ldpcRayleigh,
        borderColor: '#a855f7',
        backgroundColor: 'transparent',
        pointRadius: 4,
        tension: 0.3,
        borderWidth: 2.5,
      },
      {
        label: 'BPSK AWGN (некодированный)',
        data: uncodedAwgn,
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderDash: [3, 3],
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: '5G NR LDPC + AWGN (эталон)',
        data: ldpcAwgn,
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        pointRadius: 4,
        tension: 0.3,
      },
    ];
  } else if (chartType === 'modulation_comparison') {
    const snrExt = Array.from({ length: 25 }, (_, i) => i);
    const bpskLdpc = snrExt.map(s => berLdpcAwgn(s, 5.5));
    const qpskLdpc = snrExt.map(s => berLdpcAwgn(s, 5.8));
    const qam16Ldpc = snrExt.map(s => {
      const raw = ber16QamAwgn(s);
      const ldpc = berLdpcAwgn(s, 8.5) * 1.5;
      return Math.min(raw, ldpc);
    });
    const bpskUncoded = snrExt.map(s => berBpskAwgn(s));
    const qpskUncoded = snrExt.map(s => berQpskAwgn(s));
    const qam16Uncoded = snrExt.map(s => ber16QamAwgn(s));

    datasets = [
      {
        label: 'BPSK некодированный',
        data: bpskUncoded,
        borderColor: '#ef4444',
        borderDash: [5, 3],
        backgroundColor: 'transparent',
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: 'QPSK некодированный',
        data: qpskUncoded,
        borderColor: '#f97316',
        borderDash: [5, 3],
        backgroundColor: 'transparent',
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: '16-QAM некодированный',
        data: qam16Uncoded,
        borderColor: '#eab308',
        borderDash: [5, 3],
        backgroundColor: 'transparent',
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: 'BPSK + 5G NR LDPC',
        data: bpskLdpc,
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        pointRadius: 4,
        borderWidth: 2.5,
        tension: 0.3,
      },
      {
        label: 'QPSK + 5G NR LDPC',
        data: qpskLdpc,
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        pointRadius: 4,
        borderWidth: 2.5,
        tension: 0.3,
      },
      {
        label: '16-QAM + 5G NR LDPC',
        data: qam16Ldpc,
        borderColor: '#a855f7',
        backgroundColor: 'transparent',
        pointRadius: 4,
        borderWidth: 2.5,
        tension: 0.3,
      },
    ];

    return (
      <figure className="my-8">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" style={{ height: 380 }}>
          <Line
            data={{
              labels: snrExt.map(s => `${s}`),
              datasets,
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: xLabel, font: { size: 13 } } },
                y: {
                  type: 'logarithmic',
                  title: { display: true, text: 'BER', font: { size: 13 } },
                  min: 1e-7,
                  max: 1,
                  ticks: {
                    callback: (v: any) => {
                      const log = Math.log10(v);
                      if (Number.isInteger(log)) return `10^${log}`;
                      return '';
                    },
                  },
                },
              },
              plugins: {
                legend: { position: 'top', labels: { font: { size: 11 }, boxWidth: 30 } },
                title: { display: false },
              },
            }}
          />
        </div>
        <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
          Рисунок {figureNumber} — {title}
        </figcaption>
      </figure>
    );
  } else if (chartType === 'ldpc_profiles') {
    // BLER comparison
    const snrBler = Array.from({ length: 17 }, (_, i) => i);
    const bler5gnr = snrBler.map(s => {
      if (s < 4) return 1.0;
      const v = Math.exp(-(s - 4) * 0.85);
      return Math.min(1.0, Math.max(1e-4, v));
    });
    const blerQc = snrBler.map(s => {
      if (s < 5) return 1.0;
      const v = Math.exp(-(s - 5) * 0.65);
      return Math.min(1.0, Math.max(1e-4, v));
    });
    const blerEdu = snrBler.map(s => {
      if (s < 3) return 1.0;
      const v = Math.exp(-(s - 3) * 0.50);
      return Math.min(1.0, Math.max(1e-4, v));
    });

    datasets = [
      {
        label: 'Учебный LDPC (24,12) R=1/2',
        data: blerEdu,
        borderColor: '#f97316',
        backgroundColor: 'transparent',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: 'QC-inspired LDPC (96,48) R=1/2',
        data: blerQc,
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: '5G NR BG1 (Z=8) R≈1/3',
        data: bler5gnr,
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        pointRadius: 5,
        borderWidth: 2.5,
        tension: 0.3,
      },
    ];

    return (
      <figure className="my-8">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" style={{ height: 360 }}>
          <Line
            data={{
              labels: snrBler.map(s => `${s}`),
              datasets,
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'Eb/N0, дБ', font: { size: 13 } } },
                y: {
                  type: 'logarithmic',
                  title: { display: true, text: 'BLER', font: { size: 13 } },
                  min: 1e-4,
                  max: 2,
                  ticks: {
                    callback: (v: any) => {
                      const log = Math.log10(v);
                      if (Number.isInteger(log)) return `10^${log}`;
                      return '';
                    },
                  },
                },
              },
              plugins: {
                legend: { position: 'top', labels: { font: { size: 11 }, boxWidth: 30 } },
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

  return (
    <figure className="my-8">
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200" style={{ height: 360 }}>
        <Line
          data={{
            labels: snrRange.map(s => `${s}`),
            datasets,
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { title: { display: true, text: xLabel, font: { size: 13 } } },
              y: {
                type: 'logarithmic',
                title: { display: true, text: 'BER', font: { size: 13 } },
                min: 1e-7,
                max: 1,
                ticks: {
                  callback: (v: any) => {
                    const log = Math.log10(v);
                    if (Number.isInteger(log)) return `10^${log}`;
                    return '';
                  },
                },
              },
            },
            plugins: {
              legend: { position: 'top', labels: { font: { size: 11 }, boxWidth: 30 } },
            },
          }}
        />
      </div>
      <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
        Рисунок {figureNumber} — {title}
      </figcaption>
    </figure>
  );
};

export default BerChart;
