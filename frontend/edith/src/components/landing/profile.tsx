import React from 'react';

interface TeamMemberProps {
  imageSrc: string;
  name: string;
  role: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ imageSrc, name, role }) => {
  return (
    <div className="group">
      <img
        className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter group-hover:grayscale-0 group-hover:scale-105 transition duration-300 ease-in-out"
        src={imageSrc}
        alt={name}
      />
      <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8">
        {name}
      </p>
      <p className="mt-2 text-base font-normal text-gray-600">
        {role}
      </p>
    </div>
  );
};

export default TeamMember;
