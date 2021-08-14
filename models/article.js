const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Article', articleSchema);