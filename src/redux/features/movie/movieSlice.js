import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  movies: [],
  searchedMovies: [],
  movieDetails: {},
  searchButton: false
};

export const getMovies = createAsyncThunk("api/movies", async (pagenum) => {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pagenum}`
  );
  const result = await resp.json();

  return result;
});

export const getUpcomingMovies = createAsyncThunk(
  "api/upcomingMovies",
  async (pagenum) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pagenum}`
    );
    const result = await resp.json();
    return result;
  }
);
export const getTopMovies = createAsyncThunk(
  "api/topMovies",
  async (pagenum) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${pagenum}`
    );
    const result = await resp.json();
    return result;
  }
);
export const getSearchedMovies = createAsyncThunk(
  "api/searchedMovies",
  async ({movie_name, pagenum}) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${movie_name}&page=${pagenum}`
    );
    const result = await resp.json();
    return result;
  }
);

export const getMoviesDetails = createAsyncThunk(
  "api/moviesDetails",
  async (movieId) => {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
    );
    const result = await resp.json();
    const resp1 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
    );
    const result1 = await resp1.json();
    return { result, result1 };
    // return result
  }
);

const movieSlice = createSlice({
  name: "movieSlice",
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      console.log(action.payload);
      state.page = action.payload;
    },
    setSearchButton : (state, action) => {
      console.log(action.payload)
      state.searchButton = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        console.log("Movies not found");
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.movies = action.payload;
      });
    builder
      .addCase(getUpcomingMovies.pending, () => {
        console.log("Movies not found");
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    builder
      .addCase(getTopMovies.pending, () => {
        console.log("Movies not found");
      })
      .addCase(getTopMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
    builder
      .addCase(getSearchedMovies.pending, () => {
        console.log("Movies not found");
      })
      .addCase(getSearchedMovies.fulfilled, (state, action) => {
        // state.movies = action.payload;
        state.searchedMovies = action.payload
      });

    builder
      .addCase(getMoviesDetails.pending, (state, action) => {
        console.log("no details");
      })
      .addCase(getMoviesDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
      });
  },
});

export const { setPage, setSearchButton } = movieSlice.actions;

export default movieSlice.reducer;
