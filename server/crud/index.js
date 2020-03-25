const fs = require('fs');
const crypto = require('crypto');

// Generate random ID.
function randomId() {
    return crypto.randomBytes(4).toString('hex');
}

async function read(url) {
    console.log(`Reading ${url}`);
    return JSON.parse(
        await fs.promises.readFile(url, {
            encoding: 'utf8'
        })
    );
}

async function write(url, data) {
    await fs.promises.writeFile(url, JSON.stringify(data, null, 2));
}

module.exports = {
    randomId,
    read,
    write
}