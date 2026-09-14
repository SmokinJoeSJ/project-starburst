'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Header, Footer } from '@/components/site-shell';
export function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path === '/plm-preview') return children;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
