let validation = require("./validations");
exports.home = (req, res) => {
  res
    .status(200)
    .contentType("application/json")
    .end(JSON.stringify(validation.userObject()));
};

exports.validateRule = (req, res) => {
  let { rule, data } = req.body;
  let validateRule = validation.validateRule(rule, data);
  validateRule.status === "error"
    ? res
        .status(400)
        .set('content-Type', 'application/json')
        .end(JSON.stringify(validateRule))
    : res
        .status(200)
        .contentType("application/json")
        .send(JSON.stringify(validateRule));
};
