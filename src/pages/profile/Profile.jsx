import './profile.css'

import { usefirestore, uploadProfilePhoto } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'
import { storage } from '../../firebase/config'

import { useAuthContext } from '../..//hooks/useAuthContext'

import { useEffect, useState } from 'react'

import Select from 'react-select'


import Button from '../../components/button/Button'
import { Link } from 'react-router-dom'


const Profile = () => {
  const [emailContato, setEmailContato] = useState('');
  const [displayName, setDisplayName] = useState('')
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [profilePhotoError, setProfilePhotoError] = useState(null)
  const [bio, setBio] = useState('')
  const [linkedinURL, setLinkedinURL] = useState('')
  const [githubURL, setGithubURL] = useState('')
  const [languages, setLanguages] = useState([])

  const [updates, setUpdates] = useState({})

  const languageOptions = [
  
    { value: 'angular.svg', label: 'Angular' },
    { value: 'c-plus.svg', label: 'C++' },
    { value: 'c-sharp.svg', label: 'C#' },
    { value: 'css.svg', label: 'CSS' },
    { value: 'html.svg', label: 'HTML' },
    { value: 'java.svg', label: 'Java' },
    { value: 'javascript.svg', label: 'Javascript' },
    { value: 'kotlin.svg', label: 'Kotlin' },
    { value: 'mongodb.svg', label: 'MongoDB' },
    { value: 'node.svg', label: 'Node.js' },
    { value: 'node.svg', label: 'PHP' },
    { value: 'python.svg', label: 'Python' },
    { value: 'react.svg', label: 'React' },
    { value: 'ruby.svg', label: 'Ruby' },
    { value: 'swift.svg', label: 'Swift' },
    { value: 'swift.svg', label: 'Typescript' },
    { value: 'vue.svg', label: 'Vue' },
    
  ]
  const { user } = useAuthContext()

  const { document, error } = useDocument('users', user.uid)
  const { updateDocument, response } = usefirestore('users')



  

 
    useEffect(() => {
      if(document){
        let newUpdates = {}

        if (displayName && displayName !== document.displayName) {
          newUpdates.displayName = displayName;
          newUpdates.lowerCaseName = displayName.toLowerCase();
        }
    
        if (bio && bio !== document.bio) {
          newUpdates.bio = bio;
        }
    
        if (emailContato && emailContato !== document.emailContato) {
          newUpdates.emailContato = emailContato;
        }
    
        if (linkedinURL && linkedinURL !== document.linkedinURL) {
          newUpdates.linkedinURL = linkedinURL;
        }
    
        if (githubURL && githubURL !== document.githubURL) {
          newUpdates.githubURL = githubURL;
        }
    
        if (languages.length > 0 && JSON.stringify(languages) !== JSON.stringify(document.languages)) {
          newUpdates.languages = languages;
        }

        setUpdates(newUpdates)
      }
    
      
    }, [displayName, bio, emailContato, linkedinURL, githubURL, languages])


  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Upload the profile photo if it has been changed
      if (profilePhoto) {
        const profilePhotoURL = await uploadProfilePhoto(user.uid, profilePhoto);
        if (profilePhotoURL) {
          setUpdates({ ...updates, profilePhotoURL });
        } else {
          console.log('Profile photo upload failed.');
        }
      }

    await updateDocument(user.uid, updates)
    console.log(updates)

    setDisplayName('')
    setBio('')
    setEmailContato('')
    setGithubURL('')
    setLinkedinURL('')
    setLanguages([])
    
  }catch (error) {
    console.error('Error updating profile:', error);
    // Handle error here if needed
  }
}

  const handleFileChange = (e) => {
    setProfilePhoto(null)
    
    let selected = e.target.files[0]
    
    if (!selected) {
      setProfilePhotoError('Selecione uma imagem.')
      return
    }
    if (!selected.type.includes('image')) {
      setProfilePhotoError('O arquivo selecionado não é uma imagem, tente novamente.')
      return
    }
    if (selected.size > 10000000) {
      setProfilePhotoError('Imagem grande demais, tente novamente..')
      return
    }

    setProfilePhotoError(null)
    setProfilePhoto(selected)

    console.log('profile photo updated')

  }
  

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(17, 25, 45, 0.48)",
      borderColor: state.isFocused ? "#aaa" : "rgba(17, 25, 45, 0.48)",
      borderRadius: "16px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(12.5px)",
      WebkitBackdropFilter: "blur(12.5px)",
      "&:hover": {
        borderColor: state.isFocused ? "#aaa" : "rgba(17, 25, 45, 0.48)"
      }
    }),
    menu: base => ({
      ...base,
      background: "rgba(17, 25, 45, 0.48)",
      borderRadius: "16px",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(12.5px)",
      WebkitBackdropFilter: "blur(12.5px)",
      zIndex: 100
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      background: isSelected ? "#555" : isFocused ? "#444" : null,
      color: isSelected ? "white" : isFocused ? "white" : "inherit"
    }),
    singleValue: base => ({
      ...base,
      color: "var(--text-color)"
    }),
    input: base => ({
      ...base,
      background: "transparent",
      color: "var(--text-color)",
      
    })
  }


  return (
    <div className='profile-page__container'>
      <form onSubmit={handleSubmit} className="profile__container" >
        <h2>Atualizar Perfil</h2>

        <label>
          <span>nome:</span>
          <input
            type="text" 
            onChange={(e) => {
              setDisplayName(e.target.value)}} 
            value={displayName}
          />
        </label>

        <label>
          <span>bio:</span>
          <textarea
            onChange={(e) => setBio(e.target.value)} 
            value={bio}
          />
        </label>

        <label>
          <span>Foto de perfil:</span>
          <input 
            type="file" 
            onChange={handleFileChange}
          />
          {profilePhotoError && <div className='error'>{profilePhotoError}</div>}
        </label>

        <label>
          <span>email de contato:</span>
          <input
            type="email" 
            onChange={(e) => setEmailContato(e.target.value)} 
            value={emailContato}
          />
        </label>

        <label>
          <span>Linguagens/frameworks predominantes:</span>
          <Select 
            options={languageOptions}
            onChange={(options) => {
              setLanguages(options)
              console.log(languages)
            }}
            isMulti
            styles={customStyles}
            
          />
        </label>

        

        <label>
          <span>Linkedin (link):</span>
          <input

            type="text" 
            onChange={(e) => setLinkedinURL(e.target.value)} 
            value={linkedinURL}
          />
        </label>

        <label>
          <span>Github (link):</span>
          <input

            type="text" 
            onChange={(e) => setGithubURL(e.target.value)} 
            value={githubURL}
          />
        </label>

   


        <div className="profile-buttons__container">
          {!response.isPending && <Button text='Cadastrar' type='submit'/>}
          {response.isPending && <Button type='submit' disabled={true} text='loading...'/>}

          {/* <Link to='/login'>
            <Button text='Já tenho conta' />
          </Link> */}

        </div>

        {response.error && <div className='error'>{response.error}</div>}
        {response.success && <div className='success'>{response.success}</div>}
      </form>
    </div>
  )
}

export default Profile