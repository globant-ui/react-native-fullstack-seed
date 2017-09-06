// Framework
import mongoose, { Schema } from 'mongoose';
import Promise from 'bluebird';
import request from 'request';
mongoose.Promise = Promise;

const PostSchema = new Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  userId: String,
  title: String,
  body: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

module.exports.getAllPosts = (source, { limit, offset }) => {
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  return new Promise((resolve, reject) => {
    request(postsUrl, (error, response, responseBody) => {
      if (error) {
        reject(error);
      } else {
        const parsedResponse = JSON.parse(responseBody);
        resolve(parsedResponse.slice(offset, offset + limit));
      }
    });
  });
};

module.exports.getPost = (root, { postId }) => {
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts/';
  return new Promise((resolve, reject) => {
    request(postsUrl + postId, (error, response, responseBody) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(responseBody));
      }
    });
  });
};