const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

const crud = require('./crud');

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

// Create new record
app.post("/db/:model", async (req, res) => {
    const model_name  = req.params.model;
    const file_path = __dirname + `/db/${model_name}.json`;
    const table  = await crud.read(file_path);
    const data = req.body;
    data.id = crud.randomId();
    table.push(data);
    await crud.write(file_path, table);
    res.json({[model_name]: table});
});

// Get all records
// e.g: /db/users
app.get("/db/:model", async (req, res) => {
    const model_name  = req.params.model;
    const file_path = __dirname + `/db/${model_name}.json`;
    const table  = await crud.read(file_path);
    res.json({[model_name]: table});
});

// Get record by id
app.get("/db/:model/:id", async (req, res) => {
    const model_name  = req.params.model;
    const id = req.params.id;
    const file_path = __dirname + `/db/${model_name}.json`;
    
    const table  = await crud.read(file_path);

    let record = table.find(r => r.id === id);
    res.json(record);
});

// Delete record by attribute
app.delete("/db/:model/:id", async (req, res) => {
    console.log("DELETE**");
    const model_name  = req.params.model;
    const id = req.params.id

    console.log("Deleting...", id);

    const file_path = __dirname + `/db/${model_name}.json`;
    
    const table  = await crud.read(file_path);

    let records = table.filter(r => r.id !== id);
    await crud.write(file_path, records);
    res.json({ status: "ok"});
});




app.get("*", (req, res) => {
    res.json({url: req.url});
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
