import React from 'react';
import Tooltip from './theme/Tooltip';
import ThemeToggle from './theme/Theme-Toggle';
import { useTheme } from '../context/Theme-Provider';
import Notification from './Notification';
import UserProfile from './UserProfile';

function Header() {
  const { theme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[rgba(92,92,153,0.8)] backdrop-blur-md supports-[backdrop-filter]:bg-background/60 py-2 h-18">
      <div className="flex justify-between items-center px-4 mt-2">
        {/* <div className="text-[#CCCCFF]">Header</div> */}
        {/* Left Content (You can add a Logo or Title here if needed) */}
        <div className="text-[#CCCCFF] font-bold text-lg">My App</div>

        {/* Right-aligned content */}
        <div className="flex items-center gap-4 ml-auto">
          <Tooltip
            content={'Toggle Theme'}
            animation="scale"
            duration={250}
            theme={theme}
            arrow={false}
            placement={'right'}
            className="bg-gray-500 text-white px-2 py-1 rounded-md shadow-lg z-50"
          >
            <ThemeToggle />
          </Tooltip>

          <Notification />

          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default Header;
