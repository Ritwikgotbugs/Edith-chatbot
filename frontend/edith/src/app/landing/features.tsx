import React from 'react';
import { FaUserShield, FaFingerprint, FaFileAlt, FaCogs, FaUsers } from 'react-icons/fa';

const ComponentsSection = () => {
  return (
    <section className="bg-[#19191b] min-h-screen" id="components-section">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-white capitalize lg:text-4xl dark:text-white">
          Explore our <br /> awesome <span className="underline decoration-blue-500">Components</span>
        </h1>

        <p className="mt-4 text-white xl:mt-6 dark:text-gray-300">
          Discover the powerful tools and features we offer to make your experience seamless and productive.
        </p>

        
        <div className="relative mt-8 xl:mt-14">
          
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar py-4 px-4">
            
            <div className="flex-shrink-0 min-w-[300px] max-w-[300px] min-h-[400px] max-h-[400px] p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl transform transition-transform duration-300 ease-out hover:scale-105 hover:z-20 hover:bg-[#364150]">
              <span className="inline-block text-blue-500 dark:text-blue-400">
                <FaUserShield className="w-8 h-8" />
              </span>

              <h2 className="text-2xl font-semibold text-white capitalize dark:text-white">HR and IT Support</h2>

              <p className="text-white dark:text-gray-300">
                Seamlessly get support for HR and IT-related issues with integrated helpdesk solutions that keep your productivity on track.
              </p>
            </div>

            {/* Feature 2: Two-Factor Authentication (2FA) */}
            <div className="flex-shrink-0 min-w-[300px] max-w-[300px] min-h-[400px] max-h-[400px] p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl transform transition-transform duration-300 ease-out hover:scale-105 hover:z-20 hover:bg-[#364150]">
              <span className="inline-block text-blue-500 dark:text-blue-400">
                <FaFingerprint className="w-8 h-8" />
              </span>

              <h2 className="text-2xl font-semibold text-white capitalize dark:text-white">Two-Factor Authentication</h2>

              <p className="text-white dark:text-gray-300">
                Enhance security with 2FA to safeguard sensitive data and provide an additional layer of protection for user accounts.
              </p>
            </div>

            {/* Feature 3: Get and Summarize Documents */}
            <div className="flex-shrink-0 min-w-[300px] max-w-[300px] min-h-[400px] max-h-[400px] p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl transform transition-transform duration-300 ease-out hover:scale-105 hover:z-20 hover:bg-[#364150]">
              <span className="inline-block text-blue-500 dark:text-blue-400">
                <FaFileAlt className="w-8 h-8" />
              </span>

              <h2 className="text-2xl font-semibold text-white capitalize dark:text-white">Get & Summarize Documents</h2>

              <p className="text-white dark:text-gray-300">
                Retrieve and summarize documents quickly with our smart AI-powered assistant that provides concise information on demand.
              </p>
            </div>

            {/* Feature 4: Admin Panel */}
            <div className="flex-shrink-0 min-w-[300px] max-w-[300px] min-h-[400px] max-h-[400px] p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl transform transition-transform duration-300 ease-out hover:scale-105 hover:z-20 hover:bg-[#364150]">
              <span className="inline-block text-blue-500 dark:text-blue-400">
                <FaCogs className="w-8 h-8" />
              </span>

              <h2 className="text-2xl font-semibold text-white capitalize dark:text-white">Admin Panel</h2>

              <p className="text-white dark:text-gray-300">
                A comprehensive admin panel that allows you to manage users, settings, and other critical operations with ease.
              </p>
            </div>

            {/* Feature 5: Role Management */}
            <div className="flex-shrink-0 min-w-[300px] max-w-[300px] min-h-[400px] max-h-[400px] p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl transform transition-transform duration-300 ease-out hover:scale-105 hover:z-20 hover:bg-[#364150]">
              <span className="inline-block text-blue-500 dark:text-blue-400">
                <FaUsers className="w-8 h-8" />
              </span>

              <h2 className="text-2xl font-semibold text-white capitalize dark:text-white">Role Management</h2>

              <p className="text-white dark:text-gray-300">
                Control and assign user roles seamlessly with our intuitive role management system to ensure proper access and permissions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS to Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default ComponentsSection;