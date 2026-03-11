import { useState, useEffect, useCallback } from 'react';
import { IMovie } from '../Models/IMovie';
import { LoadMovies } from '../Utilities/LoadMovies';
import ItemsList from '../Components/ItemsList';
import FiltersAside from '../Components/UI/FiltersAside';
import { useLanguage } from '../Contexts/LanguageContext';

const MOVIES_PER_API_PAGE = 20;
const DESKTOP_ITEMS_PER_ROW = 5;
const TARGET_ROWS = 15;
const INITIAL_BATCH_PAGES = Math.ceil((DESKTOP_ITEMS_PER_ROW * TARGET_ROWS) / MOVIES_PER_API_PAGE);
const LOAD_MORE_BATCH_PAGES = 2;

const dedupeMoviesById = (movies: IMovie[]) => {
  const uniqueMovies = new Map<number, IMovie>();

  movies.forEach((movie) => {
    uniqueMovies.set(movie.id, movie);
  });

  return Array.from(uniqueMovies.values());
};


export const MoviesPage = () => {
  const { language, t } = useLanguage();

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'title-az' | 'title-za' | 'date-desc' | 'date-asc'>('title-az');
  const [searchAllReleases, setSearchAllReleases] = useState(true);
  const [releaseDateFrom, setReleaseDateFrom] = useState('');
  const [releaseDateTo, setReleaseDateTo] = useState('');

  const loadMovies = useCallback(
    async (currentPage: number = 1, pagesToLoad: number = 1) => {
      setLoading(true);

      let endpoint = 'discover/movie?';

      if (selectedGenres.length > 0) {
        endpoint += `with_genres=${selectedGenres.join(',')}&`;
      }

      if (!searchAllReleases) {
        if (releaseDateFrom) {
          endpoint += `primary_release_date.gte=${releaseDateFrom}&`;
        }

        if (releaseDateTo) {
          endpoint += `primary_release_date.lte=${releaseDateTo}&`;
        }
      }

      const pages = Array.from({ length: pagesToLoad }, (_, index) => currentPage + index);
      const moviePages = await Promise.all(
        pages.map((pageToLoad) => LoadMovies(endpoint, pageToLoad, language))
      );
      const newMovies = dedupeMoviesById(moviePages.flat());

      if (currentPage === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prev: IMovie[]) => dedupeMoviesById([...prev, ...newMovies]));
      }

      setLoading(false);
    },
    [language, selectedGenres, searchAllReleases, releaseDateFrom, releaseDateTo]
  );

  useEffect(() => {
    setPage(INITIAL_BATCH_PAGES);
    loadMovies(1, INITIAL_BATCH_PAGES);
  }, [loadMovies]);

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(page + LOAD_MORE_BATCH_PAGES);
    loadMovies(nextPage, LOAD_MORE_BATCH_PAGES);
  };

  const sortedMovies = [...movies].sort((firstMovie, secondMovie) => {
    const firstTitle = firstMovie.title ?? '';
    const secondTitle = secondMovie.title ?? '';
    const firstDate = firstMovie.release_date ? new Date(firstMovie.release_date).getTime() : 0;
    const secondDate = secondMovie.release_date ? new Date(secondMovie.release_date).getTime() : 0;

    switch (sortOrder) {
      case 'title-az':
        return firstTitle.localeCompare(secondTitle);
      case 'title-za':
        return secondTitle.localeCompare(firstTitle);
      case 'date-desc':
        return secondDate - firstDate;
      case 'date-asc':
        return firstDate - secondDate;
      default:
        return 0;
    }
  });

  return (
    <div className="movies-page-layout">
      <FiltersAside
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchAllReleases={searchAllReleases}
        setSearchAllReleases={setSearchAllReleases}
        releaseDateFrom={releaseDateFrom}
        setReleaseDateFrom={setReleaseDateFrom}
        releaseDateTo={releaseDateTo}
        setReleaseDateTo={setReleaseDateTo}
      />

      <main className="movies-content">
        <h1 className='page-title'>{t('popularMovies')}</h1>
        <ItemsList items={sortedMovies} />

        <button className="load-more-button" onClick={loadMoreMovies} disabled={loading}>
          {loading ? t('loading') : t('loadMoreMovies')}
        </button>
      </main>
    </div>
  );
};