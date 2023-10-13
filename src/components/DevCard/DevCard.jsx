import { Link } from 'react-router-dom'
import './devCard.css'

const DevCard = ({ devInfo }) => {

  return (
    <div className="devcard__container">

          <Link to={`/portfolio/${devInfo.id}`} className="devcard__content-container">

              <div className='devcard__content'>

              <h3 className='devcard__title'>{ devInfo.displayName }</h3>

              <div className="devcard__bio-and-img">
                <div className="devcard__img-container">
                  <img src={devInfo.photoURL} alt={`foto de ${devInfo.displayName}`} className="devcard__img" />

                </div>
                {devInfo.bio.length > 0 && <p className='devcard__text'>{devInfo.bio.length >= 70 ? `${devInfo.bio.substring(0,70)}...` : devInfo.bio }</p>}
                {devInfo.bio.length == 0 && <p className='devcard__text'>(Sem bio.)</p>}

              </div>
              </div>
          </Link>
   
    </div>
  )
}

export default DevCard