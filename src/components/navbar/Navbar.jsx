// css
import './navbar.css'
import logo from '../../assets/logo.svg'

// hooks
import { Link } from 'react-router-dom'


// components
import SearchBar from '../searchBar/SearchBar'

const Navbar = () => {

  return (
        <nav className='navbar__container'>
            <Link to="/" className='navbar__logo'>
                <img src={logo}/>
            </Link>

            <div className="navbar__links-container">
            <Link to='/'>Home</Link>
            <Link to='/devs'>Devs</Link>

            </div>
            {/* <SearchBar /> */}

            <div className='navbar__buttons-container'>
              
              <Link to='/login'>
                <button className='button'>
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front text navbar__login-button"> Login</span>
                </button> 
                {/* <button className='btn navbar__btn'>Cadastro</button>      */}
              </Link>

              <Link to='/signup'>
                <button className='button'>
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front text"> Cadastro</span>
                </button> 
                {/* <button className='btn navbar__btn'>Cadastro</button>      */}
              </Link>

            </div>
          
        </nav>
 
  )
}

export default Navbar