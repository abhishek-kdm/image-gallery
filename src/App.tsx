import React, { useState } from 'react';
import './App.css';

import ImageCropper from './components/ImageCropper/imageCropper.component';
import ImageUploader from './components/ImageUploader/imageUploader.component';

function App() {
  const [image, setImage] = useState<Maybe<string>>(null);

  const onCrop = (image: any) => { console.log(image); }
  const cancel = () => { setImage(null) };

  const onDrop = (files: File[]) => {
    const file = files[0];

    const reader = new FileReader();
    reader.onload = function(event: ProgressEvent<FileReader>) {
      const target = event.target as FileReader;
      setImage(target.result as string);
    }
    reader.readAsDataURL(file);
  }

  return (<>
    <div className="App">
      <header className="App-header">
        {image ?
          <ImageCropper src={image} onCrop={onCrop} cancel={cancel} /> :
          <ImageUploader onDrop={onDrop} />
        }
      </header>
    </div>
  </>);
}

export default App;
