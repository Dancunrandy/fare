const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.connectionString);
    console.log('Database connected successfully at: ', connect.connection.name)
  } catch (err) {
    console.log(err);
  }

  // mongoURI: 'mongodb://localhost:27017/tumaFare'
}

module.exports = connectDb;