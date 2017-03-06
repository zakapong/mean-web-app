const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Nai = module.exports = mongoose.model('Nai', UserSchema);

module.exports.getUserById = function(id, callback){
  Nai.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  Nai.findOne(query, callback);
}



module.exports.addUser = function(kopaUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(kopaUser.password, salt, (err, hash) => {
      if(err) throw err;
      kopaUser.password = hash;
      kopaUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
