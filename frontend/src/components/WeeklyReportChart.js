import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const labels = ['일', '월', '화', '수', '목', '금', '토'];
const data = {
  labels,
  datasets: [
    {
      label: '흡연량',
      data: [3, 10, 5, 8, 6, 7, 9],
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
  ],
};

const average = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0) / data.datasets[0].data.length;

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '주간 분석',
    },
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: average,
          yMax: average,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          borderDash: [6, 6],
          label: {
            content: `평균 흡연량: ${average.toFixed(1)}개비`,
            enabled: true,
            position: 'end'
          }
        }
      }
    }
  },
};




const WeeklyReportChart = () => {
  return <Bar options={options} data={data} />;
};

export default WeeklyReportChart;
