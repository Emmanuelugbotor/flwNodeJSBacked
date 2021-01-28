exports.userObject = () => {
  return {
    message: "Rule-Validation API",
    status: "success",
    data: {
      name: "UGBOTOR EMMANUEL",
      github: "@Emmanuelugbotor",
      email: "emmanuelugbotor@gmail.com",
      mobile: "08065099558",
      twitter: "@amosb",
    },
  };
};

exports.validateRule = (rule, data) => {
  // a/ The rule and data fields are required.
  if (!(rule && data)) {
    return {
      message: `rule and data are required.`,
      status: "error",
      data: null,
    };
  }
  if (!rule) {
    return {
      message: `rule is required.`,
      status: "error",
      data: null,
    };
  }
  if (!data) {
    return {
      message: `data is required.`,
      status: "error",
      data: null,
    };
  }
  

    //   b/ The rule field should be a valid JSON object
};
