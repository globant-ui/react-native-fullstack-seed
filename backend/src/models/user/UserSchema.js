// Framework
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
mongoose.Promise = Promise;

import { JWT_SECRET } from '../../config';

const UserSchema = new Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

module.exports.getUserByPosition = (root, { id }) => {
  return new Promise((resolve, reject) => {
    User.findById(id).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.getListOfUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.add = (root, { firstname, lastname }) => {
  const newUser = new User({ firstname: firstname, lastname: lastname });

  return new Promise((resolve, reject) => {
    newUser.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

module.exports.login = (root, { email, password }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email, password: password }).then((user) => {
      if (user) {
        const payload = { id: user._id, email: user.email, version: user.version };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        user.jwt = token;
        resolve(user);
      } else {
        reject('Email or password are incorrect.');
      }
    },
    (error) => reject(error));
  });
};
