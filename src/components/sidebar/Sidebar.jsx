// css
import './Sidebar.css';

// hooks
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

// components
import { slide as Menu } from 'react-burger-menu'
import Button from '../button/Button'
import { useState } from 'react';


const Sidebar = () => {
  const { user } = useAuthContext()
  const { logout, isPending } = useLogout()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false);

  }

  return (
    <Menu right isOpen={isMenuOpen} onOpen={handleIsMenuOpen} onClose={handleIsMenuOpen}>
      <Link to='/' className="menu-item" onClick={closeMenu}>Home</Link>
      <Link to='/devs' className="menu-item" onClick={closeMenu}>Devs</Link>
      {user && <Link to='/profile' className="menu-item" onClick={closeMenu}>Profile</Link>}

      {!user && 
        <Link to='/signup' onClick={closeMenu}>
          <Button className="menu-button" text='Cadastro'/>
        </Link>}

      {user && (
        <>
          {!isPending &&<Button 
            text='Logout' 
            className="menu-button" 
            onClick={() => {
              logout()
              closeMenu()
            }}/>
          }
          {isPending &&<Button 
            text='Login out...' 
            className="menu-button" 
            disabled={true} />
          }
        </>
      )}
    </Menu>
  )
}

export default Sidebar