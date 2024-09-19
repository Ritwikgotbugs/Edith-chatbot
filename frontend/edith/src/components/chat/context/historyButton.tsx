import { useRouter } from 'next/navigation';
import { History } from 'lucide-react';

const HistoryButton: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/history');
  };

  return (
    <button
      className="flex items-center text-left no-underline hover:no-underline w-full p-2 border-none bg-transparent"
      onClick={handleRedirect}
    >
      <History className="w-5 h-5 mr-2" />
      {!isCollapsed && <span>History</span>}
    </button>
  );
};

export default HistoryButton;
