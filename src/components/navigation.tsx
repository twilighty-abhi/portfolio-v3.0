'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlobalSearch } from './global-search';
import { type ContentItem } from '@/lib/content';

interface NavigationProps {
  allContent: ContentItem[];
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Thoughts', href: '/thoughts' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Talks', href: '/talks' },
  { name: 'Now', href: '/now' },
  { name: 'Newsletter', href: 'https://twilighty.substack.com' },
  { name: 'Digital Garden', href: 'https://garden.abhiramnj.com' },
];

export function Navigation({ allContent }: NavigationProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xl font-bold text-neutral-900 dark:text-neutral-100"
          >
            <div>
              <span>Abhiram NJ</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
                  pathname === item.href
                    ? 'text-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <GlobalSearch allContent={allContent} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
        <div className="container mx-auto flex overflow-x-auto px-4 py-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex-shrink-0 px-3 py-2 text-sm font-medium transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
                pathname === item.href
                  ? 'text-neutral-900 dark:text-neutral-100'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
