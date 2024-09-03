import React from 'react';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="bg-gray-800 p-6 rounded-lg text-center">
        <h1 className="text-xl mb-4">How can I help you today?</h1>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 bg-gray-700 rounded">Seed Prompt Templates</button>
          <button className="p-4 bg-gray-700 rounded">Media Type Selection</button>
          <button className="p-4 bg-gray-700 rounded">Multilingual Support</button>
          <button className="p-4 bg-gray-700 rounded">Analytics</button>
        </div>
        <input 
          type="text" 
          placeholder="Type your prompt here..." 
          className="w-full mt-4 p-2 rounded bg-gray-700" 
        />
      </div>
    </main>
  );
};

export default MainContent;
