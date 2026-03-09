import { IMovie } from '../Models/IMovie';
import { IShow } from '../Models/IShow';
import Card from './UI/Card';
import ImageLink from './UI/ImageLink';

type ItemProps = {
  item: IMovie | IShow;
};

function isMovie(media: IMovie | IShow): media is IMovie {
  return (media as IMovie).title !== undefined;
}

const Item = ({ item }: ItemProps) => {
  if (isMovie(item)) {
    const media = item as IMovie; // Tvingande typ konvertering
    return (
      <Card>
        <ImageLink
          href={`/movies/${media.id}`}
          imageSrc={media.poster_path}
          altText={media.title}
        />

        <div className='card-body'>
          <h5>{media.title}</h5>
          <small className='text-muted'>{media.release_date}</small>
        </div>
      </Card>
    );
  }

  const media = item as IShow;

  // Om det är en tv serie så gör vi detta
  return (
    <Card>
      <ImageLink
        href={`/shows/${media.id}`}
        imageSrc={media.poster_path}
        altText={media.name}
      />
      <div className='card-body'>
        <h5>{media.name}</h5>
        <small className='text-muted'>{media.first_air_date}</small>
      </div>
    </Card>
  );
};
export default Item;
