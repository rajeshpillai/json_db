const express = require("express");
const cors = require('cors');
const app = express();


var port = 4444;

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
}));

  
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
