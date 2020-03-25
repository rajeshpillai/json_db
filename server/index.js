const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

var port = 4444;

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
}));

app.post("/db", (req, res) => {
    const db  = req.body.dbname;
    const full_path = __dirname + `/db/${db}.json`;
    console.log(full_path);

    try {
        if (!fs.existsSync(full_path)) {
            fs.writeFileSync(full_path, JSON.stringify([]));
        }
    }catch (e) {
        console.error(e);
    }
    res.json({url: req.url});
});
  
app.get("*", (req, res) => {
    res.json({url: req.url});
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
