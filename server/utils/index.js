const generateFileName = (filename) => {
  const randomString = Math.random().toString(36).slice(2);
  const timestamp = Date.now();

  return `${randomString}-${timestamp}-${filename}`;
}

module.exports = { generateFileName };
