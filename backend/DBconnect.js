const mongoose = require('mongoose');
const mongoDB = "mongodb://localhost:27017/Dealsdray_Task";
const {MongoClient} = require('mongodb')

mongoose.connect(mongoDB, {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");

});




