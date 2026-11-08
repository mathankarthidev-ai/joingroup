export type SearchEntityType = 'business' | 'group' | 'professional' | 'all';

export interface SearchQuery {
  term: string;
  type?: SearchEntityType;
  state?: string;
  district?: string;
  city?: string;
  category?: string;
  platform?: string;
  cursor?: string;
  limit?: number;
}

export interface SearchCandidate {
  id: string;
  type: SearchEntityType;
  title: string;
  slug: string;
  description: string;
  category: string;
  location?: {
    state?: string;
    district?: string;
    city?: string;
  };
  platform?: string;
  rating?: number;
  isVerified?: boolean;
  score?: number;
}

export interface SearchResult<T> {
  items: T[];
  totalEstimate: number;
  nextCursor: string | null;
  processingTimeMs: number;
}
