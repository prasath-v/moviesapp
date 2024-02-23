import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className='px-4 bg-gray-500'>
      <div className="container flex gap-4 justify-between items-center m-auto">
        <div>
          <img className='w-[80px]' src={Logo} alt="logo"/>
        </div>
        <div>
          <ul className='flex gap-8 pt-4'>
            <li>
              <Link to="/" className='hover:text-black'>Home</Link>
            </li>
            <li>
              <Link to="/watchlist" className='hover:text-black'>Watchlist</Link>
            </li>
            <li>
              <Link to="/contact" className='hover:text-black'>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar