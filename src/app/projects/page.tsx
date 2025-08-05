import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { getContentByType } from '@/lib/content-server';

export const metadata: Metadata = {
  title: 'Projects - Abhiram N J',
  description: 'A showcase of projects and applications built by Abhiram N J',
};

export default function ProjectsPage() {
  const allProjects = getContentByType('projects');
  const projects = allProjects.filter(project => project.published === true);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            A collection of applications and tools I've built
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 dark:text-neutral-400">
              No projects to showcase yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="group rounded-lg border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
              >
                <div className="flex h-full flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    {project.description && (
                      <p className="mt-3 text-neutral-600 dark:text-neutral-400 line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
                          className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      )}
                    </div>
                    {project.date && (
                      <time className="text-xs text-neutral-500 dark:text-neutral-500">
                        {new Date(project.date).getFullYear()}
                      </time>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
