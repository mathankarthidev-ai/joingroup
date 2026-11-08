/**
 * Input Sanitization & Anti-Injection Utilities
 * Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
 */

export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function sanitizeText(input: string): string {
  if (!input) return '';
  // Strip control characters while preserving standard unicode text and spaces
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}
