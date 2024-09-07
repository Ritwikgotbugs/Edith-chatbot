import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

interface DocMessageProps {
  pdfurl: string;
}

export default function DocMessage({ pdfurl }: DocMessageProps) {
  return (
    <div
      className="relative w-24 h-15 rounded-xl cursor-pointer flex flex-col justify-between"
      onClick={() => window.open(pdfurl, '_blank')}
    >
      <div className="flex justify-center items-center flex-grow">
        <FaFilePdf className="text-white text-3xl" />
      </div>

      <div className="text-center text-white underline text-xs pt-2">
        Hr-Policy.pdf
      </div>
    </div>
  );
}
