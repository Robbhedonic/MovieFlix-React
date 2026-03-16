import { useState, useEffect } from 'react';
import { IMovie } from '../Models/IMovie';
import { LoadMovies } from '../Utilities/LoadMovies';
import ItemsList from '../Components/ItemsList';
import { useLanguage } from '../Contexts/LanguageContext';

export const AwardsPopularPage = () => {
  const { language, t } = useLanguage();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const results = await LoadMovies('movie/popular?', 1, language);
      setMovies(results);
      setLoading(false);
    };
    fetchMovies();
  }, [language]);

  return (
    <main className="movies-content">
      <h1 className="page-title">{t('awardsPopular')}</h1>
      {loading ? <p>{t('loading')}</p> : <ItemsList items={movies} />}
    </main>
  );
};
