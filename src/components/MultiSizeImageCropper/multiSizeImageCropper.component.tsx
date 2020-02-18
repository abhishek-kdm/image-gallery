import React, { useState, useCallback, useEffect } from 'react';

import { useImageCropper } from '../../utils/hooks';
import ButtonNavigation from '../__pure__/ButtonNavigation/buttonNavigation.component';
import Confirm from '../__pure__/Confirm/confirm.component';


interface MultiSizeImageCropperProps {
  image: string
  sizes: Dimensions[]
}
 
const MultiSizeImageCropper: React.FC<MultiSizeImageCropperProps> = ({
  image,
  sizes,
}) => {

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
    setAttributes((d) => d.map((d, i) => {
      const cs = origin as ScreenCoordinates;
      return i === current ? { ...d, ...cs } : d
    }));

    setOrigin((o) => {
      if (current < attributes.length - 1) {
        const { x, y } = attributes[current + 1];
        return { x, y }
      }
      return o;
    });

    setConfirmAndUpload((c) => current < attributes.length - 1 ? c : true);
  }, [attributes, setAttributes, origin, setOrigin]);

  const onPrevious = useCallback((current) => {
    setOrigin((o) => {
      if (current > 0) {
        const { x, y } = attributes[current - 1];
        return { x, y };
      }
      return o;
    });
  }, [attributes, setOrigin]);

  useEffect(() => {
    setOrigin((o) => confirmAndUpload ? o : { x: 0, y: 0 });
  }, [confirmAndUpload, setOrigin]);

  return (<>
    <section style={{ boxSizing: 'border-box', margin: '1rem' }}>
      {!confirmAndUpload ? (
        <ButtonNavigation
          navLength={attributes.length}
          onNext={onNext}
          onPrevious={onPrevious}
        >
          {(current) => (
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
          )}
        </ButtonNavigation>
      ) : (
        <Confirm
          confirm={() => { console.log(attributes); }}
          cancel={() => { setConfirmAndUpload(false); }}
        />
      )}
    </section>
  </>);
}
 
export default MultiSizeImageCropper;
