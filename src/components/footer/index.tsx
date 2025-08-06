"use client";

import React, { useEffect } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    // Load the carbon badge script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/website-carbon-badges@1.1.3/b.min.js';
    script.defer = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up the script when the component unmounts
      const scriptElement = document.querySelector('script[src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);
  
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
        <div className="mt-3 flex justify-center">
          <div id="wcb" className="carbonbadge wcb-d"></div>
        </div>
      </div>
    </footer>
  );
}
