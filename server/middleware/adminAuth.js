/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");

const secretKey1 = "THIS_IS_ADMIN_SECRET";

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, secretKey1, (err, user) => {
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
    secretKey1,
    authenticateAdmin
  }