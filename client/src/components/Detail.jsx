import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";

export default function Detail(props){
    const id = props.match.params.id
    const dispatch = useDispatch();
    useEffect(() => 
        dispatch(getDetail(props.match.params.id)),
      [dispatch]);

    const videogameDetail = useSelector((state) => state.detail);
    console.log(videogameDetail);
        
    const origin = isNaN(id) ? "db" : "api";

    let apiRatings = [];
    if (origin === "api" && videogameDetail.ratings) {
        apiRatings = videogameDetail.ratings.map((rating) => rating.title);
    };



    

    return (
        <div>
            {Object.keys(videogameDetail).length !== 0 ? 
                <div>
                    <h1>{videogameDetail.name}</h1>
                    <img
                        src={origin === "api" ? videogameDetail.background_image : videogameDetail.image}
                        alt=""
                    />
                    <h2>{videogameDetail.description}</h2>
                    <h2>Launch date: {origin === "api" ? videogameDetail.released : videogameDetail.launchDate}</h2>
                    <h2>Rating: {origin === "api" ? apiRatings.join(", ") : videogameDetail.rating }</h2>
                    <h3>Platforms: {origin === "api"
                        ? videogameDetail.platforms.map(el => el.platform.name).join(", ")
                        : videogameDetail.Platforms.map(el => el.platformName).join(", ")}
                    </h3>
                    <h3>Genres: {origin === "api" 
                        ? videogameDetail.genres.map(genre => genre.name).join(", ") 
                        : videogameDetail.Genres.map(genre => genre.genreName).join(", ")}
                    </h3>
                </div> : <div> <p> Loading... </p></div>
            }
            <Link to = "/home">
                <button>Go back</button>
            </Link>
        </div>
    );
};