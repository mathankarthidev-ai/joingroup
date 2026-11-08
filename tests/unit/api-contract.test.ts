import { createSuccessResponse, createErrorResponse } from '../../src/core/contracts/api.contract';

export function runApiContractUnitTests() {
  const reqId = 'req-test-123';
  const successRes = createSuccessResponse({ id: '1', name: 'Nammabus' }, { requestId: reqId });

  if (!successRes.success || successRes.meta.requestId !== reqId) {
    throw new Error('ApiSuccessResponse test failed');
  }

  const errorRes = createErrorResponse('NOT_FOUND', 'Item not found', reqId);
  if (errorRes.success !== false || errorRes.error.code !== 'NOT_FOUND') {
    throw new Error('ApiErrorResponse test failed');
  }

  return true;
}
