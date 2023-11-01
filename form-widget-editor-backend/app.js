
require('./dbConnection/db');
var cors = require("cors");
const express = require('express');

const router = require('./router/route');

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
