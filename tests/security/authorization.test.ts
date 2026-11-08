import { requireRole, requireSession, requireOrgMembership } from '../../src/core/security/authorization';

export function runAuthorizationSecurityTests() {
  const customerSession = {
    userId: 'user-001',
    email: 'test@example.com',
    roles: ['customer'],
    organizationIds: ['org-123'],
  };

  // 1. Session exists
  requireSession(customerSession);

  // 2. Allow if role matches
  requireRole(customerSession, ['customer', 'merchant']);

  // 3. Block if role does not match
  let blocked = false;
  try {
    requireRole(customerSession, ['super_admin']);
  } catch {
    blocked = true;
  }

  if (!blocked) {
    throw new Error('Authorization policy should block non-admin');
  }

  // 4. Org membership
  requireOrgMembership(customerSession, 'org-123');

  return true;
}
