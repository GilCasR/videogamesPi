require('dotenv').config();
const express = require('express');
const findAllGenres = require("../controllers/findAllGenres.js")


const genresRouter = express.Router();


// GET /videogames
genresRouter.get('/', async (req, res) => {
    try {
        const genres = await findAllGenres()
        res.status(200).json(genres)
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = genresRouter