import { IAIProvider, ModerationResult, ParsedSearchIntent, AIRequestMeta } from '../contracts/ai-provider.interface';

export class MockAIProvider implements IAIProvider {
  public name = 'mock-resilient-provider';

  async moderateContent(text: string): Promise<{ result: ModerationResult; meta: AIRequestMeta }> {
    const start = Date.now();
    const lower = text.toLowerCase();
    const isSpam = lower.includes('free crypto') || lower.includes('guaranteed 100x return') || lower.includes('gambling');

    return {
      result: {
        isSafe: !isSpam,
        categories: {
          spam: isSpam,
          fraud: isSpam,
          harassment: false,
          adult: false,
        },
        confidenceScore: 0.95,
        flaggedReason: isSpam ? 'Suspicious commercial spam keywords detected' : undefined,
      },
      meta: {
        provider: this.name,
        model: 'heuristic-rules-v1',
        latencyMs: Date.now() - start,
      },
    };
  }

  async parseSearchIntent(query: string): Promise<{ result: ParsedSearchIntent; meta: AIRequestMeta }> {
    const start = Date.now();
    const lower = query.toLowerCase();

    // Basic heuristic intent parsing
    const pincodeMatch = query.match(/\b\d{6}\b/);
    const keywords = query.split(/\s+/).filter((w) => w.length > 2);

    return {
      result: {
        rawQuery: query,
        extractedLocation: {
          pincode: pincodeMatch ? pincodeMatch[0] : undefined,
          city: lower.includes('coimbatore') ? 'Coimbatore' : lower.includes('chennai') ? 'Chennai' : undefined,
        },
        serviceCategory: lower.includes('ac') ? 'AC Service' : lower.includes('photo') ? 'Photography' : undefined,
        keywords,
      },
      meta: {
        provider: this.name,
        model: 'heuristic-parser-v1',
        latencyMs: Date.now() - start,
      },
    };
  }

  async generateSummary(text: string): Promise<{ summary: string; meta: AIRequestMeta }> {
    const start = Date.now();
    return {
      summary: text.slice(0, 150) + (text.length > 150 ? '...' : ''),
      meta: {
        provider: this.name,
        model: 'heuristic-summary-v1',
        latencyMs: Date.now() - start,
      },
    };
  }
}
