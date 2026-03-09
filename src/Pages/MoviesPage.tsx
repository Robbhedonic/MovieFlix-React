import { useState, useEffect } from 'react';
import { IMovie } from '../Models/IMovie';
import { LoadMovies } from '../Utilities/LoadMovies';
import ItemsList from '../Components/ItemsList';
import { useLanguage } from '../Contexts/LanguageContext';

export const MoviesPage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadMovies();
  }, [language]);

  const loadMovies = async (currentPage: number = 1) => {
    setLoading(true);
    const newMovies = await LoadMovies('discover/movie', currentPage, language);
    if (currentPage === 1) {
      setMovies(newMovies);
    } else {
      setMovies(prev => [...prev, ...newMovies]);
    }
    setLoading(false);
  };

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <>
      <h1 className='page-title'>{t('popularMovies')}</h1>
      <ItemsList items={movies} />
      <button onClick={loadMoreMovies} disabled={loading}>
        {loading ? t('loading') : t('loadMoreMovies')}
      </button>
    </>
  );
};
