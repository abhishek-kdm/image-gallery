const { Schema, model } = require('mongoose');


// schemas.
const ImageSchema = new Schema({
  name: String,
  attributes: [{ type: Schema.Types.ObjectId, ref: 'ImageAttributes' }],
}, { timestamps: true });

const ImageAttributesSchema = new Schema({
  src: String,
  dimensions: { type: Schema.Types.ObjectId, ref: 'Dimensions' },
}, { timestamps: true });

const DimensionsSchema = new Schema({
  label: { type: String, unique: true, dropDups: true },
  width: Number,
  height: Number,
});


// hooks.
ImageSchema.post('remove', (doc) => {
  // attempting cascade delete.
  ImageAttributes.deleteMany({ _id: { $in: doc.attributes } }, (error) => {
    console.log(error);
  });
});


// models.
const Images = model('Images', ImageSchema);
const ImageAttributes = model('ImageAttributes', ImageAttributesSchema);
const Dimensions = model('Dimensions', DimensionsSchema);

module.exports = { Dimensions, ImageAttributes, Images };
