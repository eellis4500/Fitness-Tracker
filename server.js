const express = require('express');
const mongoose = require("mongoose");
const router = require('./routes/apiroutes');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(require("./routes/apiroutes"));
app.use(require("./routes/htmlroutes"));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});