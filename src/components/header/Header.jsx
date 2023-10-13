import './header.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



import cat from '../../assets/cat2.svg'
import logo from '../../assets/logo.svg'

import Button from '../button/Button'

const Header = () => {
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
    <section className='header__container'>

      <div className='header-content__container'>
        <img className='header__title' src={logo} />

        <div className="header__text">
          <p>Um site de divulgação de desenvolvedores trans para inserção no mercado de trabalho.</p>
          
          {/* <span className="line-1">Um site de divulgação de desenvolvedores trans</span><br/>

          <div className="line-2-wrapper"><span className="line-2">para inserção no mercado de trabalho.</span></div> */}
        </div>
      </div>

      <div className="header-img__container">
        <img className='header__img' src={cat} alt="imagem de um desenho de um gato com roupa de astronauta"  />
      </div>

      {screenSize.width <= 800 && <Link to='/devs'><Button className="header__button" text="Ver página de devs"/></Link>}
    </section>
  )
}

export default Header
