const axios = require("axios");
const api = require('../server/api');

const DB_URL = "http://localhost:4444";

// Create DB
axios.post(DB_URL + "/db", {
    dbname: 'users'
})
.then(response => trialRun());

trialRun2();

function trialRun2() {
    let db = api.createTable("blogs");
    console.log("CREATING BLOG TABLE");
    db.insert({
        title: `Blog ${+new Date()}`,
        published: true
    });
}

function trialRun() {

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


    // // Default delete by id
    // axios.delete(DB_URL + "/db/users/be4802f9")
    //     .then(response => console.log(response.data))
    //     .catch(e => console.error(e));

}