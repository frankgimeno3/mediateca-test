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
      <div className="max-w-7xl mx-auto flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default TopNav;