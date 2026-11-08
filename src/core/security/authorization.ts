/**
 * Server-Side Authorization Policy Engine
 * Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
 * Enforces multi-role authorization at the application layer alongside PostgreSQL RLS
 */

export interface AuthSession {
  userId: string;
  email: string;
  roles: string[];
  organizationIds: string[];
}

export class AuthorizationError extends Error {
  public statusCode = 403;
  constructor(message = 'Unauthorized: Insufficient permissions for this resource') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class AuthenticationRequiredError extends Error {
  public statusCode = 401;
  constructor(message = 'Authentication required to access this endpoint') {
    super(message);
    this.name = 'AuthenticationRequiredError';
  }
}

/**
 * Ensures session exists
 */
export function requireSession(session: AuthSession | null): asserts session is AuthSession {
  if (!session || !session.userId) {
    throw new AuthenticationRequiredError();
  }
}

/**
 * Checks if user possesses one of the required roles
 */
export function requireRole(session: AuthSession | null, allowedRoles: string[]): void {
  requireSession(session);
  const hasRole = session.roles.some((r) => allowedRoles.includes(r));
  if (!hasRole) {
    throw new AuthorizationError(`Access denied. Requires one of: ${allowedRoles.join(', ')}`);
  }
}

/**
 * Checks if user is an active member or owner of the organization
 */
export function requireOrgMembership(session: AuthSession | null, organizationId: string): void {
  requireSession(session);
  if (!session.organizationIds.includes(organizationId) && !session.roles.includes('super_admin')) {
    throw new AuthorizationError('Access denied: You are not a member of this organization');
  }
}
