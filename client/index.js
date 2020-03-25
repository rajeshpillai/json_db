const axios = require("axios");

const DB_URL = "http://localhost:4444";

// Create DB
axios.post(DB_URL + "/db", {
    dbname: 'users'
})
.then(response => console.log(response.data))

// GET all users
axios.get(DB_URL + "/users")
  .then(response => console.log(response.data))
  .catch(e => console.error(e));