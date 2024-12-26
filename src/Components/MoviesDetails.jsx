import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesDetails } from "../redux/features/movie/movieSlice";
import { useParams } from "react-router-dom";

const MoviesDetails = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { movieDetails } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getMoviesDetails(id));
    window.scrollTo(0,0);
  }, [dispatch]);

  console.log(movieDetails);

  return (
    <div className="bg-[#272b34] py-20">
      <div className="flex bg-black w-10/12 mx-auto gap-x-10 gap-y-2 flex-col lg:flex-row">
        <div className="flex flex-wrap px-2">
          <img
            className="h-52"
            src={`https://image.tmdb.org/t/p/w500/${movieDetails?.result?.poster_path}`}
            alt=""
          />
          <div className="text-white px-2 space-y-4">
            <p>{movieDetails?.result?.title}</p>
            <p className="text-blue-400">Rating :- {movieDetails?.result?.vote_average}</p>
            <div className="flex gap-x-1 flex-wrap">
              <p>{movieDetails?.result?.runtime} min</p>
              {movieDetails?.result?.genres?.map((a) => (
                <p>{a.name}</p>
              ))}
            </div>
            <p>Release Date :- {movieDetails?.result?.release_date}</p>
          </div>
        <p className="text-white px-2">Overview :- {movieDetails?.result?.overview}</p>
        </div>
        <img
          className="mx-auto h-96 flex-1 w-full"
          src={`https://image.tmdb.org/t/p/w500/${movieDetails?.result?.backdrop_path}`}
          alt=""
        />
      </div>
      {/* {movieDetails?.result1?.cast[0]?.original_name} */}
      <p className="text-white text-3xl text-center my-8">Movie Cast</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-10/12 mx-auto my-2 text-white">
      {
        movieDetails?.result1?.cast?.map((item, index) => {
          return (
              <div>
              <img className="h-96 w-full" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="" />
              <p>{item.original_name}</p>
              <p>Character: {item.character}</p>
              </div>
          )
        })
      }
      </div>
    </div>
  );
};

export default MoviesDetails;
