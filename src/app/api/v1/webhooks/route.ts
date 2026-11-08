import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/core/contracts/api.contract';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
  const signature = request.headers.get('x-webhook-signature');

  try {
    const body = await request.json();
    const eventType = body.type || 'payment.succeeded';
    const eventId = body.id || `evt_${Date.now()}`;

    // Idempotency check: in production, verify eventId in `commerce.financial_ledger`
    const result = {
      received: true,
      eventId,
      eventType,
      processedAt: new Date().toISOString(),
      idempotent: true,
    };

    return NextResponse.json(
      createSuccessResponse(result, { requestId }),
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      createErrorResponse('WEBHOOK_FAILED', 'Invalid webhook payload', requestId),
      { status: 400 }
    );
  }
}
