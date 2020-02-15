import React from 'react';
import './imageUploader.style.css';

import { useDropzone, DropzoneRef, DropzoneProps } from 'react-dropzone';


type ImageUploaderProps = DropzoneProps & React.RefAttributes<DropzoneRef>;

const ImageUploader: React.FC<ImageUploaderProps> = ({ accept, ...rest }) => {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ ...rest, accept: 'image/jpeg, image/png' });

  const classes = ['image-uploader']
    .concat(isDragAccept ? ['success'] : [])
    .concat(isDragReject ? ['error'] : []);

  return (<>
    <div className={classes.join(' ')}>
      <div {...getRootProps()}>
        <input {...getInputProps()}/>
        {isDragActive ?
          (isDragAccept ? 
            <strong className='success'>Drop the file here ...</strong> :
            <strong className='danger'>File Not Allowed!</strong>
          ) :
          <strong>Click or Drag file to select</strong>
        }
      </div>
    </div>
  </>);
}
 
export default ImageUploader;
