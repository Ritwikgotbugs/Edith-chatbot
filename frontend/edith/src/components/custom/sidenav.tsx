import React, { useEffect, useState } from 'react';
import { db, auth } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { Home, History, LogIn, FileText, Menu, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'; // Assuming you're using shadcn/ui components

interface UserProfile {
  name: string;
  empID: string;
  role: string;
}

const Sidebar: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', empID: '', role: '' });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, 'users', `${auth.currentUser?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserProfile({
            name: data.name || '',
            empID: data.empID || '',
            role: data.role || '',
          });
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`transition-width duration-300 bg-gray-800 text-white p-4 space-y-4 flex flex-col justify-between h-full ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        <div className="flex justify-between items-center">
          <Button onClick={toggleSidebar} variant="ghost" className="text-white">
            {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>
        <div className={`pb-4 flex justify-center my-5 ${isCollapsed ? 'block' : 'flex items-center'}`}>
        <Avatar className={`${isCollapsed ? 'h-10 w-10' : 'h-20 w-20'}`}>
          <AvatarImage src="https://images/shadcn" alt={userProfile.name} />
          <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {!isCollapsed && <p className="ml-2">{userProfile.name}</p>}
      </div>

        {!isCollapsed && (
          <div className="p-2 text-white mb-5">
            <h3 className="text-lg font-bold">Name:{userProfile.name}</h3>
            <p>ID: {userProfile.empID}</p>
            <p>
              Role:{' '}
              <span className="bg-black text-white px-2 py-1 rounded">
                {userProfile.role}
              </span>
            </p>
          </div>
        )}

        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="home" className="border-none">
            <AccordionTrigger className="flex items-center text-left no-underline hover:no-underline">
              <Home className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>Home</span>}
            </AccordionTrigger>
            <AccordionContent>
              {!isCollapsed && <p>Your Home content goes here.</p>}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="history" className="border-none">
            <AccordionTrigger className="flex items-center text-left no-underline hover:no-underline">
              <History className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>History</span>}
            </AccordionTrigger>
            <AccordionContent>
              {!isCollapsed && <p>Your History content goes here.</p>}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="documents" className="border-none">
            <AccordionTrigger className="flex items-center text-left no-underline hover:no-underline">
              <FileText className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>My Documents</span>}
            </AccordionTrigger>
            <AccordionContent>
              {!isCollapsed && <p>Your Documents content goes here.</p>}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          variant="ghost"
          className="w-full justify-start text-left no-underline hover:no-underline"
        >
          <LogIn className="w-5 h-5" />
          {!isCollapsed && <span className="ml-2">Admin Panel</span>}
        </Button>
      </div>

      {/* Avatar section */}
      
    </aside>
  );
};

export default Sidebar;
