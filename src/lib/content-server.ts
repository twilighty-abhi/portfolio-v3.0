import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentItem, ContentType, calculateReadingTime } from './content';

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
      
      // Calculate reading time if not provided
      const readingTime = data.readingTime || calculateReadingTime(content);
      
      return {
        slug,
        type,
        content,
        readingTime,
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
