const express = require("express");
const supertest = require("supertest");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
require("../routes/users.routes")(app);

let value;
describe("/validate-rule Post Route Test Case", () => {
  let failedResObj;

  it("Should return a 400 status code if a required field is  not passed", async () => {
    let body = {};
    value = await supertest(app)
      .post("/validate-rule")
      .set("Accept", "application/json")
      .set("contentType", /json/)
      .send(body);

    expect(value.status).toBe(400);
    expect(value.body.status).toEqual("error");
    expect(value.body.data).toEqual(null);
  });

  it("Should return a 400 status code and FailedResponseObject If a field is of the wrong type", async () => {
    failedResObj = {
      message: "rule should be an object.",
      status: "error",
      data: null,
    };
    let body = { rule: "", data: "" };
    value = await supertest(app)
      .post("/validate-rule")
      .set("Accept", "application/json")
      .set("contentType", /json/)
      .send(body);

    expect(value.body).toEqual(failedResObj);
    expect(value.status).toBe(400);
    expect(value.body.status).toEqual("error");
    expect(value.body.data).toEqual(null);
  });

  it("Should return a 400 status code and FailedResponseObject If the field specified in the rule object is missing from the data passed", async () => {
    failedResObj = {
      message: "field 5 is missing from data.",
      status: "error",
      data: null,
    };
    let body = {
      rule: {
        field: "5",
        condition: "contains",
        condition_value: "rocinante",
      },
      data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
    };

    value = await supertest(app)
      .post("/validate-rule")
      .set("Accept", "application/json")
      .set("contentType", /json/)
      .send(body);

    expect(value.body).toEqual(failedResObj);
    expect(value.status).toBe(400);
    expect(value.body.status).toEqual("error");
    expect(value.body.data).toEqual(null);
  });

  it("Should return a 400 status code and FailedResponseObject If the rule validation fails", async () => {
    failedResObj = {
      message: 'field 0 failed  validation.',
      status: 'error',
      data: {
        validation: {
          error: true,
          field: '0',
          field_value: 'd',
          condition: 'eq',
          condition_value: 'a'
        }
      }
    };
    let body = {
      rule: {
        field: "0",
        condition: "eq",
        condition_value: "a",
      },
      data: "damien-marley"
    };
    value = await supertest(app)
      .post("/validate-rule")
      .set("Accept", "application/json")
      .set("contentType", /json/)
      .send(body);

    expect(value.body).toEqual(failedResObj);
    expect(value.status).toBe(400);
    expect(value.body.status).toEqual("error");
  });

  it("Should return a 200 status code with responseObject if the rule is successfully validation", async () => {
    let resObj = {
        message: "field missions.count successfully validation.",
        status: "success",
        data: {
          validation: {
            error: false,
            field: "missions.count",
            field_value:"45",
            condition: "gte",
            condition_value: 30
          }
        }
    }

    let body = {
      rule: {
        field: "missions.count",
        condition: "gte",
        condition_value: 30,
      },
      data: {
        name: "James Holden",
        crew: "Rocinante",
        age: 34,
        position: "Captain",
        missions: {
          count: 45,
          successful: 44,
          failed: 1,
        },
      }
    };
    value = await supertest(app)
      .post("/validate-rule")
      .set("Accept", "application/json")
      .set("contentType", /json/)
      .send(body);

    expect(value.body).toEqual(resObj);
    expect(value.status).toBe(200);
    expect(value.body.status).toEqual("success");
  });

});
