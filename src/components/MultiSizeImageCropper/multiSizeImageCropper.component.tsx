import React, { useState, useCallback, useEffect, useContext } from 'react';

import ButtonNavigation from '../__pure__/ButtonNavigation/buttonNavigation.component';

import { useImageCropper } from '../../utils/hooks';
import { AppContext } from '../../context';
import ConfirmAndUpload from '../ConfirmAndUpload/confirmAndUpload.component';


interface MultiSizeImageCropperProps { sizes: Dimensions[] }
 
const MultiSizeImageCropper: React.FC<MultiSizeImageCropperProps> = ({ sizes }) => {

  const { file, setFile } = useContext(AppContext);

  // to show on the webpage.
  const [image, setImage] = useState<Maybe<string>>(null);

  const [confirmAndUpload, setConfirmAndUpload] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<(Dimensions & ScreenCoordinates)[]>(
    sizes.map((s) => ({ ...s, x: 0, y: 0}))
  );

  const {
    containerProps,
    draggableProps,
    origin,
    setOrigin,
  } = useImageCropper();

  const onNext = useCallback((current) => {
    // update `current` `attributes` with reference to the current origin.
    const cs = origin as ScreenCoordinates;
    setAttributes((xs) => xs.map((x, i) => i === current ? { ...x, ...cs } : x));

    // update origin, setting it equal to the next attributes' x/y.
    // so the draggable doesn't stay in the same place as it was previously.
    setOrigin((state) => {
      if (current < attributes.length - 1) {
        const { x, y } = attributes[current + 1];
        return { x, y }
      }
      return state;
    });

  }, [attributes, setAttributes, origin, setOrigin]);

  const onPrevious = useCallback((current) => {
    // updating origin, same principle as the `onNext` function,
    // except, here, setting origin equal to the previous attributes' x/y.
    setOrigin((state) => {
      if (current > 0) {
        const { x, y } = attributes[current - 1];
        return { x, y };
      }
      return state;
    });
  }, [attributes, setOrigin]);


  // getting image from the `File` object (whener the `File` object updates).
  useEffect(() => {
    if (file != null) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const result = (target as FileReader).result as string;
        setImage(result);
      }
      reader.readAsDataURL(file);
    }

  }, [file, setImage]);

  // resetting origin to first image's x/y, if not confirm upload.
  useEffect(() => {
    setOrigin((state) => {
      if (!confirmAndUpload) {
        const { x, y } = attributes[0];
        return { x, y };
      }
      return state;
    });
    /** @TODO will come back to this. */
    // need to disable exhaustive deps, was acting a little wierd.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmAndUpload, setOrigin]);


  if (confirmAndUpload) {
    return (
      <ConfirmAndUpload
        attributes={attributes}
        cancel={() => { setConfirmAndUpload(false); }}
      />
    );
  }

  return (<>
    <section>

      <button className={'button-primary'} onClick={() => setConfirmAndUpload(true)}>
        Upload
      </button>
      <button className={'button-danger'} onClick={() => { setFile(null); }}>
        Cancel
      </button>

      <ButtonNavigation
        navLength={attributes.length}
        onNext={onNext}
        onPrevious={onPrevious}
      >
        {(current) => (
          <div className='image-wrapper'>
            <div {...containerProps({})}>
              <img src={image || ''} alt='' />
              <div
                {...draggableProps({
                  style: {
                    width: attributes[current].width,
                    height: attributes[current].height
                  }
                })}
              ></div>
            </div>
          </div>
        )}
      </ButtonNavigation>
    </section>
  </>);
}
 
export default MultiSizeImageCropper;
