import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { getAllContent } from '@/lib/content-server';
import { getRecentContent } from '@/lib/content';
import { ContactCard } from '@/components/contact-card';

export default function HomePage() {
  const allContent = getAllContent().filter(item => item.type !== 'now');
  const recentContent = getRecentContent(allContent, 3);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-6xl">
            Hey, I&apos;m{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Abhiram N J
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Full-stack developer passionate about building beautiful, functional web applications.
            I love exploring new technologies and sharing what I learn.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Link
            href="https://github.com/twilighty-abhi"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href="https://x.com/TwilightyAbhi"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Link>
          <Link
            href="https://linkedin.com/in/abhiram-n-j"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Link>
          <Link
            href="mailto:hi@abhiramnj.com"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            <Mail className="h-4 w-4" />
            Email
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View My Work
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/thoughts"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            Read My Thoughts
          </Link>
        </div>
      </section>

      {/* Recent Content */}
      {recentContent.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Recent Work
            </h2>
            <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
              Latest thoughts, projects, and blog posts
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentContent.map((item) => (
              <Link
                key={`${item.type}-${item.slug}`}
                href={`/${item.type}/${item.slug}`}
                className="group rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {item.type}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                  <time dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {item.readingTime && (
                    <span>{item.readingTime}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all content
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
