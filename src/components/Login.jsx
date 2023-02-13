import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Navigate } from 'react-router-dom'
import Profile from './Profile'

export default function Login(props) {

  // for controlled form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // submit will hit backend login endpoint
  const handleSumbit = async e => {
    try { 
      e.preventDefault()
      // post to backend with form submission
      const requestBody = {
        email: email,
        password: password
      }

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, requestBody)
      
      // destructure response
      const { token } = response.data

      // Save token to localStorage
      localStorage.setItem('jwtToken', token);

      // get user data from the token
      const decoded = jwt.decode(token)

      // set the current user in the top app state
      props.setCurrentUser(decoded)
      
    } catch(error) {
      // if the email/pass didn't match
      if(error.response.status === 400) {
        setMessage(error.response.data.msg)
      } else {
        // otherwise log the error for debug
        console.log(error)
      }
    }
  }

  // Navigate to profile if user is logged in
  if(props.currentUser) return <Navigate to='/profile' component={ Profile } currentUser={ props.currentUser } />

  return (
    <div>
      <h3>Login Form:</h3>

      <p>{message}</p>

      <form onSubmit={handleSumbit}>
        <label htmlFor='email-input'>email:</label>

        <input
          id='email-input'
          type='email'
          placeholder='user@domain.com'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor='password-input'>password:</label>

        <input 
          id='password-input'
          type='password'
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />

        <input 
          type='submit'
          value='login'
        />
      </form>
    </div>
  )
}
