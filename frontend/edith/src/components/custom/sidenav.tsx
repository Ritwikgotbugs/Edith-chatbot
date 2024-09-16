'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { db, auth } from '@/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import { Home, History, FileText, Menu, LogOut } from 'lucide-react'; // Import LogOut icon
import { Button } from '../ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
  name: string;
  empID: string;
  role: string;
}

const SidebarContent: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', empID: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSidebar = () => {
    setIsExpanding(true);
    setIsCollapsed(!isCollapsed);
    setTimeout(() => setIsExpanding(false), 300);
  };

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const handleLogout = () => {
    // Handle logout logic here
    auth.signOut().then(() => {
      router.push('/login'); // Navigate to the login page
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <aside
      className={`transition-all duration-300 ease-in-out bg-zinc-900 text-white p-4 space-y-4 flex flex-col justify-between h-full ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* GAIL Logo */}
        <div className={`flex justify-center items-center mb-5 ${isCollapsed ? 'h-12 w-12' : 'h-24 w-24'} mx-auto`}>
          <img
            src="/images/gail-logo.png" // Update with the correct path to the GAIL logo
            alt="GAIL Logo"
            className={`${isCollapsed ? 'h-12 w-12' : 'h-24 w-24'}`}
          />
        </div>

        {/* Sidebar Toggle Button */}
        <div className="flex justify-between items-center mt-6">
          <Button onClick={toggleSidebar} variant="ghost" className="text-white">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Accordion Items */}
        <Accordion
          type="single"
          collapsible
          className={`space-y-1 ${!isCollapsed ? 'pl-2' : ''}`} // Add padding if not collapsed
        >
          {/* Home Section */}
          <AccordionItem value="home" className="border-none">
            <AccordionTrigger className={`flex items-center mt-10 text-left no-underline hover:no-underline ${isCollapsed ? 'justify-center' : ''}`}>
              <Home className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>Home</span>}
            </AccordionTrigger>
            <AccordionContent>
              {!isCollapsed ? (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left no-underline hover:no-underline ${
                      pathname === '/homepage' ? 'bg-zinc-900' : ''
                    }`}
                    onClick={() => navigateTo('/homepage')}
                  >
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left no-underline hover:no-underline ${
                      pathname === '/admin' ? 'bg-zinc-900' : ''
                    }`}
                    onClick={() => navigateTo('/admin')}
                  >
                    Admin
                  </Button>
                </div>
              ) : (
                <Skeleton className="h-10 w-40 rounded" />
              )}
            </AccordionContent>
          </AccordionItem>

          {/* History Section */}
          <AccordionItem value="history" className="border-none">
            <AccordionTrigger className={`flex items-center text-left no-underline hover:no-underline ${isCollapsed ? 'justify-center' : ''}`}>
              <History className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>History</span>}
            </AccordionTrigger>
            <AccordionContent>
              {!isCollapsed ? <p>Your History content goes here.</p> : <Skeleton className="h-10 w-40 rounded" />}
            </AccordionContent>
          </AccordionItem>

          {/* My Documents Section */}
          <AccordionItem value="documents" className="border-none">
            <AccordionTrigger className={`flex items-center text-left no-underline hover:no-underline ${isCollapsed ? 'justify-center' : ''}`}>
              <FileText className="w-5 h-5 mr-2" />
              {!isCollapsed && <span>My Documents</span>}
            </AccordionTrigger>
            <AccordionContent>
              {!isCollapsed ? <p>Your Documents content goes here.</p> : <Skeleton className="h-10 w-40 rounded" />}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Profile Section */}
      <div className={`pb-4 flex flex-col justify-between ${isCollapsed ? 'items-center' : 'items-start'} ${isExpanding ? 'opacity-50' : ''}`}>
        <div className={`flex ${isCollapsed ? 'items-center' : 'items-start'} ${isExpanding ? 'opacity-50' : ''}`}>
          {isExpanding ? (
            <div className="flex items-center space-x-4">
              <Skeleton className={`h-${isCollapsed ? '10' : '20'} w-${isCollapsed ? '10' : '20'} rounded-full`} />
              <div className={`flex flex-col ${isCollapsed ? 'hidden' : 'block'}`}>
                <Skeleton className="w-[100px] h-[20px] rounded-full mb-2" />
                <Skeleton className="w-[50px] h-[20px] rounded-full mb-2" />
                <Skeleton className="w-[50px] h-[20px] rounded-full" />
              </div>
            </div>
          ) : (
            <>
              <Avatar className={`${isCollapsed ? 'h-10 w-10' : 'h-20 w-20'}`}>
                <AvatarImage src="https://images/shadcn" alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="ml-2">
                  <p className="text-lg font-bold">
                    {loading ? <Skeleton className="w-[100px] h-[20px] rounded-full" /> : userProfile.name}
                  </p>
                  <p className="text-sm">
                    ID: {loading ? <Skeleton className="w-[50px] h-[20px] rounded-full" /> : userProfile.empID}
                  </p>
                  <p className="text-sm">
                    Role:{' '}
                    {loading ? (
                      <Skeleton className="w-[50px] h-[20px] rounded-full" />
                    ) : (
                      <span className="bg-black text-white px-2 py-1 rounded">
                        {userProfile.role}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <Button
          variant="ghost"
          className="mt-4 w-full flex items-center bg-red-600 hover:bg-red-800 justify-center text-white"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          {isCollapsed ? null : 'Logout'}
        </Button>
      </div>
    </aside>
  );
};

const Sidebar = dynamic(() => Promise.resolve(SidebarContent), { ssr: false });

export default Sidebar;
