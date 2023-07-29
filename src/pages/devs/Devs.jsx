import './devs.css'

import DevCard from '../../components/DevCard/DevCard'

import { useCollection } from '../../hooks/useCollection'

const Devs = () => {
  const { documents, error } = useCollection('users')

  console.log(documents)

  return (
    <div className="devs__page-container">
      <h1 className='devs__page-title'>Devs:</h1>
      <section className="devs__list-container">
      {documents && documents.map((doc) => <DevCard key={doc.id} devInfo={doc}/>)}


        
      </section>
    </div>
  )
}

export default Devs