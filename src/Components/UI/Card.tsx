import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return <section className='card'>{children}</section>;
};
export default Card;
