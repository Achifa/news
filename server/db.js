

const {Pool, Client} = require("pg");

const connectToDB = new Promise((resolve, reject) => {

    let pool = new Pool({
        user: "postgres",
        password: "asdfghjkl",
        database: "newsApp",
        port: 5432,
    });

    resolve(pool);
});

module.exports = {
    connectToDB
}