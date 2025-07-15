const mongoose = require('mongoose');
const ThemeSchema = new mongoose.Schema({
  _id: { type: String, default: 'site-theme' },
  light: Object,
  dark: Object
});
module.exports = mongoose.model('Theme', ThemeSchema); 