const express = require("express");
const route = express.Router();
const controller = require("../Controllers/hotelViews");

// Create a new hotel
route.post("/hotels", controller.createHotel);
route.get("/hotels/:id", controller.singleHotel);
route.get("/hotels", controller.getAllHotels);
route.delete('/hotels/:id', controller.deleteHotel);
route.put('/hotels/:id', controller.updateHotel);


module.exports = route;
