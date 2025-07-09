const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  img: {
    type: String,
    default: ''
  },
  comments: {
    type: [commentSchema],
    default: []
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
