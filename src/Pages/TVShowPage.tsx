import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FindShow } from '../Utilities/FindShow';
import { IShow } from '../Models/IShow';
import { IReview } from '../Models/IReview';
import { LoadReviews } from '../Utilities/LoadReviews';
import { ICastMember, ICrewMember } from '../Models/ICredits';
import { LoadCredits } from '../Utilities/LoadCredits';

export const TVShowPage = () => {
  const [show, setShow] = useState<IShow>();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [poster, setPoster] = useState<string>('');
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [cast, setCast] = useState<ICastMember[]>([]);
  const [crew, setCrew] = useState<ICrewMember[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const { id } = useParams();

  const toggleReview = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const getShow = async () => {
      const [found, showReviews, showCredits] = await Promise.all([
        FindShow(`tv/${id}`),
        LoadReviews('tv', id),
        LoadCredits('tv', id),
      ]);

      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${found.backdrop_path}`
      );
      setPoster(`https://image.tmdb.org/t/p/w500${found.poster_path}`);
      setShow(found);
      setReviews(showReviews);
      setCast(showCredits.cast);
      setCrew(showCredits.crew);
    };
    getShow();
  }, [id]);

  return (
    <>
      <img className='overlay' src={backgroundImage} alt={show?.name} />

      <section className='details'>
        <div>
          <img src={poster} alt={show?.name} />
        </div>
        <div className='details-info'>
          <h2>{show?.name}</h2>
          <p>
            <i className='fas fa-star rating'></i>{' '}
            {show?.vote_average.toFixed(1)} / 10
          </p>
          <p className='text-muted'>Premiär: {show?.first_air_date}</p>
          <p>{show?.overview}</p>

          <section className='credits-section'>
            <h3>Cast</h3>
            <div className='credits-grid'>
              {cast.slice(0, 12).map((person) => (
                <article key={`cast-${person.id}-${person.order}`} className='credit-card'>
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
                  <p className='credit-role'>{person.character}</p>
                </article>
              ))}
            </div>
          </section>

          <section className='credits-section'>
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

          <section className='reviews-section'>
            <h3>Reviews</h3>
            {reviews.length === 0 && <p className='text-muted'>No reviews available.</p>}
            {reviews.slice(0, 3).map((review) => (
              <article key={review.id} className='review-card'>
                <p className='review-author'>{review.author}</p>
                <p className={`review-content ${expandedReviews[review.id] ? 'expanded' : ''}`}>
                  {review.content}
                </p>
                <button
                  type='button'
                  className='review-toggle'
                  onClick={() => toggleReview(review.id)}
                >
                  {expandedReviews[review.id] ? 'Ver menos' : 'Ver más'}
                </button>
                <a className='review-link' href={review.url} target='_blank' rel='noreferrer'>
                  Read full review
                </a>
              </article>
            ))}
          </section>
        </div>
      </section>
    </>
  );
};
