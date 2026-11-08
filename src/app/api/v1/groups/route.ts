import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/core/contracts/api.contract';
import { INITIAL_GROUPS } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
  const searchParams = request.nextUrl.searchParams;

  const platform = searchParams.get('platform');
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);

  let list = [...INITIAL_GROUPS];
  if (platform && platform !== 'all') {
    list = list.filter((g) => g.platform.toLowerCase() === platform.toLowerCase());
  }
  if (category && category !== 'all') {
    list = list.filter((g) => g.category.toLowerCase() === category.toLowerCase());
  }

  const paginated = list.slice(0, limit);

  return NextResponse.json(
    createSuccessResponse(paginated, {
      requestId,
      totalCount: list.length,
      limit,
      nextCursor: list.length > limit ? 'groups-next-cursor' : null,
    })
  );
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();

  try {
    const body = await request.json();
    if (!body.name || !body.inviteUrl || !body.platform) {
      return NextResponse.json(
        createErrorResponse(
          'VALIDATION_ERROR',
          'Missing required fields: name, platform, and inviteUrl are mandatory.',
          requestId
        ),
        { status: 400 }
      );
    }

    // Lifecycle state is always 'pending' until moderated
    const newGroup = {
      id: `grp-${Date.now()}`,
      name: body.name,
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      platform: body.platform,
      inviteUrl: body.inviteUrl,
      category: body.category || 'Technology',
      status: 'pending',
      memberCount: 1,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      createSuccessResponse(newGroup, { requestId }),
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      createErrorResponse('INVALID_BODY', 'Failed to parse JSON request body', requestId),
      { status: 400 }
    );
  }
}
