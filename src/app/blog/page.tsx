import { Metadata } from 'next';
import Link from 'next/link';
import { getContentByType } from '@/lib/content-server';
import { ContactCard } from '@/components/contact-card';

export const metadata: Metadata = {
  title: 'Blog - Abhiram N J',
  description: 'Technical articles, tutorials, and insights about web development and technology',
};

export default function BlogPage() {
  const allPosts = getContentByType('blog');
  const posts = allPosts.filter(post => post.published === true);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Technical articles, tutorials, and insights about web development
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              No blog posts published yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-lg border border-neutral-200 bg-white p-8 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
              >
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                    <time>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                    {post.category && (
                      <>
                        <span>•</span>
                        <span className="capitalize">{post.category}</span>
                      </>
                    )}
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
