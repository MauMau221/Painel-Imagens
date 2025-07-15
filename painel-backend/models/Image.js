const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
  component: String,
  description: String,
  alt: String,
  path: String
});
module.exports = mongoose.model('Image', ImageSchema); 