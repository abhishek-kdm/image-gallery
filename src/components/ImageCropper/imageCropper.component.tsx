import React, { useEffect, useRef, useState } from 'react';
import './imageCropper.style.css';

import Croppie, { CroppieOptions } from 'croppie';


export type ImageCropperOptions = Omit<CroppieOptions, 'enableExif' | 'enableZoom'>;

interface ImageCropper {
  src: Maybe<string>
  buttonText: string,
  onCrop: (image: any) => void
  cancel: () => void
  options?: ImageCropperOptions
}
 
const ImageCropper: React.FC<ImageCropper> = ({
  src,
  onCrop,
  buttonText,
  cancel,
  options,
}) => {

  const croppieContainer = useRef<HTMLDivElement>(null);
  const [croppie, setCroppie] = useState<Maybe<Croppie>>(null);

  const onClick = () => { croppie?.result().then(onCrop); }

  useEffect(() => {
    if (croppieContainer.current != null) {
      const element = croppieContainer.current as HTMLDivElement;
      setCroppie((initial) => initial || new Croppie(element, {
        ...(options || {}),
        enableExif: true,
        enableZoom: false,
      }));
    }

    /**
     * @TODO in order to make this responsive, need to somehow 
     * set croppie to null after calling `.destroy()` on it
     * as react will preserve the state, even after the object was destroyed.
     * currently, changing screen size live, will throw errors,
     * if the follwing is uncommented.
     */
    // return () => { croppie?.destroy(); };
  }, [croppieContainer, croppie, options]);

  useEffect(() => {
    if (src != null) { croppie?.bind({ url: src }); }
  }, [croppie, src])


  return (<>
    <section className='img-cropper'>
      <span onClick={cancel} className={'cancel'}>&times;</span>
      <div ref={croppieContainer}></div>
      <div className='button-container'>
        <button onClick={onClick} className={'crop'} type={'button'}>
          {buttonText}
        </button>
      </div>
    </section>
  </>);
}
 
export default ImageCropper;

