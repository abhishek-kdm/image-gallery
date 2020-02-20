import React, { useState, useEffect, useContext } from 'react';
import './gallery.style.css';

import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context';


interface GalleryProps { }
 
const Gallery: React.FC<GalleryProps> = () => {
  const [images, setImages] = useState<any[]>([]);
  const history = useHistory();

  const { setFile, setPageLoader } = useContext(AppContext);

  const getGalleryImages = () => {
    const filtered = images?.reduce((acc, image) => {
      const gallerycompatible = image.attributes
        .find(({ dimensions }: any) => dimensions.label === 'gallery');

      if (gallerycompatible) { acc.push({ ...image, attributes: gallerycompatible }); }

      return acc;
    }, []);

    return filtered;
  }

  useEffect(() => {
    setPageLoader({ show: true, text: 'Loading images...' });
    fetch('http://localhost:5000/api/images')
      .then((res) => { if (!res.ok) throw res; return res.json(); })
      .then((imgs) => { setImages(imgs); })
      .finally(() => { setPageLoader({ show: false }); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setImages]);

  useEffect(() => { setFile(null); }, [setFile]);

  return (<>
    <section id='gallery'>
      {images.length ? (
        getGalleryImages().map(({ _id, attributes }: any) => (
          <img
            onClick={() => { history.push(`gallery/${_id}`); }}
            key={_id}
            src={attributes.src}
            alt=''
          />
        ))
      ) : <h1 className={'text-muted'}>No Images to display.</h1>}
    </section>
  </>);
}
 
export default Gallery;
