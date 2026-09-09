'use client';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  LoaderCircle,
  Mail,
  Phone,
} from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'text';
type Icon = 'arrow' | 'external' | 'download' | 'phone' | 'email' | 'none';
type Appearance = {
  variant?: Variant;
  icon?: Icon;
  className?: string;
  children: ReactNode;
};
const icons = {
  arrow: ArrowRight,
  external: ArrowUpRight,
  download: Download,
  phone: Phone,
  email: Mail,
};
function CtaIcon({ icon = 'arrow' }: { icon?: Icon }) {
  if (icon === 'none') return null;
  const Symbol = icons[icon];
  return (
    <Symbol
      size={18}
      strokeWidth={1.8}
      aria-hidden="true"
      className="cta-icon"
    />
  );
}
function classes(variant: Variant, className: string) {
  return ['cta', 'cta--' + variant, className].filter(Boolean).join(' ');
}

export function CtaLink({
  href,
  variant = 'primary',
  icon = 'arrow',
  className = '',
  children,
  onClick,
  ...props
}: Appearance &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }) {
  const content = (
    <>
      <span>{children}</span>
      <CtaIcon icon={icon} />
    </>
  );
  function activate(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === '_blank'
    )
      return;
    const destination = new URL(href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      destination.pathname !== window.location.pathname ||
      !destination.hash
    )
      return;
    const target = document.getElementById(
      decodeURIComponent(destination.hash.slice(1)),
    );
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, '', destination.hash);
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
      block: 'start',
    });
  }
  const common = {
    ...props,
    className: classes(variant, className),
    onClick: activate,
  };
  return href.startsWith('/') &&
    !href.startsWith('/documents/') &&
    !props.download &&
    props.target !== '_blank' ? (
    <Link href={href} {...common}>
      {content}
    </Link>
  ) : (
    <a href={href} {...common}>
      {content}
    </a>
  );
}

export function CtaButton({
  variant = 'primary',
  icon = 'arrow',
  className = '',
  children,
  loading = false,
  disabled,
  type = 'button',
  ...props
}: Appearance &
  ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      type={type}
      className={classes(variant, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      <span>{children}</span>
      {loading ? (
        <LoaderCircle size={18} className="cta-spinner" aria-hidden="true" />
      ) : (
        <CtaIcon icon={icon} />
      )}
    </button>
  );
}
