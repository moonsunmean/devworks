import React, { useEffect, useState } from 'react';
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

const WeeklyReportChart = ({ records }) => {
    if (!records) {
        return <div>Loading...</div>;
    }

    // 요일별 라벨
    const labels = ['일', '월', '화', '수', '목', '금', '토'];

    // 요일별 흡연량 데이터 추출
    const smokeData = labels.map(label => {
        const record = records.find(r => new Date(r.recordDate).getDay() === labels.indexOf(label));
        return record ? record.recordAmount : 0; // 요일에 해당하는 데이터가 없다면 0으로 설정
    });

    // 평균 흡연량 계산
    const average = smokeData.reduce((acc, cur) => acc + cur, 0) / smokeData.length;

    // 차트 데이터 설정
    const data = {
        labels,
        datasets: [
            {
                label: '흡연량',
                data: smokeData,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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

    return <Bar options={options} data={data} />;
};

export default WeeklyReportChart;
