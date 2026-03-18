import { createCsrfProtect } from '@edge-csrf/nextjs';

const csrfProtect = createCsrfProtect({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    name: '__Host-csrf',
  },
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  excludePathPrefixes: ['/api/contact', '/api/auth'],
});

export default csrfProtect;
