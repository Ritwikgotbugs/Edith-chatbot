'use client';
import React, { useState } from "react";
import { toast } from 'sonner';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  onVerificationSent: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onVerificationSent }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        if (!auth.currentUser.emailVerified) {
          toast.info('Please verify your email to access the application.');
        } else {
          router.replace('/homepage');
          toast.success('Successfully signed in');
        }
      }
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    if (
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/invalid-credential'
    ) {
      toast.error("Invalid email or password. Please try again.");
    } else if (error.code === 'auth/user-not-found') {
      toast.error("User does not exist. Please sign up.");
    } else if (error.code === 400) {
      toast.error("Failed to Sign in. Make sure to verify your email.");
    } else {
      toast.error("Failed to sign in. Please try again later.");
    }
  };

  return (
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
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
