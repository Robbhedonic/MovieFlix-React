import { useState, useEffect, CSSProperties } from 'react';
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
import { movieGenres } from '../Models/genres';

const getAvatarUrl = (avatarPath?: string | null): string | null => {
  if (!avatarPath) return null;
  if (avatarPath.startsWith('/https://') || avatarPath.startsWith('/http://')) return avatarPath.slice(1);
  return `https://image.tmdb.org/t/p/w45${avatarPath}`;
};

const getVoteClass = (votePercentage: number) => {
  if (votePercentage >= 70) {
    return 'rating-high';
  }

  if (votePercentage >= 50) {
    return 'rating-mid';
  }

  return 'rating-low';
};

const getVoteColor = (votePercentage: number) => {
  if (votePercentage >= 70) {
    return '#26cc6b';
  }

  if (votePercentage >= 50) {
    return '#ffd24d';
  }

  return '#ff4c4c';
};

const formatRuntime = (runtime?: number) => {
  if (!runtime || runtime <= 0) return '';
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
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
  const votePercentage = Math.max(0, Math.min(100, Math.round((movie?.vote_average ?? 0) * 10)));
  const voteBadgeStyle = {
    '--score': `${votePercentage}%`,
    '--ring-color': getVoteColor(votePercentage),
  } as CSSProperties;
  const releaseDate = movie?.release_date ?? '';
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : '';
  const genreNames =
    movie?.genres?.map((genre) => genre.name).slice(0, 3).join(', ') ||
    (movie?.genre_ids ?? [])
      .map((genreId) => movieGenres.find((genre) => genre.id === genreId)?.name)
      .filter((name): name is string => Boolean(name))
      .slice(0, 3)
      .join(', ');
  const runtimeText = formatRuntime(movie?.runtime);
  const detailsHeroStyle = {
    '--details-bg-image': backgroundImage ? `url("${backgroundImage}")` : 'none',
  } as CSSProperties;

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
      <section className='details-page'>
        <article className='details-main-card details-main-hero' style={detailsHeroStyle}>
          <div className='details-poster-column'>
            <img className='details-poster-image' src={poster} alt={movie?.title} />
          </div>

          <div className='details-info'>
            <h2 className='details-title'>
              {movie?.title}
              {releaseYear && <span className='details-year'> ({releaseYear})</span>}
            </h2>
            <p className='details-meta-line'>
              <span>{releaseDate}</span>
              {genreNames && (
                <>
                  <span className='details-meta-sep'>•</span>
                  <span>{genreNames}</span>
                </>
              )}
              {runtimeText && (
                <>
                  <span className='details-meta-sep'>•</span>
                  <span>{runtimeText}</span>
                </>
              )}
            </p>
            <div className='details-score-row'>
              <div className={`rating-badge details-score-badge ${getVoteClass(votePercentage)}`} style={voteBadgeStyle}>
                {votePercentage}%
              </div>
              <span className='details-score-label'>User Score</span>
            </div>
            <div className='details-actions-row'>
              <button type='button' className='details-action-btn' aria-label='Add to list'>
                <i className='fas fa-list-ul'></i>
              </button>
              <button type='button' className='details-action-btn' aria-label='Add to favorites'>
                <i className='fas fa-heart'></i>
              </button>
              <button type='button' className='details-action-btn' aria-label='Add to watchlist'>
                <i className='fas fa-bookmark'></i>
              </button>
              <button type='button' className='details-trailer-link' aria-label='Play trailer'>
                <i className='fas fa-play'></i>
                <span>Play Trailer</span>
              </button>
            </div>
            <p className='text-muted details-release-date'>Premiär: {releaseDate}</p>
            {movie?.tagline && <p className='details-tagline'>{movie.tagline}</p>}
            <h3 className='details-overview-title'>Overview</h3>
            <p className='details-overview'>{movie?.overview}</p>
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
