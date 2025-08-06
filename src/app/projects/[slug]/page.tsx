import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getContentBySlug, getContentByType } from '@/lib/content-server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ContactCard } from '@/components/contact-card';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getContentByType('projects');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug('projects', slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Projects - Abhiram N J`,
    description: project.description || '',
    openGraph: {
      title: project.title,
      description: project.description || '',
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getContentBySlug('projects', slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
            )}
            
            <div className="mt-6 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              )}
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.date && (
              <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
                <time>
                  Completed in {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </time>
              </div>
            )}
          </header>

          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={project.content} />
          </div>
        </article>

        <footer className="mt-16 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="text-center">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Interested in working together or have questions about this project?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:hi@abhiramnj.com"
                className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Get in Touch
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                View More Projects
              </Link>
            </div>
          </div>
          
          {/* Contact Card */}
          <div className="mt-12">
            <ContactCard bgColor="bg-blue-50 dark:bg-[#C3FF68]" textColor="text-neutral-900 dark:text-black" />
          </div>
        </footer>
      </div>
    </div>
  );
}
