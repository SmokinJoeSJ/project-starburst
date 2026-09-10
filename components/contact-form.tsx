'use client';
import { CtaButton } from '@/components/cta';
import { organization } from '@/lib/organization';
import {
  useSyncExternalStore,
  useRef,
  useState,
  type SyntheticEvent,
} from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createContactDraft } from '@/lib/contact-draft.mjs';

// Keep draft controls disabled in initial HTML; direct contact links work without JS.
const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function ContactForm({
  recipient,
  preview,
}: {
  recipient: string;
  preview: boolean;
}) {
  const ready = useSyncExternalStore(
    subscribeToHydration,
    clientReady,
    serverReady,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState('');
  const statusRef = useRef<HTMLOutputElement>(null);
  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const message = form.elements.namedItem('message') as HTMLTextAreaElement;
    const next: Record<string, string> = {};
    if (!email.value.trim()) next.email = 'Enter your email address.';
    else if (!email.validity.valid)
      next.email = 'Enter a valid email address, such as name@example.com.';
    if (!message.value.trim())
      next.message = 'Add a message so we know what you would like to ask.';
    setErrors(next);
    setStatus('');
    setDraft('');
    if (Object.keys(next).length) {
      (next.email ? email : message).focus();
      return;
    }
    const data = new FormData(form);
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
    setDraft(result.body);
    if (!result.mailto) {
      setStatus('Preview draft prepared below. No email was sent.');
    } else {
      try {
        window.location.href = result.mailto;
        setStatus(
          preview
            ? 'Your email app should open a draft to the test inbox. Review it and send it there. Nothing has been sent automatically.'
            : 'Your email app should open with your draft. Review it and send it there. If it does not open, copy the draft below and email ' +
                organization.email +
                '. No email has been sent by this website.',
        );
      } catch {
        setStatus(
          'Your draft is ready below, but your email app could not be opened. Copy the draft and send it from your email application. No email was sent.',
        );
      }
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }
  return (
    <div className="contact-form-wrap">
      <form
        className="site-form sb-contact-form"
        onSubmit={submit}
        noValidate
        aria-labelledby="contact-form-title"
      >
        <h3 id="contact-form-title">Prepare your message</h3>
        <p className="sb-form-intro">
          Fields marked “required” are needed to prepare the draft.
        </p>
        <fieldset disabled={!ready}>
          <legend className="sr-only">Your contact details and question</legend>
          <div className="sb-field-pair">
            <div>
              <label htmlFor="firstName">First name</label>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last name</label>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                maxLength={100}
              />
            </div>
          </div>
          <label htmlFor="email">
            Email <span>(required)</span>
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p className="sb-field-error" id="email-error">
              {errors.email}
            </p>
          )}
          <label htmlFor="phone">
            Phone <span>(optional)</span>
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            maxLength={40}
          />
          <label htmlFor="message">
            Message <span>(required)</span>
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={2000}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p className="sb-field-error" id="message-error">
              {errors.message}
            </p>
          )}
          {Object.keys(errors).length > 0 && (
            <p className="sb-form-error-summary" role="alert">
              Please check the highlighted fields. Your entries have been kept.
            </p>
          )}
          <p className="form-note" id="email-help">
            {preview
              ? recipient
                ? 'Preview: opens an email draft to the test inbox. You must send it from your email app.'
                : 'Preview: prepares a draft on this page only. No email will be opened or sent.'
              : 'This opens your email application. You must review and send the message there.'}
          </p>
          <div className="form-actions">
            <CtaButton type="submit" icon="email" aria-describedby="email-help">
              Prepare Email
            </CtaButton>
          </div>
        </fieldset>
        <noscript>
          <p className="form-note">
            The draft form needs JavaScript. Please email {organization.email}{' '}
            or call {organization.phone.display} using the contact links above.
          </p>
        </noscript>
        <output
          ref={statusRef}
          className="form-status"
          tabIndex={-1}
          aria-live="polite"
          aria-atomic="true"
        >
          {status}
        </output>
        {draft && (
          <div className="sb-draft">
            <h4>Your email draft</h4>
            <pre>{draft}</pre>
          </div>
        )}
      </form>
    </div>
  );
}
