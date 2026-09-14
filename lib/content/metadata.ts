import type { Metadata } from 'next';
import { approvedText, type FieldId } from './approved';
import { routeMetadata } from '@/lib/seo';
export function contentMetadata(page: string, path: string): Metadata {
  const title = approvedText((page + '.seo.title') as FieldId);
  const description = approvedText((page + '.seo.description') as FieldId);
  return {
    ...routeMetadata(path),
    title: page === 'home' ? { absolute: title } : title,
    description,
  };
}
