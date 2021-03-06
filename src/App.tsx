import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Gallery from './pages/Gallery/gallery.component';
import Image from './pages/Image/image.component';
import NotFound from './pages/NotFound/notFound.component';

import Nav from './components/Nav/nav.component';
import ImageInput from './components/__pure__/ImageInput/imageInput.component';
import MultiSizeImageCropper from './components/MultiSizeImageCropper/multiSizeImageCropper.component';

// eslint-disable-next-line no-unused-vars
import Loader, { LoaderProps } from './components/__pure__/Loader/loader.component';

import { AppContext } from './context';
import { API } from './configs';



function App() {
  const [file, setFile] = useState<Maybe<File>>(null);
  const [pageLoader, setPageLoader] = useState<LoaderProps>({ show: false });
  const [sizes, setSizes] = useState<Dimensions[]>([]);

  // on file select.
  const onDrop = useCallback((accepted: File[], rejected: File[]) => {
    if (rejected && rejected[0]) { alert('File not allowed'); return; }

    if (accepted.length > 1) { alert('One file at a time.'); return; }

    setPageLoader({ show: true, text: 'validating..' });
    const file = accepted[0];

    const body = new FormData();
    body.append('file', file);

    fetch(API.checkImage, { body, method: 'post' })
      .then((response) => {
        if (!response.ok) { throw response; }
        setFile(file);
      })
      .catch(async (err) => {
        try { alert((await err.json()).message); }
        catch { alert('something went wrong'); }
      })
      .finally(() => { setPageLoader({ show: false }); });

  }, [setFile]);

  useEffect(() => {
    setPageLoader({ show: true, text: 'fetching resources...' });
    fetch(API.getDimensions)
      .then((res) => { if (!res.ok) throw res; return res.json() })
      .then((sizes) => { setSizes(sizes); })
      .finally(() => { setPageLoader({ show: false }); });
  }, []);


  return (<>
    <AppContext.Provider value={{ file, setFile, setPageLoader }}>
      <div className='App'>
        <BrowserRouter>
          <Nav>
            <ul>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/gallery'}>Gallery</Link></li>
            </ul>
          </Nav>
          <header className='App-header container'>
            <Loader show={pageLoader.show} text={pageLoader.text} />
            <Switch>
              <Route path={'/'} exact>
                {sizes.length ? (
                  file ? 
                    <MultiSizeImageCropper sizes={sizes} /> :
                    <ImageInput onDrop={onDrop} />
                ) : (
                  <h1 className={'text-muted'}>Unable to fetch resources.</h1>
                )}
              </Route>
              <Route path={'/gallery'} exact>
                <Gallery />
              </Route>
              <Route path={'/gallery/:imageId'} exact>
                <Image />
              </Route>
              <Route path={'*'}><NotFound /></Route>
            </Switch>
          </header>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  </>);
}

export default App;
