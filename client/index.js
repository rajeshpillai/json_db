const axios = require("axios");

const DB_URL = "http://localhost:4444";

// Create DB
axios.post(DB_URL + "/db", {
    dbname: 'users'
})
.then(response => console.log(response.data))

// Create records
axios.post(DB_URL + "/db/users", {
    username: "rajesh" + +new Date(),
    email: "abc@test.com"
})
.then(response => console.log(response.data))


// GET all users
axios.get(DB_URL + "/db/users")
  .then(response => console.log(response.data))
  .catch(e => console.error(e));

// Delete by username
// axios.delete(DB_URL + "/db/users/", {
//         data: {
//             username: "rajesh1585130489355"
//         }
//     })
//   .then(response => console.log(response.data))
//   .catch(e => console.error(e));

// Default delete by id
axios.delete(DB_URL + "/db/users/be4802f9")
    .then(response => console.log(response.data))
    .catch(e => console.error(e));