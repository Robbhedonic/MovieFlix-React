import { CSSProperties, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Card = ({ children, className = '', style }: CardProps) => {
  return <section className={`card ${className}`.trim()} style={style}>{children}</section>;
};
export default Card;
