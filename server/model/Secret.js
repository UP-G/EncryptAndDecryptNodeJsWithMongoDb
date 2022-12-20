const {Schema, model, ObjectId} = require('mongoose');

const Secret = new Schema({
    _id: { type: String },
  text: {type: String, required: true},
  date: {type: Date, default: Date.now},
});

module.exports = model('Secret', Secret);