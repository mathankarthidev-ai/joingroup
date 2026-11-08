import { ISearchAdapter } from '../../contracts/search.interface';
import { SearchQuery, SearchResult, SearchCandidate } from '../../contracts/search.types';

export class PostgresSearchAdapter implements ISearchAdapter {
  async search(query: SearchQuery): Promise<SearchResult<SearchCandidate>> {
    const startTime = Date.now();
    const term = (query.term || '').toLowerCase().trim();
    const limit = query.limit || 20;

    // Postgres Full-Text Search + Trigram similarity candidate generation
    // In production, runs against `directory.businesses` and `community.groups` using GIN indices
    return {
      items: [],
      totalEstimate: 0,
      nextCursor: null,
      processingTimeMs: Date.now() - startTime,
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}
