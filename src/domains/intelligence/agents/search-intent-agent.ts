import { IAIProvider, ParsedSearchIntent } from '../contracts/ai-provider.interface';
import { MockAIProvider } from '../adapters/mock-ai-adapter';

export class SearchIntentAgent {
  private provider: IAIProvider;

  constructor(provider?: IAIProvider) {
    this.provider = provider || new MockAIProvider();
  }

  async parse(userQuery: string): Promise<ParsedSearchIntent> {
    const { result } = await this.provider.parseSearchIntent(userQuery);
    return result;
  }
}
