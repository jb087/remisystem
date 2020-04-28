const sqlite = require('sqlite3').verbose();
const dbPath = 'db/remisystem.sqlite';
let db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("Connected to remisystem database!");
    }
});

