import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

import ImageInput from './components/__pure__/ImageInput/imageInput.component';
import MultiSizeImageCropper from './components/MultiSizeImageCropper/multiSizeImageCropper.component';


function App() {
  // for the api call.
  const [file, setFile] = useState<Maybe<File>>(null);
  // to show on the webpage.
  const [image, setImage] = useState<Maybe<string>>(null);

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
  }, [setFile]);

  const sizes = [
    { width: 755, height: 450 },
    { width: 365, height: 450 },
    { width: 365, height: 212 },
    { width: 380, height: 380 },
  ];

  useEffect(() => {
    if (file != null) {
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        const result = (target as FileReader).result as string;

        const img = new Image();
        img.onload = function(e) {
          if (img.width !== 1024 || img.height !== 1024) {
            alert('Image needs to be 1024 x 1024.');
          } else {
            setImage(result);
          }
        }
        img.src = result;
      }

      reader.readAsDataURL(file);
    }

  }, [file, setImage]);

  return (<>
    <div className='App'>
      <header className='App-header container'>
        {image ?
          <MultiSizeImageCropper image={image} sizes={sizes} /> :
          <ImageInput onDrop={onDrop} />
        }
      </header>
    </div>
  </>);
}

export default App;
