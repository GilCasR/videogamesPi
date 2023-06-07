import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres, getPlatforms } from "../actions/index.js";

const validate = (input) => {
    const errors = {};
    if (!input.name){
        errors.name = "A name for your videogame is required"
    } else if(!input.description){
        errors.description = "Please provide a breaf description of the videogame"
    } else if(!input.launchDate){
        errors.launchDate = "Please provide a valid launch date"
    }else if (!input.genreIds || input.genreIds.length === 0){
        errors.genreIds = "Please select at least one genre"
    }else if (!input.platforms || input.platforms.length === 0){
        errors.platforms = "Please select at least one platform"
    };
    return errors;
};

export default function CreateVideogame(){
      const dispatch = useDispatch();
      const history = useHistory()
      const platforms = useSelector((state) => state.platforms);
      const genres = useSelector((state) => state.genres);
      const [errors, setErrors] = useState({})
      

      const [input, setInput] = useState({
        name: "",
        description: "",
        launchDate: "",
        rating: 0,
        genreIds: [],
        platforms: [],
        image: ""
      });

      useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate({
            ...input,
        }));
        if(Object.keys(errors).length === 0){
        dispatch(postVideogame(input));
        alert("Videogame Created¡¡");
        setInput({
            name: "",
            description: "",
            launchDate: "",
            rating: 0,
            genreIds: [],
            platforms: [],
            image: ""
        });
        history.push("/home");
        } else {
            alert("Please fix the following errors:\n\n" + Object.values(errors).join("\n"));
        };
      };

      const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        console.log(input);
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.name
        }));
        console.log(errors);
      };

      const handleGenreSelect = (genreId) => {
        if (!input.genreIds.includes(genreId)) {
          setInput((prevInput) => ({
            ...prevInput,
            genreIds: [...prevInput.genreIds, genreId],
          }));
        };
        setErrors(validate({
            ...input
        }));
      };

      const handleGenreDelete = (genreId) => {
        const currentGenres = input.genreIds.filter((id) => id !== genreId)
        setInput({
            ...input,
            genreIds : currentGenres
        });
        setErrors(validate({
            ...input
        }));
      };

      const handlePlatformSelect = (platformId) => {
        if (!input.platforms.includes(platformId)){
            setInput({
                ...input,
                platforms : [...input.platforms, platformId]
            });
        };
        setErrors(validate({
            ...input
        }));
      };

      const handlePlatformDelete = (platformId) => {
        const currentPlatfroms = input.platforms.filter((id) => id !== platformId)
        setInput({
            ...input,
            platforms : currentPlatfroms
        });
        setErrors(validate({
            ...input
        }));
      };

      const getGenreName = (genreId) => {
        const genre = genres.find((genre) => genre.id === genreId);
        return genre ? genre.genreName : "";
      };

      const getPlatformName = (platformId) => {
        const platform = platforms.find((platform) => platform.id === platformId);
        return platform ? platform.platformName : ""
      };

      return(
        <div>
            <Link to="/home"> <button>Go Back</button> </Link>
            <h1>Create a Videogame¡</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                        type = "text"
                        value = {input.name}
                        name = "name"
                        onChange = {handleChange}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input 
                        type = "text"
                        value = {input.description}
                        name = "description"
                        onChange = {handleChange}
                    />
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Launch Date:</label>
                    <input 
                        type = "date"
                        value = {input.launchDate}
                        name = "launchDate"
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input 
                        type="number" 
                        step="0.1"
                        value = {input.rating}
                        name = "rating"
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                        type="text" 
                        value = {input.image}
                        name = "image"
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Genre:</label>
                    <select onChange={e => handleGenreSelect(e.target.value)}>
                        {genres.map((genre) => (
                            <option value={genre.id}>{genre.genreName}</option>
                        ))}
                    </select>
                    {errors.genreIds && (
                        <p>{errors.genreIds}</p>
                    )}
                </div>
                <div>
                    <label>Platform:</label>
                    <select onChange={e => handlePlatformSelect(e.target.value)}>
                        {platforms.map((platform) => (
                            <option value={platform.id}>{platform.platformName}</option>
                        ))}
                    </select>
                    {errors.platforms && (
                        <p>{errors.platforms}</p>
                    )}
                </div>
                <div>
                    <ul>
                        {input.genreIds.map((genreId) => {
                        const genreName = getGenreName(genreId);
                        return (<div>
                                <li key={genreId}>{genreName}</li>
                                <button onClick={() => {handleGenreDelete(genreId)}}>X</button>
                            </div>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <ul>
                        {input.platforms.map((platformId) => {
                            const platformName = getPlatformName(platformId);
                            return(
                                <div>
                                    <li key={platformId}>{platformName}</li> 
                                    <button onClick={() => {handlePlatformDelete(platformId)}}>X</button>
                                </div>
                            ) 
                        })}
                    </ul>
                </div>
                <button type="submit">Create videogame</button>
            </form>
        </div>
      )
};