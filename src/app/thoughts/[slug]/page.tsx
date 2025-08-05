import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getContentBySlug, getContentByType } from '@/lib/content-server';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface ThoughtPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const thoughts = getContentByType('thoughts');
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export async function generateMetadata({ params }: ThoughtPageProps): Promise<Metadata> {
  const { slug } = await params;
  const thought = getContentBySlug('thoughts', slug);
  
  if (!thought) {
    return {
      title: 'Thought Not Found',
    };
  }

  return {
    title: `${thought.title} - Thoughts - Abhiram N J`,
    description: thought.description || '',
    openGraph: {
      title: thought.title,
      description: thought.description || '',
      type: 'article',
      publishedTime: thought.date,
      tags: thought.tags,
    },
  };
}

export default async function ThoughtPage({ params }: ThoughtPageProps) {
  const { slug } = await params;
  const thought = getContentBySlug('thoughts', slug);

  if (!thought) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/thoughts"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Thoughts
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              {thought.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
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
              <div className="mt-6 flex flex-wrap gap-2">
                {thought.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={thought.content} />
          </div>
        </article>

        <footer className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Have thoughts on this? Let's discuss on{' '}
              <a
                href="https://x.com/TwilightyAbhi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Twitter
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
