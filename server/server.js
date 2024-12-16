const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()
// const bodyParser = require("body-parser");

const taskRouter = require("./routers/taskRouter");

const port = 3030;



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.status(200).json({"message": "Hello World!"});
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

mongoose
  .connect(
    process.env.DB_URL, 
  )
  .then(() => {
    console.log("Connected to the DB!");
  })
  .catch(() => {
    console.log("Failed to connect!");
  });
