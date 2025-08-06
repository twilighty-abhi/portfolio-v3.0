import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
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
              Abhiram
            </span>
          </h1>
          <p className="text-xl mb-2">[ab-hi-raam] • അഭിരാം</p>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            Full-stack developer passionate about building beautiful, functional web applications.
            I love exploring new technologies and sharing what I learn.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View My Works
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            Contact Me
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
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.type === 'thoughts'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      : item.type === 'projects'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                  }`}>
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

      {/* Connect with me Section */}
      <section id="contact" className="mx-auto mt-20 max-w-4xl py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Connect With Me
          </h2>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            Feel free to reach out through any of these platforms
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 w-full">
            <a 
              href="https://github.com/twilighty-abhi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-sm hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Github className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            
            <a 
              href="https://x.com/TwilightyAbhi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-sm hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <svg className="h-5 w-5 text-neutral-800 dark:text-neutral-200" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium">Twitter</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/abhiram-n-j" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-sm hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Linkedin className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            
            <a 
              href="mailto:hi@abhiramnj.com" 
              className="inline-flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-sm hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Mail className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
              <span className="text-sm font-medium">Email</span>
            </a>
            
            <a 
              href="https://garden.abhiramnj.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-sm hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <svg className="h-5 w-5 text-neutral-800 dark:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-sm font-medium">Digital Garden</span>
            </a>
            
            <a 
              href="https://twilighty.substack.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-3 rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-sm hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <svg className="h-5 w-5 text-neutral-800 dark:text-neutral-200" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
              </svg>
              <span className="text-sm font-medium">Newsletter</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
