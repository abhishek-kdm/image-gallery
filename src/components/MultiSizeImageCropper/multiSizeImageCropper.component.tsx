import React, { useState, useCallback } from 'react';

import { useImageCropper } from '../../utils/hooks';
import ButtonNavigation from '../__pure__/ButtonNavigation/buttonNavigation.component';


interface MultiSizeImageCropperProps {
  image: string
  sizes: Dimensions[]
}
 
const MultiSizeImageCropper: React.FC<MultiSizeImageCropperProps> = ({
  image,
  sizes,
}) => {

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
    if (current < attributes.length - 1) {
      const { x, y } = attributes[current + 1];
      setOrigin({ x, y });
    }
  }, [attributes, setAttributes, origin, setOrigin]);

  const onPrevious = useCallback((current) => {
    if (current > 0) {
      const { x, y } = attributes[current - 1];
      setOrigin({ x, y });
    }
  }, [attributes, setOrigin]);

  return (<>
    <section style={{ boxSizing: 'border-box', margin: '1rem' }}>
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
    </section>
  </>);
}
 
export default MultiSizeImageCropper;
