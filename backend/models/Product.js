const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  date:{ type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }, 
  likes: { type: Number }
});

module.exports = mongoose.model( 'Product', Product );