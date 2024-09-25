'use client';
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/global/login";
import SignUpForm from "@/components/global/signup";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 

function AuthPage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleVerificationSent = () => {
    toast.success('A verification email has been sent to your inbox. Please check your email.');
    router.push('/login');
  };

  return (
    <section className="bg-zinc-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-36 h-36 mt-10" src="/images/gail-logo.png" alt="GAIL Logo" width={32} height={32} />
        </a>
        <div className="w-full bg-orange-600 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border border-neutral-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Tabs 
              defaultValue="login" 
              className="w-full" 
              onValueChange={(value) => setAuthMode(value as 'login' | 'signup')}
            >
              <TabsList className="mb-4 bg-zinc-900 rounded-lg w-full">
                <TabsTrigger value="login" className="w-1/2 text-center text-white">Login</TabsTrigger>
                <TabsTrigger value="signup" className="w-1/2 text-center text-white">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onVerificationSent={handleVerificationSent} />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm onVerificationSent={handleVerificationSent} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
