// Simplified content management without filesystem dependencies
export interface ContentItem {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  published: boolean;
  content: string;
  readingTime?: string;
  category?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  event?: string;
  location?: string;
  slidesUrl?: string;
  videoUrl?: string;
}

export interface ContentType {
  thoughts: ContentItem[];
  blog: ContentItem[];
  projects: ContentItem[];
  talks: ContentItem[];
  now: ContentItem[];
}

// Mock data for build purposes
const mockData: ContentType = {
  thoughts: [
    {
      slug: 'first-thought',
      title: 'On the Nature of Code',
      description: 'Reflecting on what makes code beautiful and maintainable.',
      date: '2024-01-10',
      tags: ['philosophy', 'coding'],
      published: true,
      content: 'Code is poetry. It should flow naturally, tell a story, and be understandable by humans, not just machines. When we write code, we are crafting instructions that will be read and modified by future developers, including our future selves.',
      readingTime: '2 min read'
    }
  ],
  blog: [
    {
      slug: 'building-scalable-web-applications',
      title: 'Building Scalable Web Applications with Next.js',
      description: 'A comprehensive guide to building scalable web applications using Next.js and modern development practices.',
      date: '2024-01-15',
      tags: ['Next.js', 'React', 'Performance'],
      published: true,
      content: 'Next.js has revolutionized how we build React applications. In this post, we explore the key features that make Next.js perfect for scalable applications.',
      readingTime: '5 min read',
      category: 'Web Development'
    }
  ],
  projects: [
    {
      slug: 'portfolio-website',
      title: 'Personal Portfolio Website',
      description: 'A modern portfolio website built with Next.js and Tailwind CSS.',
      date: '2024-01-01',
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
      published: true,
      content: 'This portfolio website showcases my work and thoughts on software development.',
      readingTime: '3 min read',
      techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/twilighty-abhi/portfolio'
    }
  ],
  talks: [],
  now: []
};

export function getContentByType(type: keyof ContentType): ContentItem[] {
  return mockData[type] || [];
}

export function getAllContent(): ContentItem[] {
  return Object.values(mockData).flat();
}

export function getContentBySlug(type: keyof ContentType, slug: string): ContentItem | null {
  const items = getContentByType(type);
  return items.find(item => item.slug === slug) || null;
}

export function getPublishedContent(type: keyof ContentType): ContentItem[] {
  return getContentByType(type).filter(item => item.published);
}

export function getFeaturedContent(limit?: number): ContentItem[] {
  const allContent = getAllContent().filter(item => item.published);
  return limit ? allContent.slice(0, limit) : allContent;
}

export function getContentByTag(tag: string): ContentItem[] {
  return getAllContent().filter(item => 
    item.published && item.tags?.includes(tag)
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllContent().forEach(item => {
    item.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getRecentContent(limit: number = 5): ContentItem[] {
  return getAllContent()
    .filter(item => item.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
