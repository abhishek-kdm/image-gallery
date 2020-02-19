import React, { useState, useCallback } from 'react';
import './App.css';

import ImageInput from './components/__pure__/ImageInput/imageInput.component';
import MultiSizeImageCropper from './components/MultiSizeImageCropper/multiSizeImageCropper.component';

import Laoder from './components/__pure__/Loader/loader.component';

import { AppContext } from './context';
import { API } from './configs';



function App() {
  // for the api call.
  const [file, setFile] = useState<Maybe<File>>(null);
  const [pageLoader, setPageLoader] = useState<boolean>(false);
  // const [sizes, setSizes] = useState<Dimensions[]>([]);

  // on file select.
  const onDrop = useCallback((files: File[]) => {
    setPageLoader(true);
    const file = files[0];

    const body = new FormData();
    body.append('file', file);

    fetch(API.checkImage, { body, method: 'post' })
      .then((response) => {
        if (!response.ok) { throw response; }
        setFile(file);
      })
      .catch(async (err) => { alert((await err.json()).message); })
      .finally(() => { setPageLoader(false); });

  }, [setFile]);

  const sizes = [
    { width: 755, height: 450 },
    { width: 365, height: 450 },
    { width: 365, height: 212 },
    { width: 380, height: 380 },
  ];

  return (<>
    <AppContext.Provider value={{ file, setFile }}>
      <Laoder show={pageLoader} text={'validating..'} />
      <div className='App'>
        <header className='App-header container'>
          {file ? 
            <MultiSizeImageCropper sizes={sizes} /> :
            <ImageInput onDrop={onDrop} />
          }
        </header>
      </div>
    </AppContext.Provider>
  </>);
}

export default App;
