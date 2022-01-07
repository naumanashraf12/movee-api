const { Console } = require("console");
const cons = require("consolidate");
const fs = require("fs");
const stripe = require("stripe")(
  "sk_test_51KC7vSBzIHp6Z88PVZIpQmqFLakkUzox4xjakFCF4CfgZQ3HQEj3zgmJeWN8zRJBhwybNRq6deQZMttDsLPak9Rc00JKDSA4yt"
);

const { randomOTP } = require("../utils/randomOTP");

let json = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
exports.json;
exports.changePassword = async (email, password) => {
  let user = {};

  user = Object.entries(json).find(([key, value]) => {
    if (email === value.email) {
      json[key].password = password;
      fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(json));
      return value;
    }
  });

  if (!user) {
    return undefined;
  } else {
    return user;
  }
};
exports.verifyopt = async (otp, email) => {
  let user = {};
  console.log(otp, email);
  user = Object.entries(json).find(([key, value]) => {
    if (parseInt(otp) === value.otp && email === value.email) {
      delete json[key].otp;
      fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(json));
      return { status: 200, message: "OTP Matched" };
    }
  });

  if (!user) {
    return undefined;
  } else {
    return user;
  }
};

exports.generateOTP = (email) => {
  const user = Object.entries(json).find(([key, value]) => {
    if (email === value.email) {
      let otp = randomOTP();
      json[key].otp = otp;
      fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(json));
      return json[key];
    }
  });

  return user?.[1] ? user[1]?.otp : undefined;
};

exports.addUser = async (data) => {
  let obj = {};
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    organizationName,
    organization,
    country,
  } = data;

  let customer = {};

  if (json[username]) {
    obj = { status: 400, message: "User Already exists" };
    return obj;
  }
  if (password !== data?.confirmPassword) {
    obj = { message: "Password does not match", status: 400 };
  } else {
    customer = await stripe.customers.list({ email });
    customer =
      customer.data.length > 0
        ? customer.data[0]
        : await stripe?.customers?.create({
            email: email,
          });
    console.log(customer);
    json[username] = {
      firstName,
      lastName,
      password,
      email,
      organizationName,
      organizationSector: organization,
      country,
      role: "user",
      id:customer.id,
      stripeId: customer.id,
      category: "prototype",
    };
    fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(json));

    obj = { status: 200, message: "Signup Successful" };
  }
  return obj;
};

exports.updatePassword = async (username, cPassword, newPassword) => {
  if (!json[username]) {
    return { status: false, message: "No user found, error with token" };
  }
  if (json[username].password !== cPassword) {
    return { status: false, message: "Old password is not correct" };
  }
  json[username].password = newPassword;
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(json));
  return { status: true, message: "Password updated" };
};
exports.updateOrganizationData = async (
  username,
  organizationName,
  organizationSector
) => {
  if (!json[username]) {
    return { status: false, message: "No user found, error with token" };
  }
  console.log(username, organizationSector, organizationName);
  json[username] = { ...json[username], organizationName, organizationSector };
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(json));
  return { status: true, message: "organization updated" };
};

exports.updateCategory = async (username, category) => {
  try {
    if (!json[username]) {
      return { status: false, message: "No user found, error with token" };
    }
    json[username] = { ...json[username], category };
    fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(json));
    return { status: true, message: `Subscribed to ${category}` };
  } catch (error) {
    console.log(error.message);
  }
};
exports.users = json;
