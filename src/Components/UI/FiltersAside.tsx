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
};

const FiltersAside = ({
  selectedGenres,
  setSelectedGenres,
}: FiltersAsideProps) => {
  const [showFilters, setShowFilters] = useState(true);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((genreId) => genreId !== id) : [...prev, id]
    );
  };

  return (
    <aside className="filters-panel">
      <h1 className="filters-page-title">Popular Movies</h1>

      <section className="filter-card clickable-card">
        <div className="card-header-row">
          <h2>Sort</h2>
          <span className="arrow">›</span>
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
                <input type="checkbox" defaultChecked />
                <span className="custom-checkbox"></span>
                <span>Search all releases?</span>
              </label>

              <div className="date-group">
                <label htmlFor="from">from</label>
                <div className="date-input-wrapper">
                  <input id="from" type="text" placeholder="undefined" />
                  <span className="date-icon">🗓️</span>
                </div>
              </div>

              <div className="date-group">
                <label htmlFor="to">to</label>
                <div className="date-input-wrapper">
                  <input id="to" type="text" placeholder="undefined" />
                  <span className="date-icon">🗓️</span>
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