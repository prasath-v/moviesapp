import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import genreIDs from '../Utility/movieData'

const Watchlist = ({watchListMovies, removeFromWatchlist, setWatchListMovies}) => {

  const [search, setSearch] = useState('');
  const [genresID, setGenresID] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    // console.log('IDs => ', typeof(genreIDs))
    let genreList = [];
    watchListMovies.map((movie) => {
      movie.genre_ids.map((genre) => {
        genreList.push(genre);
      })
    });
    // console.log('genreList => ', genreList);
    genreList = new Set(genreList);
    setGenresID([...genreList]);
  }, [watchListMovies]);

  const handleSearch = (e) => {
    // console.log('Search => ', e.target.value);
    setSearch(e.target.value);
  }

  const handleFilter = (e) => {
    // console.log('Filter => ', e.target.value);
    let sortedList;
    const sortedValue = e.target.value;

    // sorting ASC based on popularity
    if(sortedValue === 'popularity_asc') {
      sortedList = watchListMovies.sort( (movieA, movieB) => {
        return movieA.popularity - movieB.popularity;
        // return movieA["#YEAR"] - movieB["#YEAR"];
      });
    }

    // sorting DESC based on popularity
    if(sortedValue === 'popularity_desc') {
      sortedList = watchListMovies.sort( (movieA, movieB) => {
        return movieB.popularity - movieA.popularity;
        // return movieB["#YEAR"] - movieA["#YEAR"];
      });
    }

    // sorting ASC based on rating
    if(sortedValue === 'rating_asc') {
      sortedList = watchListMovies.sort( (movieA, movieB) => {
        return movieA.vote_average - movieB.vote_average;
        // return movieA["#RANK"] - movieB["#RANK"];
      });
    }

    // sorting DESC based on rating
    if(sortedValue === 'rating_desc') {
      sortedList = watchListMovies.sort( (movieA, movieB) => {
        return movieB.vote_average - movieA.vote_average;
        // return movieB["#RANK"] - movieA["#RANK"];
      });
    }

    // sorting ASC based on votes
    if(sortedValue === 'votes_asc') {
      sortedList = watchListMovies.sort( (movieA, movieB) => {
        return movieA.vote_count - movieB.vote_count;
      });
    }

    // sorting DESC based on votes
    if(sortedValue === 'votes_desc') {
      sortedList = watchListMovies.sort( (movieA, movieB) => {
        return movieB.vote_count - movieA.vote_count;
      });
    }

    // set sorted movies
    setWatchListMovies([...sortedList]);
  }

  const handleGenreFilter = (e) => {
    console.log('Genre => ', e.target.value);
    setGenreFilter(e.target.value);
  }

  return (
    <>
      <div className="w-full h-[100px] bg-orange-500 flex justify-center items-center">
        <h1 className="text-2xl text-center py-5">Watchlist</h1>
      </div>
      {
        (watchListMovies.length === 0) 
        ? <div className="container m-auto my-9 text-2xl text-center py-5 flex justify-center flex-col">
            Add Movies to Watchlist 
            <div className="flex justify-center mt-8">
              <Link to="/" className="text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded text-lg flex justify-center items-center w-[150px]">Goto Movies</Link>
            </div>
          </div> 
        : <div>
            <div className="container m-auto pt-8 flex justify-between">
              <div className="w-full max-w-[500px] relative">
                <input type="text" className="w-full p-2 pr-7 rounded text-black outline-none" placeholder="Search movies in your watchlist" value={search} onChange={(e) => handleSearch(e)}/>
                { search &&
                  <span className="absolute top-0 right-1 text-black text-sm h-[100%] flex items-center cursor-pointer" onClick={() => setSearch('')}>&#10006;</span>
                }
              </div>
              <div className="w-full max-w-[150px]">
                <select name="filter" id="sortingFilter" className="w-full p-2 rounded text-black outline-none" onChange={(e) => handleGenreFilter(e)}>
                  <option value="" className="hidden">Select Genre</option>
                  <option value="">All</option>
                  { 
                    genresID.map((genre) => {
                      // console.log('genresID => ', genresID)
                      return <option key={genre} value={genre}>{genreIDs[genre]}</option>
                    })
                  }
                </select>
              </div>
              <div className="w-full max-w-[200px]">
                <select name="filter" id="genreFilter" className="w-full p-2 rounded text-black outline-none" onChange={(e) => handleFilter(e)}>
                  <option value="" className="hidden">Select Sorting</option>
                  <option value="rating_asc">Rating (Asc)</option>
                  <option value="rating_desc">Rating (Desc)</option>
                  <option value="popularity_asc">Popularity (Asc)</option>
                  <option value="popularity_desc">Popularity (Desc)</option>
                  <option value="votes_asc">Votes (Asc)</option>
                  <option value="votes_desc">Votes (Desc)</option>
                </select>
              </div>
            </div>
            <div className="container grid grid-cols-5 gap-4 m-auto my-9">
              { watchListMovies
                .filter((movie) => {
                  if(genreFilter === '') {
                    return movie
                  } else if(movie.genre_ids.includes(parseInt(genreFilter))) {
                    return movie
                  }
                })
                .filter((movie) => {
                  return movie.title.toLowerCase().includes(search.toLowerCase());
                  /* if(search === '') {
                    return movie
                  } else if(movie.title.toLowerCase().includes(search.toLowerCase())) {
                    return movie
                  } */
                  /* if(search === '') { return movie } 
                  else if(movie["#TITLE"].toLowerCase().includes(search.toLowerCase())) {
                    return movie
                  } */
                })
                .map((movie) => {
                  return <MovieCard movie={movie} key={movie.id} watchListMovies={watchListMovies} removeFromWatchlist={removeFromWatchlist}/>
                  // return <MovieCard movie={movie} key={movie["#IMDB_ID"]} watchListMovies={watchListMovies} removeFromWatchlist={removeFromWatchlist}/>
                })
              }
            </div>
        </div>
      }
    </>
  )
}

Watchlist.propTypes = {
  watchListMovies: PropTypes.array,
  removeFromWatchlist: PropTypes.func,
  setWatchListMovies: PropTypes.func
}

export default Watchlist