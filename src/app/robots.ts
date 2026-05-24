import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';

export default function robots(): MetadataRoute.Robots {
  const appUrl = envConfigs.app_url;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/*?*q=',
        '/privacy-policy',
        '/terms-of-service',
        '/zh/privacy-policy',
        '/zh/terms-of-service',
        '/en/privacy-policy',
        '/en/terms-of-service',
        '/settings/*',
        '/zh/settings/*',
        '/en/settings/*',
        '/activity/*',
        '/zh/activity/*',
        '/en/activity/*',
        '/admin/*',
        '/zh/admin/*',
        '/en/admin/*',
        '/chat/*',
        '/zh/chat/*',
        '/en/chat/*',
        '/sign-in',
        '/sign-up',
        '/verify-email',
        '/zh/sign-in',
        '/zh/sign-up',
        '/zh/verify-email',
        '/en/sign-in',
        '/en/sign-up',
        '/en/verify-email',
        '/api/*',
      ],
    },
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
