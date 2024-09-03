// components/Admin/QueryGraph.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const QueryGraph = () => {
  // Bar chart data and options
  const chartData = {
    labels: ['Keyword 1', 'Keyword 2', 'Keyword 3', 'Keyword 4', 'Keyword 5', 'Others'],
    datasets: [
      {
        label: 'Frequency',
        data: [15, 20, 10, 30, 25, 18], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: { label: any; parsed: { y: any; }; }) {
            return `${context.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#000',
        },
      },
    },
  };

  return (
    <div className="bg-gray-300 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Query Graph</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default QueryGraph;
