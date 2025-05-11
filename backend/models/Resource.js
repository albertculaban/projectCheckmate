const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  tags: [String],
  type: String, // 'video' or 'article'
  title: String,
  url: String,
});

module.exports = mongoose.model('Resource', resourceSchema);
