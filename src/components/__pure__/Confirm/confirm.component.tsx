import React from 'react';
import './confirm.style.css';


interface ConfirmProps
  extends React.HTMLAttributes<HTMLButtonElement>
{
  confirm: () => void
  cancel: () => void
  confirmText?: string
  cancelText?: string
}
 
const Confirm: React.FC<ConfirmProps> = ({
  confirm,
  cancel,
  confirmText,
  cancelText
}) => {
  return (<>
    <div className='confirm-container'>
      <h1 onClick={confirm} className={'confirm'}>
        {confirmText || 'Confirm and upload Image'}
      </h1>
      <span onClick={cancel} className={'cancel'}>
        &#8617;
        {cancelText || 'Go back'}.
      </span>
    </div>
  </>);
}

export default Confirm;
