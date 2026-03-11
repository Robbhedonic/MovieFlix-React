import { useRef, useEffect } from 'react';
import { IMovie } from '../Models/IMovie';
import { IShow } from '../Models/IShow';
import ImageLink from './UI/ImageLink';
import styles from './Carousel.module.css';

type CarouselProps = {
  items: IMovie[] | IShow[];
  onLoadMore?: () => void;
  loading?: boolean;
};

const Carousel = ({ items, onLoadMore, loading = false }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        if (carouselRef.current) {
          const scrollAmount = 300;
          carouselRef.current.scrollLeft += scrollAmount;
        }
      }, 3000); // Scroll every 3 seconds
    };

    if (items.length > 0) {
      startAutoScroll();
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [items]);

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      // Load more when reaching the end
      if (
        carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth - 500 &&
        onLoadMore &&
        !loading
      ) {
        onLoadMore();
      }
    }
  };

  if (!items || items.length === 0) {
    return <p>No movies available</p>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carousel}
        ref={carouselRef}
        onScroll={handleCarouselScroll}
      >
        {items.map((item) => {
          const isMovie = (item as IMovie).title !== undefined;
          const media = item as IMovie | IShow;

          return (
            <div key={media.id} className={styles.carouselItem}>
              <ImageLink
                href={
                  isMovie
                    ? `/movies/${media.id}`
                    : `/shows/${media.id}`
                }
                imageSrc={media.poster_path}
                altText={
                  isMovie
                    ? (media as IMovie).title
                    : (media as IShow).name
                }
              />
            </div>
          );
        })}
      </div>

      {loading && <div className={styles.loadingIndicator}>Loading...</div>}
    </div>
  );
};

export default Carousel;
