import { Metadata } from 'next';
import { getContentByType } from '@/lib/content-server';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const metadata: Metadata = {
  title: 'Now - Abhiram N J',
  description: 'What I\'m currently working on and focused on right now',
};

export default function NowPage() {
  const nowContent = getContentByType('now');
  const latestNow = nowContent[0]; // Get the most recent "now" entry

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            What I'm Doing Now
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Current projects, interests, and focus areas
          </p>
        </header>

        {!latestNow ? (
          <div className="text-center py-12">
            <div className="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Currently Working On
              </h2>
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    🚀 Portfolio V3.0
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Building a modern portfolio site with Next.js, TypeScript, and MDX. 
                    Features include global search, dark mode, and a markdown-based CMS.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    📚 Learning & Development
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Deepening my knowledge of modern web technologies, exploring new frameworks, 
                    and contributing to open source projects.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    ✍️ Content Creation
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Writing technical blog posts and sharing insights about web development, 
                    best practices, and lessons learned from real projects.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                    🌱 Side Projects
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Experimenting with new technologies and building small tools that solve 
                    real problems. Always have a few ideas brewing!
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                  Last updated: {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <article className="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
            <header className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {latestNow.title}
              </h2>
              {latestNow.date && (
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
                  {/* Use a fixed date format to avoid hydration mismatch */}
                  Last updated: {latestNow.date}
                </p>
              )}
            </header>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={latestNow.content} />
            </div>
          </article>
        )}

        <footer className="mt-12 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Want to know more about what I'm up to?{' '}
            <a
              href="mailto:hello@abhiramnj.com"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Send me a message
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
