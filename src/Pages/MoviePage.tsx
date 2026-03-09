import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FindMovie } from '../Utilities/FindMovie';
import { FindCollectionTranslations, ITranslation } from '../Utilities/FindCollectionTranslations';
import { IMovie } from '../Models/IMovie';
import { useLanguage } from '../Contexts/LanguageContext';

export const MoviePage = () => {
  const [movie, setMovie] = useState<IMovie>();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [poster, setPoster] = useState<string>('');
  const [translations, setTranslations] = useState<ITranslation[]>([]);
  const { id } = useParams();
  const { t } = useLanguage();

  useEffect(() => {
    const getMovie = async () => {
      const found = await FindMovie(`movie/${id}`);
      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${found.backdrop_path}`
      );
      setPoster(`https://image.tmdb.org/t/p/w500${found.poster_path}`);
      setMovie(found);

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
        </div>
      </section>
    </>
  );
};
