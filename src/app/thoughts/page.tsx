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
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
            thoughts
          </h1>
        </header>

        {thoughts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              No thoughts shared yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {thoughts.map((thought, index) => {
              // Rotate through different background colors
              const bgColors = [
                "bg-[#7FFFD4]", // Turquoise
                "bg-[#C3FF68]", // Lime green
                "bg-[#FFE566]", // Yellow
                "bg-[#FFB7C5]"  // Pink
              ];
              const bgColor = bgColors[index % bgColors.length];
              
              // Get first tag as topic if available
              const topic = thought.tags && thought.tags.length > 0 ? thought.tags[0] : "thoughts";
              
              return (
                <article
                  key={thought.slug}
                  className={`rounded-xl p-7 relative ${bgColor} hover:shadow-lg transition-all duration-300`}
                >
                  <Link href={`/thoughts/${thought.slug}`} className="block">
                    {/* Quote icon in top right */}
                    <div className="absolute top-4 right-4 text-black/70 text-2xl font-serif">
                      &#8220;&#8221;
                    </div>
                    
                    {/* Author and topic */}
                    <div className="mb-4">
                      <span className="text-black/80 text-sm font-medium">
                        Abhiram on <span className="underline underline-offset-4 font-semibold">{topic}</span>
                      </span>
                    </div>
                    
                    {/* Main thought content */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-extrabold text-black leading-tight">
                        {thought.title}
                      </h2>
                      {thought.description && (
                        <p className="mt-3 text-black/90 font-medium">
                          {thought.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Date in the bottom right */}
                    <div className="text-right text-black/80 text-sm font-medium mt-4">
                      <time>
                        {new Date(thought.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
