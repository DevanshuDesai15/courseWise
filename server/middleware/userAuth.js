/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const secretKey2 = "THIS_IS_USER_SECRET";

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, secretKey2, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
  module.exports = {
    secretKey2,
    authenticateUser
  }