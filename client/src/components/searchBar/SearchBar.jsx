import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../actions";
import styles from "./searchBar.module.css"
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

    return (
        <div className={styles.container}>
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search..."
              onChange={handleInputChange}
            />
            <button type="submit" className={styles.button} onClick={handleSubmit}>
              Search
            </button>
          </div>
        </div>
      );
}