import React from "react";
import styles from "./pages.module.css"

export default function Pages({ videogamesPerPage, allVideogames, pages }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.pages}>
        {pageNumbers.map((number) => (
          <li className={styles.number} key={number}>
            <a onClick={() => pages(number)} className={styles.pageLink}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
