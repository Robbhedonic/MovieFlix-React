import { useState, useEffect, useCallback } from 'react';
import { IMovie } from '../Models/IMovie';
import { LoadMovies } from '../Utilities/LoadMovies';
import ItemsList from '../Components/ItemsList';
import FiltersAside from '../Components/UI/FiltersAside';
import { useLanguage } from '../Contexts/LanguageContext';


export const MoviesPage = () => {
  const { language, t } = useLanguage();

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const loadMovies = useCallback(
    async (currentPage: number = 1) => {
      setLoading(true);

      let endpoint = 'discover/movie?';

      if (selectedGenres.length > 0) {
        endpoint += `with_genres=${selectedGenres.join(',')}&`;
      }

      const newMovies = await LoadMovies(endpoint, currentPage, language);

      if (currentPage === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prev: IMovie[]) => [...prev, ...newMovies]);
      }

      setLoading(false);
    },
    [language, selectedGenres]
  );

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [loadMovies]);

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <div className="movies-page-layout">
      <FiltersAside
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      <main className="movies-content">
        <ItemsList items={movies} />

        <button onClick={loadMoreMovies} disabled={loading}>
          {loading ? t('loading') : t('loadMoreMovies')}
        </button>
      </main>
    </div>
  );
};