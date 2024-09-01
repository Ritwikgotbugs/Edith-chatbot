"use client"; // Correct directive

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook for navigation
import Image from 'next/image'; // Import Image component for optimized image loading

function LoginPage() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('login'); // Track current form step
  const [currentStep, setCurrentStep] = useState('login'); // Track current step for sign-up
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentStep === 'login') {
      // Simulate a login check (replace with actual authentication logic)
      if (email === 'employee@gmail.com' && password === 'password') {
        // Redirect to home page on successful login
        router.push('/home'); // Replace '/home' with your actual home page route
      } else {
        setError('Invalid email or password');
      }
    } else if (currentStep === 'email') {
      // Simulate sending a verification code (replace with actual logic)
      if (email) {
        setCurrentStep('verification'); // Move to verification code step
      } else {
        setError('Please enter your email');
      }
    } else if (currentStep === 'verification') {
      // Simulate verifying the code (replace with actual logic)
      if (verificationCode === '123456') { // Example verification code
        setCurrentStep('password'); // Move to password step
      } else {
        setError('Invalid verification code');
      }
    } else if (currentStep === 'password') {
      // Simulate password setting (replace with actual logic)
      if (password) {
        // Redirect to home page on successful sign-up
        router.push('/home'); // Replace '/home' with your actual home page route
      } else {
        setError('Please enter your password');
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-neutral-900 ">
      {/* Logo Section */}
      <div className="flex justify-center items-center mt-8 mb-8">
        <Image
          src="/images/gail-logo.png" // Path relative to the public directory
          alt="GAIL Logo"
          width={250} // Adjust width as needed
          height={150} // Adjust height as needed
          className="mb-8"
        />
      </div>

      {/* Toggle between Login and Sign-Up */}
      <div className="bg-neutral-600 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          {currentStep === 'login' ? 'Login' : currentStep === 'email' ? 'Sign Up' : currentStep === 'verification' ? 'Sign Up' : 'Sign Up'}
        </h2>
        
        {/* Toggle Buttons */}
        <div className="mb-4 text-center">
          <button
            className={`mr-4 ${currentStep === 'login' ? 'text-white' : 'text-gray-400'} hover:text-white`}
            onClick={() => setCurrentStep('login')}
          >
            Login
          </button>
          <button
            className={`${currentStep === 'email' ? 'text-white' : 'text-gray-400'} hover:text-white`}
            onClick={() => setCurrentStep('email')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 'login' && (
            <>
              <div className="mb-4">
                <label className="block text-white text-lg mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-black rounded-md border-none focus:ring-2 focus:ring-blue-text-white"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-white text-lg mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 text-black rounded-md border-none focus:ring-2 focus:ring-blue-text-white"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 'email' && (
            <div className="mb-4">
              <label className="block text-white text-lg mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 text-black rounded-md border-none focus:ring-2 focus:ring-blue-text-white"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {currentStep === 'verification' && (
            <div className="mb-4">
              <label className="block text-white text-lg mb-2" htmlFor="verificationCode">
                Verification Code
              </label>
              <input
                className="w-full px-3 py-2 text-black rounded-md border-none focus:ring-2 focus:ring-blue-text-white"
                type="text"
                id="verificationCode"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
          )}

          {currentStep === 'password' && (
            <div className="mb-6">
              <label className="block text-white text-lg mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 text-black rounded-md border-none focus:ring-2 focus:ring-blue-text-white"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-950"
            type="submit"
          >
            {currentStep === 'password' ? 'Set Password' : 'Submit'}
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
