import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, MapPin, Calendar, Users } from 'lucide-react';
import { getContentBySlug, getContentByType } from '@/lib/content-server';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface TalkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const talks = getContentByType('talks');
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
}

export async function generateMetadata({ params }: TalkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const talk = getContentBySlug('talks', slug);
  
  if (!talk) {
    return {
      title: 'Talk Not Found',
    };
  }

  return {
    title: `${talk.title} - Talks - Abhiram N J`,
    description: talk.description || '',
    openGraph: {
      title: talk.title,
      description: talk.description || '',
      type: 'article',
      publishedTime: talk.date,
      tags: talk.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: talk.title,
      description: talk.description || '',
    },
  };
}

export default async function TalkPage({ params }: TalkPageProps) {
  const { slug } = await params;
  const talk = getContentBySlug('talks', slug);

  if (!talk) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/talks"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Talks
          </Link>
        </div>

        <article>
          <header className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
              {talk.title}
            </h1>
            {talk.description && (
              <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-400">
                {talk.description}
              </p>
            )}
            
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              {talk.event && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{talk.event}</span>
                </div>
              )}
              {talk.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span>{talk.location}</span>
                </div>
              )}
              {talk.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <time>
                    {new Date(talk.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
            </div>

            {talk.tags && talk.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {talk.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(talk.slidesUrl || talk.videoUrl) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {talk.slidesUrl && (
                  <a
                    href={talk.slidesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Slides
                  </a>
                )}
                {talk.videoUrl && (
                  <a
                    href={talk.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Watch Video
                  </a>
                )}
              </div>
            )}
          </header>

          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={talk.content} />
          </div>
        </article>

        <footer className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Interested in having me speak?
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                I'd love to share insights about web development, technology trends, and career growth at your event.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:hello@abhiramnj.com"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Send Speaking Inquiry
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Great insights from "${talk.title}" by @TwilightyAbhi`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                Share This Talk
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
