const fs = require("fs");
let json = JSON.parse(fs.readFileSync(`${__dirname}/plans.json`, "utf-8"));
exports.plans = json;
