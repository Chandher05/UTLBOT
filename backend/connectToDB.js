const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        poolSize: 5
    })
    .then(() => console.log('MongoDB Connected'))
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))




module.exports = db