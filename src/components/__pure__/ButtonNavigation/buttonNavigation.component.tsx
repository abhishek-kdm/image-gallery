import React, { useState } from 'react';
import './buttonNavigation.style.css';


interface ButtonNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  navLength: number,
  start?: number,
  onPrevious?: (current: number) => void,
  onNext?: (current: number) => void,
  children: (current: number) => JSX.Element
}
 
const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  navLength,
  start,
  onPrevious,
  onNext,
  children,
}) => {

  const [current, setCurrent] = useState<number>(start || 0);

  return (
    <div>
      <div className='button-container'>
        <div>
          {current > 0 && (
            <button
              className={'primary'}
              onClick={() => {
                onPrevious && onPrevious(current);
                setCurrent((current) => Math.max(current - 1, 0));
              }}
            >
              &lArr; Previous
            </button>
          )}
        </div>
        <small style={{ color: '#c6c6c6', margin: 'auto 3rem' }}>{current + 1} of {navLength}</small>
        <div>
          {current <= navLength - 1 && (
            <button
              className={'primary'}
              onClick={() => {
                onNext && onNext(current);
                setCurrent((current) => Math.min(current + 1, navLength - 1))
              }}
            >
              Next &rArr;
            </button>
          )}
        </div>
      </div>
      {children(current)}
    </div>
  );
}
 
export default ButtonNavigation;
