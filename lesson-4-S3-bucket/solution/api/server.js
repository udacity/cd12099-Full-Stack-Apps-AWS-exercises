
const express = require('express');
const app = express();
const cors = require("cors");
const uploadRoutes = require("./routes/uploads");
const bodyParser = require('body-parser')


app.use(cors())

app.get("/api/health", function(req, res) {
  res.send("Its working!")
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(uploadRoutes);

app.listen(8000, () => {
  console.log("app listening on port 8000")
})

