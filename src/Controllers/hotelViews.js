const hotelManagement = require("../Models/HotelModels");

const createHotel = async (req, res) => {
  try {
    // Find the last hotel to get the highest ID
    const lastHotel = await hotelManagement.hotelsSchema
      .findOne({})
      .sort({ hotelId: -1 })
      .select("hotelId");

    let nextNumber = 1;
    if (lastHotel && lastHotel.hotelId) {
      // Extract the number from the last hotelId and increment it
      const lastNumber = parseInt(lastHotel.hotelId.split("-").pop());
      nextNumber = lastNumber + 1;
    }

    const newHotelId = `BONSTAY-000-00-00-${nextNumber
      .toString()
      .padStart(3, "0")}`;

    const hotelBody = {
      ...req.body,
      hotelId: newHotelId,
    };

    const newHotel = await hotelManagement.hotelsSchema.create(hotelBody);
    res.status(201).json({
      message: "Hotel created successfully with id: " + newHotel.hotelId,
      data: newHotel,
      status: "Success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
      error: error.message,
      status: "Failed",
    });
  }
};

const singleHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const getSingleHotel = await hotelManagement.hotelsSchema.findOne(
      { hotelId: id },
      { _id: 0, __v: 0 }
    );

    if (!getSingleHotel) {
      return res.status(404).json({
        message: `Hotel with ID ${id} was not found`,
        status: "Failed",
        data: null,
      });
    }

    res.status(200).json({
      message: `Hotel with ${id} has been retrieved successfully`,
      data: getSingleHotel,
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: "Failed",
    });
  }
};

const getAllHotels = async (req, res) => {
  const id = req.params.hotelId;
  console.log("id: ", id);
  try {
    const getHotels = await hotelManagement.hotelsSchema.find(
      {},
      { _id: 0, __v: 0 }
    );
    if (getHotels === 0) {
      return res.status(404).json({
        message: "Hotel not found",
        status: "Success",
      });
    }
    res.status(200).json({
      message: "Hotels retrieved successfully",
      data: getHotels,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: "Failed",
    });
  }
};

const deleteHotel = async (req, res) => {
  const id = req.params.id;
  try {
    // First check if hotel exists
    const hotel = await hotelManagement.hotelsSchema.findOne({ hotelId: id });
    if (!hotel) {
      return res.status(404).json({
        message: `Hotel with ID ${id} not found`,
        status: "Failed",
      });
    }

    // Delete the hotel
    const result = await hotelManagement.hotelsSchema.deleteOne({
      hotelId: id,
    });

    if (result.deletedCount === 1) {
      res.status(200).json({
        message: `Hotel with ID ${id} has been deleted successfully`,
        status: "Success",
        data: result,
      });
    } else {
      res.status(400).json({
        message: "Failed to delete hotel",
        status: "Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: "Failed",
    });
  }
};

const updateHotel = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedHotel = await hotelManagement.hotelsSchema.findOneAndUpdate(
      { hotelId: id },
      req.body,
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({
        message: `Hotel with ID ${id} not found`,
        status: "Failed",
      });
    }
    res.status(200).json({
      message: `Hotel with ID ${id} has been updated successfully`,
      data: updatedHotel,
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      status: "Failed",
    });
  }
};

module.exports = {
  createHotel,
  singleHotel,
  getAllHotels,
  deleteHotel,
  updateHotel,
};
