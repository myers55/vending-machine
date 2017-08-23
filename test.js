const assert = require("assert");
const data = require('./data.js');
const request = require('supertest');
const moment = require('moment');
const application = require("./vending-machine");

describe("GET /api/customer/data", function () {
  it("should return the items in JSON format ", function (done) {
    request(application)
      .get("/api/customer/data")
      .expect(200)
      .end(done);
  })
})
describe("POST /api/customer/items/:itemId/purchases", function () {
  it("should return the new quantity and give back change", function (done) {

    request(application)

      .post("/api/customer/items/2/purchases")
      .send({
        id: 3,
        payment: 200
      })
      .set('Accept', 'application/json')
      
      .expect({change: 75, quantity: 11})
      .end(done);
  })
})
describe("GET /", function () {

});
