import React from 'react';

const InvestorsSection = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20" id="investors-section">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
            Our Investors & Board of Directors
          </h2>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-3 gap-y-12 lg:gap-x-16 xl:gap-x-20">
          {/* Team Member 1 */}
          <div>
            <img
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-1.png"
              alt="Jerome Bell"
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Jerome Bell
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Co-founder, Chairman, Executive Director
            </p>
          </div>

          {/* Team Member 2 */}
          <div>
            <img
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-2.png"
              alt="Kristin Watson"
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Kristin Watson
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Co-founder, CEO
            </p>
          </div>

          {/* Team Member 3 */}
          <div>
            <img
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-3.png"
              alt="Darlene Robertson"
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Darlene Robertson
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Chief Marketing Officer
            </p>
          </div>

          {/* Team Member 4 */}
          <div>
            <img
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-4.png"
              alt="Courtney Henry"
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Courtney Henry
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Chief Financial Officer
            </p>
          </div>

          {/* Team Member 5 */}
          <div>
            <img
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-5.png"
              alt="Cameron Williamson"
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Cameron Williamson
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Chief Technology Officer
            </p>
          </div>

          {/* Team Member 6 */}
          <div>
            <img
              className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
              src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-6.png"
              alt="Savannah Nguyen"
            />
            <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
              Savannah Nguyen
            </p>
            <p className="mt-2 text-base font-normal text-gray-600">
              Chief Operating Officer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;
