import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

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
    <div className={styles.card}>
      <Link to ={`/home/${id}`}>
        <img className={styles.image} src={image} alt="image not found" />
        <h3 className={styles.cardTitle}>{name}</h3>
        <div className={styles.cardGenres}>
          {genreList.map((genre) => (
            <h5 key={genre.id}>{genre.name}</h5>
          ))}
        </div>
      </Link>
    </div>
  );
}




