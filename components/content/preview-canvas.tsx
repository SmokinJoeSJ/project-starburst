'use client';
import { useEffect, useRef, useState } from 'react';
import { ChildConnection, installHelloMailbox } from '@/lib/content/bridge.mjs';
import { ContentProvider } from './fields';
import { Header, Footer } from '@/components/site-shell';
import type { ContentDocument } from '@/lib/content/approved';
import binding from '@/content/editor-binding.json';
import trustedManifest from '@/content/plm-manifest.json';
import Home from '@/components/pages/home';
import About from '@/components/pages/about';
import Contact from '@/components/pages/contact';
import Help from '@/components/pages/help';
import Donate from '@/components/pages/donate';
import Volunteer from '@/components/pages/volunteer';
import Souper from '@/components/pages/souper';
import EventPage from '@/components/pages/event';
if (
  typeof window !== 'undefined' &&
  window.location.pathname === '/plm-preview' &&
  binding.siteId &&
  binding.parentOrigins.length
)
  installHelloMailbox(window, window.parent, binding.parentOrigins);
export type EditorManifest = Omit<typeof trustedManifest, 'siteId'> & {
  siteId: string | null;
};
type Policy = {
  parentOrigins: string[];
  mediaOrigins: string[];
  mediaPathPrefixes: string[];
};
type Applied = {
  document: ContentDocument;
  media: Record<string, string>;
  viewport: string;
  mode: 'edit' | 'read-only';
  selected: string | null;
  pageId: string;
  pageEpoch: number;
  seq: number;
};
const pages = {
  home: Home,
  about: About,
  contact: Contact,
  help: Help,
  donate: Donate,
  volunteer: Volunteer,
  souper: Souper,
  'souper-alias': Souper,
  event: EventPage,
};
function fieldAt(target: EventTarget | null) {
  const element = target instanceof Element ? target : null;
  return (
    element?.closest<HTMLElement>('[data-plm-field]') ??
    element?.closest('a')?.querySelector<HTMLElement>('[data-plm-field]') ??
    null
  );
}
export function PreviewCanvas({
  manifest,
  approved,
  policy,
}: {
  manifest: EditorManifest;
  approved: ContentDocument;
  policy: Policy;
}) {
  const [state, setState] = useState<Applied | null>(null);
  const [status, setStatus] = useState(
    !manifest.siteId || !policy.parentOrigins.length
      ? 'This preview is not connected. Site registration and an approved PLM origin are required.'
      : 'Waiting for an authorized PLM Studio connection.',
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<
    Array<{ left: number; top: number; width: number; height: number }>
  >([]);
  const bridge = useRef<ChildConnection | null>(null);
  useEffect(() => {
    if (!manifest.siteId || !policy.parentOrigins.length) return;
    let active = true;
    try {
      bridge.current = new ChildConnection({
        host: window,
        parent: window.parent,
        manifest,
        baseline: approved,
        policy,
        onReset: () => {
          if (active) {
            setState(null);
            setHovered(null);
            setStatus('Waiting for a compatible draft from the approved PLM parent.');
          }
        },
        onApply: (next: Applied) => {
          if (active) {
            setState(next);
            setStatus('');
          }
        },
        onError: () => {
          if (active) {
            setState(null);
            setStatus(
              'The draft could not be applied. Check the PLM editor for compatibility or validation errors.',
            );
          }
        },
      });
    } catch {
      queueMicrotask(() => {
        if (active)
          setStatus('The registered renderer configuration is incompatible.');
      });
    }
    return () => {
      active = false;
      bridge.current?.destroy();
      bridge.current = null;
    };
  }, [manifest, approved, policy]);
  useEffect(() => {
    if (state) bridge.current?.acknowledge(state.seq);
  }, [state]);
  useEffect(() => {
    const block = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        event.type === 'submit' ||
        target?.closest('a, form, [data-preview-protected]')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      if (event.type === 'click' && state?.mode === 'edit') {
        const field = fieldAt(event.target)?.dataset.plmField;
        if (field && bridge.current?.select(field)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }
    };
    const key = (event: KeyboardEvent) => {
      if (
        (event.key === 'Enter' || event.key === ' ') &&
        state?.mode === 'edit'
      ) {
        const field = fieldAt(event.target)?.dataset.plmField;
        if (field && bridge.current?.select(field)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }
      if (
        event.key === 'Enter' &&
        event.target instanceof Element &&
        event.target.closest('a,form')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    const hover = (event: Event) =>
      setHovered(
        state?.mode === 'edit'
          ? (fieldAt(event.target)?.dataset.plmField ?? null)
          : null,
      );
    document.addEventListener('click', block, true);
    document.addEventListener('auxclick', block, true);
    document.addEventListener('contextmenu', block, true);
    document.addEventListener('submit', block, true);
    document.addEventListener('keydown', key, true);
    document.addEventListener('pointerover', hover, true);
    document.addEventListener('focusin', hover, true);
    return () => {
      document.removeEventListener('click', block, true);
      document.removeEventListener('auxclick', block, true);
      document.removeEventListener('contextmenu', block, true);
      document.removeEventListener('submit', block, true);
      document.removeEventListener('keydown', key, true);
      document.removeEventListener('pointerover', hover, true);
      document.removeEventListener('focusin', hover, true);
    };
  }, [state?.mode]);
  const selected = state?.selected ?? hovered;
  useEffect(() => {
    if (state?.mode !== 'edit' || !selected) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rects: Array<{
          left: number;
          top: number;
          width: number;
          height: number;
        }> = [];
        document
          .querySelectorAll<HTMLElement>('[data-plm-field]')
          .forEach((element) => {
            if (
              element.dataset.plmField !== selected &&
              element.dataset.plmAltField !== selected
            )
              return;
            const range = document.createRange();
            range.selectNodeContents(element);
            const rect =
              element.tagName === 'IMG'
                ? element.getBoundingClientRect()
                : range.getBoundingClientRect();
            if (rect.width && rect.height)
              rects.push({
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              });
          });
        setBoxes(rects);
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    document.addEventListener('load', update, true);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    let active = true;
    void document.fonts.ready.then(() => {
      if (active) update();
    });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
      document.removeEventListener('load', update, true);
    };
  }, [state, selected]);
  if (!state)
    return (
      <main id="main" className="plm-preview-waiting">
        <h1>Project Starburst content preview</h1>
        <output>{status}</output>
        <p>The public website continues to show its approved content.</p>
      </main>
    );
  const Page = pages[state.pageId as keyof typeof pages];
  const route = manifest.pages.find((page) => page.id === state.pageId)?.path;
  const field =
    selected && manifest.fields[selected as keyof typeof manifest.fields];
  return (
    <ContentProvider value={state}>
      <div
        className="plm-preview-canvas"
        data-preview-mode={state.mode}
        data-preview-page={state.pageId}
        data-preview-viewport={state.viewport}
      >
        <Header pathnameOverride={route} />
        <Page />
        <Footer />
      </div>
      {(state.mode === 'edit' && selected ? boxes : []).map((box, i) => (
        <div
          key={i}
          className={
            'plm-field-outline' +
            (state.selected ? ' is-selected' : '') +
            (field && !field.editable ? ' is-locked' : '')
          }
          style={box}
          aria-hidden="true"
        />
      ))}
      <output className="plm-preview-notice">
        Draft preview ·{' '}
        {state.mode === 'edit'
          ? 'Select text or an image to edit'
          : 'Read only'}{' '}
        · Links and forms are inactive
      </output>
    </ContentProvider>
  );
}
