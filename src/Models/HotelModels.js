const mongoose = require("mongoose");

const hotels = new mongoose.Schema({
  hotelId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
});

const rooms = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["single", "double", "suite"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  bookedDates: {
    type: [Date],
    default: [],
  },
});

const reviews = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

const hotelsSchema = mongoose.model("hotels", hotels);
const roomsSchema = mongoose.model("rooms", rooms);
const reviewsSchema = mongoose.model("reviews", reviews);

module.exports = { hotelsSchema, roomsSchema, reviewsSchema };
