import PropTypes from 'prop-types';

const Banner = ({ type, setType, searchIInput, handleSubmit }) => {

  return (
    // bg-[url("https://image.tmdb.org/t/p/original/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg")]
    <div className={`h-[200px] bg-black/100 bg-[center_bottom_-185px] bg-cover bg-no-repeat flex justify-center items-center flex-col`}>
      <form className='flex justify-center items-center flex-col gap-4' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex gap-4 items-center justify-start w-full text-lg'>
          <label htmlFor="all">
            <input type="radio" name="movie" id="all" value="all" onChange={(e) => setType(e.target.value)} defaultChecked={type === 'all'} className='mr-1'/>
            All
          </label>
          <label htmlFor="movies">
            <input type="radio" name="movie" id="movies" value="movies" onChange={(e) => setType(e.target.value)} className='mr-1'/>
            Movies
          </label>
          <label htmlFor="tv">
            <input type="radio" name="movie" id="tv" value="tv" onChange={(e) => setType(e.target.value)} className='mr-1'/>
            TV
          </label>
        </div>
        <input type="text" placeholder="Search Movies" className="w-[500px] p-3 rounded text-black" ref={searchIInput}/>
      </form>
    </div>
  )
}

Banner.propTypes = {
  type: PropTypes.string,
  setType: PropTypes.func,
  searchIInput: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default Banner