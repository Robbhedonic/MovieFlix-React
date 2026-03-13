import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FindShow } from '../Utilities/FindShow';
import { IShow } from '../Models/IShow';
import { IReview } from '../Models/IReview';
import { LoadReviews } from '../Utilities/LoadReviews';
import { ICastMember, ICrewMember } from '../Models/ICredits';
import { LoadCredits } from '../Utilities/LoadCredits';
import CastCarousel from '../Components/CastCarousel';

const getAvatarUrl = (avatarPath?: string | null): string | null => {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('/https://') || avatarPath.startsWith('/http://')) return avatarPath.slice(1);
  return `https://image.tmdb.org/t/p/w45${avatarPath}`;
};

export const TVShowPage = () => {
  const [show, setShow] = useState<IShow>();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [poster, setPoster] = useState<string>('');
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [cast, setCast] = useState<ICastMember[]>([]);
  const [crew, setCrew] = useState<ICrewMember[]>([]);
  const [showReviews, setShowReviews] = useState(false);
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

      <section className='details-page'>
        <article className='details-main-card'>
          <div className='details-poster-column'>
            <img className='details-poster-image' src={poster} alt={show?.name} />
          </div>

          <div className='details-info'>
            <h2>{show?.name}</h2>
            <p>
              <i className='fas fa-star rating'></i>{' '}
              {show?.vote_average.toFixed(1)} / 10
            </p>
            <p className='text-muted'>Premiär: {show?.first_air_date}</p>
            <p>{show?.overview}</p>
          </div>
        </article>

        <CastCarousel cast={cast} crew={crew} />

        <section className='reviews-panel'>
          <button
            type='button'
            className='reviews-link-toggle'
            onClick={() => setShowReviews((prev) => !prev)}
            aria-expanded={showReviews}
          >
            Reviews
          </button>

          {showReviews && (
            <section className='reviews-section'>
              {reviews.length === 0 && <p className='text-muted'>No reviews available.</p>}
              {reviews.slice(0, 3).map((review) => (
                <article key={review.id} className='review-card'>
                  <div className='review-header'>
                    {getAvatarUrl(review.author_details?.avatar_path) ? (
                      <img
                        className='review-avatar'
                        src={getAvatarUrl(review.author_details?.avatar_path)!}
                        alt={review.author}
                      />
                    ) : (
                      <div className='review-avatar review-avatar-placeholder'>
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <p className='review-author'>{review.author}</p>
                  </div>
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
          )}
        </section>
      </section>
    </>
  );
};
