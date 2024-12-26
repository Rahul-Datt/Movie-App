import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingMovies, setPage, setSearchButton } from "../redux/features/movie/movieSlice";
import { Link, useParams } from "react-router-dom";

const UpcomingMovies = () => {
  const dispatch = useDispatch();
  const { movies, page, searchedMovies, searchButton } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getUpcomingMovies(page));
    window.scrollTo(0,0);
  }, [dispatch, page, searchButton]);
  console.log(movies);

  // console.log(params)

  return (
    <div className="bg-[#272b34] text-white py-20 px-2" >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 items-center">
        {
                !searchButton ? movies?.results?.map((item, index) => {
                  return (
                    <Link to={`/details/${item.id}`} key={item?.id} className="h-96 object-cover">
                      <img
                        className="h-full w-full"
                        src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                        alt=""
                      />
                      <p>{item?.title}</p>
                      <p>Rating: {item?.vote_average}</p>
                    </Link>
                  );
                })
                :
                
                  searchedMovies?.results?.map((item,index) => {
                    return (
                      <Link to={`/details/${item.id}`} key={item?.id} className="h-96 object-cover">
                      <img
                        className="h-full w-full"
                        src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                        alt=""
                      />
                      <p>{item?.title}</p>
                      <p>Rating: {item?.vote_average}</p>
                    </Link>
                    )
                  })
              }
      </div>
      {!searchButton ? <div className="space-x-2 mt-20 w-full text-center">
        page {page} of {movies.total_pages}
        <br />
        <button onClick={() => page !== 1 && dispatch(setPage(page - 1))} className="bg-white text-black px-4 py-1 rounded-lg">Prev</button>
        {page - 5 > 0 && (
          <button onClick={() => dispatch(setPage(page - 5))}>{page - 5}</button>
        )}
        {page - 4 > 0 && (
          <button onClick={() => dispatch(setPage(page - 4))}>{page - 4}</button>
        )}
        {page - 3 > 0 && (
          <button onClick={() => dispatch(setPage(page - 3))}>{page - 3}</button>
        )}
        {page - 2 > 0 && (
          <button onClick={() => dispatch(setPage(page - 2))}>{page - 2}</button>
        )}
        {page - 1 > 0 && (
          <button onClick={() => dispatch(setPage(page - 1))}>{page - 1}</button>
        )}
        <button className="bg-green-500 rounded-[100%] px-2" onClick={() => dispatch(setPage(page))}>
          {page}
        </button>
        <button onClick={() => dispatch(setPage(page + 1))}>{page + 1}</button>
        <button onClick={() => dispatch(setPage(page + 2))}>{page + 2}</button>
        <button onClick={() => dispatch(setPage(page + 3))}>{page + 3}</button>
        <button onClick={() => dispatch(setPage(page + 4))}>{page + 4}</button>
        <button onClick={() => dispatch(setPage(page + 5))}>{page + 5}</button>
        {page < 5 && (
          <>
            <button onClick={() => dispatch(setPage(page + 6))}>{page + 6}</button>
            <button onClick={() => dispatch(setPage(page + 7))}>{page + 7}</button>
            <button onClick={() => dispatch(setPage(page + 8))}>{page + 8}</button>
            <button onClick={() => dispatch(setPage(page + 9))}>{page + 9}</button>
          </>
        )}
        <button onClick={() => dispatch(setPage(page + 1))} className="bg-white text-black px-4 py-1 rounded-lg">Next</button>
      </div>
      :
      
      <div className="space-x-2 mt-20 w-full text-center">
                page {page} of {searchedMovies.total_pages}
                <br />
                <button
                  disabled={page == 1 && true}
                  onClick={() => page !== 1 && dispatch(setPage(page - 1))}
                  className="bg-white text-black px-4 py-1 rounded-lg"
                >
                  Prev
                </button>
                <button
                  disabled={page == searchedMovies?.total_pages && true}
                  onClick={() => dispatch(setPage(page + 1))}
                  className="bg-white text-black px-4 py-1 rounded-lg"
                >
                  Next
                </button>
              </div>
    }
    </div>
  );
};

export default UpcomingMovies;
