exports.userObject = () => {
  return {
    message: "Rule-Validation API",
    status: "success",
    data: {
      name: "UGBOTOR EMMANUEL",
      github: "@Emmanuelugbotor",
      email: "emmanuelugbotor@gmail.com",
      mobile: "08065099558",
      twitter: "@emmanuelugbotor",
    },
  };
};

exports.validateRule = (rule, data) => { // validate against invalid json payload
  if (!rule) {
    return returnMsg("rule is required.", "error", null);
  }
  if (!data) {
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
  } else {
    return signValidation( rule.field, ruleFieldVal, rule.condition, rule.condition_value );
  }
};

function returnMsg(msg, status, data) {
  return { msg, status, data };
}

function signValidation(nameOfField, ruleFieldValue, sign, condition_value) {
  let equality = ["eq", "neq", " gt", "gte", "contains"];
  let result;
  try {
    if (equality.includes(sign)) {
      sign == "eq"
        ? (result = ruleFieldValue == condition_value)
        : sign == "neq"
        ? (result = ruleFieldValue != condition_value)
        : sign == "gt"
        ? (result = ruleFieldValue > condition_value)
        : sign == "gte"
        ? (result = ruleFieldValue >= condition_value)
        : sign == "contains"
        ? (result = ruleFieldValue.includes(condition_value))
        : '';
      if (result == true) {
        return {
          message: `field ${nameOfField} successfully validated.`,
          status: "success",
          data: {
            validation: {
              error: false,
              field: `${nameOfField}`,
              field_value: `${ruleFieldValue}`,
              condition: sign,
              condition_value: condition_value,
            },
          },
        };
      } else if (result == false) {
        return {
          message: `field ${nameOfField} failed  validated.`,
          status: "error",
          data: {
            validation: {
              error: true,
              field: `${nameOfField}`,
              field_value: `${ruleFieldValue}`,
              condition: sign,
              condition_value: condition_value,
            },
          },
        };
      }
    }
  } catch (error) {
    return {
      message: `field ${nameOfField} failed  validated.`,
      status: "error",
      data: {
        validation: {
          error: true,
          field: `${nameOfField}`,
          field_value: `${ruleFieldValue}`,
          condition: sign,
          condition_value: condition_value,
        },
      },
    };
  }
}
