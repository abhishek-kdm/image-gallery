import React from 'react';
import './confirm.style.css';


interface ConfirmProps
  extends React.HTMLAttributes<HTMLButtonElement>
{
  cancel: () => void
  confirm: () => void
}
 
const Confirm: React.FC<ConfirmProps> = ({ cancel, confirm }) => {
  return (<>
    <div className='confirm'>
      <span onClick={cancel} className={'cancel'}>
        &#8617;
        Go back.
      </span>
      <h1 onClick={confirm} className={'confirm'}>
        {'Confirm and upload Image'}
      </h1>
    </div>
  </>);
}

export default Confirm;
