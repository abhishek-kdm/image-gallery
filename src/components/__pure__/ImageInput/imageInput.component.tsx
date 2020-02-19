import React from 'react';
import './imageInput.style.css';

// eslint-disable-next-line no-unused-vars
import { useDropzone, DropzoneRef, DropzoneProps } from 'react-dropzone';


type ImageInputProps = DropzoneProps & React.RefAttributes<DropzoneRef>;

const ImageInput: React.FC<ImageInputProps> = ({ ...rest }) => {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ ...rest, accept: 'image/jpeg, image/png' });

  const classes = ['image-input fade-in-up']
    .concat(isDragAccept ? ['success'] : [])
    .concat(isDragReject ? ['danger'] : []);

  return (<>
    <section className={classes.join(' ')}>
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
    </section>
  </>);
}
 
export default ImageInput;
