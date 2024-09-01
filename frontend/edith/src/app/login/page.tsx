'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInWithEmailAndPassword, signInWithPopup, sendEmailVerification, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";

function AuthPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationRequired, setVerificationRequired] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login'); // State to manage the current auth mode
  const [disableTabs, setDisableTabs] = useState<boolean>(false); // Disable tab switching after sending verification email
  const router = useRouter();

  useEffect(() => {
    // Check email verification status when component mounts
    const checkEmailVerification = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await user.reload(); // Reload the user to get updated information
          if (user.emailVerified) {
            router.replace('/home');
            toast.success('Successfully signed in');
          } else {
            // Continue to prompt for verification if not verified
            setVerificationRequired(true);
          }
        }
      });
    };

    checkEmailVerification();
  }, [router]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        if (!auth.currentUser.emailVerified) {
          await sendEmailVerification(auth.currentUser);
          setVerificationRequired(true);
          setDisableTabs(true);
          toast.success('Verification email has been sent to your inbox.');
        } else {
          router.replace('/home');
          toast.success('Successfully signed in');
        }
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      handleAuthError(error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setVerificationRequired(true);
        setDisableTabs(true);
        toast.success('Verification email sent to your inbox.');
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error("Failed to sign up. Please try again later.");
    }
  };

  const handleAuthError = (error: any) => {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credentials') {
      toast.error("Invalid email or password. Please try again.");
    } else if (error.code === 'auth/user-not-found') {
      toast.error("User does not exist. Please sign up.");
    } else {
      toast.error("Failed to sign in. Please try again later.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 mb-20">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image className="w-20 h-20 mr-2" src="/images/gail-logo.png" alt="GAIL Logo" width={32} height={32} />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-800 border border-neutral-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Tabs 
              defaultValue="login" 
              className="w-full" 
              onValueChange={(value) => !disableTabs && setAuthMode(value as 'login' | 'signup')}
            >
              <TabsList className="mb-4 bg-gray-300 rounded-lg w-full">
                <TabsTrigger value="login" className="w-1/2 text-center" disabled={disableTabs}>Login</TabsTrigger>
                <TabsTrigger value="signup" className="w-1/2 text-center" disabled={disableTabs}>Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                {!verificationRequired ? (
                  <>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                    </h1>
                    <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          placeholder="name@company.com"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-neutral-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Sign In
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Please verify your email
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We've sent a verification email to your inbox. Please verify your email to continue.
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="signup">
                {!verificationRequired ? (
                  <>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign up for an account
                    </h1>
                    <form onSubmit={handleSignUp} className="space-y-4 md:space-y-6">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          placeholder="name@company.com"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-neutral-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Sign Up
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Please verify your email
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We've sent a verification email to your inbox. Please verify your email to continue.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
