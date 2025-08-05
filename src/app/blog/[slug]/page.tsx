import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getContentBySlug, getContentByType } from '@/lib/content-server';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getContentByType('blog');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug('blog', slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Blog - Abhiram N J`,
    description: post.description || '',
    openGraph: {
      title: post.title,
      description: post.description || '',
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || '',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getContentBySlug('blog', slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
                {post.description}
              </p>
            )}
            <div className="mt-6 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
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
              <div className="mt-6 flex flex-wrap gap-2">
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
          </header>

          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </article>

        <footer className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Found this helpful? Share it with others who might benefit.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Share on Twitter
              </a>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                Send Feedback
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
