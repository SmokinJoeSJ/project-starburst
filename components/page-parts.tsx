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
    <>
      <p>
        📞 Phone: <a href="tel:+12317965342">(231) 796-5342</a>
      </p>
      <p>
        📧 Email:{' '}
        <a href="mailto:br@projectstarburst.org">br@projectstarburst.org</a>
      </p>
    </>
  );
}
