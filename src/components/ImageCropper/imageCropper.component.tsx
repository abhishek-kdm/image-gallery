import React, { useEffect, useRef, useState } from 'react';
import './imageCropper.style.css';

import Croppie from 'croppie';


interface CropContainer {
  src: Maybe<string>
  onCrop: (image: any) => void,
  cancel: () => void
}
 
const CropContainer: React.FC<CropContainer> = ({
  src,
  onCrop,
  cancel,
}) => {

  const croppieContainer = useRef<HTMLDivElement>(null);
  const [croppie, setCroppie] = useState<Maybe<Croppie>>(null);

  const onClick = () => {
    croppie?.result().then(onCrop);
  }

  useEffect(() => {
    if (croppieContainer.current != null) {
      const element = croppieContainer.current as HTMLDivElement;

      setCroppie((initial) => initial || new Croppie(element, {
        enableExif: true,
        enableZoom: false,
        viewport: { width: 100, height: 100, type: 'square' },
        boundary: { width: 500, height: 500 },
      }))
    }

    return () => { croppie?.destroy(); }
  }, [croppieContainer, croppie]);

  useEffect(() => {
    if (src != null) {
      /** @TODO throwing promise error, needs fixing. */
      croppie?.bind({ url: src });
    }
  }, [croppie, src, croppieContainer])

  return (<>
    <div className='img-cropper'>
      <span onClick={cancel} className={'cancel'}>&times;</span>
      <div ref={croppieContainer}></div>
      <div className='button-container'>
        <button onClick={onClick} className={'crop'} type={'button'}>
          Crop
        </button>
      </div>
    </div>
  </>);
}
 
export default CropContainer;

