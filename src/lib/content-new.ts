import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
  type?: keyof ContentType;
  lastUpdated?: string;
  categories?: string[];
}

export interface ContentType {
  thoughts: ContentItem[];
  blog: ContentItem[];
  projects: ContentItem[];
  talks: ContentItem[];
  now: ContentItem[];
}

const contentDirectory = path.join(process.cwd(), 'content');

function getContentFromDirectory(dir: string, type: keyof ContentType): ContentItem[] {
  const typeDirectory = path.join(contentDirectory, dir);
  
  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(typeDirectory);
  const allContent = fileNames
    .filter(name => name.endsWith('.md') || name.endsWith('.mdx'))
    .map(name => {
      const fullPath = path.join(typeDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const slug = name.replace(/\.mdx?$/, '');
      
      return {
        slug,
        type,
        content,
        ...data,
      } as ContentItem;
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  return allContent;
}

export function getContentByType(type: keyof ContentType): ContentItem[] {
  return getContentFromDirectory(type, type);
}

export function getAllContent(): ContentItem[] {
  const allTypes: (keyof ContentType)[] = ['thoughts', 'blog', 'projects', 'talks', 'now'];
  const allContent: ContentItem[] = [];
  
  allTypes.forEach(type => {
    const typeContent = getContentByType(type);
    allContent.push(...typeContent);
  });
  
  return allContent.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getContentBySlug(type: keyof ContentType, slug: string): ContentItem | null {
  const items = getContentByType(type);
  return items.find(item => item.slug === slug) || null;
}

// Alias for backward compatibility
export function getContentItem(type: keyof ContentType, slug: string): ContentItem | null {
  return getContentBySlug(type, slug);
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
