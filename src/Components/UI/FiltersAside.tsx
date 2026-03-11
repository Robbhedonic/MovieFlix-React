import { useState } from 'react';

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

type FiltersAsideProps = {
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  sortOrder: 'title-az' | 'title-za' | 'date-desc' | 'date-asc';
  setSortOrder: React.Dispatch<React.SetStateAction<'title-az' | 'title-za' | 'date-desc' | 'date-asc'>>;
  searchAllReleases: boolean;
  setSearchAllReleases: React.Dispatch<React.SetStateAction<boolean>>;
  releaseDateFrom: string;
  setReleaseDateFrom: React.Dispatch<React.SetStateAction<string>>;
  releaseDateTo: string;
  setReleaseDateTo: React.Dispatch<React.SetStateAction<string>>;
};

const FiltersAside = ({
  selectedGenres,
  setSelectedGenres,
  sortOrder,
  setSortOrder,
  searchAllReleases,
  setSearchAllReleases,
  releaseDateFrom,
  setReleaseDateFrom,
  releaseDateTo,
  setReleaseDateTo,
}: FiltersAsideProps) => {
  const [showFilters, setShowFilters] = useState(true);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((genreId) => genreId !== id) : [...prev, id]
    );
  };

  return (
    <aside className="filters-panel">
      <section className="filter-card clickable-card">
        <div className="sort-card-header">
          <h2>Sort by Title</h2>
          <p className="sort-card-subtitle">Choose how the movie list should be ordered.</p>
        </div>

        <div className="sort-actions">
          <button
            type="button"
            className={`sort-button ${sortOrder === 'title-az' ? 'active' : ''}`}
            onClick={() => setSortOrder('title-az')}
          >
            Title A-Z
          </button>
          <button
            type="button"
            className={`sort-button ${sortOrder === 'title-za' ? 'active' : ''}`}
            onClick={() => setSortOrder('title-za')}
          >
            Title Z-A
          </button>
          <button
            type="button"
            className={`sort-button ${sortOrder === 'date-desc' ? 'active' : ''}`}
            onClick={() => setSortOrder('date-desc')}
          >
            Newest-Oldest
          </button>
          <button
            type="button"
            className={`sort-button ${sortOrder === 'date-asc' ? 'active' : ''}`}
            onClick={() => setSortOrder('date-asc')}
          >
            Oldest-Newest
          </button>
        </div>
      </section>

      <section className="filter-card clickable-card">
        <div className="card-header-row">
          <h2>Where To Watch</h2>
          <div className="watch-badge-row">
            <span className="watch-count">63</span>
            <span className="arrow">›</span>
          </div>
        </div>
      </section>

      <section className="filter-card">
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          type="button"
        >
          <span>Filters</span>
          <span className={`chevron ${showFilters ? 'open' : ''}`}>⌄</span>
        </button>

        {showFilters && (
          <div className="filter-sections">
            <div className="filter-section">
              <h3>Show Me</h3>

              <label className="radio-option">
                <input type="radio" name="showme" defaultChecked />
                <span className="custom-radio"></span>
                <span>Everything</span>
              </label>

              <label className="radio-option">
                <input type="radio" name="showme" />
                <span className="custom-radio"></span>
                <span>Movies I Haven&apos;t Seen</span>
              </label>

              <label className="radio-option">
                <input type="radio" name="showme" />
                <span className="custom-radio"></span>
                <span>Movies I Have Seen</span>
              </label>
            </div>

            <div className="filter-section">
              <h3>Availabilities</h3>

              <label className="checkbox-option">
                <input type="checkbox" defaultChecked />
                <span className="custom-checkbox"></span>
                <span>Search all availabilities?</span>
              </label>
            </div>

            <div className="filter-section">
              <h3>Release Dates</h3>

              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={searchAllReleases}
                  onChange={(event) => setSearchAllReleases(event.target.checked)}
                />
                <span className="custom-checkbox"></span>
                <span>Search all releases?</span>
              </label>

              <div className="date-group">
                <label htmlFor="from">from</label>
                <div className="date-input-wrapper">
                  <input
                    id="from"
                    type="date"
                    value={releaseDateFrom}
                    onChange={(event) => setReleaseDateFrom(event.target.value)}
                    disabled={searchAllReleases}
                  />
                </div>
              </div>

              <div className="date-group">
                <label htmlFor="to">to</label>
                <div className="date-input-wrapper">
                  <input
                    id="to"
                    type="date"
                    value={releaseDateTo}
                    onChange={(event) => setReleaseDateTo(event.target.value)}
                    disabled={searchAllReleases}
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3>Genres</h3>

              <div className="genre-tags">
  {genres.map((genre) => (
    <button
      key={genre.id}
      type="button"
      className={`genre-chip ${
        selectedGenres.includes(genre.id) ? "active" : ""
      }`}
      onClick={() => toggleGenre(genre.id)}
    >
      {genre.name}
    </button>
  ))}
</div>
            </div>
          </div>
        )}
      </section>
    </aside>
  );
};

export default FiltersAside;