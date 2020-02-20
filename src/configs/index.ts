export const EVENTS = {
  resize: 'resize',
  mousemove: 'mousemove',
  mouseup: 'mouseup',
}


export const SERVER_URI = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export const API = {
  checkImage: `${SERVER_URI}/api/check/`,
  uploadImage: `${SERVER_URI}/api/upload/`,
}
