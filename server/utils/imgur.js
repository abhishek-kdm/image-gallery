const fetch = require('node-fetch');
const FormData = require('form-data');


class Imgur {

  API_DOMAIN = 'https://api.imgur.com'

  constructor(clientID, apiVersion) {
    this.CLIENTID = clientID || process.env.IMGUR_CLIENT_ID;
    this.API_VERSION = apiVersion || process.env.IMGUR_API_VERSION;
  }

  async upload(image) {
    var body = new FormData();
    body.append('image', image);

    const headers = { Authorization: `Client-ID ${this.CLIENTID}` };
    var requestOptions = { method: 'POST', body, headers, redirect: 'follow' };

    const response = await fetch(this.imageUploadUrl(), requestOptions);

    return await response.text();
  }

  async delete(hash) {
    var body = new FormData();

    const headers = { Authorization: `Client-ID ${this.CLIENTID}` };
    var requestOptions = { method: 'DELETE', body, headers, redirect: 'follow' };

    const response = await fetch(this.imageDeleteUrl(hash), requestOptions);

    return await response.text();
  }

  get baseUrl() { return `${this.API_DOMAIN}/${this.API_VERSION}`; }

  imageUploadUrl() {
    return `${this.baseUrl}/upload/`
  }

  imageDeleteUrl(hash) {
    return `${this.baseUrl}/image/${hash}`
  }
}


module.exports = Imgur;
