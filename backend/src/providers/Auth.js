import jwt from 'jsonwebtoken';

function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

/**
* The authenticated function checks for a user and calls the next function in the composition if
* one exists. If no user exists in the context then an error is thrown.
*/
function authenticated (fn) {
  return (parent, args, { context }, info) => {
    if (context && context.user) {
      return fn(parent, args, context, info);
    } else {
      throw new Error('User is not authenticated');
    }
  };
}

module.exports.authenticated = authenticated;
module.exports.verifyToken = verifyToken;
