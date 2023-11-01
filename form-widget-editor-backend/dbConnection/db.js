const mongoose = require('mongoose');

// connect to db 
const db = mongoose.connect("mongodb://localhost:27017/FormWidgetEditor").then(() => { console.log('connection successful.') }).catch((err) => { console.log(err) })

module.exports = db