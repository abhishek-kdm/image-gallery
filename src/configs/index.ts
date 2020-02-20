export const EVENTS = {
  resize: 'resize',
  mousemove: 'mousemove',
  mouseup: 'mouseup',
};


export const SERVER_URI = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export const API = {
  checkImage: `${SERVER_URI}/api/check/`,
  uploadImage: `${SERVER_URI}/api/upload/`,
  getImages: `${SERVER_URI}/api/images/`,
  getImage: (imageId: string) => `${SERVER_URI}/api/images/${imageId}`,
  getDimensions: `${SERVER_URI}/api/dimensions/`,
};
