import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'recharts';

// Register required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QueryGraph = () => {
  // Define the type for chart data
  const chartData: ChartData<'bar'> = {
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

  // Define the type for chart options
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
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
    <div className="bg-orange-500 rounded-2xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-white">Query Graph</h3>
      <div className="bg-zinc-950 p-6 rounded-lg shadow-md">
        
      </div>
    </div>
  );
};

export default QueryGraph;
