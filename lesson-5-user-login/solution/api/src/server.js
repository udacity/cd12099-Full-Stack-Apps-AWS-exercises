
const express = require('express');
const app = express();
const cors = require("cors");
const routes = require("./routes/auth.router");
const bodyParser = require('body-parser')


app.use(cors());

app.get("/api/health", function(req, res) {
  res.send("Its working!")
})
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(routes);

app.listen(8000, () => {
  console.log("app listening on port 8000")
})

