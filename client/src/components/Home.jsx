import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByOrigin } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";
import Pages from "./Pages.jsx";


export default function Home (){
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const [ratingOrder, setRatingOrder] = useState("")
    const indexOfLastVideogame = currentPage * videogamesPerPage; // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0 
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    const pages = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getVideogames());
        console.log("All Videogames:", allVideogames);
    }, [])

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
      

    return (
        <div>
            <Link to = "/videogames">Create Videogame</Link>
            <h1>Henry Videogames PI</h1>
            <button onClick={e => {handleClick(e)}}>
                Reload videogames
            </button>
            <div>
                <select onChange={e => handleRatingSort(e)}>
                    <option value="lToH">Lowest to highest</option>
                    <option value="hToL">Highest to lowest</option>
                </select>
                <select onChange={e => handleFilterOrigin(e)}>
                    <option value="all">All videogames</option>
                    <option value="db">Database</option>
                    <option value="api">Api</option>
                </select>
                <Pages
                videogamesPerPage = { videogamesPerPage }
                allVideogames = { allVideogames.length }
                pages = { pages }
                />
            </div>
            {
                currentVideogames && currentVideogames.map(el => {
                    return <Card name = {el.name} genres = {el.genres} image = {el.background_image}/>
                })
            }
            <div>
                    <Pages
                    videogamesPerPage = { videogamesPerPage }
                    allVideogames = { allVideogames.length }
                    pages = { pages }
                />
            </div>
        </div>
    );
};