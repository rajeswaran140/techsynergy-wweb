export async function apiRequest(url: string, options: RequestInit = {}) {
  const csrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('__Host-csrf='))
    ?.split('=')[1];

  const headers = new Headers(options.headers);
  if (csrfToken && options.method !== 'GET') {
    headers.set('X-CSRF-Token', csrfToken);
  }

  return fetch(url, { ...options, headers });
}
