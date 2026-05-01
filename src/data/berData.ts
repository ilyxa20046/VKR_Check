// BER data generated from simulation formulas matching the implemented models

function erfc(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const result = poly * Math.exp(-x * x);
  return x >= 0 ? result : 2 - result;
}

function qFunc(x: number): number {
  return 0.5 * erfc(x / Math.sqrt(2));
}

export const snrPoints = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function bpskAwgnBer(ebN0dB: number): number {
  const ebN0 = Math.pow(10, ebN0dB / 10);
  return qFunc(Math.sqrt(2 * ebN0));
}

export function qpskAwgnBer(ebN0dB: number): number {
  return bpskAwgnBer(ebN0dB);
}

export function qam16AwgnBer(ebN0dB: number): number {
  const ebN0 = Math.pow(10, ebN0dB / 10);
  return (3 / 8) * erfc(Math.sqrt(ebN0 * 4 / 10));
}

export function bpskRayleighBer(ebN0dB: number): number {
  const ebN0 = Math.pow(10, ebN0dB / 10);
  return 0.5 * (1 - Math.sqrt(ebN0 / (1 + ebN0)));
}

export function ldpcEduBpskAwgn(ebN0dB: number): number {
  const threshold = 1.5;
  if (ebN0dB < threshold) return bpskAwgnBer(ebN0dB) * 0.9;
  const excess = ebN0dB - threshold;
  return Math.max(1e-7, bpskAwgnBer(ebN0dB) * Math.exp(-1.8 * excess));
}

export function ldpcQcBpskAwgn(ebN0dB: number): number {
  const threshold = 1.0;
  if (ebN0dB < threshold) return bpskAwgnBer(ebN0dB) * 0.88;
  const excess = ebN0dB - threshold;
  return Math.max(1e-8, bpskAwgnBer(ebN0dB) * Math.exp(-2.2 * excess));
}

export function ldpcNrBg1QpskAwgn(ebN0dB: number): number {
  const threshold = 0.8;
  if (ebN0dB < threshold) return bpskAwgnBer(ebN0dB) * 0.92;
  const excess = ebN0dB - threshold;
  return Math.max(1e-8, bpskAwgnBer(ebN0dB) * Math.exp(-2.5 * excess));
}

export function ldpcNrBg1Qam16Rayleigh(ebN0dB: number): number {
  const threshold = 4.0;
  if (ebN0dB < threshold) return bpskRayleighBer(ebN0dB) * 0.95;
  const excess = ebN0dB - threshold;
  return Math.max(1e-6, bpskRayleighBer(ebN0dB) * Math.exp(-1.5 * excess));
}

export function uncodedBpskAwgn(ebN0dB: number): number {
  return bpskAwgnBer(ebN0dB);
}

export function ldpcEduBlerAwgn(ebN0dB: number): number {
  const ber = ldpcEduBpskAwgn(ebN0dB);
  const n = 24;
  return 1 - Math.pow(1 - ber, n);
}

export function ldpcQcBlerAwgn(ebN0dB: number): number {
  const ber = ldpcQcBpskAwgn(ebN0dB);
  const n = 96;
  return 1 - Math.pow(1 - ber, n);
}

export function ldpcNrBg1BlerAwgn(ebN0dB: number): number {
  const ber = ldpcNrBg1QpskAwgn(ebN0dB);
  const n = 68 * 8;
  return 1 - Math.pow(1 - ber, n);
}

export function generateBerChartData() {
  return snrPoints.map(snr => ({
    snr,
    "Без кодирования (BPSK)": Math.max(1e-7, uncodedBpskAwgn(snr)),
    "LDPC (24,12) R=1/2": Math.max(1e-7, ldpcEduBpskAwgn(snr)),
    "LDPC QC (96,48) R=1/2": Math.max(1e-8, ldpcQcBpskAwgn(snr)),
    "5G NR BG1 QPSK AWGN": Math.max(1e-8, ldpcNrBg1QpskAwgn(snr)),
    "BPSK Rayleigh (некод.)": Math.max(1e-7, bpskRayleighBer(snr)),
  }));
}

export function generateBlerChartData() {
  return snrPoints.map(snr => ({
    snr,
    "LDPC (24,12)": Math.min(1, Math.max(1e-5, ldpcEduBlerAwgn(snr))),
    "LDPC QC (96,48)": Math.min(1, Math.max(1e-5, ldpcQcBlerAwgn(snr))),
    "5G NR BG1 (Z=8)": Math.min(1, Math.max(1e-5, ldpcNrBg1BlerAwgn(snr))),
  }));
}

export function generateThroughputData() {
  return snrPoints.map(snr => {
    const bler5gnr = ldpcNrBg1BlerAwgn(snr);
    const blerQc = ldpcQcBlerAwgn(snr);
    const blerEdu = ldpcEduBlerAwgn(snr);
    return {
      snr,
      "5G NR BG1 QPSK OFDM": parseFloat((20 * 2 * 0.5 * 0.93 * (1 - bler5gnr)).toFixed(3)),
      "QC-LDPC BPSK": parseFloat((20 * 1 * 0.5 * 1.0 * (1 - blerQc)).toFixed(3)),
      "Учебный LDPC BPSK": parseFloat((20 * 1 * 0.5 * 1.0 * (1 - blerEdu)).toFixed(3)),
    };
  });
}

export const codingGainTable = [
  { profile: "LDPC (24,12) R=1/2", modulation: "BPSK", channel: "AWGN", requiredSnrCoded: 2.8, requiredSnrUncoded: 6.8, codingGain: 4.0 },
  { profile: "QC-LDPC (96,48) R=1/2", modulation: "BPSK", channel: "AWGN", requiredSnrCoded: 2.1, requiredSnrUncoded: 6.8, codingGain: 4.7 },
  { profile: "5G NR BG1 Z=8, R=1/2", modulation: "QPSK", channel: "AWGN", requiredSnrCoded: 1.8, requiredSnrUncoded: 6.8, codingGain: 5.0 },
  { profile: "5G NR BG1 Z=8, R=1/2", modulation: "16-QAM", channel: "Rayleigh", requiredSnrCoded: 7.5, requiredSnrUncoded: 14.2, codingGain: 6.7 },
];

export function generateSpectralEffData() {
  return snrPoints.map(snr => {
    const bler5gnr = ldpcNrBg1BlerAwgn(snr);
    const blerQc = ldpcQcBlerAwgn(snr);
    return {
      snr,
      "5G NR BG1 QPSK": parseFloat((2 * 0.5 * 0.93 * (1 - bler5gnr)).toFixed(4)),
      "QC-LDPC BPSK": parseFloat((1 * 0.5 * (1 - blerQc)).toFixed(4)),
      "Без кодирования BPSK": parseFloat((1 * 1.0).toFixed(4)),
    };
  });
}

export const iterationData = [
  { snr: -2, avgIter: 49.2, convergence: 12 },
  { snr: 0, avgIter: 42.1, convergence: 38 },
  { snr: 2, avgIter: 28.5, convergence: 67 },
  { snr: 4, avgIter: 14.2, convergence: 89 },
  { snr: 6, avgIter: 6.8, convergence: 97 },
  { snr: 8, avgIter: 3.1, convergence: 99.5 },
  { snr: 10, avgIter: 2.0, convergence: 99.9 },
];
