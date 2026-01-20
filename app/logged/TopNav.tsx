'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';

interface TopNavProps {

}

const TopNav: FC<TopNavProps> = ({ }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-600 cursor-pointer" onClick={() => { router.push('/logged') }}>Mediateca</h1>
        <div className='flex flex-row gap-2'>
   
          <button
            onClick={handleLogout}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;