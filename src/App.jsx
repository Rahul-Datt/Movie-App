import MovieApi from './Components/MovieApi'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MoviesDetails from './Components/MoviesDetails'
import UpcomingMovies from './Components/UpcomingMovies'
import TopMovies from './Components/TopMovies'
import Navbar from './Components/Navbar'


function App() {
  return (
    <div className='overflow-hidden'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieApi />} />
          <Route path="/upcomingmovies" element={<UpcomingMovies />} />
          <Route path="/topmovies" element={<TopMovies />} />
          <Route path="/details/:id" element={<MoviesDetails />} />
        </Routes>
      </BrowserRouter>
      {/* <MovieApi /> */}
    </div>
  )
}

export default App
