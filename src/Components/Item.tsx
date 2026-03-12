import { CSSProperties } from 'react';
import { IMovie } from '../Models/IMovie';
import { IShow } from '../Models/IShow';
import Card from './UI/Card';
import ImageLink from './UI/ImageLink';

type ItemProps = {
  item: IMovie | IShow;
};

const getVoteClass = (votePercentage: number) => {
  if (votePercentage >= 70) {
    return 'rating-high';
  }

  if (votePercentage >= 50) {
    return 'rating-mid';
  }

  return 'rating-low';
};

const getVoteColor = (votePercentage: number) => {
  if (votePercentage >= 70) {
    return '#26cc6b';
  }

  if (votePercentage >= 50) {
    return '#ffd24d';
  }

  return '#ff4c4c';
};

function isMovie(media: IMovie | IShow): media is IMovie {
  return (media as IMovie).title !== undefined;
}

const Item = ({ item }: ItemProps) => {
  if (isMovie(item)) {
    const media = item as IMovie; // Tvingande typ konvertering
    const voteAverage = Number(media.vote_average ?? 0);
    const votePercentage = Math.max(0, Math.min(100, Math.round(voteAverage * 10)));
    const badgeStyle = {
      '--score': `${votePercentage}%`,
      '--ring-color': getVoteColor(votePercentage),
    } as CSSProperties;

    return (
      <Card>
        <ImageLink
          href={`/movies/${media.id}`}
          imageSrc={media.poster_path}
          altText={media.title}
        />

        <div className='card-body'>
          <div className='card-meta-row'>
            <div className={`rating-badge ${getVoteClass(votePercentage)}`} style={badgeStyle}>
              {votePercentage}%
            </div>
            <div className='card-meta-text'>
              <h5>{media.title}</h5>
              <small className='text-muted'>{media.release_date}</small>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const media = item as IShow;
  const voteAverage = Number(media.vote_average ?? 0);
  const votePercentage = Math.max(0, Math.min(100, Math.round(voteAverage * 10)));
  const badgeStyle = {
    '--score': `${votePercentage}%`,
    '--ring-color': getVoteColor(votePercentage),
  } as CSSProperties;

  // Om det är en tv serie så gör vi detta
  return (
    <Card>
      <ImageLink
        href={`/shows/${media.id}`}
        imageSrc={media.poster_path}
        altText={media.name}
      />
      <div className='card-body'>
        <div className='card-meta-row'>
          <div className={`rating-badge ${getVoteClass(votePercentage)}`} style={badgeStyle}>
            {votePercentage}%
          </div>
          <div className='card-meta-text'>
            <h5>{media.name}</h5>
            <small className='text-muted'>{media.first_air_date}</small>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Item;
