import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse, createErrorResponse } from '@/core/contracts/api.contract';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();

  try {
    const body = await request.json();
    const planId = body.planId || 'launch-special-99';

    // Standardized money storage in minor units (paise) with currency code
    const amountMinor = 9900; // ₹99 = 9900 paise
    const currency = 'INR';

    const checkoutSession = {
      sessionId: `cs_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      planId,
      amountMinor,
      currency,
      status: 'pending',
      paymentGateway: 'mock_provider_ready',
      checkoutUrl: `/pricing?checkout=success&session=${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      createSuccessResponse(checkoutSession, { requestId }),
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      createErrorResponse('PAYMENT_INIT_ERROR', 'Failed to initialize checkout session', requestId),
      { status: 400 }
    );
  }
}
