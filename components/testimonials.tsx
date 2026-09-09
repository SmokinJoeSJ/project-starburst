'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const stories = [
  [
    'Ruth',
    'I had to use a food pantry for the first time ever. The people are friendly, helpful, and non judgemental. Thank you for your service to the community for those in need. I am truly grateful! Thank you!',
  ],
  [
    'Kelly',
    "They were very helpful with my birth certificate it wasn't no waiting fill out the form an that was it very nice place",
  ],
  [
    'Dawn',
    'They were very nice to me, not inundating me with paperwork. Filled up a wagon full of food , including can goods, dairy & meat. They always have clothing to look through to where u inevitably find something you like!',
  ],
  [
    'Kelly',
    "These people are friendly and helpful. Thanks a million what you do! My family wouldn't have food if it wasn't for you.",
  ],
  [
    'Ivory',
    'Always a good experience honestly. Most of the people are volunteering.',
  ],
  [
    'Karla',
    'Took my granddaughter there to get diapers for her baby. They are very helpful.',
  ],
  [
    'Renee',
    'Project Starburst has saved me more times than I can count. God bless them,the staff and everything they do to help the community 🙏 ❤',
  ],
];
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
        {stories.map(([name, quote], i) => (
          <blockquote key={i}>
            <p>{quote}</p>
            <cite>– {name}</cite>
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
