require('./crons/cron')
const dbConfig = require("./config/dbConfig");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

mongoose.connect(
  dbConfig.DB_URL,
  () => {
    console.log("Connected to mongo DB");
  },
  (err) => {
    console.log("Error", err.message);
  }
);

const notificationRoute = require("./routes/ticketNotificationRoute")
notificationRoute(app);

app.listen(5000, () => {
    console.log('Server listening on port 5000');
})