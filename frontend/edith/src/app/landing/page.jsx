"use client"; // Correct directive

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { Inter } from "next/font/google";
import Link from "next/link";
import ComponentsSection from "./features";
import InvestorsSection from "./investors";

const inter = Inter({ subsets: ["latin"] });

function LandingPage() {
  const router = useRouter(); // Initialize useRouter

  const handleGetStarted = () => {
    router.push("/login"); // Navigate to the login page when button is clicked
  };

  return (
    <div className={inter.className}>
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <div className="flex items-center flex-shrink-0">
              <Link href="/" title="Docreader Logo">
                <span className="sr-only">Docreader Logo</span>
                <img
                  className="w-auto h-16"
                  src="./images/gail-logo.png"
                  alt="Docreader Logo"
                />
              </Link>
            </div>

            <div className="hidden lg:flex lg:justify-center lg:space-x-10 xl:space-x-14">
              <Link
                href="#"
                className="text-base font-medium text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:text-white"
              >
                About us
              </Link>

              <Link
                href="#components-section"
                className="text-base font-medium text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:text-white"
              >
                Features
              </Link>

              <Link
                href="#investors-section"
                className="text-base font-medium text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:text-white"
              >
                Investors
              </Link>
            </div>

            <div className="flex items-center justify-end space-x-5">
              <button
                type="button"
                className="p-2 -m-2 text-white transition-all duration-200 lg:hidden hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
          <div className="absolute inset-0 hidden lg:block">
            <img
              className="object-cover object-right-bottom w-full h-full"
              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/background.png"
              alt="Background Image"
            />
          </div>

          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
              <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">
                Meet Edith: Your AI Assistant for GAIL
              </h1>
              <p className="mt-8 text-base font-normal leading-7 text-gray-400 lg:max-w-md xl:pr-0 lg:pr-16">
              Enhance your experience with GAIL using our smart AI assistant. Get quick support, real-time updates, and expert solutions for gas management and more. Simplify your interactions and stay informed with ease.
              </p>

              <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
                <button
                  onClick={handleGetStarted} // Attach the click handler
                  title="Get Started"
                  className="inline-flex items-center justify-center px-3 py-3 text-base font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Add the FeaturesSection here */}
        <ComponentsSection />

        {/* Add the InvestorsSection below the FeaturesSection */}
        <InvestorsSection />
      </main>
    </div>
  );
}
export default LandingPage;