// export function filterByOrigin(videogames, origin) {
//   console.log("in use");
//     switch (origin) {
//       case "all":
//         return videogames;
//       case "api":
//         const apiGames = videogames.filter((game) => typeof game.id === "number")
//         console.log(apiGames);
//         return apiGames
//       case "db":
//         return videogames.filter((game) => typeof game.id === "string" && game.id.length === 36);
//       default:
//         return []; // Invalid origin value
//     }
//   };

// CGTP

export function filterByOrigin(videogames, origin) {
  console.log("in use");
  switch (origin) {
    case "all":
      return videogames;
    case "api":
      const apiGames = videogames.filter((game) => !isNaN(Number(game.id))); // Check if ID can be converted to a number
      console.log("API Games:", apiGames);
      return apiGames;
    case "db":
      return videogames.filter((game) => typeof game.id === "string" && game.id.length === 36);
    default:
      return []; // Invalid origin value
  }
}
