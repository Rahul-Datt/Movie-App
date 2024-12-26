import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMovies, getSearchedMovies, setPage, setSearchButton } from "../redux/features/movie/movieSlice";
import {motion} from 'framer-motion'

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { searchedMovies, page, searchButton } = useSelector((state) => state.movies);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitValue(searchInput);
    setSearchInput('')
  }

  useEffect(() => {
    dispatch(getSearchedMovies({movie_name: submitValue, pagenum: page}));
    console.log(searchedMovies);
  }, [dispatch, submitValue, page]);

  return (
    <div className="relative">
      <div className="fixed top-0 w-full">
      <div className="relative flex justify-evenly bg-[#34393f] py-5 text-white overflow-hidden">
        <div>
          <p>MovieDB</p>
        </div>
        <div className="flex gap-x-4 overflow-hidden">
          <div className="hidden lg:flex gap-x-2 overflow-hidden">
          <Link to="/" onClick={() => dispatch(setPage(1))}>Popular</Link>
          <Link to="/topmovies" onClick={() => dispatch(setPage(1))}>Top Rated</Link>
          <Link to="/upcomingmovies" onClick={() => dispatch(setPage(1))}>Upcoming</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="text-black w-28 lg:w-6/12 px-2 rounded-md"
              type="text"
              value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search here"
            />
            <button onClick={() => {dispatch(setSearchButton(true)); dispatch(setPage(1))}} type='submit' className=" mx-1 px-2 rounded-lg text-black bg-yellow-600">Search</button>
            <button onClick={() => {dispatch(setSearchButton(false)); dispatch(setPage(1)); navigate('/')}} type='submit' className=" mx-1 px-2 rounded-lg text-black bg-white">Reset</button>
          </form>
            <button onClick={() => setMenuOpen(!menuOpen)} className="z-50 block lg:hidden" >Menu</button>
        </div>
      </div>
            <motion.div initial={{opacity: 0 ,translateX: '130vw'}} animate={menuOpen ? {opacity: 1, translateX: '66vw'} : {}} className="flex lg:hidden flex-col h-screen bg-[#34393f] w-full px-5 py-20 overflow-hidden fixed top-0" >
            <Link to="/" onClick={() => dispatch(setPage(1))} className="bg-white rounded-lg w-3/12 text-center mb-2">Popular</Link>
          <Link to="/topmovies" onClick={() => dispatch(setPage(1))}  className="bg-white rounded-lg w-3/12 text-center mb-2">Top Rated</Link>
          <Link to="/upcomingmovies" onClick={() => dispatch(setPage(1))}  className="bg-white rounded-lg w-3/12 text-center mb-2">Upcoming</Link>
            </motion.div>
      <div className="overflow-hidden">
        {
            searchedMovies?.results?.map((item) => {
                return (
                    <div key={item.id}>
                        <img src={item?.poster_path} alt="" />
                    </div>
                )
            })
        }
      </div>
      </div>
    </div>
  );
};

export default Navbar;
