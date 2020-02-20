import React from 'react';
import './loader.style.css';


export interface LoaderProps {
  show: boolean
  text?: string
}
 
const Loader: React.FC<LoaderProps> = ({ show, text }) => {
  return (<>
    {show &&
      <div className='loader'>
        <span className='spinner'></span>
        {text || ''}
      </div>
    }
  </>);
}
 
export default Loader;
