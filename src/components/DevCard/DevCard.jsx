import { Link } from 'react-router-dom'
import './devCard.css'

const DevCard = ({ devInfo }) => {

  return (
    <div class="devcard__container">

          <Link to={`/portfolio/${devInfo.id}`} class="devcard__content-container">

              <div className='devcard__content'>

              <h3 className='devcard__title'>{ devInfo.displayName }</h3>
              <p className='devcard__text'>{ `${devInfo.bio.substring(0,120)}...` }</p>

              <img src={devInfo.photoURL} alt={`foto de ${devInfo.displayName}`} className="devcard__img" />
              </div>
          </Link>
   
    </div>
  )
}

export default DevCard