import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FindMovie } from '../Utilities/FindMovie';
import { FindCollectionTranslations, ITranslation } from '../Utilities/FindCollectionTranslations';
import { IMovie } from '../Models/IMovie';
import { IReview } from '../Models/IReview';
import { useLanguage } from '../Contexts/LanguageContext';
import { LoadReviews } from '../Utilities/LoadReviews';

export const MoviePage = () => {
  const [movie, setMovie] = useState<IMovie>();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [poster, setPoster] = useState<string>('');
  const [translations, setTranslations] = useState<ITranslation[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
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
      const [found, movieReviews] = await Promise.all([
        FindMovie(`movie/${id}`),
        LoadReviews('movie', id),
      ]);

      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${found.backdrop_path}`
      );
      setPoster(`https://image.tmdb.org/t/p/w500${found.poster_path}`);
      setMovie(found);
      setReviews(movieReviews);

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

      <section className='details'>
        <div>
          <img src={poster} alt={movie?.title} />
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
