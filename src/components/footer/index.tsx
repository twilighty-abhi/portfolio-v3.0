import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 py-6 px-4 md:px-6 text-center">
      <div className="container mx-auto">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          © {currentYear} Abhiram NJ. All rights reserved.
        </p>
        <p className="text-sm mt-1 text-neutral-400 dark:text-neutral-500 flex items-center justify-center">
          Made with 
          <span className="text-red-500 mx-1" aria-hidden="true">❤</span> 
          by Abhiram
        </p>
      </div>
    </footer>
  );
}
