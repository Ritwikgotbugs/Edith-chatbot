import { auth, db } from '@/firebase/client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ChevronLeft, FileText, History, Home, Menu } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { TbLogout2 } from "react-icons/tb";
import { toast } from 'sonner';


interface UserProfile {
  name: string;
  empID: string;
  role: string;
}

const SidebarContent: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
      toast.success('Successfully signed out', {
        style:{
          backgroundColor: '#22c55e',
          color: 'black',
        }
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
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
        } finally {
          setLoading(false);
        }
      } else {
        setUserProfile(null);
        setLoading(false); 
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigateTo = (url: string) => {
    router.push(url);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <aside
      className={`transition-width duration-300 bg-[#232323] text-white p-4 space-y-4 flex flex-col justify-between rounded-xl m-4 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        <div className="flex justify-between items-center">
          <Button onClick={toggleSidebar} variant="ghost" className="hover:bg-gray-200 hover:text-black">
            {isCollapsed ? <Menu className="w-5 h-5"/> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>
        <div className={`pb-4 flex justify-center my-5 ${isCollapsed ? 'block' : 'flex items-center'}`}>
          <Avatar className={`${isCollapsed ? 'h-10 w-10' : 'h-20 w-20'}`}>
            <AvatarImage src="https://images/shadcn" alt={userProfile?.name || 'Avatar'} />
            <AvatarFallback className='text-black'>{userProfile?.name?.charAt(0) || 'A'}</AvatarFallback>
          </Avatar>
        </div>

        {!isCollapsed && userProfile && (
          <div className="p-2 mb-5">
            <h3 className="text-lg font-bold">Name: {userProfile.name}</h3>
            <p>ID: {userProfile.empID}</p>
            <p>
              Role:{' '}
              <span className="bg-black text-white rounded-full text-xs py-1 px-2">
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
              {!isCollapsed && (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left no-underline hover:no-underline ${
                      pathname === '/homepage' ? 'bg-zinc-400 text-black' : ''
                    }`}
                    onClick={() => navigateTo('/homepage')}
                  >
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left no-underline hover:no-underline ${
                      pathname === '/admin' ? 'bg-zinc-400 text-black' : ''
                    }`}
                    onClick={() => navigateTo('/admin')}
                  >
                    Admin
                  </Button>
                </div>
              )}
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
      </div>
        <Button
          variant="destructive"
          className="w-full text-left no-underline hover:no-underline"
          onClick={handleSignOut}> {isCollapsed? <TbLogout2/> : 'Logout'} </Button>
    </aside>
  );
};

const Sidebar = dynamic(() => Promise.resolve(SidebarContent), { ssr: false });

export default Sidebar;
