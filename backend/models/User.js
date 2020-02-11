const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let User = new Schema({
  
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  adressStreet: { type: String, required: true },
  adressPostNumber: { type: String, required: true },
  adressCity: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  phoneNumberSecond: { type: Number },
  email: { type: String , required: true, unique: true },
  password: { type: String, required: true }

});

User.pre( 'save', async function(){
  this.password = await bcrypt.hash( this.password + passwordSalt, 10 );
});

module.exports = mongoose.model( 'User', User );