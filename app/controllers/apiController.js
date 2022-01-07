"use strict";
var helper = require("../models/helper.js");
const jwt = require("jsonwebtoken");
const plans = require("../DATA/plans");
var Api = require("../models/API");
const jwtKey = "MfdFC9VDDKegBCaYs5kSXJZBqJhVHwNBpAWYLm3t8PLmCtadgh";
const jwtExpirySeconds = 200000;
const {
  generateOTP,
  changePassword,
  addUser,
  updatePassword,
  updateOrganizationData,
  verifyopt,
} = require("../DATA/users.js");
const { users } = require("../DATA/users");
const sendEmail = require("../middlewares/sendEmail.js");
exports.listAll = function (req, res) {
  // helper.checkPermission(req,"v",function (isPermited) {
  //       if(isPermited){
  Api.getAll(req, function (err, api) {
    if (err) {
      res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
    } else {
      res
        .status(200)
        .send(helper.createResponse(helper.Success, 1, "Record found", api));
    }
    // });
    // } else{
    //           res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
    // 	}
  });
};

exports.createNew = function (req, res) {
  helper.checkPermission(req, "a", function (isPermited) {
    if (isPermited) {
      var reqObj = new Api(req, req.body);
      if (true) {
        res
          .status(400)
          .send({ error: true, message: "Please provide required fields" });
      } else {
        Api.create(req, reqObj, function (err, api) {
          if (err) {
            res
              .status(200)
              .send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res
              .status(200)
              .send(
                helper.createResponse(helper.Success, 1, "Record Created", api)
              );
          }
        });
      }
    } else {
      res
        .status(403)
        .send(helper.createResponse(helper.Error, 0, helper.authError, ""));
    }
  });
};

exports.readById = function (req, res) {
  // helper.checkPermission(req,"v",function (isPermited) {
  //         if(isPermited){
  Api.getById(req, req.params.id, function (err, api) {
    if (err) {
      res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
    } else {
      res
        .status(200)
        .send(helper.createResponse(helper.Success, 1, "Record found", api));
    }
  });
  // } else{
  //           res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
  // 	}
  // });
};

exports.readByYear = function (req, res) {
  // helper.checkPermission(req,"v",function (isPermited) {
  //         if(isPermited){
  console.log(req.query);
  if (req.query.year)
    Api.getByYear(req, req.query.year, function (err, api) {
      if (err) {
        res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
      } else {
        res
          .status(200)
          .send(helper.createResponse(helper.Success, 1, "Record found", api));
      }
    });
  // } else{
  //           res.status(403).send(helper.createResponse(helper.Error,0,helper.authError,""));
  // 	}
  // });
};

exports.updateById = function (req, res) {
  helper.checkPermission(req, "u", function (isPermited) {
    if (isPermited) {
      Api.updateById(
        req,
        req.params.id,
        new Api(req, req.body),
        function (err, api) {
          if (err) {
            res
              .status(200)
              .send(helper.createResponse(helper.Error, 0, err, ""));
          } else {
            res
              .status(200)
              .send(
                helper.createResponse(helper.Success, 1, "Record Updated", api)
              );
          }
        }
      );
    } else {
      res
        .status(403)
        .send(helper.createResponse(helper.Error, 0, helper.authError, ""));
    }
  });
};

exports.deleteById = function (req, res) {
  helper.checkPermission(req, "d", function (isPermited) {
    if (isPermited) {
      Api.remove(req, req.params.id, function (err, api) {
        if (err) {
          res.status(200).send(helper.createResponse(helper.Error, 0, err, ""));
        } else {
          res
            .status(200)
            .send(helper.createResponse(helper.Success, 1, "Deleted", ""));
        }
      });
    } else {
      res
        .status(403)
        .send(helper.createResponse(helper.Error, 0, helper.authError, ""));
    }
  });
};

exports.forgotPassword = async (req, res) => {
  console.log(req?.body);
  const otp = await generateOTP(req?.body?.email);
  const resetUrl = `${req.protocol}://${req.get("host")}/forgot-password${otp}`;
  const message = `Your message reset opt is as follow :\n\n${resetUrl}\n\nif you have not requested this email ignore it`;
  if (!otp) {
    return res.status(400).json({ message: "no user found" });
  }
  try {
    sendEmail({
      email: req?.body?.email,
      subject: "Movee API Password Recovery",
      message,
    });

    res.status(200).json({ message: "OTP send" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req?.body;
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password not match" });
    }
    const user = await changePassword(email, newPassword);
    res
      .status(user ? 200 : 400)
      .json({ message: user ? "Password changed" : "Not changed" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.verifyopts = async (req, res) => {
  try {
    const { otp, email } = req?.body;
    const user = await verifyopt(otp, email);
    res
      .status(user ? 200 : 400)
      .json({ message: user ? "OTP verified" : "Otp Not correct" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.signUp = async (req, res) => {
  try {
    const { message, status } = await addUser(req?.body);
    res.status(status).json({ message });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req?.body;

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password not match" });
    }
    const { status, message } = await updatePassword(
      req?.username,
      currentPassword,
      newPassword
    );

    res.status(status ? 200 : 400).json({ message });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    console.log(req.body);
    const { status, message } = await updateOrganizationData(
      req?.username,
      req.body.organizationName,
      req.body.organizationSector
    );
    res.status(status ? 200 : 400).json({ message });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.myProfile = async (req, res) => {
  try {
    if (!users[req.username]) {
      return res.status(400).json({ message: "Problem with token" });
    }
    res
      .status(200)
      .json({ user: { ...users[req?.username], username: req.username } });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

exports.getToken = async (req, res) => {
  try {
    const username = req.username;
    let { id, role, category, stripeId } = users[username];
    // Create a new token with the username in the payload

    const token = jwt.sign({ username, id, role, category, stripeId }, jwtKey, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds,
    });

    // let accessToken = 'Bearer ' + token
    res.status(200).send({
      Status: "Success",
      Code: 1,
      Message: "Token Generated",
      Document: token,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.getPlans = async (req, res) => {
  try {
    res.status(200).json(plans);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
