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
  
async function read(model) {
    const url = __dirname + `/db/${model}.json`;
    return JSON.parse(
        await fs.promises.readFile(url, {
            encoding: 'utf8'
        })
    );
}

async function write(model_name, data) {
    const url = __dirname + `/db/${model_name}.json`;
    await fs.promises.writeFile(url, JSON.stringify(data, null, 2));
}

app.post("/db/:model", async (req, res) => {
    const model_name  = req.params.model;
    const file_path = __dirname + `/db/${model_name}.json`;
    const table  = await read(model_name);
    const data = req.body;
    console.log("Data: ", data);

    table.push(data);
    await write(model_name, table);
    res.json({[model_name]: table});
});

app.get("*", (req, res) => {
    res.json({url: req.url});
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
