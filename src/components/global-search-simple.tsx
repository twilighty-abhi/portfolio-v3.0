'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-500 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:border-neutral-700"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[10vh]">
      <div className="w-full max-w-lg rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-center border-b border-neutral-200 px-4 dark:border-neutral-800">
          <Search className="h-5 w-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search thoughts, blog posts, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent px-4 py-4 text-neutral-900 placeholder-neutral-500 outline-none dark:text-neutral-100 dark:placeholder-neutral-400"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="rounded p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-4">
          {!query ? (
            <div className="text-center text-neutral-500 dark:text-neutral-400">
              <p className="text-sm">Start typing to search content...</p>
              <div className="mt-4 text-xs">
                <p>Search across:</p>
                <ul className="mt-1 list-inside list-disc">
                  <li>Blog posts</li>
                  <li>Thoughts</li>
                  <li>Projects</li>
                  <li>Talks</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center text-neutral-500 dark:text-neutral-400">
              <p className="text-sm">
                Search functionality will be implemented with your content.
              </p>
              <p className="mt-2 text-xs">
                Query: "{query}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
