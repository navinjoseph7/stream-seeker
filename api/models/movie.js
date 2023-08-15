const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    release_year: { type: Number, required: true },
    synopsis: { type: String, required: true },
    rating: { type: Number, required: true },
    links: { type: String, required: true }
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;