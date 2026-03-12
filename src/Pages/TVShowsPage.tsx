import { useState, useEffect, useCallback } from 'react';
import { IShow } from '../Models/IShow';
import { LoadShows } from '../Utilities/LoadShows';
import ItemsList from '../Components/ItemsList';
import FiltersAside from '../Components/UI/FiltersAside';
import { useLanguage } from '../Contexts/LanguageContext';

const SHOWS_PER_API_PAGE = 20;
const DESKTOP_ITEMS_PER_ROW = 5;
const TARGET_ROWS = 15;
const INITIAL_BATCH_PAGES = Math.ceil((DESKTOP_ITEMS_PER_ROW * TARGET_ROWS) / SHOWS_PER_API_PAGE);
const LOAD_MORE_BATCH_PAGES = 2;

const dedupeShowsById = (shows: IShow[]) => {
  const uniqueShows = new Map<number, IShow>();

  shows.forEach((show) => {
    uniqueShows.set(show.id, show);
  });

  return Array.from(uniqueShows.values());
};

export const TVShowsPage = () => {
  const { language, t } = useLanguage();
  const [shows, setShows] = useState<IShow[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'title-az' | 'title-za' | 'date-desc' | 'date-asc'>('title-az');
  const [searchAllReleases, setSearchAllReleases] = useState(true);
  const [releaseDateFrom, setReleaseDateFrom] = useState('');
  const [releaseDateTo, setReleaseDateTo] = useState('');

  const loadShows = useCallback(
    async (currentPage: number = 1, pagesToLoad: number = 1) => {
      setLoading(true);

      let endpoint = 'discover/tv?';

      if (selectedGenres.length > 0) {
        endpoint += `with_genres=${selectedGenres.join(',')}&`;
      }

      if (!searchAllReleases) {
        if (releaseDateFrom) {
          endpoint += `first_air_date.gte=${releaseDateFrom}&`;
        }

        if (releaseDateTo) {
          endpoint += `first_air_date.lte=${releaseDateTo}&`;
        }
      }

      const pages = Array.from({ length: pagesToLoad }, (_, index) => currentPage + index);
      const showPages = await Promise.all(
        pages.map((pageToLoad) => LoadShows(endpoint, pageToLoad, language))
      );
      const newShows = dedupeShowsById(showPages.flat());

      if (currentPage === 1) {
        setShows(newShows);
      } else {
        setShows((prev) => dedupeShowsById([...prev, ...newShows]));
      }

      setLoading(false);
    },
    [language, selectedGenres, searchAllReleases, releaseDateFrom, releaseDateTo]
  );

  useEffect(() => {
    setPage(INITIAL_BATCH_PAGES);
    loadShows(1, INITIAL_BATCH_PAGES);
  }, [loadShows]);

  const loadMoreShows = () => {
    const nextPage = page + 1;
    setPage(page + LOAD_MORE_BATCH_PAGES);
    loadShows(nextPage, LOAD_MORE_BATCH_PAGES);
  };

  const sortedShows = [...shows].sort((firstShow, secondShow) => {
    const firstTitle = firstShow.name ?? '';
    const secondTitle = secondShow.name ?? '';
    const firstDate = firstShow.first_air_date ? new Date(firstShow.first_air_date).getTime() : 0;
    const secondDate = secondShow.first_air_date ? new Date(secondShow.first_air_date).getTime() : 0;

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

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredShows = sortedShows.filter((show) => {
    if (!normalizedQuery) {
      return true;
    }

    return (show.name ?? '').toLowerCase().includes(normalizedQuery);
  });

  return (
    <div className="movies-page-layout">
      <FiltersAside
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
        <h1 className='page-title'>{t('popularShows')}</h1>
        <ItemsList items={filteredShows} />

        <button className="load-more-button" onClick={loadMoreShows} disabled={loading}>
          {loading ? t('loading') : t('loadMoreShows')}
        </button>
      </main>
    </div>
  );
};
