// json web token 
const jwt = require("jsonwebtoken");

// token secret setting
const secret = "mysecret";
// token expiration time 200 hrs
const expiration = "200h";

// authentication of username, email, id
module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // returns after authenticated 
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
  },

  // function for routes after authentication process
  authMiddleware: function ({ req }) {
    // sends token via request (req.body, request query)
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate's from token value
    if (req.headers.authorization) {
      // seaparates and trims token value
      token = token.split(" ").pop().trim();
    }

    // if statement for return request without token
    if (!token) {
      return req;
    }

    try {
      // decode user data, and attaches data to user request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Token is invalid");
    }

    // return updated request
    return req;
  },
};
