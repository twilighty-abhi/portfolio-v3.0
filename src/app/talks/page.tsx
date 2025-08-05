import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, MapPin, Calendar, Users } from 'lucide-react';
import { getContentByType } from '@/lib/content-server';

export const metadata: Metadata = {
  title: 'Talks - Abhiram N J',
  description: 'Public talks, workshops, and presentations by Abhiram N J',
};

export default function TalksPage() {
  const talks = getContentByType('talks');

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Talks & Presentations
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Sharing knowledge through speaking engagements and workshops
          </p>
        </header>

        {talks.length === 0 ? (
          <div className="text-center py-12">
            <div className="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Speaking Opportunities
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                I'm always interested in sharing knowledge and experiences with the developer community. 
                I'd love to speak at your event about web development, modern JavaScript frameworks, 
                or developer productivity.
              </p>
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      Conference Talks
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Technical presentations on modern web development
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      Workshops
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Hands-on sessions for teams and individuals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      Podcast Appearances
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Discussions about technology and career growth
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="mailto:hello@abhiramnj.com"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Invite Me to Speak
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {talks.map((talk) => (
              <article
                key={talk.slug}
                className="group rounded-lg border border-neutral-200 bg-white transition-colors hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8 p-8">
                  <Link href={`/talks/${talk.slug}`} className="flex-1 block">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 lg:text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {talk.title}
                    </h2>
                    {talk.description && (
                      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                        {talk.description}
                      </p>
                    )}
                    
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                      {talk.event && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{talk.event}</span>
                        </div>
                      )}
                      {talk.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{talk.location}</span>
                        </div>
                      )}
                      {talk.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
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
                      <div className="mt-4 flex flex-wrap gap-2">
                        {talk.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>

                  <div className="mt-6 flex flex-col gap-3 lg:mt-0 lg:flex-shrink-0">
                    {talk.slidesUrl && (
                      <a
                        href={talk.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
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
                        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Watch Video
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <footer className="mt-16 text-center">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Let's Connect
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Interested in having me speak at your event or podcast? 
              I'd love to share insights about web development, technology trends, and career growth.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:hello@abhiramnj.com"
                className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Send Speaking Inquiry
              </a>
              <a
                href="https://x.com/TwilightyAbhi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                Connect on Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
