function sanitizeString(val: unknown): string {
  if (typeof val !== 'string') return '';

  return val
    .trim() // Remove outer spaces
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags (Very basic XSS protection)
    .replace(/[<>]/g, ''); // Remove stray angle brackets
}

export const StringUtils = {
  sanitizeString,
};
