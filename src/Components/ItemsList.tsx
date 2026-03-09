import { IMovie } from '../Models/IMovie';
import { IShow } from '../Models/IShow';
import Item from './Item';
import { useLanguage } from '../Contexts/LanguageContext';

type ItemListProps = {
  items: IMovie[] | IShow[];
};

const ItemsList = ({ items }: ItemListProps) => {
  const { t } = useLanguage();

  if (!items || items.length === 0) {
    return <p>{t('noItems')}</p>;
  }

  return (
    <section className='grid'>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </section>
  );
};
export default ItemsList;
