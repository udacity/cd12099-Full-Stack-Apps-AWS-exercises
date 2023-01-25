
const express = require('express');
const cors = require("cors");
const routes = require("./routes/auth.router");
const bodyParser = require('body-parser')



const port = process.env.PORT || 8080; // default port to listen
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

app.get("/api/health", function(req, res) {
  res.send("Its working!")
});



  app.listen( port, () => {
      console.log( `server running ${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );


