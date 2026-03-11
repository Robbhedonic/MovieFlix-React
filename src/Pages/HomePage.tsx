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
  const colorBoxes = Array.from({ length: 8000 });
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
    const columns = window.innerWidth <= 768 ? 24 : 40;
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
      
      <div className='home-content home-section-padding'>
        <h2 className='home-section-title'>
          Trending Movies
        </h2>
        <Carousel 
          items={movies} 
          onLoadMore={loadMoreMovies}
          loading={loading}
        />
      </div>

      <article className='bread-text home-content home-article'>
        <h2 className='home-heading'>
          Discover Entertainment Without Limits
        </h2>
        <p className='home-subheading'>
          Your ultimate destination for extraordinary movies and series
        </p>

        <h3 className='home-why-title'>
          Why MovieFlix?
        </h3>
        <p>
          Welcome to MovieFlix, your ultimate platform for movies and TV series.
          With a constantly growing catalog, we bring you access to thousands of original titles,
          exciting documentaries, and exclusive productions that take you into new and fascinating worlds.
        </p>

        <div className='home-features-grid'>
          <div>
            <h4 className='home-feature-title'>Diverse Content</h4>
            <p className='home-feature-text'>
              From thrilling action movies and captivating dramas to comedies that make you laugh
              and documentaries that broaden your view of the world.
            </p>
          </div>
          <div>
            <h4 className='home-feature-title'>Personalized Recommendations</h4>
            <p className='home-feature-text'>
              Browse by genre, discover recommendations based on your taste,
              and keep up with your favorite series with ease.
            </p>
          </div>
          <div>
            <h4 className='home-feature-title'>Latest Technology</h4>
            <p className='home-feature-text'>
              Enjoy a high-quality viewing experience with constant updates
              and a modern, intuitive interface.
            </p>
          </div>
          <div>
            <h4 className='home-feature-title'>Exclusive Releases</h4>
            <p className='home-feature-text'>
              Get access to premieres and exclusive content selected especially for you.
              Be the first to watch the latest in film and television.
            </p>
          </div>
        </div>

        <p className='home-cta'>
          With MovieFlix, quality entertainment is always within reach.
          <strong> Start your cinematic journey today!</strong>
        </p>
      </article>
    </section>
  );
};
