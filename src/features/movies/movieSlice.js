import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import MovieApiKey, { APIKEY } from "../../common/apis/MovieApiKey";

export const fetchAysncMovies = createAsyncThunk(
  "movies/fetchAysncMovies",
  async (term) => {
    const res = await MovieApi.get(
      `?apiKey=${APIKEY}&s=${term}&type=movie`
    ).catch((err) => {
      console.log("Error", err);
    });
    //console.log("RESPONSE", res.data);
    return res.data;
  }
);

export const fetchAysncShows = createAsyncThunk(
  "movies/fetchAysncShows",
  async (term) => {
    const res = await MovieApi.get(
      `?apiKey=${APIKEY}&s=${term}&type=series`
    ).catch((err) => {
      console.log("Error", err);
    });
    //console.log("RESPONSE", res.data);
    return res.data;
  }
);

export const fetchAysncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAysncMovieOrShowDetail",
  async (id) => {
    const seriesTxt = "Friends";
    const res = await MovieApi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`);
    return res.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loader: true,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAysncMovies.pending]: (state) => {
      console.log("Pending");
      return { ...state, loader: true };
    },
    [fetchAysncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload, loader: false };
    },
    [fetchAysncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAysncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload, loader: false };
    },
    [fetchAysncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getMoviesLoader = (state) => state.movies.loader;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
