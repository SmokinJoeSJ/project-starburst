import { CtaLink } from '@/components/cta';
import { organization } from '@/lib/organization';
import type { ReactNode } from 'react';
export function PageHero({
  title,
  image,
  alt,
  children,
  className = '',
}: {
  title: ReactNode;
  image: string;
  alt: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={'hero page-hero ' + className}>
      <img className="hero-image" src={image} alt={alt} fetchPriority="high" />
      <div className="hero-shade" />
      <div className="page-hero-content">
        <h1>{title}</h1>
        {children && <div className="hero-description">{children}</div>}
      </div>
    </section>
  );
}
export function TextSection({
  title,
  children,
  className = '',
  id,
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={'text-section ' + className}>
      {title && <h2>{title}</h2>}
      <div className="text-content">{children}</div>
    </section>
  );
}
export function ContactLines() {
  return (
    <div className="contact-lines">
      <CtaLink href={organization.phone.href} variant="text" icon="phone">
        {organization.phone.display}
      </CtaLink>
      <CtaLink href={organization.emailHref} variant="text" icon="email">
        {organization.email}
      </CtaLink>
    </div>
  );
}
