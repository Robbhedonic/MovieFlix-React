import { useRef } from 'react';
import { ICastMember, ICrewMember } from '../Models/ICredits';

type CastCarouselProps = {
  cast: ICastMember[];
  crew: ICrewMember[];
};

const CastCarousel = ({ cast, crew }: CastCarouselProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (!trackRef.current) {
      return;
    }

    const cardWidth = 112;
    const distance = direction === 'left' ? -cardWidth * 3 : cardWidth * 3;

    trackRef.current.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  };

  return (
    <section className='cast-carousel-section'>
      <div className='cast-carousel-header'>
        <h3>Cast</h3>
        <div className='cast-carousel-controls'>
          <button type='button' className='cast-nav-button' onClick={() => scrollTrack('left')}>
            ‹
          </button>
          <button type='button' className='cast-nav-button' onClick={() => scrollTrack('right')}>
            ›
          </button>
        </div>
      </div>

      <div className='cast-carousel-track' ref={trackRef}>
        {cast.slice(0, 20).map((person) => (
          <article key={`cast-${person.id}-${person.order}`} className='cast-mini-card'>
            {person.profile_path ? (
              <img
                className='cast-mini-photo'
                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                alt={person.name}
              />
            ) : (
              <div className='cast-mini-photo placeholder'>No photo</div>
            )}
            <p className='cast-mini-name'>{person.name}</p>
            <p className='cast-mini-role'>{person.character}</p>
          </article>
        ))}
      </div>

      <section className='credits-section cast-crew-section'>
        <h3>Crew</h3>
        <div className='credits-grid'>
          {crew.slice(0, 12).map((person, index) => (
            <article key={`crew-${person.id}-${index}`} className='credit-card'>
              {person.profile_path ? (
                <img
                  className='credit-photo'
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                />
              ) : (
                <div className='credit-photo placeholder'>No photo</div>
              )}
              <p className='credit-name'>{person.name}</p>
              <p className='credit-role'>{person.job}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default CastCarousel;
