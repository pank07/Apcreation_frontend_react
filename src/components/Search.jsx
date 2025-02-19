import React, { useState, useEffect } from "react";
import '../Styling/Search.css'
import searchIcon from "../assets/searchIcon.png";
import { useDispatch } from "react-redux";
import { searchUser } from "../Redux/Searchslice";


const Search = () => {
 

  const dispatch= useDispatch()
  const [searchdata, setSearchSata]= useState('')
useEffect(()=>{
  dispatch(
   searchUser(searchdata)
  )
},[searchdata])
  return (
    <>
    <div className="search-container mt-2">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search Products..."
          className="input-search"
          style={{ color: "black" }}
          onChange={(e) => setSearchSata(e.target.value)}
        />
        <button className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
   

    </>
  );
};

export default Search;
