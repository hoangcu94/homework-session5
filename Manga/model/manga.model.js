const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
    name: String,
    author: String,
    year: Number,
    rate: Number
});

module.exports = mongoose.model('manga', MangaSchema);