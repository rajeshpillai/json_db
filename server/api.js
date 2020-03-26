const axios = require('axios');

const DB_URL = "http://localhost:4444";

class Api { 
    createTable(table) {
        this.table = table;
        axios.post(DB_URL + "/db", {
            dbname: table
        });
        return this;
    }
    insert(attrs) {
        return axios.post(DB_URL + `/db/${this.table}` ,attrs)
            //.then(response => console.log(response.data))
    }
}

module.exports = new Api();