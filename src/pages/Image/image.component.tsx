import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { AppContext } from '../../context';
import ButtonNavigation from '../../components/__pure__/ButtonNavigation/buttonNavigation.component';
import { API } from '../../configs';


interface ImageProps { }
 
const Image: React.FC<ImageProps> = () => {
  const { imageId } = useParams();
  const [image, setImage] = useState<any>(null);

  const { setPageLoader } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    setPageLoader({ show: true, text: 'Loading image...' });
    fetch(API.getImage(imageId as string))
      .then((res) => { if (!res.ok) throw res; return res.json(); })
      .then((img) => { setImage(img); })
      .catch(() => { alert('not found'); history.push('/gallery'); })
      .finally(() => { setPageLoader({ show: false }) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, setImage]);

  return (<>
    {image ? (
      <ButtonNavigation
        previousButton={<strong>&#xab;</strong>}
        nextButton={<strong>&#xbb;</strong>}
        navLength={image.attributes.length}
        style={{
          placeSelf: 'flex-start',
          width: '100%'
        }}
      >
        {(current) => (image.attributes.map(({ _id, src }: any, i: number) => (
          current === i && (<img key={_id} src={src} alt='' />)
        )))}
      </ButtonNavigation>
    ) : <h1 className={'text-muted'}>Image not found.</h1>}
  </>);
}
 
export default Image;
