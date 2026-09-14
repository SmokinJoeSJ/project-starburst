import type { AnchorHTMLAttributes } from 'react';
// Fixture plumbing only. Public HTML/RSC navigation is verified against the real static build separately.
export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}>{props.children}</a>;
}
export function usePathname() {
  return '/plm-preview';
}
