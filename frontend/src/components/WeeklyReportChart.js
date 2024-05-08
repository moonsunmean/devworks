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

const WeeklyReportChart = ({ records, records2 }) => {
    if (!records || !records2) {
        return <div>Loading...</div>;
    }

    const labels = ['월', '화', '수', '목', '금', '토','일'];
   // 요일별 흡연량 데이터  인덱스 조정
    const adjustDayIndex = (date) => {
        const day = new Date(date).getDay(); // 일요일 = 0, 월요일 = 1, ..., 토요일 = 6
        return day === 0 ? 6 : day - 1; // 일요일이면 6 반환, 나머지는 하루씩 미뤄서 반환
    };
    // 이번 주 데이터
    const smokeDataThisWeek = labels.map((label, index) => {
        const record = records.find(r => adjustDayIndex(r.recordDate) === index);
        return record ? record.recordAmount : 0;
    });

    // 저번 주 데이터

   const average = smokeDataThisWeek.reduce((acc, cur) => acc + cur, 0) / smokeDataThisWeek.length;

    const data = {
        labels,
        datasets: [
            {
                label: '저번 주 흡연량',
                data: smokeDataLastWeek,
                backgroundColor: 'rgba(120, 120, 120, 0.25)',
            },
            {
                label: '이번 주 흡연량',
                data: smokeDataThisWeek,
                backgroundColor: 'rgba(255, 255, 255, 1)',
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '주간 흡연량 분석',
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: average,
                        yMax: average,
                        borderColor: 'rgb(255, 255, 255, 1',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: {
                            content: `평균 흡연량: ${average.toFixed(1)}개비`,
                            enabled: true,
                            position: 'center'
                        }
                    }
                }
            }
        },
    };

    return <Bar options={options} data={data} />;
};

export default WeeklyReportChart;
