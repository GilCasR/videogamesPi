import { filterByOrigin } from "./filterByOrigin.js";

const initialState = {
    videogames: []
};

// function rootReducer(state = initialState, action) {
//     console.log(action.type);
//     switch (action.type) {
//         case "GET_VIDEOGAMES":
//             return {
//                 ...state,
//                 videogames: action.payload
//             };
//         case "FILTER_BY_ORIGIN":
//             const allVideogames = state.videogames;
//             const origin = action.payload;
//             const filteredVideogames  = filterByOrigin(allVideogames, origin)
//             return{
//                 ...state,
//                 videogames: filteredVideogames
//             }
//         default:
//             return state;
//     }
// }

// export default rootReducer;

// CGTP 
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_VIDEOGAMES":
        console.log(action.payload);
        return {
          ...state,
          videogames: action.payload,
          allVideogames: action.payload // Update the allVideogames property with the initial videogames array
        };
  
      case "FILTER_BY_ORIGIN":
        const origin = action.payload;
        const allVideogames = state.allVideogames; // Access the original array of all videogames
        const filteredVideogames = filterByOrigin(allVideogames, origin);
        return {
          ...state,
          videogames: origin === "all" ? allVideogames : filteredVideogames
        };
  
      case "SORT_BY_RATING":
        const order = action.payload;
        const sortedVideogames = [...state.videogames]; // Create a copy of the videogames array
  
        sortedVideogames.sort((a, b) => {
          if (order === "lToH") {
            return a.rating - b.rating; // Sort in ascending order (lowest to highest)
          } else if (order === "hToL") {
            return b.rating - a.rating; // Sort in descending order (highest to lowest)
          } else {
            return 0; // No sorting required
          }
        });
  
        return {
          ...state,
          videogames: sortedVideogames
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  