import React from 'react';

interface NotFoundProps { }
 
const NotFound: React.FC<NotFoundProps> = () => {
  return (<>
    <h1 style={{ marginBottom: 0 }}>{'Page Not Found'}</h1>
  </>);
}
 
export default NotFound;
