import Fuse from 'fuse.js';
import { ContentItem } from './content';

export interface SearchResult extends ContentItem {
  type: 'thoughts' | 'blog' | 'projects' | 'talks' | 'now';
}

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'description', weight: 0.2 },
    { name: 'content', weight: 0.1 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
    { name: 'techStack', weight: 0.1 },
  ],
  threshold: 0.4, // Adjust for search sensitivity
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

export function createSearchIndex(content: { [key: string]: ContentItem[] }) {
  const searchableContent: SearchResult[] = [];
  
  Object.entries(content).forEach(([type, items]) => {
    items.forEach(item => {
      searchableContent.push({
        ...item,
        type: type as SearchResult['type'],
      });
    });
  });
  
  return new Fuse(searchableContent, fuseOptions);
}

export function performSearch(
  fuse: Fuse<SearchResult>,
  query: string
): SearchResult[] {
  if (!query.trim()) {
    return [];
  }
  
  const results = fuse.search(query);
  return results.map(result => result.item);
}
