const { Router } = require('express');
const { Images, ImageAttributes, Dimensions } = require('../models/gallery.models');

const upload = require('multer')();
const sharp = require('sharp');

const { generateFileName } = require('../utils');
const Imgur = require('../utils/imgur');


const ApiRouter = Router();


ApiRouter.route('/images').get((_, res) => {
  Images.find({})
    .populate({ path: 'attributes', populate: 'dimensions' })
    .then((images) => { return res.json(images); })
    .catch(() => { return res.status(500).send('Server Error.'); });
});

ApiRouter.route('/images/:_id').get((req, res) => {
  const { _id } = req.params;

  Images.findOne({ _id })
    .populate({ path: 'attributes', populate: 'dimensions' })
    .then((image) => { return res.json(image); })
    .catch(() => { return res.status(500).send('Server Error.'); });
});

ApiRouter.route('/check')
  .post(upload.single('file'), async (req, res) => {
    const { width, height } = await sharp(req.file.buffer).metadata();

    if (parseInt(width) !== 1024 || parseInt(height) !== 1024) {
      const code = 400;
      const json = { code, message: 'Image needs to be strictly 1024x1024.' };

      return res.status(code).json(json);
    }

    return res.json({ code: 200, message: 'all good!.' });
  });


ApiRouter.route('/upload')
  .post(upload.single('file'), async (req, res) => {
    const attributes = JSON.parse(req.body.attributes);
    const imgur = new Imgur();

    const uploads = await Promise.all(
      attributes.map(async (attribute) => {
        // crop
        const image = await sharp(req.file.buffer)
          .extract(attribute)
          .toBuffer();

        // upload
        attribute['response'] = JSON.parse(await imgur.upload(image.toString('base64')));

        return attribute;
      })
    );

    /**
     * @TODO deleteing all `currently` uploaded images, if any of the
     * upload fails. not sure about this, need to come back to this.
     */
    if (uploads.some(({ response }) => !response.success)) {
      // const rollbacks = uploads.map(async ({ data, success }) => {
      //   if (!success)
      //     await imgur.delete(data.deletehash);
      // });
      // Promise.all(rollbacks);

      return res.status(500).json({ code: 500, message: 'upload failed!.' });
    }

    const imageAttrsObj = await Promise.all(
      uploads.map(async ({ width, height, response }) => {
        const dimensions = await Dimensions
          .findOne({ width, height })
          .exec();

        const imageAttributes = new ImageAttributes({
          dimensions,
          src: response.data.link,
        });
        return await imageAttributes.save();
      })
    );

    let imageObj = null;
    try {
      const image = new Images({
        name: generateFileName(req.file.originalname),
        attributes: imageAttrsObj,
      });
      imageObj = await image.save();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ code: 500, message: 'Server Error.' });
    }

    return res.json({ code: 200, message: '', data: imageObj });
  });


module.exports = ApiRouter;
