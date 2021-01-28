exports.returnMsg = (msg, status, data) => {
  return { msg, status, data };
};

exports.signValidation = (
  nameOfField,
  ruleFieldValue,
  sign,
  condition_value
) => {
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
        : "";
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
};
