import { useState, useEffect, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import { FindShow } from '../Utilities/FindShow';
import { IShow } from '../Models/IShow';
import { IReview } from '../Models/IReview';
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

const formatRuntime = (runtimeMinutes?: number) => {
  if (!runtimeMinutes || runtimeMinutes <= 0) return '';
  if (runtimeMinutes >= 60) {
    const hours = Math.floor(runtimeMinutes / 60);
    const minutes = runtimeMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  return `${runtimeMinutes}m`;
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
  const votePercentage = Math.max(0, Math.min(100, Math.round((show?.vote_average ?? 0) * 10)));
  const voteBadgeStyle = {
    '--score': `${votePercentage}%`,
    '--ring-color': getVoteColor(votePercentage),
  } as CSSProperties;
  const releaseDate = show?.first_air_date ?? '';
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : '';
  const genreNames =
    show?.genres?.map((genre) => genre.name).slice(0, 3).join(', ') ||
    (show?.genre_ids ?? [])
      .map((genreId) => movieGenres.find((genre) => genre.id === genreId)?.name)
      .filter((name): name is string => Boolean(name))
      .slice(0, 3)
      .join(', ');
  const runtimeText = formatRuntime(show?.episode_run_time?.[0]);
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
      <section className='details-page'>
        <article className='details-main-card details-main-hero' style={detailsHeroStyle}>
          <div className='details-poster-column'>
            <img className='details-poster-image' src={poster} alt={show?.name} />
          </div>

          <div className='details-info'>
            <h2 className='details-title'>
              {show?.name}
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
            {show?.tagline && <p className='details-tagline'>{show.tagline}</p>}
            <h3 className='details-overview-title'>Overview</h3>
            <p className='details-overview'>{show?.overview}</p>
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
