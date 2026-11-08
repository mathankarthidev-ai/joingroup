export interface AIRequestMeta {
  provider: string;
  model: string;
  tokensUsed?: number;
  latencyMs: number;
}

export interface ModerationResult {
  isSafe: boolean;
  categories: {
    spam: boolean;
    fraud: boolean;
    harassment: boolean;
    adult: boolean;
  };
  confidenceScore: number;
  flaggedReason?: string;
}

export interface ParsedSearchIntent {
  rawQuery: string;
  extractedLocation?: {
    state?: string;
    district?: string;
    city?: string;
    pincode?: string;
    area?: string;
  };
  serviceCategory?: string;
  targetPlatform?: string;
  keywords: string[];
}

export interface IAIProvider {
  name: string;
  moderateContent(text: string): Promise<{ result: ModerationResult; meta: AIRequestMeta }>;
  parseSearchIntent(query: string): Promise<{ result: ParsedSearchIntent; meta: AIRequestMeta }>;
  generateSummary(text: string): Promise<{ summary: string; meta: AIRequestMeta }>;
}
