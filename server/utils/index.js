const generateFileName = (filename) => {
  const randomString = Math.random().toString(36);
  const timestamp = Date.now();

  return `${randomString.slice(2)}-${timestamp}-${filename}`;
}

module.exports = { generateFileName };
