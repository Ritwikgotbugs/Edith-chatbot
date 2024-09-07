import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/client'; // Ensure this is the correct import for your Firebase setup
import { ChartData, ChartOptions } from 'chart.js';

// Register required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface KeywordData {
  keyword: string;
  frequency: number;
}

const QueryGraph = () => {
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the graph data from Firestore
  const fetchGraphData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'graph'));
      const data: KeywordData[] = querySnapshot.docs.map(doc => ({
        keyword: doc.data().keyword,
        frequency: doc.data().frequency,
      }));
      setKeywordData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching graph data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  // Prepare data for Chart.js
  const chartData: ChartData<'bar'> = {
    labels: keywordData.map((item) => item.keyword), // Labels from Firebase
    datasets: [
      {
        label: 'Frequency',
        data: keywordData.map((item) => item.frequency), // Frequency data from Firebase
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  // Define chart options
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#232323] rounded-2xl p-4 sm:p-6 text-white h-full">
      <h3 className="text-lg sm:text-2xl font-bold mb-4">Query Graph</h3>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md h-96">
        <div className="relative overflow-hidden h-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default QueryGraph;
