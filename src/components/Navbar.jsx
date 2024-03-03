import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className='px-4 bg-gray-500'>
      <div className="navbarContainer container flex gap-4 justify-between items-center m-auto">
        <div>
          <img className='w-[80px]' src={Logo} alt="logo"/>
        </div>
        <div>
          <ul className='flex gap-8 pt-4'>
            <li>
              <NavLink to="/" className='hover:text-black'>Home</NavLink>
            </li>
            <li>
              <NavLink to="/search" className='hover:text-black'>Search</NavLink>
            </li>
            <li>
              <NavLink to="/watchlist" className='hover:text-black'>Watchlist</NavLink>
            </li>
            {/* <li>
              <NavLink to="/meme" className='hover:text-black'>Meme</NavLink>
            </li> */}
            <li>
              <NavLink to="/contact" className='hover:text-black'>Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar