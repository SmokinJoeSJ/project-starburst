import type { MetadataRoute } from 'next';
import { sitemapEntries } from '@/lib/seo-documents.mjs';
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(process.env);
}
