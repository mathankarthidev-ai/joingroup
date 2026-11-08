import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/core/contracts/api.contract';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();

  try {
    const body = await request.json();
    if (!body.businessId || !body.customerPhone || !body.requirement) {
      return NextResponse.json(
        createErrorResponse(
          'VALIDATION_ERROR',
          'Missing required fields: businessId, customerPhone, and requirement are required.',
          requestId
        ),
        { status: 400 }
      );
    }

    const lead = {
      id: `lead-${Date.now()}`,
      businessId: body.businessId,
      customerName: body.customerName || 'Anonymous Customer',
      customerPhone: body.customerPhone,
      requirement: body.requirement,
      pincode: body.pincode || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      createSuccessResponse(lead, { requestId }),
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      createErrorResponse('INVALID_BODY', 'Failed to parse JSON request body', requestId),
      { status: 400 }
    );
  }
}
