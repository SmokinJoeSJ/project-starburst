import approved from '@/content/plm-content.json';
export type FieldId = keyof typeof approved.values;
export type ContentValue = string | { assetId: string } | null;
export type ContentDocument = Omit<
  typeof approved,
  'siteId' | 'values' | 'media'
> & {
  siteId: string | null;
  values: Record<string, ContentValue>;
  media?: Record<string, string>;
};
export const approvedContent: ContentDocument = approved;
export function approvedText(key: FieldId): string {
  const value = approvedContent.values[key];
  if (typeof value !== 'string') throw new Error('Expected text field: ' + key);
  return value;
}
