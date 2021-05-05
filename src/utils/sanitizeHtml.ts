const sanitizeHtml = require('sanitize-html');
// import sanitizeHtml from 'sanitize-html';

export function sanitizeHtmlXss(htmlForSanitizing: string) {
  return sanitizeHtml(htmlForSanitizing, {
    allowedTags: ['a', 'p', 'div'],
    allowedAttributes: { a: ['href'] },
  });
}
