var cors = require("cors");
var session = require("express-session");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var http = require("http");
const { users } = require("./app/DATA/users");
const jwt = require("jsonwebtoken");
var fileUpload = require("express-fileupload");
var apiRoutes = require("./app/routes/apiRoute");
const { isAuth, isUserAuth } = require("./app/middlewares/middlewares");
const Stripe = require("./app/controllers/paymentController");
const { rateLimiter } = require("./app/middlewares/rateLimiter");
const express = require("express"),
  app = express();

const port = process.env.PORT || 8600;
const portssl = 8666;
// MiddleWares
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());

app.use(
  session({
    secret: "MfdFC9VbbKegBCaYs5kSXJZBqJhVHwNBpAWYLm3t8PLmCtadgh",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

const jwtKey = "MfdFC9VDDKegBCaYs5kSXJZBqJhVHwNBpAWYLm3t8PLmCtadgh";
const jwtExpirySeconds = 200000; // 55.56 hours

// app.post("/token", async function (req, res) {
//   const { username, password } = req.body;
//   console.log(req?.body);
//   if (!username || !password || users[username].password !== password) {
//     // return 401 error is username or password doesn't exist, or if password does
//     // not match the password in our records
//     return res
//       .status(401)
//       .json({ message: "there is problem with your login details" });
//   }
//   let { id, role, category, stripeId } = users[username];
//   // Create a new token with the username in the payload

//   const token =
//     role !== "admin"
//       ? jwt.sign({ username, id, role, category, stripeId }, jwtKey, {
//           algorithm: "HS256",
//           expiresIn: jwtExpirySeconds,
//         })
//       : jwt.sign({ username, id, role }, jwtKey, {
//           algorithm: "HS256",
//           expiresIn: jwtExpirySeconds,
//         });

//   // let accessToken = 'Bearer ' + token
//   res.status(200).send({
//     Status: "Success",
//     Code: 1,
//     Message: "Token Generated",
//     Document: token,
//   });
// });

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req?.body);
    if (!username || !password || users[username]?.password !== password) {
      // return 401 error is username or password doesn't exist, or if password does
      // not match the password in our records
      return res
        .status(401)
        .json({ message: "there is problem with your login details" });
    }
    let { id, role, category, stripeId } = users[username];
    // Create a new token with the username in the payload

    const token = jwt.sign({ username, id, role, stripeId, category }, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });

    // let accessToken = 'Bearer ' + token
    res.status(200).send({
      Status: "Success",
      Message: "Logged in",
      user: users[username],
      Document: token,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// app.use("/", express.static(path.join(__dirname, "./client/build")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
// });

// Favicon
app.use("/favicon.ico", express.static("favicon.ico"));

// Development Logger
// app.use(logger('dev'));

// Production Logger

app.use(express.static(path.join(__dirname, "public")));

http.createServer(app).listen(port);
console.log("API server started on: " + port);

// app.use(isUserAuth);
// app.use(rateLimiter)

apiRoutes(app);

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});
