const { API_KEY } = process.env;
const axios = require('axios').default;

const getVideogamesApi = async () => {
  try {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    const response = await axios.get(url);
    const videogamesApiRaw = response.data.results;
    const videogamesApi = videogamesApiRaw.map(({ id, name, background_image, genres, rating }) => ({
      id,
      name,
      background_image,
      genres,
      rating
    }));
    return videogamesApi;
  } catch (error) {
    throw new Error(response.statusText);
  }
};

module.exports = getVideogamesApi;


  