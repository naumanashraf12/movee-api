const jwt = require("jsonwebtoken");
const resmessage = require("../resmessage");
const jwtKey = "MfdFC9VDDKegBCaYs5kSXJZBqJhVHwNBpAWYLm3t8PLmCtadgh";
const { users } = require("../DATA/users");


exports.isAuth = (req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  if (req.path === "/forgot-password") {
    return next();
  }
  if (req.path === "/reset-password") {
    return next();
  }
  if (req.path === "/signup") {
    return next();
  }
  if (req.path === "/verify-otp") {
    return next();
  }

  const authHeader = extractHeader(req);
  const secret = jwtKey;

  if (!authHeader) {
    console.log(`UN-AUTHORIZED ACCESS | ${req.path}`);
    return res.status(403).json({
      Code: 0,
      Message: resmessage.un_authorized_access,
    });
  }
  const token = authHeader;
  let decodedToken = "";

  try {
    decodedToken = jwt.verify(token, secret);
  } catch (err) {
    console.log(`UN-AUTHORIZED ACCESS | TOKEN ERROR | ${req.path}`);
    return res
      .status(403)
      .json({ Code: 0, Message: resmessage.something_wrong, error: err });
  }

  if (!decodedToken) {
    console.log(`UN-AUTHORIZED ACCESS | TOKEN ERROR | ${req.path}`);
    return res
      .status(403)
      .json({ Code: 0, Message: resmessage.un_authorized_access });
  }
  let user = users[decodedToken.username];
  if (user.id === decodedToken.id && user.role === decodedToken.role) {
    req.id = decodedToken.id;
    req.role = decodedToken.role;
    req.username = decodedToken.username;
    req.customer = decodedToken.stripeId;
    if (decodedToken.role !== "admin") req.category = user.category;
  } else {
    console.log(`UN-AUTHORIZED ACCESS | TOKEN ERROR | ${req.path}`);
    return res
      .status(403)
      .json({ Code: 0, Message: resmessage.un_authorized_access });
  }

  next();
};
exports.isUserAuth = (req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  if (req.path === "/forgot-password") {
    return next();
  }
  if (req.path === "/reset-password") {
    return next();
  }
  if (req.path === "/signup") {
    return next();
  }
  if (req.path === "/verify-otp") {
    return next();
  }

  const authHeader = extractHeader(req);
  const secret = jwtKey;

  if (!authHeader) {
    console.log(`UN-AUTHORIZED ACCESS | ${req.path}`);
    return res.status(403).json({
      Code: 0,
      Message: resmessage.un_authorized_access,
    });
  }
  const token = authHeader;
  let decodedToken = "";

  try {
    decodedToken = jwt.verify(token, secret);
  } catch (err) {
    console.log(`UN-AUTHORIZED ACCESS | TOKEN ERROR | ${req.path}`);
    return res
      .status(403)
      .json({ Code: 0, Message: resmessage.something_wrong, error: err });
  }

  if (!decodedToken) {
    console.log(`UN-AUTHORIZED ACCESS | TOKEN ERROR | ${req.path}`);
    return res
      .status(403)
      .json({ Code: 0, Message: resmessage.un_authorized_access });
  }
  let user = users[decodedToken.username];
  if (user.id === decodedToken.id && user.role === decodedToken.role) {
    req.id = decodedToken.id;
    req.role = decodedToken.role;
    req.username = decodedToken.username;
    req.customer = decodedToken.stripeId;
    if (decodedToken.role !== "admin") req.category = user.category;
  } else {
    console.log(`UN-AUTHORIZED ACCESS | TOKEN ERROR | ${req.path}`);
    return res
      .status(403)
      .json({ Code: 0, Message: resmessage.un_authorized_access });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({
      Code: 0,
      Message: resmessage.un_authorized_access,
    });
  }

  next();
};

const extractHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};
// exports.ValidateApiSchema = (schema) => (req, res, next) => {
//   const error = check(req.body, schema);
//   if (error) {
//     return res.status(403).json({
//       Code:0,
//     Message: resmessage.sql_validation_err,
//     error:error
//   })
//   }
//   next();
// };

// const check = (data, schema) => {
//   const validation = schema.validate(data, { convert: false });
//   if (validation.error) {
//     const errorDetails = validation.error.details.map((val) => ({
//       error: val.message,
//       path: val.path
//     }));
//     return errorDetails;
//   }
//   return null;
// };
