import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard"
import axios from "axios";
// import MoviesData from '../Utility/movieData';

const Search = ({type, searchItem, watchListMovies, addToWatchlist, removeFromWatchlist}) => {
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();

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

        if(newPageNumber > totalPages) {
            newPageNumber = totalPages;
        }

        setPageNumber(newPageNumber);
    }

    const getSearchedItems = useCallback(
        async () => {
            try {  
                console.log('Selected Type => ', type); 
                let temp;
                if(type === 'movies') {
                    // search movies
                    temp = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=04976ca4930e963cfb8f58852b77cffd&page=${pageNumber}&query=${searchItem}`);
                }
                else if(type === 'tv') {
                    // search tv-series
                    temp = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=04976ca4930e963cfb8f58852b77cffd&page=${pageNumber}&query=${searchItem}`);
                }
                else {
                    // search with multi types - movies | TV-series | persons
                    temp = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=04976ca4930e963cfb8f58852b77cffd&page=${pageNumber}&query=${searchItem}`);
                }

                if(temp.data.results.length > 0) {
                    setMovies(temp.data.results);
                    console.log('From search => ', temp.data);
                    setTotalPages(temp.data.total_pages);
                } else {
                    setMovies([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [pageNumber, searchItem, type]
    );

    useEffect(() => {
        getSearchedItems();
    }, [getSearchedItems, pageNumber]);

  return (
    <>
        <div className="container flex flex-col m-auto mb-12">
            { movies.length ? <>
                <div>
                    <h1 className="text-2xl text-center my-5">{`Results for "${searchItem}"`}</h1>
                </div>

                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    { movies?.map((movie) => {
                        return <MovieCard type={type} movie={movie} key={movie.id} watchListMovies={watchListMovies} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist} />
                        })
                    }
                </div>

                { totalPages > 1 && 
                    <div className="flex justify-center mt-12 items-center">
                        <span className="text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded text-md flex justify-center items-center w-auto cursor-pointer" onClick={() => handlePageNumber('prev')}>Previous</span>
                        <span className="mx-5 text-md">{pageNumber}</span>
                        <span className="text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded text-md flex justify-center items-center w-auto cursor-pointer" onClick={() => handlePageNumber('next')}>Next</span>
                    </div>
                }
            </> : <div>
                    <p className="my-20 text-xl text-center">{`Nothing found for "${searchItem}"`}</p>
                </div> 
            }
        </div>
    </>
  )
}

Search.propTypes = {
    type: PropTypes.string,
    searchItem: PropTypes.string,
    watchListMovies: PropTypes.array,
    addToWatchlist: PropTypes.func,
    removeFromWatchlist: PropTypes.func
}

export default Search