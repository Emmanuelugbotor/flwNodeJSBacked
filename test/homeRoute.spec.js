const express = require("express"); 
const request = require("supertest");
const app = express(); 
require("../routes/users.routes")(app); 

describe("Home route /",  ()=>{

    it("should return a JSON Object of my details", async()=>{
        const { body } = await request(app).get("/").expect('Content-Type', /json/).expect(200)
  
        expect(body).not.toBe(null)
        expect(body.message).toEqual("Rule-Validation API.")
        expect(body.status).toEqual("success")
        expect(body.data).toHaveProperty(["name"])
        expect(body.data).toHaveProperty(["email"])
        expect(body.data).toHaveProperty(["github"]) 
        expect(body.data).toHaveProperty(["twitter"])
        expect(body.data).toHaveProperty(["mobile"])
        expect(body.data.name).toEqual("UGBOTOR EMMANUEL")
        expect(body.data.email).toEqual("emmanuelugbotor@gmail.com")
        expect(body.data.twitter).toEqual("@Software__dev")
        expect(body.data.mobile).toEqual("08065099558")
        expect(body.data.github).toEqual("@Emmanuelugbotor")
    })
});  