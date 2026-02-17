
import React from 'react';

const Lantern: React.FC<{ left?: string, right?: string, top?: string }> = ({ left, right, top }) => (
  <div 
    className="absolute pointer-events-none transition-all duration-1000 animate-bounce"
    style={{ left, right, top, animationDuration: '3s' }}
  >
    <div className="w-12 h-16 bg-red-600 rounded-full relative flex flex-col items-center shadow-lg border-2 border-yellow-500">
      <div className="w-4 h-2 bg-yellow-500 absolute -top-1"></div>
      <div className="flex flex-col gap-0.5 mt-2">
        <div className="w-10 h-0.5 bg-yellow-500 opacity-50"></div>
        <div className="w-10 h-0.5 bg-yellow-500 opacity-50"></div>
        <div className="w-10 h-0.5 bg-yellow-500 opacity-50"></div>
      </div>
      <div className="w-4 h-2 bg-yellow-500 absolute -bottom-1"></div>
      <div className="w-1 h-8 bg-red-600 absolute -bottom-8 flex justify-center">
         <div className="w-3 h-3 bg-yellow-600 rounded-full mt-6"></div>
      </div>
    </div>
  </div>
);

const Blossom: React.FC<{ left?: string, right?: string, top?: string, delay?: string }> = ({ left, right, top, delay }) => (
  <div 
    className="absolute pointer-events-none animate-pulse"
    style={{ left, right, top, animationDelay: delay }}
  >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5C22 5 24 10 24 10C24 10 29 8 29 10C29 12 25 15 25 15C25 15 29 19 28 21C27 23 22 20 22 20C22 20 20 25 18 25C16 25 15 20 15 20C15 20 10 23 9 21C8 19 12 15 12 15C12 15 8 12 8 10C8 8 13 10 13 10C13 10 15 5 18 5Z" fill="#FFD700"/>
      <circle cx="20" cy="15" r="3" fill="#B45309"/>
    </svg>
  </div>
);

export const Decorations: React.FC = () => (
  <>
    <Lantern left="5%" top="2%" />
    <Lantern left="15%" top="5%" />
    <Lantern right="5%" top="2%" />
    <Lantern right="15%" top="5%" />
    
    <Blossom left="2%" top="30%" delay="0s" />
    <Blossom left="8%" top="45%" delay="1s" />
    <Blossom right="2%" top="35%" delay="0.5s" />
    <Blossom right="10%" top="55%" delay="1.5s" />
  </>
);
