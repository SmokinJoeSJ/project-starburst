'use client';
import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/site-config';
export function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = [
      'Name: ' +
        String(data.get('firstName') ?? '') +
        ' ' +
        String(data.get('lastName') ?? ''),
      'Email: ' + String(data.get('email') ?? ''),
      'Phone: ' + String(data.get('phone') ?? ''),
      '',
      String(data.get('message') ?? ''),
    ].join('\n');
    window.location.href =
      'mailto:' +
      siteConfig.email +
      '?subject=' +
      encodeURIComponent('Project Starburst website inquiry') +
      '&body=' +
      encodeURIComponent(body);
    setStatus(
      'Your email app should open with your message. Please review it and send it there. If it does not open, email br@projectstarburst.org or call (231) 796-5342.',
    );
  }
  return (
    <section className="contact-form-wrap">
      <form className="site-form" onSubmit={submit}>
        <h2>Contact us</h2>
        <label htmlFor="firstName">First name</label>
        <Input
          id="firstName"
          name="firstName"
          autoComplete="given-name"
          placeholder="First name"
          maxLength={100}
        />
        <label htmlFor="lastName">Last name</label>
        <Input
          id="lastName"
          name="lastName"
          autoComplete="family-name"
          placeholder="Last name"
          maxLength={100}
        />
        <label htmlFor="email">Email*</label>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          required
          maxLength={254}
        />
        <label htmlFor="phone">Phone</label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          placeholder="Phone"
          maxLength={40}
        />
        <label htmlFor="message">Message*</label>
        <Textarea
          id="message"
          name="message"
          placeholder="Message"
          required
          rows={5}
          maxLength={2000}
        />
        <p className="form-note" id="email-help">
          This opens your email app so you can review and send your message.
        </p>
        <div className="form-actions">
          <button className="pill" type="submit" aria-describedby="email-help">
            Continue in email
          </button>
        </div>
        <p className="form-status" role="status">
          {status}
        </p>
      </form>
    </section>
  );
}
