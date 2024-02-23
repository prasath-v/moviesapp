import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Banner from './components/Banner';
import Contact from './components/Contact';
import Watchlist from './components/Watchlist';
import Movies from './components/Movies';

function App() {
  const [watchListMovies, setWatchListMovies] = useState([]);

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem('watchlist');
    if(!moviesFromLocalStorage) {
      return;
    }
    setWatchListMovies(JSON.parse(moviesFromLocalStorage));
  }, []);

  useEffect(() => {
    // console.log('Added List => ', watchListMovies);
    localStorage.setItem('watchlist', JSON.stringify(watchListMovies));
  }, [watchListMovies]);

  const addToWatchlist = (movie) => {
    // let newWatchList = [...watchListMovies, movie];
    // setWatchListMovies(newWatchList);
    setWatchListMovies((prev) => [...prev, movie]);    
    // localStorage.setItem('watchlist', JSON.stringify(newWatchList));
  }

  const removeFromWatchlist = (movie) => {
    let filteredWatchList = watchListMovies.filter((existingMovie)=>{
      return existingMovie.id !== movie.id;
      // return existingMovie["#IMDB_ID"] !== movie["#IMDB_ID"];
    });
    setWatchListMovies(filteredWatchList);
    // console.log('Deleted List => ', filteredWatchList);
    localStorage.setItem('watchlist', JSON.stringify(filteredWatchList));
  }

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<>
          <Banner /> 
          <Movies watchListMovies={watchListMovies} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist}/>
        </>} />
        <Route path='/watchlist' element={
          <Watchlist watchListMovies={watchListMovies} setWatchListMovies={setWatchListMovies} removeFromWatchlist={removeFromWatchlist} />
        } />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
