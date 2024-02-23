import PropTypes from 'prop-types';

const MovieCard = ({movie, watchListMovies, addToWatchlist, removeFromWatchlist}) => {
  let {poster_path, title} = movie;

  // let poster_path = movie["#IMG_POSTER"];
  // let title = movie["#TITLE"];

  function doesMovieExist(movie){
    for(let i=0; i < watchListMovies.length; i++) {
      if(watchListMovies[i].id === movie.id) {
        return true;
      }
      /* if(watchListMovies[i]["#IMDB_ID"] === movie["#IMDB_ID"]) {
        return true;
      } */
    }
    return false;
  }

  return (
    <div className="group text-center relative transition-all overflow-hidden rounded-[10px] border-[1px] border-black">
      { doesMovieExist(movie)
        ? <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-white/75 border-l-[1px]  border-b-[1px] border-black/50 text-200 flex justify-center items-center cursor-pointer z-[1]" title="Remove from Watchlist" onClick={() => removeFromWatchlist(movie)}>&#10006;</div>
        : <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-white/75 border-l-[1px]  border-b-[1px] border-black/50 text-200 flex justify-center items-center cursor-pointer z-[1]" title="Add to Watchlist" onClick={() => addToWatchlist(movie)}>&#128525;</div> // for heart icon &#10084;
      }

      <img className="w-full group-hover:scale-125 ease-in-out delay-0 duration-500" src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} />

      {/* <img className="w-full group-hover:scale-125 ease-in-out delay-0 duration-500" src={poster_path} alt={title} /> */}
      
      <div className="p-2 bg-black/85 absolute bottom-0 w-full">
        <div className='w-full flex justify-between items-center text-[12px] pb-2 mb-2 border-b-[1px] border-white/75'>
          <span className="text-white/75">Rating - {movie.vote_average.toFixed(1)}</span>
          <span className="text-white/75">Votes - {movie.vote_count}</span>
          {/* <span className="text-white/75">Rank - {movie["#RANK"]}</span>
          <span className="text-white/75">Year - {movie["#YEAR"]}</span> */}
        </div>
        <h2 className='mb-1'>{title}</h2>
      </div>

    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object,
  watchListMovies: PropTypes.array,
  addToWatchlist: PropTypes.func,
  removeFromWatchlist: PropTypes.func
}

export default MovieCard