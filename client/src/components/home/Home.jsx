import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByOrigin } from "../../actions/index.js";
import { Link } from "react-router-dom";
import Card from "../card/Card.jsx";
import Pages from "../pages/Pages.jsx";
import SearchBar from "../searchBar/SearchBar.jsx";
import LoadingPage from "../loadingPage/LoadingPage.jsx";
import styles from "./home.module.css"

export default function Home (){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const [ratingOrder, setRatingOrder] = useState("");
    const [alphabeticalOrder, setAlphabeticalOrder] = useState("");
    const indexOfLastVideogame = currentPage * videogamesPerPage; // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0 



    const pages = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        dispatch(getVideogames());
        return () => {
          setCurrentPage(1);
          setRatingOrder("");
          setAlphabeticalOrder("");
        };
      }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    };

    function handleFilterOrigin(e){
        const origin = e.target.value
        dispatch(filterVideogamesByOrigin(origin));
    };

    const handleRatingSort = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        const order = e.target.value;
        setRatingOrder(`Order ${order}`);
        dispatch({ type: "SORT_BY_RATING", payload: order });
      };

      const handleAlphabeticalOrder = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        const order = e.target.value;
        setAlphabeticalOrder(`order ${order}`);
        dispatch({ type: "SORT_BY_ALPHABET", payload: order });
      }
      
      const currentVideogames = allVideogames && allVideogames.length ? allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) : [];
      return (
        <div>
          {!allVideogames || allVideogames.length === 0 ? (
            <LoadingPage/>
          ) : (
            <div className={styles.container}>
              <div className={styles.header}>
                <h1 className={styles.heading}>Henry Videogames PI</h1>
                <Link to="/videogame" className={styles.button}>Create Videogame</Link>
              </div>
              <div className={styles["filter-container"]}>
                <div>
                  <label className={styles.label}>Rating: </label>
                  <select onChange={(e) => handleRatingSort(e)}className={styles.select}>
                    <option value="lToH">Lowest to highest</option>
                    <option value="hToL">Highest to lowest</option>
                  </select>
                </div>
                <div>
                  <label className={styles.label}>Alphabetical order: </label>
                    <select onChange={(e) => handleAlphabeticalOrder(e)}className={styles.select}>
                    <option value="aToZ">A to Z</option>
                    <option value="zToA">Z to A</option>
                  </select>
                </div>
                <div>
                  <label className={styles.label}>Origin: </label>
                  <select onChange={(e) => handleFilterOrigin(e)} className={styles.select}> 
                    <option value="all">All videogames</option>
                    <option value="db">Database</option>
                    <option value="api">Api</option>
                  </select>
                </div>
              </div>
              <div>
                <SearchBar />
                  <button onClick={(e) => handleClick(e)} className={styles.button}>Reload videogames</button>
                  <Pages
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    pages={pages}
                  />
              </div>
              <div className={styles["card-container"]}>
                {currentVideogames?.map((el) => (
                    <Card
                        name={el.name}
                        genres={el.genres}
                        image={el.background_image || el.image}
                        id={el.id}
                    />
                ))}
              </div>
              <div className={styles.paginationContainer}>
                <Pages
                  videogamesPerPage={videogamesPerPage}
                  allVideogames={allVideogames.length}
                  pages={pages}
                />
              </div>
            </div>
          )}
        </div>
      );
      
};