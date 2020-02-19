import React from 'react';
import './loader.style.css';


interface LaoderProps {
  show: boolean
  text?: string
}
 
const Laoder: React.FC<LaoderProps> = ({ show, text }) => {
  return (<>
    {show &&
      <div className='loader'>
        <span className='spinner'></span>
        {text || ''}
      </div>
    }
  </>);
}
 
export default Laoder;
