import React, { useState, useCallback } from 'react';
import './App.css';

import ImageCropper, { ImageCropperOptions } from './components/__pure__/ImageCropper/imageCropper.component';
import ImageInput from './components/__pure__/ImageInput/imageInput.component';
import { useViewportDimensions } from './utils/hooks';


function App() {
  const [image, setImage] = useState<Maybe<string>>(null);
  // const [dimensions, setDimensions] = useState<Dimensions>({ width: 755, height: 450 });
  const dimensions = { width: 755, height: 450 };

  const viewport = useViewportDimensions();

  const onCrop = useCallback((image: any) => {
    console.log(image);
  }, []);
  const cancel = useCallback(() => { setImage(null); }, [setImage]);

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];

    if (image) { URL.revokeObjectURL(image); }
    const newImage = URL.createObjectURL(file);

    const img = new Image();
    img.onload = () => {
      setImage((initial) => {
        if (img.width !== 1024 || img.height !== 1024) {
          alert('wrong width and height');
          return initial;
        }
        return newImage;
      });
    }
    img.src = newImage;

  }, [image, setImage]);


  const options: ImageCropperOptions = {
    viewport: { ...dimensions, type: 'square' },
    boundary: {
      width: Math.max(dimensions.width * 1.2, viewport.width * .8),
      height: Math.max(dimensions.height * 1.2, viewport.height * .8),
    },
  }

  // const sizes = [
  //   { width: 755, height: 450 },
  //   { width: 365, height: 450 },
  //   { width: 365, height: 212 },
  //   { width: 380, height: 380 },
  // ];

  return (<>
    <div className="App">
      <header className="App-header">
        {image ?
          <ImageCropper
            buttonText={'crop'}
            src={image}
            options={options}
            onCrop={onCrop}
            cancel={cancel}
          /> :
          <ImageInput onDrop={onDrop} />
        }
      </header>
    </div>
  </>);
}

export default App;
