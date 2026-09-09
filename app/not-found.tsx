import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <h1>Page not found</h1>
      <p>
        We couldn’t find that page. Visit our homepage or contact us for help.
      </p>
      <div className="button-row">
        <Link href="/" className="pill">
          Home
        </Link>
        <Link href="/contact" className="pill">
          Contact
        </Link>
      </div>
    </main>
  );
}
