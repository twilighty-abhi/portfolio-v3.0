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
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-14 text-center">
          <div className="inline-flex items-center justify-center p-1 mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 text-sm text-blue-800 dark:text-blue-300">
            Updated {latestNow?.date || new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            What I'm Doing <span className="text-blue-600 dark:text-blue-400">Now</span>
          </h1>
          <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A snapshot of my current projects, interests, and what's keeping me busy these days.
          </p>
        </header>

        {!latestNow ? (
          <div className="py-8">
            <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900/50 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800/50">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800/30 text-blue-600 dark:text-blue-300 mb-4">
                      <span className="text-xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      Portfolio V3.0
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Building a modern portfolio site with Next.js, TypeScript, and MDX. 
                      Features include global search, dark mode, and a markdown-based CMS.
                    </p>
                  </div>
                
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800/50">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800/30 text-purple-600 dark:text-purple-300 mb-4">
                      <span className="text-xl">✍️</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      Content Creation
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Writing technical blog posts and sharing insights about web development, 
                      best practices, and lessons learned from real projects.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800/50">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-800/30 text-amber-600 dark:text-amber-300 mb-4">
                      <span className="text-xl">📚</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      Learning & Development
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Deepening my knowledge of modern web technologies, exploring new frameworks, 
                      and contributing to open source projects.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800/50">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-300 mb-4">
                      <span className="text-xl">🌱</span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      Side Projects
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Experimenting with new technologies and building small tools that solve 
                      real problems. Always have a few ideas brewing!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center">
                  <span className="mr-2">📍</span>
                  Currently based in Kerala, India
                </p>
              </div>
            </div>
          </div>
        ) : (
          <article className="rounded-xl border border-neutral-200 bg-white p-8 md:p-10 dark:border-neutral-800 dark:bg-neutral-900/50 shadow-sm overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-32 w-32 bg-gradient-to-tr from-amber-500/10 to-pink-500/10 blur-2xl rounded-full"></div>
            
            <header className="relative mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {latestNow.title}
              </h2>
              {latestNow.date && (
                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <span className="mr-1.5">🕒</span>
                  Last updated: {latestNow.date}
                </div>
              )}
            </header>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-lead:text-neutral-700 dark:prose-lead:text-neutral-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline relative">
              <MDXRemote source={latestNow.content} />
            </div>
          </article>
        )}

        <footer className="mt-16 text-center">
          <div className="inline-flex flex-col items-center p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800/50 max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">✉️</span>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Stay Updated</h3>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              Want to know more about what I'm currently working on?
            </p>
            <a
              href="mailto:hi@abhiramnj.com"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm hover:shadow"
            >
              Send me a message
            </a>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-8">
            Inspired by the <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">/now page movement</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
