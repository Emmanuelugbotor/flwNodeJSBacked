const {returnMsg, signValidation, jsonParse} = require('./logics')
exports.userObject = () => {
  return {
    message: "Rule-Validation API.",
    status: "success",
    data: {
      name: "UGBOTOR EMMANUEL",
      github: "@Emmanuelugbotor",
      email: "emmanuelugbotor@gmail.com",
      mobile: "08065099558",
      twitter: "@Software__dev",
    },
  };
};

exports.validateRule = (rule, data) => {
  if ( !rule ) {
    return returnMsg("rule is required.", "error", null);
  }
  if ( !data ) {
    return returnMsg("data is required.", "error", null);
  } 
  if (typeof rule != "object") {
    return returnMsg("rule should be an object.", "error", null);
  }
  if (typeof data === "string") {
    return signValidation(rule.field, data[rule.field], rule.condition, rule.condition_value);
  }
  
  let ruleFieldVal = data[rule.field];
  if (rule.field.includes(".")) {
    let nestedChild = rule.field.split(".");
    ruleFieldVal = data[nestedChild[0]][nestedChild[1]];
    if (!data[nestedChild[0]].hasOwnProperty(nestedChild[1])) {
      return returnMsg(`field ${rule.field} is missing from data.`,  "error", null);
    }
  }
  if (!rule.field.includes(".") && !data.hasOwnProperty(rule.field)) {
    return returnMsg(`field ${rule.field} is missing from data.`,  "error",  null);
  }
  else {
    return signValidation( rule.field, ruleFieldVal, rule.condition, rule.condition_value );
  }
};




