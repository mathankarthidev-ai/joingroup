import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse } from '@/core/contracts/api.contract';
import { STATES, UNION_TERRITORIES, getDistrictsForState } from '@/lib/india';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
  const stateQuery = request.nextUrl.searchParams.get('state');

  if (stateQuery) {
    const districts = getDistrictsForState(stateQuery);
    return NextResponse.json(
      createSuccessResponse(
        { state: stateQuery, districts, totalCount: districts.length },
        { requestId }
      )
    );
  }

  const payload = {
    states: STATES.map((s) => ({ name: s.name, type: s.type, districtCount: s.districts.length })),
    unionTerritories: UNION_TERRITORIES.map((u) => ({ name: u.name, type: u.type, districtCount: u.districts.length })),
  };

  return NextResponse.json(
    createSuccessResponse(payload, { requestId })
  );
}
