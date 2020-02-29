const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

customerSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id, email: this.email}, config.get('jwtKey'));
};

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
  });
  const { error } = Joi.validate(user, schema);
  return error;
};

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;