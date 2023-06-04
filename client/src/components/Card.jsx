// import React from "react";

// export default function Card({ name, genres, image }) {
//     return (
//       <div>
//         <img src={image} alt="image not found" />
//         <h3>{name}</h3>
//         <div>
//           {genres.map((genre) => (
//             <h5 key={genre.id}>{genre.name}</h5>
//           ))}
//         </div>
//       </div>
//     );
//   };


  // CGTP
  import React from "react";

  export default function Card({ name, genres, Genres, image }) {
    let genreList = [];
  
    if (genres) {
      genreList = genres;
    } else if (Genres) {
      genreList = Genres.map((genre) => ({
        id: "",
        name: genre.name,
      }));
    }
  
    return (
      <div>
        <img src={image} alt="image not found" />
        <h3>{name}</h3>
        <div>
          {genreList.map((genre) => (
            <h5 key={genre.id}>{genre.name}</h5>
          ))}
        </div>
      </div>
    );
  }
  
