import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const NewChat: React.FC = () => {
  const router = useRouter();

  const startNewChat = () => {
    router.push('/new-chat');
  };

  return (
    <div className="mt-4">
      <Button onClick={startNewChat} className="w-full bg-[#212121] text-white rounded-lg">
        Start New Chat
      </Button>
    </div>
  );
};

export default NewChat;
