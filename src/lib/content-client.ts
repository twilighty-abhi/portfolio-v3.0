// Client-side content interface (no filesystem access)
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

// Helper functions that work with pre-loaded data
export function getAllContent(data: ContentItem[]): ContentItem[] {
  return data.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getContentByType(data: ContentItem[], type: keyof ContentType): ContentItem[] {
  return data.filter(item => item.type === type);
}

export function getContentBySlug(data: ContentItem[], type: keyof ContentType, slug: string): ContentItem | null {
  const items = getContentByType(data, type);
  return items.find(item => item.slug === slug) || null;
}

export function getPublishedContent(data: ContentItem[], type: keyof ContentType): ContentItem[] {
  return getContentByType(data, type).filter(item => item.published);
}

export function getFeaturedContent(data: ContentItem[], limit?: number): ContentItem[] {
  const allContent = data.filter(item => item.published);
  return limit ? allContent.slice(0, limit) : allContent;
}

export function getContentByTag(data: ContentItem[], tag: string): ContentItem[] {
  return data.filter(item => 
    item.published && item.tags?.includes(tag)
  );
}

export function getAllTags(data: ContentItem[]): string[] {
  const tags = new Set<string>();
  data.forEach(item => {
    item.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getRecentContent(data: ContentItem[], limit: number = 5): ContentItem[] {
  return data
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
