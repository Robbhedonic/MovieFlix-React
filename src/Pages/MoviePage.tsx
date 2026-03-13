import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FindMovie } from '../Utilities/FindMovie';
import { FindCollectionTranslations, ITranslation } from '../Utilities/FindCollectionTranslations';
import { IMovie } from '../Models/IMovie';
import { IReview } from '../Models/IReview';
import { useLanguage } from '../Contexts/LanguageContext';
import { LoadReviews } from '../Utilities/LoadReviews';
import { ICastMember, ICrewMember } from '../Models/ICredits';
import { LoadCredits } from '../Utilities/LoadCredits';
import CastCarousel from '../Components/CastCarousel';

const getAvatarUrl = (avatarPath?: string | null): string | null => {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('/https://') || avatarPath.startsWith('/http://')) return avatarPath.slice(1);
  return `https://image.tmdb.org/t/p/w45${avatarPath}`;
};

export const MoviePage = () => {
  const [movie, setMovie] = useState<IMovie>();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [poster, setPoster] = useState<string>('');
  const [translations, setTranslations] = useState<ITranslation[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [cast, setCast] = useState<ICastMember[]>([]);
  const [crew, setCrew] = useState<ICrewMember[]>([]);
  const [showReviews, setShowReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const { id } = useParams();
  const { t } = useLanguage();

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

    const getMovie = async () => {
      const [found, movieReviews, movieCredits] = await Promise.all([
        FindMovie(`movie/${id}`),
        LoadReviews('movie', id),
        LoadCredits('movie', id),
      ]);

      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${found.backdrop_path}`
      );
      setPoster(`https://image.tmdb.org/t/p/w500${found.poster_path}`);
      setMovie(found);
      setReviews(movieReviews);
      setCast(movieCredits.cast);
      setCrew(movieCredits.crew);

      if (found.belongs_to_collection) {
        const trans = await FindCollectionTranslations(found.belongs_to_collection.id);
        setTranslations(trans);
      }
    };
    getMovie();
  }, [id]);

  return (
    <>
      <img className='overlay' src={backgroundImage} alt={movie?.title} />

      <section className='details-page'>
        <article className='details-main-card'>
          <div className='details-poster-column'>
            <img className='details-poster-image' src={poster} alt={movie?.title} />
          </div>

          <div className='details-info'>
            <h2>{movie?.title}</h2>
            <p>
              <i className='fas fa-star rating'></i>{' '}
              {movie?.vote_average.toFixed(1)} / 10
            </p>
            <p className='text-muted'>Premiär: {movie?.release_date}</p>
            <p>{movie?.overview}</p>
            {movie?.belongs_to_collection && (
              <div>
                <h3>{t('collection')}: {movie.belongs_to_collection.name}</h3>
                {translations.length > 0 && (
                  <div>
                    <h4>{t('translations')}:</h4>
                    <ul>
                      {translations.map((trans, index) => (
                        <li key={index}>
                          {trans.english_name} ({trans.iso_3166_1}): {trans.data.title || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
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
