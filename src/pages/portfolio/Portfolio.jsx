import './portfolio.css'

import { useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from 'axios'

import { useDocument } from '../../hooks/useDocument'
import RepoCard from '../../components/repoCard/RepoCard'
import Slider from '../../components/slider/Slider'
import Contact from '../../components/contact/Contact'

const Portfolio = () => {
  const [reposData, setReposData] = useState(null)
  const [reposError, setReposError] = useState(null)

  const { id } = useParams()

  const { document, error } = useDocument('users', id)
  console.log(document)
  useEffect(() => {
    async function fetchReposData() {
      setReposData(null);
      setReposError(null);

      try {
        const response = await axios.get(`https://api.github.com/users/${document.githubUsername}/repos`);
        setReposData(response.data);

        if (reposData.length == 0 ) {
          setReposError('Esse usuário não tem nenhum repositório.')
        }
      } catch (error) {
        console.error('error captured' + error);
        setReposError('Não foi possivel carregar os projetos.');
      }
    }

    if (document) {
      fetchReposData();
    }

    
  }, [document]);

  
  return (
    <div className="portofio__page-container">
      {/* <h1 className="portfolio__page__title">Portifolio</h1> */}
      <div className="portolio__container">

        {document && (
          <>
            <div className="name-and-photo-container">
                <img className="portfolio_image" src={document.photoURL} alt={`Foto de ${document.displayName}`} />

              <div className='portfolio__header-texts'>
                <h1>{document.displayName}</h1>
              </div>

            </div>
            
            <p className='potfolio__bio'>{document.bio}</p>

            
            {document.languages.length > 0 && <Slider items={document.languages}/>}

            <h2>Projetos:</h2>

            {(reposData && reposData.length >=1 && document.githubUsername != null) ? <div className='repos__container'>
              {reposData.map((repo) => <RepoCard reposData={repo} key={repo.id}/> )}
            </div> : <p className='error'>{reposError}</p>}

            <Contact 
              email={document.emailContato} 
              linkedinURL={document.linkedinURL} 
              githubURL={document.githubURL}
            /> 
          </>
        )}
      </div>
    </div>
  )
}

export default Portfolio