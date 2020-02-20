import React, { useCallback, useContext } from 'react';

import Confirm from '../__pure__/Confirm/confirm.component';
import { AppContext } from '../../context';
import { API } from '../../configs';
import { useHistory } from 'react-router-dom';


interface ConfirmAndUploadProps {
  attributes: (ScreenCoordinates & Dimensions)[]
  cancel: () => void
}
 
const ConfirmAndUpload: React.FC<ConfirmAndUploadProps> = ({
  attributes,
  cancel
}) => {

  const history = useHistory();
  const { file, setPageLoader } = useContext(AppContext);

  const confirm = useCallback(() => {
    // converting props x/y -> left/top respectively, just to make things
    // easier on the server (server expects left/top rather than x/y).
    const attrs = JSON.stringify(attributes
      .map(({ width, height, x, y }) => ({width, height, left: x, top: y})));

    const body = new FormData();
    body.append('file', file);
    body.append('attributes', attrs);
    
    setPageLoader({ show: true, text: 'Uploading! please wait..' })
    fetch(API.uploadImage, { body, method: 'post' })
      .then((res) => {
        if (!res.ok) {
          alert('upload failed');
          history.push('/');
        } else {
          history.push('/gallery');
        }
      })
      .catch(() => { alert('something went wrong'); })
      .finally(() => { setPageLoader({ show: false }); });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes, file]);

  return (<>
    <section className={'fade-in-up'}>
      <Confirm confirm={confirm} cancel={cancel} />
    </section>
  </>);
}
 
export default ConfirmAndUpload;
