const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/hotelsDB", {
      autoIndex: true
    });
    
    // Drop the problematic index if it exists
    try {
      await conn.connection.collection('hotels').dropIndex('id_1');
    } catch (indexError) {
      // Ignore if index doesn't exist
    }
    
    console.log(`MongoDB has been Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;