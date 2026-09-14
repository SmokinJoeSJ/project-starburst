'use client';
import { ContentText } from '@/components/content/fields';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const stories = [
  'ruth',
  'kelly-birth-certificate',
  'dawn',
  'kelly-food',
  'ivory',
  'karla',
  'renee',
] as const;
export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  return (
    <section className="section stories">
      <h2>Real Stories, Real Impact</h2>
      <div
        ref={track}
        className="story-track"
        // Keyboard users need focus here to scroll the story track.
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Community stories. Scroll to read more."
      >
        {stories.map((id) => (
          <blockquote key={id}>
            <p>
              <ContentText fieldId={`stories.${id}.quote`} />
            </p>
            <cite>
              – <ContentText fieldId={`stories.${id}.name`} />
            </cite>
          </blockquote>
        ))}
      </div>
      <div className="story-controls">
        <button
          aria-label="Previous stories"
          onClick={() =>
            track.current?.scrollBy({
              left: -320,
              behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
            })
          }
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Next stories"
          onClick={() =>
            track.current?.scrollBy({
              left: 320,
              behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
            })
          }
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
