const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ DataBase Connection Successful');
  } catch (err) {
    console.error('❌ DataBase Connection Error:', err);
    process.exit(1);//Connection fail exit
  }
};

module.exports = connectDB;