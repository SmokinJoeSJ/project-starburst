'use client';
import { useState, type SyntheticEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createContactDraft } from '@/lib/contact-draft.mjs';
export function ContactForm({
  recipient,
  preview,
}: {
  recipient: string;
  preview: boolean;
}) {
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState('');
  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const value = (key: string) => {
      const entry = data.get(key);
      return typeof entry === 'string' ? entry : '';
    };
    const result = createContactDraft(
      {
        firstName: value('firstName'),
        lastName: value('lastName'),
        email: value('email'),
        phone: value('phone'),
        message: value('message'),
      },
      recipient,
      preview,
    );
    setDraft(result.mailto ? '' : result.body);
    if (result.mailto) window.location.href = result.mailto;
    setStatus(
      result.mailto
        ? preview
          ? 'Your email app should open a draft addressed to the test inbox. Nothing has been sent automatically.'
          : 'Your email app should open with your message. Please review it and send it there. If it does not open, email br@projectstarburst.org or call (231) 796-5342.'
        : 'Preview draft prepared below. No email was sent.',
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
          {preview
            ? recipient
              ? 'Preview: this opens an email draft to the test inbox.'
              : 'Preview: prepare a draft here without sending email.'
            : 'This opens your email app so you can review and send your message.'}
        </p>
        <div className="form-actions">
          <button className="pill" type="submit" aria-describedby="email-help">
            {preview && !recipient ? 'Preview message' : 'Continue in email'}
          </button>
        </div>
        <output className="form-status" style={{ display: 'block' }}>
          {status}
        </output>
        {draft && (
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {draft}
          </pre>
        )}
      </form>
    </section>
  );
}
