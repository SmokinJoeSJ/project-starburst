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
  return (
    <div className="community-voices">
      <h2 id="community-voices">VOICES FROM OUR COMMUNITY</h2>
      <blockquote className="featured-quote">
        <p>“{stories[0][1]}”</p>
        <cite>— {stories[0][0]}</cite>
      </blockquote>
      <details className="community-more">
        <summary>Read more community stories</summary>
        {stories.slice(1).map(([name, quote], index) => (
          <blockquote key={index}>
            <p>“{quote}”</p>
            <cite>— {name}</cite>
          </blockquote>
        ))}
      </details>
    </div>
  );
}
