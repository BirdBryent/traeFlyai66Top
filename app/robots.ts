import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'Bytespider',
          'Googlebot',
          'Bingbot',
          'DuckDuckBot',
          'Applebot',
          'SearxngBot',
          'YouBot',
        ],
        allow: '/',
        disallow: ['/api/', '/private/', '/*?draft='],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/', '/*?draft='],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
