import { NavLink } from 'react-router-dom';
// import Image from './Image';

type ImageLinkProps = {
  imageSrc: string;
  altText: string;
  href: string;
};

const ImageLink = ({ imageSrc, altText, href }: ImageLinkProps) => {
  return (
    <NavLink to={href}>
      <img src={`https://image.tmdb.org/t/p/w500${imageSrc}`} alt={altText} />
      {/* <Image imageSrc={imageSrc} altText={altText} /> */}
    </NavLink>
  );
};
export default ImageLink;
