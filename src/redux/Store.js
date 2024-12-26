import { configureStore } from "@reduxjs/toolkit";
import MovieTool from './features/movie/movieSlice';

const store = configureStore({
    reducer: {
        movies: MovieTool,
    }
})
export default store;