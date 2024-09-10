import TeamMember from '@/components/landing/profile';
import React from 'react';

const teamMembers = [
  {
    imageSrc: '/images/ritwik.png',
    name: 'Ritwik Sharma',
    role: 'Backend Developer',
  },
  {
    imageSrc: '/images/anish.png',
    name: 'Anish Agrawal',
    role: 'Backend Developer',
  },
  {
    imageSrc: '/images/himanshu.png',
    name: 'Himanshu Bhadani',
    role: 'ML Engineer',
  },
  {
    imageSrc: '/images/arnav.png',
    name: 'Arnav Agrawal',
    role: 'ML Engineer',
  },
  {
    imageSrc: '/images/samyak.png',
    name: 'Samyak Tripathi',
    role: 'Frontend Developer',
  },
  {
    imageSrc: '/images/manavi.png',
    name: 'Manavi Lahoti',
    role: 'Frontend Developer',
  },
];

const InvestorsSection = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20" id="investors-section">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
            Our Team
          </h2>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-3 gap-y-12 lg:gap-x-16 xl:gap-x-20">
          {teamMembers.map((member) => (
            <TeamMember
              key={member.name}
              imageSrc={member.imageSrc}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;
