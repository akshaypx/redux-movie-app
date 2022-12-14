import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAysncMovies,
  fetchAysncShows,
} from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.css";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchAysncMovies(term));
    dispatch(fetchAysncShows(term));
    setTerm("");
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies Or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">{">"}</button>
        </form>
      </div>

      <div className="user-image">
        <img src={user} alt="user-image" />
      </div>
    </div>
  );
};

export default Header;
