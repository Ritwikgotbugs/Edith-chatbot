import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import axios from 'axios';

interface ApiResponse {
  message: string;
  result: string;
}

interface DocMessageProps {
  pdfurl: string;
  onSummaryReceived: (summary: string) => void; // Callback prop
}

export default function DocMessage({ pdfurl, onSummaryReceived }: DocMessageProps) {
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle the summarize action
  const handleSummarize = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ApiResponse>('http://localhost:5000/summarize');
      onSummaryReceived(response.data.result); // Pass the summary to the parent component
    } catch (error) {
      console.error('Error summarizing PDF:', error);
      alert('An error occurred while summarizing the PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-24 h-15 rounded-xl cursor-pointer flex flex-col justify-between">
      {/* PDF Icon */}
      <div className="flex justify-center items-center flex-grow" onClick={() => window.open(pdfurl, '_blank')}>
        <FaFilePdf className="text-white text-3xl" />
      </div>

      {/* PDF File Name */}
      <div className="text-center text-white underline text-xs pt-2">Hr-Policy.pdf</div>

      {/* Summarize Button */}
      <div className="flex justify-center mt-2">
        <button
          onClick={handleSummarize}
          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 text-xs"
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </div>
    </div>
  );
}
