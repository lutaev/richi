const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('core_variables');

module.exports.verifyAndGetDecoded = (token) => {
  if (token) {
    let codeStr = token.split(' ')[1];
    return new Promise((resolve, reject) => {
      jwt.verify(codeStr, JWT_SECRET, (err, decoded) => {
        if(err || !decoded) {
          reject();
        } else {
          resolve(decoded);
        }
      });
    })
  }

  return Promise.reject();
};