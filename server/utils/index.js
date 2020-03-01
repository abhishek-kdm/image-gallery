const sharp = require('sharp');

const generateFileName = (filename) => {
  const randomString = Math.random().toString(36).slice(2);
  const timestamp = Date.now();

  return `${randomString}-${timestamp}-${filename}`;
}

const validateImage = async (file) => {
  if (!file) {
    return { ok: false, message: 'Unknown File.' };
  }

  const { width, height } = await sharp(file.buffer).metadata();

  if (parseInt(width) !== 1024 || parseInt(height) !== 1024) {
    return { ok: false, message: 'Image needs to be strictly 1024x1024.' };
  }

  return { ok: true, message: 'all good!.' };
}

module.exports = { generateFileName, validateImage };
