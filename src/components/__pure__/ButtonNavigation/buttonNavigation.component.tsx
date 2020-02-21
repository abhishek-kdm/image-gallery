import React, { useState } from 'react';
import './buttonNavigation.style.css';


interface ButtonNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  navLength: number,
  start?: number,
  nextButton?: string | JSX.Element
  previousButton?: string | JSX.Element
  onPrevious?: (current: number) => void,
  onNext?: (current: number) => void,
  children: (current: number) => JSX.Element
}
 
const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  navLength,
  start,
  nextButton,
  previousButton,
  onPrevious,
  onNext,
  children,
  ...rest
}) => {

  const [current, setCurrent] = useState<number>(start || 0);

  return (
    <div {...rest}>
      <div className='button-container'>
        <div>
          <button
            className={'primary'}
            onClick={() => {
              onPrevious && onPrevious(current);
              setCurrent((current) => Math.max(current - 1, 0));
            }}
          >
          {previousButton || 'Previous'}
        </button>
        </div>
        <small style={{ color: '#c6c6c6', margin: 'auto 3rem' }}>{current + 1} of {navLength}</small>
        <div>
          <button
            className={'primary'}
            onClick={() => {
              onNext && onNext(current);
              setCurrent((current) => Math.min(current + 1, navLength - 1))
            }}
          >
            {nextButton || 'Next'}
          </button>
        </div>
      </div>
      {children(current)}
    </div>
  );
}
 
export default ButtonNavigation;
