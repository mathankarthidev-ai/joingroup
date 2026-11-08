export interface ApiMeta {
  requestId: string;
  nextCursor?: string | null;
  totalCount?: number;
  limit?: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta: ApiMeta;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  requestId: string;
  details?: Record<string, unknown> | unknown[];
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetail;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function createSuccessResponse<T>(
  data: T,
  meta: Partial<ApiMeta> & { requestId: string }
): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    meta: {
      requestId: meta.requestId,
      nextCursor: meta.nextCursor ?? null,
      totalCount: meta.totalCount,
      limit: meta.limit,
    },
  };
}

export function createErrorResponse(
  code: string,
  message: string,
  requestId: string,
  details?: Record<string, unknown> | unknown[]
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      requestId,
      details,
    },
  };
}
