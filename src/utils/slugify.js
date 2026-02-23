/**
 * Convert a name into a URL-friendly slug.
 * @param {string} text
 * @returns {string}
 */
export const slugify = (text) =>
  text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-');
