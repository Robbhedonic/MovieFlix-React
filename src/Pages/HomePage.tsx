import { useState, useEffect, useCallback, useRef } from 'react';
import { IMovie } from '../Models/IMovie';
import { LoadMovies } from '../Utilities/LoadMovies';
import Carousel from '../Components/Carousel';
import { useLanguage } from '../Contexts/LanguageContext';

export const HomePage = () => {
  const { language } = useLanguage();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const colorBoxes = Array.from({ length: 10000 });
  const bgAnimationRef = useRef<HTMLDivElement>(null);
  const activeTimeoutsRef = useRef<Map<number, number>>(new Map());

  const loadMovies = useCallback(
    async (currentPage: number = 1) => {
      setLoading(true);
      const newMovies = await LoadMovies('trending/movie/week?', currentPage, language);

      if (currentPage === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prev: IMovie[]) => [...prev, ...newMovies]);
      }

      setLoading(false);
    },
    [language]
  );

  useEffect(() => {
    loadMovies(1);
  }, [loadMovies]);

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const bgAnimation = bgAnimationRef.current;

    if (!bgAnimation) {
      return;
    }

    const rect = bgAnimation.getBoundingClientRect();
    const columns = 40;
    const rows = Math.ceil(colorBoxes.length / columns);
    const boxWidth = rect.width / columns;
    const boxHeight = rect.height / rows;
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    if (relativeX < 0 || relativeY < 0 || relativeX > rect.width || relativeY > rect.height) {
      return;
    }

    const columnIndex = Math.floor(relativeX / boxWidth);
    const rowIndex = Math.floor(relativeY / boxHeight);
    const activeIndex = rowIndex * columns + columnIndex;
    const colorBox = bgAnimation.children[activeIndex] as HTMLElement | undefined;

    if (!colorBox) {
      return;
    }

    colorBox.classList.add('active');

    const previousTimeout = activeTimeoutsRef.current.get(activeIndex);
    if (previousTimeout) {
      window.clearTimeout(previousTimeout);
    }

    const timeoutId = window.setTimeout(() => {
      colorBox.classList.remove('active');
      activeTimeoutsRef.current.delete(activeIndex);
    }, 450);

    activeTimeoutsRef.current.set(activeIndex, timeoutId);
  };

  useEffect(() => {
    const activeTimeouts = activeTimeoutsRef.current;

    return () => {
      activeTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      activeTimeouts.clear();
    };
  }, []);

  return (
    <section className='home-page' onMouseMove={handleMouseMove}>
      <div id='bgAnimation' className='bg-animation' ref={bgAnimationRef}>
        {colorBoxes.map((_, index) => (
          <div key={index} className='colorBox'></div>
        ))}
      </div>

      <h1 className='page-title'>MovieFlix</h1>
      
      <div className='home-content' style={{ padding: '0 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f4f4f4' }}>
          Trending Movies
        </h2>
        <Carousel 
          items={movies} 
          onLoadMore={loadMoreMovies}
          loading={loading}
        />
      </div>

      <article className='bread-text home-content' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '2.5rem', borderRadius: '15px', backdropFilter: 'blur(5px)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#f4f4f4', fontWeight: '700', marginTop: '2rem' }}>
          Discover Entertainment Without Limits
        </h2>
        <p style={{ fontSize: '1rem', color: '#b0b0b0', marginBottom: '1.5rem', fontStyle: 'italic' }}>
          Your ultimate destination for extraordinary movies and series
        </p>

        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: '#ff1744', fontWeight: '600', marginTop: '1.5rem' }}>
          Why MovieFlix?
        </h3>
        <p>
          Welcome to MovieFlix, your ultimate platform for movies and TV series.
          With a constantly growing catalog, we bring you access to thousands of original titles,
          exciting documentaries, and exclusive productions that take you into new and fascinating worlds.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <h4 style={{ color: '#ff1744', marginBottom: '0.5rem', fontWeight: '600' }}>Diverse Content</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              From thrilling action movies and captivating dramas to comedies that make you laugh
              and documentaries that broaden your view of the world.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ff1744', marginBottom: '0.5rem', fontWeight: '600' }}>Personalized Recommendations</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Browse by genre, discover recommendations based on your taste,
              and keep up with your favorite series with ease.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ff1744', marginBottom: '0.5rem', fontWeight: '600' }}>Latest Technology</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Enjoy a high-quality viewing experience with constant updates
              and a modern, intuitive interface.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ff1744', marginBottom: '0.5rem', fontWeight: '600' }}>Exclusive Releases</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Get access to premieres and exclusive content selected especially for you.
              Be the first to watch the latest in film and television.
            </p>
          </div>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: '1.8', color: '#f4f4f4' }}>
          With MovieFlix, quality entertainment is always within reach.
          <strong style={{ color: '#ff1744' }}> Start your cinematic journey today!</strong>
        </p>
      </article>
    </section>
  );
};
