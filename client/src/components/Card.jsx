
  import React from "react";
  import { Link } from "react-router-dom";

  export default function Card({ name, genres, Genres, image, id }) {
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
        <Link to ={`/home/${id}`}>
          <img src={image} alt="image not found" />
          <h3>{name}</h3>
          <div>
            {genreList.map((genre) => (
              <h5 key={genre.id}>{genre.name}</h5>
            ))}
          </div>
        </Link>
      </div>
    );
  }
  
