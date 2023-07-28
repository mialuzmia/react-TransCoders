// css
import './navbar.css'
import logo from '../../assets/logo.svg'

// hooks
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'


// components
import SearchBar from '../searchBar/SearchBar'
import Button from '../button/Button'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout, isPending } = useLogout()
  

  return (
        <nav className='navbar__container'>
            <Link to="/" className='navbar__logo'>
                <img src={logo}/>
            </Link>

            <div className="navbar__links-container">
            <Link to='/'>Home</Link>
            <Link to='/devs'>Devs</Link>
            {user && <Link to='/profile'>Profile</Link>}
            


            </div>

            <div className='navbar__buttons-container'>
              <SearchBar />
              
             {!user && <Link to='/signup'>
                <Button text='Cadastro'/>
              </Link>}

              {user && (
                  <>
                    {!isPending &&<Button text='Logout'  onClick={logout}/>}
                    {isPending &&<Button text='Login out...' disabled={true} />}
                  </>
              )}

            </div>


          
        </nav>
 
  )
}

export default Navbar