import { Link } from 'react-router-dom'
import './devCard.css'

const DevCard = ({ devInfo }) => {

  return (
    <div class="devcard__container">

          <Link to={`/portfolio/${devInfo.id}`} class="devcard__content-container">

              <div className='devcard__content'>

              <h3 className='devcard__title'>{ devInfo.displayName }</h3>

              <div className="devcard__bio-and-img">
                <div className="devcard__img-container">
                  <img src={devInfo.photoURL} alt={`foto de ${devInfo.displayName}`} className="devcard__img" />

                </div>
                <p className='devcard__text'>{ `${devInfo.bio.substring(0,120)}...` }</p>
              </div>
              </div>
          </Link>
   
    </div>
  )
}

export default DevCard