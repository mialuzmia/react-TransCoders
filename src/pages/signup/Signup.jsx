import './signup.css'


import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/button/Button'
import { Link } from 'react-router-dom'


const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoError, setProfilePhotoError] = useState(null);

  const { signup, isPending, error, success } = useSignup()
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, profilePhoto)
    
      setEmail('')
      setPassword('')
      setDisplayName('')
      setProfilePhoto(null)


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
  return (
    <div className='auth-page__container'>
      <form onSubmit={handleSubmit} className="auth__container" >
        <h2>Cadastro</h2>
        <label>
          <span>email:</span>
          <input
            required 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
        </label>
        <label>
          <span>senha:</span>
          <input
            required
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
          />
        </label>
        <label>
          <span>nome:</span>
          <input
            required
            type="text" 
            onChange={(e) => setDisplayName(e.target.value)} 
            value={displayName}
          />
        </label>
        <label>
          <span>Foto de perfil:</span>
          <input 
            required
            type="file" 
            onChange={handleFileChange}
          />
          {profilePhotoError && <div className='error'>{profilePhotoError}</div>}
        </label>

        <div className="auth-buttons__container">
          {!isPending && <Button text='Cadastrar' type='submit'/>}
          {isPending && <Button type='submit' disabled={true} text='loading...'/>}

          <Link to='/login'>
            <Button text='Já tenho conta' />
          </Link>

        </div>

        {error && <div className='error'>{error}</div>}
        {success && <div className='success'>{success}</div>}
      </form>
    </div>
  )
}

export default Signup