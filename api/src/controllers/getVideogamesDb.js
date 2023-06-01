const { Videogame } = require("../db.js");

const getVideogamesDb = async () => {
    try {
        const response = await Videogame.findAll();
        return response
    } catch (error) {
        throw new Error(response.statusText);
    }
}

module.exports = getVideogamesDb;





