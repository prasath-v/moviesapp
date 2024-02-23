import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard"
import axios from "axios";
// import MoviesData from '../Utility/movieData';

const Movies = ({watchListMovies, addToWatchlist, removeFromWatchlist}) => {
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const handlePageNumber = (page) => {
        let newPageNumber;
        if(page === 'prev') {
            newPageNumber = pageNumber - 1;
        } 
        else if(page === 'next') {
            newPageNumber = pageNumber + 1;
        }

        if(newPageNumber < 1) {
            newPageNumber = 1;
        } 
        setPageNumber(newPageNumber);
    }

    const getMovies = useCallback(
        async () => {
            try {
                await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=04976ca4930e963cfb8f58852b77cffd&page=${pageNumber}&limit=30`)
                
                // search
                // await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=04976ca4930e963cfb8f58852b77cffd&page=${pageNumber}&query=thor`)

                // trending - day | week 
                // await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=04976ca4930e963cfb8f58852b77cffd&page=${pageNumber}&limit=30`)
                
                // genre
                // await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=04976ca4930e963cfb8f58852b77cffd&page=${pageNumber}&with_genres=36`)

                .then((res) => {
                    setMovies(res.data.results);
                    console.log(res.data.results);
                });
                /* axios.get('https://search.imdbot.workers.dev/?q=speed')
                .then((res) => {
                    setMovies(res.data.description);
                    console.log(res.data.description);
                }); */
            } catch (error) {
                console.error(error);
            }
        },
        [pageNumber]
    );

    useEffect(() => {
        getMovies();
    }, [getMovies, pageNumber]);

  return (
    <>
        <div className="container flex flex-col m-auto mb-12">
            <div>
                <h1 className="text-2xl text-center my-5">Trending Movies</h1>
            </div>

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                { movies?.map((movie) => {
                    return <MovieCard movie={movie} key={movie.id} watchListMovies={watchListMovies} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist} />
                    // return <MovieCard movie={movie} key={movie["#IMDB_ID"]} watchListMovies={watchListMovies} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist} />
                })
                }
            </div>

            <div className="flex justify-center mt-12 items-center">
                <span className="text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded text-md flex justify-center items-center w-auto cursor-pointer" onClick={() => handlePageNumber('prev')}>Previous</span>
                <span className="mx-5 text-md">{pageNumber}</span>
                <span className="text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded text-md flex justify-center items-center w-auto cursor-pointer" onClick={() => handlePageNumber('next')}>Next</span>
            </div>
        </div>
    </>
  )
}

Movies.propTypes = {
    watchListMovies: PropTypes.array,
    addToWatchlist: PropTypes.func,
    removeFromWatchlist: PropTypes.func
  }

export default Movies