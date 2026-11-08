import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/core/contracts/api.contract';
import { INITIAL_GROUPS } from '@/lib/data';
import { SEED_BUSINESSES } from '@/lib/local-biz/seed-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
  const searchParams = request.nextUrl.searchParams;

  const q = (searchParams.get('q') || searchParams.get('term') || '').toLowerCase().trim();
  const type = searchParams.get('type') || 'all'; // 'business' | 'group' | 'all'
  const state = searchParams.get('state')?.toLowerCase();
  const district = searchParams.get('district')?.toLowerCase();
  const platform = searchParams.get('platform')?.toLowerCase();
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);

  try {
    const results: Array<{
      id: string;
      title: string;
      type: 'business' | 'group';
      category: string;
      location?: string;
      platform?: string;
      rating?: number;
      isVerified: boolean;
      url: string;
    }> = [];

    // Filter businesses if type is 'business' or 'all'
    if (type === 'business' || type === 'all') {
      const bizMatches = SEED_BUSINESSES.filter((b) => {
        const bState = (b.state || '').toLowerCase();
        const bCity = typeof b.city === 'object' && b.city ? b.city.name : (typeof b.city === 'string' ? b.city : '');
        const bAddress = (b.address || '').toLowerCase();

        if (state && bState !== state) return false;
        if (district && bCity.toLowerCase() !== district && !bAddress.includes(district)) return false;
        if (q) {
          const target = `${b.name} ${b.description || ''} ${bCity} ${bState}`.toLowerCase();
          return target.includes(q);
        }
        return true;
      }).slice(0, limit);

      for (const b of bizMatches) {
        const bCity = typeof b.city === 'object' && b.city ? b.city.name : (typeof b.city === 'string' ? b.city : '');
        const catId = (b as any).category_id || (b as any).categoryId || '';
        const isVerified = (b as any).is_verified ?? (b as any).isVerified ?? false;

        results.push({
          id: b.id,
          title: b.name,
          type: 'business',
          category: catId,
          location: `${bCity}, ${b.state || ''}`,
          rating: b.rating,
          isVerified,
          url: `/local-biz/businesses/${b.slug}`,
        });
      }
    }

    // Filter groups if type is 'group' or 'all'
    if (type === 'group' || type === 'all') {
      const groupMatches = INITIAL_GROUPS.filter((g) => {
        if (platform && g.platform.toLowerCase() !== platform) return false;
        if (state && g.state && g.state.toLowerCase() !== state) return false;
        if (q) {
          const target = `${g.name} ${g.description} ${g.category} ${g.platform}`.toLowerCase();
          return target.includes(q);
        }
        return true;
      }).slice(0, limit);

      for (const g of groupMatches) {
        results.push({
          id: g.id,
          title: g.name,
          type: 'group',
          category: g.category,
          platform: g.platform,
          isVerified: g.isVerified,
          url: `/groups/${g.id}`,
        });
      }
    }

    return NextResponse.json(
      createSuccessResponse(results.slice(0, limit), {
        requestId,
        totalCount: results.length,
        limit,
        nextCursor: results.length > limit ? 'next-cursor-token' : null,
      })
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Search processing failed';
    return NextResponse.json(
      createErrorResponse('SEARCH_ERROR', errorMsg, requestId),
      { status: 500 }
    );
  }
}
