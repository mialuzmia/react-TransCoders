import './header.css'

import cat from '../../assets/cat2.svg'
import logo from '../../assets/logo.svg'

const Header = () => {

  
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
    </section>
  )
}

export default Header
