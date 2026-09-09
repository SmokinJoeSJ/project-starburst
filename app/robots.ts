import type { MetadataRoute } from 'next';
import { robotsDefinition } from '@/lib/seo-documents.mjs';
export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to read preview pages' noindex metadata.
  return robotsDefinition(process.env);
}
