'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { type ContentItem } from '@/lib/content';

interface GlobalSearchProps {
  allContent: ContentItem[];
}

export function GlobalSearch({ allContent }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ContentItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add blur effect to main content when search is open
  useEffect(() => {
    // Apply a blur-background class to the body element instead of individual elements
    // This will be used with a pseudo-element to create the blur effect
    if (isOpen) {
      document.body.classList.add('search-overlay-active');
    } else {
      document.body.classList.remove('search-overlay-active');
    }

    return () => {
      // Cleanup on unmount
      document.body.classList.remove('search-overlay-active');
    };
  }, [isOpen]);

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

  useEffect(() => {
    if (query.trim()) {
      const filteredContent = allContent.filter(item => item.published && item.type !== 'now');
      const filteredResults = filteredContent.filter(item => {
        const searchText = `${item.title} ${item.description} ${item.content} ${item.tags?.join(' ')}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      });
      setResults(filteredResults.slice(0, 6));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  const getTypeColor = (type: string) => {
    const colors = {
      blog: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      thoughts: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      projects: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      talks: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[10vh]" onClick={handleClose}>
      <div 
        className="w-full max-w-2xl rounded-lg border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
        onClick={(e) => e.stopPropagation()}
      >
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
            onClick={handleClose}
            className="rounded p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {!query ? (
            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
              <p className="text-sm">Start typing to search content...</p>
              <div className="mt-4 text-xs">
                <p>Search across:</p>
                <ul className="mt-1 list-inside list-disc">
                  <li>Blog posts ({allContent.filter((i: ContentItem) => i.type === 'blog' && i.published).length})</li>
                  <li>Thoughts ({allContent.filter((i: ContentItem) => i.type === 'thoughts' && i.published).length})</li>
                  <li>Projects ({allContent.filter((i: ContentItem) => i.type === 'projects' && i.published).length})</li>
                  <li>Talks ({allContent.filter((i: ContentItem) => i.type === 'talks' && i.published).length})</li>
                </ul>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((item) => (
                <Link
                  key={`${item.type}-${item.slug}`}
                  href={`/${item.type}/${item.slug}`}
                  onClick={handleClose}
                  className="block rounded-lg p-3 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(item.type || '')}`}>
                          {item.type}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
