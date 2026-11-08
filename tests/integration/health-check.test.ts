/**
 * Integration Test: Health Check Endpoint Contract Verification
 */
import { createSuccessResponse } from '../../src/core/contracts/api.contract';

export function runHealthCheckIntegrationTest() {
  const mockPayload = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'test',
  };

  const response = createSuccessResponse(mockPayload, { requestId: 'req-integration-test' });

  if (response.data.status !== 'healthy') {
    throw new Error('Health check status must be healthy');
  }

  return true;
}
