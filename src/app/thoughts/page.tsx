import { Metadata } from 'next';
import Link from 'next/link';
import { getContentByType } from '@/lib/content-server';

export const metadata: Metadata = {
  title: 'Thoughts - Abhiram N J',
  description: 'Short-form thoughts, notes, and micro-blogs by Abhiram N J',
};

export default function ThoughtsPage() {
  const allThoughts = getContentByType('thoughts');
  const thoughts = allThoughts.filter(thought => thought.published === true);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Thoughts
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Short-form thoughts, notes, and ideas that cross my mind
          </p>
        </header>

        {thoughts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              No thoughts shared yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {thoughts.map((thought) => (
              <article
                key={thought.slug}
                className="rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
              >
                <Link href={`/thoughts/${thought.slug}`} className="group">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {thought.title}
                  </h2>
                  {thought.description && (
                    <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                      {thought.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
                      <time>
                        {new Date(thought.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {thought.readingTime && (
                        <>
                          <span>•</span>
                          <span>{thought.readingTime}</span>
                        </>
                      )}
                    </div>
                    {thought.tags && thought.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {thought.tags.slice(0, 3).map((tag) => (
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
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
