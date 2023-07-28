import './login.css'
import { useState } from 'react'

import { useLogin } from '../../hooks/useLogin'
import Button from '../../components/button/Button'
import { Link } from 'react-router-dom'



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error, isPending, success } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)

    setEmail('')
    setPassword('')
  }

  return (
    <div className='auth-page__container'>

      <form onSubmit={handleSubmit} className="auth__container" >
        <h2>Login</h2>

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
          <span>password:</span>
          <input
            required
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
          />
        </label>

        
        <div className="auth-buttons__container">
          {!isPending && <Button type='submit' text='Login'/>}
          {isPending && <Button text='loading..' disabled />}

          <Link to='/signup'>
            <Button text='Não tenho conta' />
          </Link>
        </div>

        {error && <div className='error'>{error}</div>}
        {success && <div className='success'>{success}</div>}
      </form>
    </div>
  )
}

export default Login
