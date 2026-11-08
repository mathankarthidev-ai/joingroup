import { IAIProvider, ModerationResult } from '../contracts/ai-provider.interface';
import { MockAIProvider } from '../adapters/mock-ai-adapter';

export class ContentModerationAgent {
  private provider: IAIProvider;

  constructor(provider?: IAIProvider) {
    this.provider = provider || new MockAIProvider();
  }

  async auditCommunityListing(title: string, description: string, url: string): Promise<ModerationResult> {
    const combined = `${title} ${description} ${url}`;
    const { result } = await this.provider.moderateContent(combined);
    return result;
  }
}
