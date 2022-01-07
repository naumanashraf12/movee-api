const { updateCategory } = require("../DATA/users");

const stripe = require("stripe")(
  "sk_test_51KC7vSBzIHp6Z88PVZIpQmqFLakkUzox4xjakFCF4CfgZQ3HQEj3zgmJeWN8zRJBhwybNRq6deQZMttDsLPak9Rc00JKDSA4yt"
);

exports.sendStripeAPIKey = async (req, res, next) => {
  res.status(200).json({
    stripeApiKey:
      "pk_test_51KC7vSBzIHp6Z88PSwyg7xGLSE45LgCeX3uJfKbZaJ2JAsWcE2ejuIoLgWRPJDrQ4MO6TKWHaE0Qu3PFMf2gKADy00d8D3a9jd",
  });
};

exports.payPayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripeObj.paymentIntents.create({
      amount: parseInt(req.body.amount),
      currency: "gbp",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });
    res.status(200).json({
      paymentIntent,
      success: true,
      amount: parseInt(req.body.amount),
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.subscription = async (req, res) => {
  try {
    const { payment_method, price, plan } = req.body;
    console.log(req.body);
    const customer = req.customer;

    await stripe.paymentMethods.attach(payment_method, { customer });

    await stripe.customers.update(customer, {
      invoice_settings: { default_payment_method: payment_method },
    });
    const subscription = await stripe.subscriptions.create({
      customer,
      items: [{ price }],
      expand: ["latest_invoice.payment_intent"],
    });

    const status = subscription["latest_invoice"]["payment_intent"]["status"];
    const client_secret =
      subscription["latest_invoice"]["payment_intent"]["client_secret"];
    const {
      status: { code },
      message,
    } = await updateCategory(req?.username, plan);

    res
      .status(200)
      .json({ client_secret: client_secret, status: status, message });
  } catch (err) {
    console.log("in controller", err.message);
    res.status(404).json({ message: err.message });
  }
};

exports.billingHistory = async (req, res) => {
  try {
    const customer = req.customer;

    const subscriptions = await stripe.subscriptions.list({
      limit: 10,
    });
    let billingHistory = subscriptions?.data.filter(
      (id) => customer === id.customer
    );
    res.status(200).json({ results: billingHistory.length, billingHistory });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
