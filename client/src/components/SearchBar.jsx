import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name,setName] = useState("");

    function handleInputChange (e){
        e.preventDefault();
        const name = e.target.value;
        setName(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getVideogamesByName(name));
    }

    return(
        <div>
            <input 
                type="text" 
                placeholder="Search..." 
                onChange={e => handleInputChange(e)}
            />
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    );
}