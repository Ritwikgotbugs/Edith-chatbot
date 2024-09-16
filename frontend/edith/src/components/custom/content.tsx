import React, { useState } from 'react';

const MainContent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Handle sending the message here
      console.log("Message sent:", inputValue);
      setInputValue(''); // Clear input after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className=" bg-neutral-950 w-full rounded-2xl flex flex-col items-center justify-center p-4">
        <h1 className="text-xl mt-24 mb-12">How can I help you today?</h1>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-6 bg-zinc-600 rounded">Seed Prompt Templates</button>
          <button className="p-6 bg-zinc-600 rounded">Media Type Selection</button>
          <button className="p-6 bg-zinc-600 rounded">Multilingual Support</button>
          <button className="p-6 bg-zinc-600 rounded">Analytics</button>
        </div>
        <div className="w-full mt-44 flex items-center">
          <input
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your prompt here..." 
            className="flex-1 p-3 rounded bg-zinc-600 text-white focus:outline-none" 
          />
          <button 
            onClick={handleSend}
            className="p-3 ml-2 rounded-l bg-blue-600 rounded-r text-white"
          >
            Send
          </button>
        </div>
        </div>
    </main>
  );
};

export default MainContent;
