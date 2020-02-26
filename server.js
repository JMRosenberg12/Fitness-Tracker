// express and mongoose are important for the app 
const express = require("express");
const mongoose = require("mongoose");

// The port should always be on 3000
const PORT = process.env.PORT || 3000;

// This const should be equal to express
const app = express();

// app.use for 3 things or we can call them, express uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("Develop/public"));

// connect the mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  

// routes

require(__dirname+"/routes/apiRoutes.js")(app);
require(__dirname+"/routes/htmlRoutes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});