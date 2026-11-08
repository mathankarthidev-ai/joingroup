import { SearchQuery, SearchResult, SearchCandidate } from './search.types';

export interface ISearchAdapter {
  search(query: SearchQuery): Promise<SearchResult<SearchCandidate>>;
  healthCheck(): Promise<boolean>;
}
