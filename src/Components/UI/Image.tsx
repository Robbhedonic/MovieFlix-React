type ImageProps = {
  imageSrc: string;
  altText: string;
};

const Image = ({ imageSrc, altText }: ImageProps) => {
  return (
    <img src={`https://image.tmdb.org/t/p/w500${imageSrc}`} alt={altText} />
  );
};
export default Image;
