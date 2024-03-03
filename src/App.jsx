import { useEffect, useRef, useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Banner from './components/Banner';
import Contact from './components/Contact';
import Watchlist from './components/Watchlist';
import Movies from './components/Movies';
import './App.css';
import Search from './components/Search';
import Meme from './components/Meme';

function App() {
  const searchIInput = useRef();
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [type, setType] = useState('all');
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    const moviesFromLocalStorage = localStorage.getItem('watchlist');
    if(!moviesFromLocalStorage) {
      return;
    }
    setWatchListMovies(JSON.parse(moviesFromLocalStorage));
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchListMovies));
  }, [watchListMovies]);

  useEffect(() => {
    console.log('type => ', type);
  }, [type]);

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
    localStorage.setItem('watchlist', JSON.stringify(filteredWatchList));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = searchIInput.current.value;
    console.log('Form submitted', searchValue, searchValue.length);
    if(searchValue.length > 0) {
      setSearchItem(searchValue);
    }
  };

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<>
          <Movies type={type} watchListMovies={watchListMovies} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist}/>
        </>} />
        <Route path='/watchlist' element={
          <Watchlist type={type} watchListMovies={watchListMovies} setWatchListMovies={setWatchListMovies} removeFromWatchlist={removeFromWatchlist} />
        } />
        <Route path='/search' element={<>
          <Banner type={type} setType={setType} searchItem={searchItem} setSearchItem={setSearchItem} searchIInput={searchIInput} handleSubmit={handleSubmit}/> 
          {
            searchItem 
            ? <Search type={type} searchItem={searchItem} watchListMovies={watchListMovies} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist}/> 
            : <><div className="container m-auto text-center">
                <h2 className='my-20 text-xl'>Your search result(s) will be displayed here</h2>
              </div></>
          }
        </>} />
        <Route path='/meme' element={<Meme />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
