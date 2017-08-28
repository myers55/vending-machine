const data = require('./data.js');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const server = express();

server.use(bodyParser.json());

server.get('/api/customer/data', function (request, response) {
  for (var i = 0; i < data.items.length; i++) {
    var description = data.items[i].description;
    var cost = data.items[i].cost;
    var quantity = data.items[i].quantity;
    var combined = "There are " + quantity + " " + description + " remaining for " + cost + ".";
    console.log("Vending Items: ", combined);
  }
  response.json(data);
});

function calculateChange(payment, cost) {
  var change = payment - cost;
  return change;
}

server.post('/api/customer/items/:itemId/purchases', function (request, response) {

  function filterById(item, index, array) {
    return item.id === request.body.id;
  };
  var result = data.items.find(filterById);

  change = calculateChange(request.body.payment, result.cost);
  var remaining = result.quantity - 1;
  var model = {change: change, quantity: remaining};

  response.json(model);
});




server.listen(3000, function () {
  console.log('im working');
});



module.exports = server;

