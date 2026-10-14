// Site base path (e.g. "/Afrilink-Corporation-Website" on GitHub Pages, "" locally)
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// Prefix a root-absolute path ("/hero-bg.jpg") with the site base path
export function withBase(path) {
  return `${BASE}${path}`;
}
