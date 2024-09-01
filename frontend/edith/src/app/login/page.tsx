'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AuthPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const code = prompt("Enter the verification code sent to your email/phone");
      if (code === verificationCode) { // Replace this with actual verification logic
        toast.success('Successfully signed in');
        router.replace('/home');
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error("Failed to sign in. Please try again later.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const code = prompt("Enter the verification code sent to your email/phone");
      if (code === verificationCode) { // Replace this with actual verification logic
        toast.success('Successfully signed in with Google');
        router.replace('/home');
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Trigger Firebase sign-up logic here
      toast.success('Successfully signed up');
      router.replace('/home');
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error("Failed to sign up. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900">
      {/* Logo Section */}
      <div className="mb-8">
        <Image
          src="/images/gail-logo.png"
          alt="GAIL Logo"
          width={250} 
          height={150} 
        />
      </div>

      <div className="bg-[#303030] p-8 rounded-lg w-[90%] max-w-md text-white mb-10">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="mb-4 bg-neutral-900 rounded-lg w-full">
            <TabsTrigger value="login" className="w-1/2 text-center ">Login</TabsTrigger>
            <TabsTrigger value="signup" className="w-1/2 text-center">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-bold mb-2">Login</h2>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Sign In
              </button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp}>
              <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Sign Up
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
