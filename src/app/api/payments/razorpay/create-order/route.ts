import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, planId, planName, customerEmail, customerPhone, promoCode } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid payment amount specified.' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_local_sandbox';
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Convert amount to paise (1 INR = 100 paise)
    const amountInPaise = Math.round(Number(amount) * 100);
    const receipt = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // If real Razorpay keys are configured in environment
    if (keyId && keySecret && !keyId.includes('sandbox')) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt,
          notes: {
            planId: planId || 'basic',
            planName: planName || 'Listing Plan',
            customerEmail: customerEmail || 'guest@example.com',
            promoCode: promoCode || '',
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(
          { error: errorData.error?.description || 'Failed to create Razorpay order' },
          { status: res.status }
        );
      }

      const orderData = await res.json();
      return NextResponse.json({
        success: true,
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId,
        isSandbox: false,
      });
    }

    // LOCAL DEVELOPMENT SANDBOX FALLBACK
    // Allows testing full end-to-end checkout flow without requiring immediate live banking credentials
    const simulatedOrderId = `order_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return NextResponse.json({
      success: true,
      orderId: simulatedOrderId,
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      keyId,
      isSandbox: true,
      notes: {
        mode: 'LOCAL_DEVELOPMENT_SIMULATOR',
        planId,
        planName,
        customerEmail,
        promoCode,
      },
    });
  } catch (error: any) {
    console.error('Error generating Razorpay order:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error processing payment request.' },
      { status: 500 }
    );
  }
}
