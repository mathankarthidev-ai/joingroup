import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/core/contracts/api.contract';
import { SEED_BUSINESSES } from '@/lib/local-biz/seed-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
  const searchParams = request.nextUrl.searchParams;

  const state = searchParams.get('state');
  const district = searchParams.get('district');
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);

  let list = [...SEED_BUSINESSES];
  if (state) {
    list = list.filter((b) => (b.state || '').toLowerCase() === state.toLowerCase());
  }
  if (district) {
    const distLower = district.toLowerCase();
    list = list.filter((b) => {
      const cityName = typeof b.city === 'object' && b.city ? b.city.name : (typeof b.city === 'string' ? b.city : '');
      const addr = b.address || '';
      return cityName.toLowerCase() === distLower || addr.toLowerCase().includes(distLower);
    });
  }
  if (category) {
    const catLower = category.toLowerCase();
    list = list.filter((b) => {
      const catId = (b as any).category_id || (b as any).categoryId || '';
      return catId.toLowerCase() === catLower;
    });
  }

  const paginated = list.slice(0, limit);

  return NextResponse.json(
    createSuccessResponse(paginated, {
      requestId,
      totalCount: list.length,
      limit,
      nextCursor: list.length > limit ? 'biz-next-cursor' : null,
    })
  );
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();

  try {
    const body = await request.json();
    if (!body.name || !body.phone || !body.state || !body.city) {
      return NextResponse.json(
        createErrorResponse(
          'VALIDATION_ERROR',
          'Missing required fields: name, phone, state, and city are mandatory.',
          requestId
        ),
        { status: 400 }
      );
    }

    const newBusiness = {
      id: `biz-${Date.now()}`,
      name: body.name,
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      phone: body.phone,
      state: body.state,
      city: body.city,
      address: body.address || `${body.city}, ${body.state}`,
      categoryId: body.categoryId || 'home-services',
      isVerified: false,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      createSuccessResponse(newBusiness, { requestId }),
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      createErrorResponse('INVALID_BODY', 'Failed to parse JSON request body', requestId),
      { status: 400 }
    );
  }
}
