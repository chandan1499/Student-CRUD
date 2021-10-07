const express = require('express');
const cors = require("cors");
const connect = require('./configs/db');

const app = express();

app.use(cors());
app.use(express.json());

const studentController = require('./controllers/student.controller');
app.use('/students', studentController);

const start = async () => {
    await connect();

    app.listen(1234, () => {
        console.log('listening on port 1234');
    })

}

module.exports = start;
