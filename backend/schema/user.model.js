const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema 
var bookSchema = new Schema({
    name: String,
    author: String
});


const schemaUTL = new Schema({
    username: String,
    discordID: String,
    readList: [bookSchema],
    toreadList: [bookSchema],
    currReading: {
        name: String,
        author: String,
        pages: Number
    }
})



const utlModel = mongoose.model('UTL', schemaUTL)

module.exports = utlModel