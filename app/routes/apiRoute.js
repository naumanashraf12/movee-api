"use strict";
const apiInstance = require("../controllers/apiController");
const { isAdmin } = require("../middlewares/middlewares");
const { rateLimiter } = require("../middlewares/rateLimiter");
const {
  payPayment,
  sendStripeAPIKey,
  subscription,
  billingHistory,
} = require("../controllers/paymentController");
module.exports = (app) => {
  // const { record } = require('../models/apiSchema')
  app.route("/api/search").get(apiInstance.readByYear);
  // todoList Routes
  app
    .route("/api")
    .get(apiInstance.listAll)
    .post(isAdmin, apiInstance.createNew);

  app
    .route("/api/:id")
    .get(rateLimiter, apiInstance.readById)
    .put(isAdmin, apiInstance.updateById)
    .delete(isAdmin, apiInstance.deleteById);

  app.post("/forgot-password", apiInstance.forgotPassword);
  app.post("/reset-password", apiInstance.resetPassword);
  app.post("/verify-otp", apiInstance.verifyopts);
  app.post("/signup", apiInstance.signUp);
  app.post("/signup", apiInstance.signUp);
  app.get("/my-profile", apiInstance.myProfile);
  app.patch("/update-password", apiInstance.updatePassword);
  app.patch("/update-organization", apiInstance.updateOrganization);
  app.post("/subscription", subscription);
  app.get("/billing-history", billingHistory);
  app.get("/token", apiInstance.getToken);
  app.get("/plans", apiInstance.getPlans);
};
