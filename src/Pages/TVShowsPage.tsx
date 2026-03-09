import { useState, useEffect } from 'react';
import { IShow } from '../Models/IShow';
import { LoadShows } from '../Utilities/LoadShows';
import ItemsList from '../Components/ItemsList';
import { useLanguage } from '../Contexts/LanguageContext';

export const TVShowsPage = () => {
  const { language, t } = useLanguage();
  const [shows, setShows] = useState<IShow[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMovies();
  }, [language]);

  const loadMovies = async (currentPage: number = 1) => {
    setLoading(true);
    const newShows = await LoadShows('discover/tv', currentPage, language);
    if (currentPage === 1) {
      setShows(newShows);
    } else {
      setShows(prev => [...prev, ...newShows]);
    }
    setLoading(false);
  };

  const loadMoreShows = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <>
      <h1 className='page-title'>{t('popularShows')}</h1>
      <ItemsList items={shows} />
      <button onClick={loadMoreShows} disabled={loading}>
        {loading ? t('loading') : t('loadMoreShows')}
      </button>
    </>
  );
};
