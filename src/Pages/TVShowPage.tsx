import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FindShow } from '../Utilities/FindShow';
import { IShow } from '../Models/IShow';

export const TVShowPage = () => {
  const [show, setShow] = useState<IShow>();
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [poster, setPoster] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    const getShow = async () => {
      const found = await FindShow(`tv/${id}`);
      setBackgroundImage(
        `https://image.tmdb.org/t/p/original/${found.backdrop_path}`
      );
      setPoster(`https://image.tmdb.org/t/p/w500${found.poster_path}`);
      setShow(found);
    };
    getShow();
  }, [id]);

  return (
    <>
      <img className='overlay' src={backgroundImage} alt={show?.name} />

      <section className='details'>
        <div>
          <img src={poster} alt={show?.name} />
        </div>
        <div className='details-info'>
          <h2>{show?.name}</h2>
          <p>
            <i className='fas fa-star rating'></i>{' '}
            {show?.vote_average.toFixed(1)} / 10
          </p>
          <p className='text-muted'>Premiär: {show?.first_air_date}</p>
          <p>{show?.overview}</p>
        </div>
      </section>
    </>
  );
};
