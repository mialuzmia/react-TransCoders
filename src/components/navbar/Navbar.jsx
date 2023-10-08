import { useState, useEffect } from 'react'

// css
import './navbar.css'
import logo from '../../assets/logo.svg'

// hooks
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'


// components
import Button from '../button/Button'
import Sidebar from '../sidebar/Sidebar'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout, isPending } = useLogout()

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    // Function to update screenSize state when the window is resized
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    };

    // Add an event listener to the window object to listen for resize events
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  

  return (
        <nav className='navbar__container'>
            <Link to="/" className='navbar__logo'>
                <img src={logo}/>
            </Link>

           {screenSize.width > 650 && 
            <><div className="navbar__links-container">
              <Link to='/'>Home</Link>
              <Link to='/devs'>Devs</Link>
              {user && <Link to='/profile'>Profile</Link>}
            </div>

            <div className='navbar__buttons-container'>
             {!user && <Link to='/signup'>
                <Button text='Cadastro'/>
              </Link>}

              {user && (
                  <>
                    {!isPending &&<Button text='Logout'  onClick={logout}/>}
                    {isPending &&<Button text='Login out...' disabled={true} />}
                  </>
              )}

            </div></>}

           {screenSize.width <= 650 && <Sidebar/>}
        </nav>
 
  )
}

export default Navbar