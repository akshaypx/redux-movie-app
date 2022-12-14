import React, { useEffect } from "react";
import "./Home.css";
import MovieListing from "../MovieListing/MovieListing";
import axios from "axios";
import MovieApi from "../../common/apis/MovieApi";
import MovieApiKey, { APIKEY } from "../../common/apis/MovieApiKey";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovies,
  fetchAysncMovies,
  fetchAysncShows,
  getMoviesLoader,
} from "../../features/movies/movieSlice";

const Home = () => {
  const movieTxt = "harry";
  const showTxt = "friends";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAysncMovies(movieTxt));
    dispatch(fetchAysncShows(showTxt));
  }, [dispatch]);

  const { loader } = useSelector(getMoviesLoader);

  return (
    <div>{loader === true ? <div>Loading...</div> : <MovieListing />}</div>
  );
};

export default Home;
