// css
import './Sidebar.css';

// hooks
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

// components
import { slide as Menu } from 'react-burger-menu'
import Button from '../button/Button'


const Sidebar = () => {
  const { user } = useAuthContext()
  const { logout, isPending } = useLogout()

  return (
    <Menu right >
      <Link to='/' className="menu-item">Home</Link>
      <Link to='/devs' className="menu-item">Devs</Link>
      {user && <Link to='/profile' className="menu-item">Profile</Link>}

      {!user && 
        <Link to='/signup'>
          <Button className="menu-button" text='Cadastro'/>
        </Link>}

      {user && (
        <>
          {!isPending &&<Button 
            text='Logout' 
            className="menu-button" 
            onClick={logout}/>
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