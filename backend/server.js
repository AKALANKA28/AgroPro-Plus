const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));


const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = mongoose.connection;
connect.once('open', () => {
  console.log('Connected to Database 😎');
});

connect.once('error', (err) => {
  console.log(`Error: ${err}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});




// Routes Path
const example = require("./routes/exampleRoute");






// Use Routes
app.use("/example", example); 





module.exports = app;
