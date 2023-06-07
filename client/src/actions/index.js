import axios from "axios";

export function getVideogames (){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/videogames"); 
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        });
    };
};

export function getVideogamesByName (payload){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/videogames?name=${payload}`);
            return dispatch({
                type: "GET_VIDEOGAMES_NAME",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function getGenres(){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/genres`);
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        });
    };
};

export function getPlatforms(){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/platforms`);
        return dispatch({
            type: "GET_PLATFORMS",
            payload: json.data
        });
    };
};

export function getDetail(payload){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/videogames/${payload}`)
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }   
    };
};

export function postVideogame(payload){
    return async function(dispatch){
        const response = await axios.post(`http://localhost:3001/videogames`, payload);
        console.log(response);
        return response
    }
};

export function filterVideogamesByOrigin (payload){
    return{
        type: "FILTER_BY_ORIGIN",
        payload
    };
};

export function sortByRating (payload){
    return{
        type: "SORT_BY_RATING",
        payload
    };
};

export function sortByAlphabet (payload){
    return{
        type: "SORT_BY_ALPHABET",
        payload
    };
};