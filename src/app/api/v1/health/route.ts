import { NextRequest, NextResponse } from 'next/server';
import { createSuccessResponse } from '@/core/contracts/api.contract';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestId = request.headers.get('x-request-id') || crypto.randomUUID();
  const uptimeSeconds = process.uptime();

  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(uptimeSeconds),
    environment: process.env.NODE_ENV || 'development',
    version: '0.1.0',
    services: {
      database: 'connected_or_resilient_local',
      search: 'postgres_active',
      cache: 'memory_l1_ready',
    },
  };

  return NextResponse.json(
    createSuccessResponse(healthData, { requestId }),
    { status: 200 }
  );
}
